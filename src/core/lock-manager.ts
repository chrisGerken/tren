/**
 * Lock Manager - handles connection point locking for collision prevention
 *
 * Trains lock connection points ahead of the leading car and release them
 * as the trailing car clears. A train cannot proceed unless it holds locks
 * on enough track ahead.
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
  isOutPoint,
  getOppositePoint,
} from './train-movement';
import { getArchetype } from './archetypes';

// Debug logging
const DEBUG_LOGGING = false;

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

  // Configuration
  readonly minLockDistance: number = 10;  // inches
  readonly minLockCount: number = 2;      // connection points

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
   * Get all locks held by a train
   */
  getTrainLocks(trainId: string): Set<ConnectionPointId> {
    return this.getTrainState(trainId).heldLocks;
  }

  /**
   * Try to acquire locks on a list of connection points in order
   * Returns success if all locks acquired, or blocked point if failed
   */
  tryAcquireLocks(
    trainId: string,
    points: ConnectionPointId[],
    simulationTime: number
  ): LockAcquisitionResult {
    const acquired: ConnectionPointId[] = [];
    const trainState = this.getTrainState(trainId);

    for (const point of points) {
      // Check if already locked by another train
      const existingLock = this.locks.get(point);
      if (existingLock && existingLock.trainId !== trainId) {
        // Blocked - don't rollback, keep what we already had
        if (DEBUG_LOGGING) {
          console.log(`Train ${trainId} blocked at ${point} by ${existingLock.trainId}`);
        }
        return {
          success: false,
          acquired,
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
        if (DEBUG_LOGGING) {
          console.log(`Train ${trainId} acquired lock on ${point}`);
        }
      }
    }

    return { success: true, acquired };
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
      if (DEBUG_LOGGING) {
        console.log(`Train ${trainId} released lock on ${point}`);
      }
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
      if (DEBUG_LOGGING) {
        console.log(`Train ${trainId} released all locks`);
      }
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
    const leadCar = train.cars[0];
    const piece = layout.pieces.find(p => p.id === leadCar.currentPieceId);
    if (!piece) {
      return { success: false, acquired: [] };
    }

    const pointsToLock: ConnectionPointId[] = [];
    let distanceCovered = 0;

    // Determine travel direction based on entry point
    const travelDirection: 'forward' | 'backward' =
      leadCar.entryPoint && isOutPoint(leadCar.entryPoint) ? 'backward' : 'forward';

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

    // Add current piece's exit point
    pointsToLock.push(connectionPointId(currentPieceId, exitPoint));

    // Scan ahead
    let safetyCounter = 0;
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

      if (!nextSection) {
        // Dead end - we've collected what we can
        break;
      }

      // Add next piece's entry point
      pointsToLock.push(connectionPointId(nextSection.pieceId, nextSection.entryPoint));

      // Move to next piece
      const nextPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
      if (!nextPiece) break;

      currentPieceId = nextSection.pieceId;
      currentPiece = nextPiece;

      // Determine exit point for next piece
      const nextArchetype = getArchetype(nextPiece.archetypeCode);
      if (nextArchetype && (nextArchetype.code === 'x90' || nextArchetype.code === 'x45')) {
        // Crossing - stay on same track number
        if (nextSection.entryPoint === 'in1') {
          exitPoint = 'out1';
        } else if (nextSection.entryPoint === 'out1') {
          exitPoint = 'in1';
        } else if (nextSection.entryPoint === 'in2') {
          exitPoint = 'out2';
        } else {
          exitPoint = 'in2';
        }
      } else {
        exitPoint = getOppositePoint(nextSection.entryPoint);
      }

      // Add exit point of this piece
      pointsToLock.push(connectionPointId(currentPieceId, exitPoint));

      distanceOnCurrent = getSectionLength(nextPiece, 0);
    }

    // Try to acquire all locks in order
    return this.tryAcquireLocks(train.id, pointsToLock, simulationTime);
  }

  /**
   * Calculate all connection points the train is currently straddling
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

      // Check each connection point
      for (const cp of archetype.connectionPoints) {
        // 'in' points are at distance 0, 'out' points at sectionLength
        const cpDistance = isInPoint(cp.name) ? 0 : sectionLength;

        // Car straddles this point if it spans across the point position
        // For zero-length pieces (sectionLength=0), both in and out are at 0
        if (carRear <= cpDistance && carFront >= cpDistance) {
          straddled.add(connectionPointId(piece.id, cp.name));
        }
      }
    }

    return Array.from(straddled);
  }

  /**
   * Release locks for connection points the train has cleared
   * Keeps locks that are still straddled or in the look-ahead set
   */
  releaseTrailingLocks(
    train: Train,
    layout: Layout,
    selectedRoutes: Map<string, number>,
    simulationTime: number
  ): void {
    const trainState = this.getTrainState(train.id);

    // Calculate currently straddled points
    const straddledPoints = new Set(this.calculateStraddledPoints(train, layout));

    // Acquire look-ahead locks (side effect only, result not needed here)
    this.acquireLeadingLocks(
      train,
      layout,
      selectedRoutes,
      simulationTime
    );

    // Build set of points we need to keep
    const keepPoints = new Set<ConnectionPointId>();
    for (const point of straddledPoints) {
      keepPoints.add(point);
    }
    // Note: lookAheadResult.acquired are already in heldLocks if successful

    // Release locks that are no longer needed
    const toRelease: ConnectionPointId[] = [];
    for (const point of trainState.heldLocks) {
      if (!keepPoints.has(point)) {
        // Check if this point is in the look-ahead path
        // For now, we keep all locks that were successfully acquired
        // They'll be released when the trailing car clears them
        const parsed = parseConnectionPointId(point);
        const piece = layout.pieces.find(p => p.id === parsed.pieceId);
        if (piece) {
          // Only release if no car is on this piece
          const anyCarOnPiece = train.cars.some(c => c.currentPieceId === parsed.pieceId);
          if (!anyCarOnPiece) {
            toRelease.push(point);
          }
        }
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
