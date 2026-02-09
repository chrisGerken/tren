/**
 * Lock Manager - handles connection point locking for collision prevention
 *
 * Trains lock connection points ahead of the leading car and release them
 * as the trailing car clears. A train cannot proceed unless it holds locks
 * on enough track ahead.
 *
 * Also handles semaphore blocking - when a semaphore is locked, trains cannot
 * pass through its connection points.
 */

import {
  ConnectionPointId,
  ConnectionPointLock,
  TrainLockState,
  Train,
  Layout,
} from './types';
import {
  getSectionLength,
  getNextSection,
  isInPoint,
  getOppositePoint,
} from './train-movement';
import { getArchetype } from './archetypes';
import { getLeadCar } from './train-helpers';
import { logger } from './logger';

/**
 * Create a connection point ID from piece ID and point name
 */
export function connectionPointId(pieceId: string, pointName: string): ConnectionPointId {
  return `${pieceId}.${pointName}`;
}

/**
 * Parse a connection point ID into piece ID and point name
 */
export function parseConnectionPointId(id: ConnectionPointId): { pieceId: string; pointName: string } {
  const lastDot = id.lastIndexOf('.');
  return {
    pieceId: id.substring(0, lastDot),
    pointName: id.substring(lastDot + 1),
  };
}

/**
 * Lock acquisition result
 */
export interface LockAcquisitionResult {
  success: boolean;
  acquired: ConnectionPointId[];
  requested: ConnectionPointId[];  // All points that were in the look-ahead (for keepPoints)
  blocked?: ConnectionPointId;
  blockingTrainId?: string;
}

/**
 * LockManager class - manages connection point locks for all trains
 */
export class LockManager {
  // Main lock registry: connectionPointId -> lock info
  private locks: Map<ConnectionPointId, ConnectionPointLock> = new Map();

  // Per-train lock tracking for efficient operations
  private trainStates: Map<string, TrainLockState> = new Map();

  // Configuration (can be set via constructor)
  readonly minLockDistance: number;  // inches
  readonly minLockCount: number;     // connection points

  constructor(minLockDistance: number = 10, minLockCount: number = 2) {
    this.minLockDistance = minLockDistance;
    this.minLockCount = minLockCount;
  }

  /**
   * Get or create train lock state
   */
  private getTrainState(trainId: string): TrainLockState {
    let state = this.trainStates.get(trainId);
    if (!state) {
      state = { heldLocks: new Set() };
      this.trainStates.set(trainId, state);
    }
    return state;
  }

  /**
   * Check if a connection point is locked
   */
  isLocked(point: ConnectionPointId): boolean {
    return this.locks.has(point);
  }

  /**
   * Check if a connection point is locked by a different train
   */
  isLockedByOther(point: ConnectionPointId, trainId: string): boolean {
    const lock = this.locks.get(point);
    return lock !== undefined && lock.trainId !== trainId;
  }

  /**
   * Check if a connection point is blocked by a locked semaphore
   * @param point - Connection point ID (e.g., "piece_5.in")
   * @param layout - The layout to check for semaphores
   */
  isBlockedBySemaphore(point: ConnectionPointId, layout: Layout): boolean {
    const parsed = parseConnectionPointId(point);
    const piece = layout.pieces.find(p => p.id === parsed.pieceId);

    // Check if this piece is a semaphore and is locked
    if (piece?.semaphoreConfig?.locked) {
      return true;
    }

    return false;
  }

  /**
   * Get all locks held by a train
   */
  getTrainLocks(trainId: string): Set<ConnectionPointId> {
    return this.getTrainState(trainId).heldLocks;
  }

  /**
   * Try to acquire locks on a list of connection points in order
   * Returns success if all locks acquired, or blocked point if failed
   * @param layout - Optional layout for checking semaphore blocks
   */
  tryAcquireLocks(
    trainId: string,
    points: ConnectionPointId[],
    simulationTime: number,
    layout?: Layout
  ): LockAcquisitionResult {
    const acquired: ConnectionPointId[] = [];
    const trainState = this.getTrainState(trainId);

    for (const point of points) {
      // Check if blocked by a locked semaphore
      if (layout && this.isBlockedBySemaphore(point, layout)) {
        logger.debug(`Train ${trainId} blocked at ${point} by locked semaphore`);
        return {
          success: false,
          acquired,
          requested: [],  // Will be filled in by acquireLeadingLocks
          blocked: point,
          blockingTrainId: 'semaphore',
        };
      }

      // Check if already locked by another train
      const existingLock = this.locks.get(point);
      if (existingLock && existingLock.trainId !== trainId) {
        // Blocked - don't rollback, keep what we already had
        logger.debug(`Train ${trainId} blocked at ${point} by ${existingLock.trainId}`);
        return {
          success: false,
          acquired,
          requested: [],  // Will be filled in by acquireLeadingLocks
          blocked: point,
          blockingTrainId: existingLock.trainId,
        };
      }

      // Acquire the lock if we don't already have it
      if (!existingLock) {
        this.locks.set(point, {
          trainId,
          acquiredAt: simulationTime,
        });
        trainState.heldLocks.add(point);
        acquired.push(point);
        logger.debug(`Train ${trainId} acquired lock on ${point}`);
      }
    }

    return { success: true, acquired, requested: [] };  // requested filled by acquireLeadingLocks
  }

  /**
   * Release a lock held by a train
   */
  releaseLock(trainId: string, point: ConnectionPointId): boolean {
    const lock = this.locks.get(point);
    if (lock && lock.trainId === trainId) {
      this.locks.delete(point);
      const trainState = this.trainStates.get(trainId);
      if (trainState) {
        trainState.heldLocks.delete(point);
      }
      logger.debug(`Train ${trainId} released lock on ${point}`);
      return true;
    }
    return false;
  }

  /**
   * Release all locks held by a train
   */
  releaseAllLocks(trainId: string): void {
    const trainState = this.trainStates.get(trainId);
    if (trainState) {
      for (const point of trainState.heldLocks) {
        this.locks.delete(point);
      }
      trainState.heldLocks.clear();
      logger.debug(`Train ${trainId} released all locks`);
    }
  }

  /**
   * Scan ahead from leading car and try to acquire necessary locks
   * Returns success if enough locks acquired to proceed
   */
  acquireLeadingLocks(
    train: Train,
    layout: Layout,
    selectedRoutes: Map<string, number>,
    simulationTime: number
  ): LockAcquisitionResult {
    const leadCar = getLeadCar(train);
    const piece = layout.pieces.find(p => p.id === leadCar.currentPieceId);
    if (!piece) {
      logger.debug(`acquireLeadingLocks: No piece found for ${leadCar.currentPieceId}`);
      return { success: false, acquired: [], requested: [] };
    }

    const pointsToLock: ConnectionPointId[] = [];
    let distanceCovered = 0;

    // Use train's travel direction to determine exit point
    const travelDirection = train.travelDirection;

    // Start from current piece
    let currentPieceId = leadCar.currentPieceId;
    let currentPiece = piece;
    let exitPoint = travelDirection === 'forward' ? 'out' : 'in';

    // Handle crossings - determine which track we're on
    const archetype = getArchetype(piece.archetypeCode);
    if (archetype && (archetype.code === 'x90' || archetype.code === 'x45')) {
      if (leadCar.entryPoint === 'in1' || leadCar.entryPoint === 'out1') {
        exitPoint = travelDirection === 'forward' ? 'out1' : 'in1';
      } else if (leadCar.entryPoint === 'in2' || leadCar.entryPoint === 'out2') {
        exitPoint = travelDirection === 'forward' ? 'out2' : 'in2';
      }
    }

    // Distance remaining on current piece
    const sectionLength = getSectionLength(currentPiece, 0);
    let distanceOnCurrent: number;
    if (travelDirection === 'forward') {
      distanceOnCurrent = Math.max(0, sectionLength - leadCar.distanceAlongSection);
    } else {
      distanceOnCurrent = Math.max(0, leadCar.distanceAlongSection);
    }

    logger.debug(`acquireLeadingLocks: train=${train.id}, leadCar on ${currentPieceId}, ` +
      `entryPoint=${leadCar.entryPoint}, travelDir=${travelDirection}, exitPoint=${exitPoint}, ` +
      `sectionLen=${sectionLength.toFixed(1)}, distAlong=${leadCar.distanceAlongSection.toFixed(1)}, ` +
      `distOnCurrent=${distanceOnCurrent.toFixed(1)}`);

    // Check for internal connection points on current piece ahead of lead car
    if (currentPiece.internalConnectionPoints) {
      for (const icp of currentPiece.internalConnectionPoints) {
        const isAhead = travelDirection === 'forward'
          ? icp.distance > leadCar.distanceAlongSection
          : icp.distance < leadCar.distanceAlongSection;
        if (isAhead) {
          pointsToLock.push(icp.id);
          logger.debug(`  Adding internal point ${icp.id} at distance ${icp.distance.toFixed(1)}`);
        }
      }
    }

    // Add current piece's exit point
    pointsToLock.push(connectionPointId(currentPieceId, exitPoint));

    // Scan ahead
    let safetyCounter = 0;
    logger.debug(`  Scan ahead: minDist=${this.minLockDistance}, minCount=${this.minLockCount}`);
    while (
      (distanceCovered < this.minLockDistance || pointsToLock.length < this.minLockCount) &&
      safetyCounter < 30
    ) {
      safetyCounter++;

      // Accumulate distance (but zero-length pieces add 0)
      distanceCovered += distanceOnCurrent;

      // Get next piece
      const nextSection = getNextSection(
        currentPieceId,
        exitPoint,
        layout,
        selectedRoutes,
        train.routesTaken,
        undefined, // previousPieceId - not filtering here
        travelDirection
      );

      logger.debug(`  Loop ${safetyCounter}: from ${currentPieceId}.${exitPoint}, ` +
        `nextSection=${nextSection ? `${nextSection.pieceId}.${nextSection.entryPoint}` : 'null'}, ` +
        `distCovered=${distanceCovered.toFixed(1)}, points=${pointsToLock.length}`);

      if (!nextSection) {
        // Dead end - we've collected what we can
        logger.debug(`  Dead end at ${currentPieceId}.${exitPoint}`);
        break;
      }

      // Add next piece's entry point
      pointsToLock.push(connectionPointId(nextSection.pieceId, nextSection.entryPoint));

      // Move to next piece
      const nextPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
      if (!nextPiece) break;

      currentPieceId = nextSection.pieceId;
      currentPiece = nextPiece;

      // Determine exit point and travel direction for next piece
      const nextArchetype = getArchetype(nextPiece.archetypeCode);
      let nextTravelForward = true; // Will we traverse this piece forward (in->out)?
      if (nextArchetype && (nextArchetype.code === 'x90' || nextArchetype.code === 'x45')) {
        // Crossing - stay on same track number
        if (nextSection.entryPoint === 'in1') {
          exitPoint = 'out1';
          nextTravelForward = true;
        } else if (nextSection.entryPoint === 'out1') {
          exitPoint = 'in1';
          nextTravelForward = false;
        } else if (nextSection.entryPoint === 'in2') {
          exitPoint = 'out2';
          nextTravelForward = true;
        } else {
          exitPoint = 'in2';
          nextTravelForward = false;
        }
      } else {
        exitPoint = getOppositePoint(nextSection.entryPoint);
        nextTravelForward = isInPoint(nextSection.entryPoint);
      }

      // Add internal connection points on this piece (all of them, since we traverse the whole piece)
      if (nextPiece.internalConnectionPoints) {
        // Sort by distance in travel direction
        const sortedIcps = [...nextPiece.internalConnectionPoints].sort((a, b) =>
          nextTravelForward ? a.distance - b.distance : b.distance - a.distance
        );
        for (const icp of sortedIcps) {
          pointsToLock.push(icp.id);
          logger.debug(`  Adding internal point ${icp.id} on piece ${currentPieceId}`);
        }
      }

      // Add exit point of this piece
      pointsToLock.push(connectionPointId(currentPieceId, exitPoint));

      distanceOnCurrent = getSectionLength(nextPiece, 0);
    }

    logger.debug(`  Final pointsToLock (${pointsToLock.length}): ${pointsToLock.join(', ')}`);

    // Try to acquire all locks in order (pass layout for semaphore checks)
    const result = this.tryAcquireLocks(train.id, pointsToLock, simulationTime, layout);
    // Add the full requested list so releaseTrailingLocks knows what to keep
    result.requested = pointsToLock;
    logger.debug(`  Lock result: success=${result.success}, acquired=${result.acquired.length}, ` +
      `blocked=${result.blocked || 'none'}`);
    return result;
  }

  /**
   * Calculate all connection points the train is currently straddling
   * (includes both endpoint connection points and internal connection points)
   */
  calculateStraddledPoints(train: Train, layout: Layout): ConnectionPointId[] {
    const straddled = new Set<ConnectionPointId>();

    for (const car of train.cars) {
      const piece = layout.pieces.find(p => p.id === car.currentPieceId);
      if (!piece) continue;

      const archetype = getArchetype(piece.archetypeCode);
      if (!archetype) continue;

      const sectionLength = getSectionLength(piece, 0);
      const carHalfLength = car.length / 2;

      // Car's front and rear positions on this piece
      const carFront = car.distanceAlongSection + carHalfLength;
      const carRear = car.distanceAlongSection - carHalfLength;

      // Check each endpoint connection point
      for (const cp of archetype.connectionPoints) {
        // 'in' points are at distance 0, 'out' points at sectionLength
        const cpDistance = isInPoint(cp.name) ? 0 : sectionLength;

        // Car straddles this point if it spans across the point position
        // For zero-length pieces (sectionLength=0), both in and out are at 0
        if (carRear <= cpDistance && carFront >= cpDistance) {
          straddled.add(connectionPointId(piece.id, cp.name));
        }
      }

      // Check internal connection points
      if (piece.internalConnectionPoints) {
        for (const icp of piece.internalConnectionPoints) {
          // Car straddles internal point if it spans across the point's distance
          if (carRear <= icp.distance && carFront >= icp.distance) {
            straddled.add(icp.id);
          }
        }
      }
    }

    return Array.from(straddled);
  }

  /**
   * Release locks for connection points the train has cleared
   * Keeps locks on pieces where any car is present, plus look-ahead locks
   */
  releaseTrailingLocks(
    train: Train,
    layout: Layout,
    selectedRoutes: Map<string, number>,
    simulationTime: number
  ): void {
    const trainState = this.getTrainState(train.id);

    // Build set of piece IDs that have any car on them
    const occupiedPieceIds = new Set<string>();
    for (const car of train.cars) {
      occupiedPieceIds.add(car.currentPieceId);
    }

    // Build set of points we need to keep
    const keepPoints = new Set<ConnectionPointId>();

    // Keep ALL connection points of pieces that have any car on them
    // This ensures we don't release locks until the LAST car clears the piece
    for (const pieceId of occupiedPieceIds) {
      const piece = layout.pieces.find(p => p.id === pieceId);
      if (!piece) continue;
      const archetype = getArchetype(piece.archetypeCode);
      if (!archetype) continue;
      for (const cp of archetype.connectionPoints) {
        keepPoints.add(connectionPointId(pieceId, cp.name));
      }
      // Also keep internal connection points on occupied pieces
      if (piece.internalConnectionPoints) {
        for (const icp of piece.internalConnectionPoints) {
          keepPoints.add(icp.id);
        }
      }
    }

    // Acquire look-ahead locks and add them to keepPoints
    const lookAheadResult = this.acquireLeadingLocks(
      train,
      layout,
      selectedRoutes,
      simulationTime
    );
    // Keep ALL points in the look-ahead path (not just newly acquired)
    for (const point of lookAheadResult.requested) {
      keepPoints.add(point);
    }

    // Release locks that are no longer needed
    const toRelease: ConnectionPointId[] = [];
    for (const point of trainState.heldLocks) {
      if (!keepPoints.has(point)) {
        toRelease.push(point);
      }
    }

    for (const point of toRelease) {
      this.releaseLock(train.id, point);
    }
  }

  /**
   * Check if a junction (identified by route key) is locked
   * Route key format: "junction.{canonicalJunctionId}.{direction}"
   */
  isJunctionLocked(routeKey: string): boolean {
    // Parse the route key to extract the canonical junction ID
    // Format: "junction.piece_0.out.fwd" -> canonicalJunctionId = "piece_0.out"
    const match = routeKey.match(/^junction\.(.+)\.(fwd|bwd)$/);
    if (!match) return false;

    const canonicalJunctionId = match[1];
    const parsed = parseConnectionPointId(canonicalJunctionId);

    // Check if this connection point is locked
    const pointId = connectionPointId(parsed.pieceId, parsed.pointName);
    return this.isLocked(pointId);
  }

  /**
   * Get all currently locked points (for debugging/visualization)
   */
  getAllLockedPoints(): Map<ConnectionPointId, ConnectionPointLock> {
    return new Map(this.locks);
  }

  /**
   * Clear all locks (for reset)
   */
  clear(): void {
    this.locks.clear();
    this.trainStates.clear();
  }
}
