/**
 * Simulation Engine - manages train spawning, movement, and removal
 */

import { Car, Train, Layout, TrackPiece, vec3, RangeValue } from './types';
import { getArchetype } from './archetypes';
import {
  moveCar,
  updateCarWorldPosition,
  CAB_LENGTH,
  CAR_LENGTH,
  CAR_GAP,
  getSectionLength,
  isInPoint,
  isOutPoint,
  getOppositePoint,
} from './train-movement';
import { getRandomCarColor, resetCarColorTracking } from '../renderer/train-renderer';
import { LockManager } from './lock-manager';
import { getLeadCar, getTailCarIndex } from './train-helpers';
import { logger } from './logger';

/**
 * Information about the next switch a train will encounter
 */
export interface NextSwitchInfo {
  routeKey: string;
  options: { index: number; label: string }[];  // Sorted left-to-right
  currentOverride?: number;  // Index if user has set override, undefined if not
}

// Default train speed in inches per second
const DEFAULT_SPEED = 12;

// Speed adjustment constants
const ACCELERATION = 6;              // Speed increase per second (inches/sec²)
const NORMAL_BRAKING = 12;           // Comfortable deceleration (inches/sec²)
const EMERGENCY_BRAKING = 24;        // Hard braking (inches/sec²)
const COUPLING_SPEED = 3;            // Default coupling speed (inches/sec)

/**
 * Check if a value is a range
 */
function isRange(value: number | RangeValue | undefined): value is RangeValue {
  return value !== undefined && typeof value === 'object' && 'min' in value && 'max' in value;
}

/**
 * Resolve a value that may be a number, range, or undefined to a random integer
 */
function resolveIntegerValue(value: number | RangeValue | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue;
  if (isRange(value)) {
    // Random integer between min and max (inclusive)
    return Math.floor(Math.random() * (value.max - value.min + 1)) + value.min;
  }
  return value;
}

/**
 * Resolve a value that may be a number, range, or undefined to a random real number
 */
function resolveRealValue(value: number | RangeValue | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue;
  if (isRange(value)) {
    // Random real number between min and max
    return Math.random() * (value.max - value.min) + value.min;
  }
  return value;
}

/**
 * Simulation class - manages the animation loop and train state
 */
export class Simulation {
  private trains: Train[] = [];
  private layout: Layout;
  private running: boolean = false;
  private lastTime: number = 0;
  private animationId: number | null = null;
  private simulationTime: number = 0;
  private onUpdate: () => void;
  private selectedRoutes: Map<string, number>;
  private nextTrainId: number = 1;
  private nextCarId: number = 1;
  // Cached resolved frequencies per generator (for range support)
  private resolvedFrequencies: Map<string, number> = new Map();
  // Lock manager for connection point locking
  private lockManager: LockManager;

  constructor(
    layout: Layout,
    selectedRoutes: Map<string, number>,
    onUpdate: () => void
  ) {
    this.layout = layout;
    this.selectedRoutes = selectedRoutes;
    this.onUpdate = onUpdate;
    // Initialize lock manager with layout's lock ahead configuration
    this.lockManager = new LockManager(
      layout.lockAheadDistance ?? 10,
      layout.lockAheadCount ?? 2
    );
  }

  /**
   * Start the simulation animation loop
   */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.animationLoop(this.lastTime);
    logger.info('Simulation started');
  }

  /**
   * Stop the simulation
   */
  stop(): void {
    this.running = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    logger.info('Simulation stopped');
  }

  /**
   * Get all currently locked connection point IDs
   * Includes both train-locked points and semaphore-blocked points
   */
  getLockedPoints(): Set<string> {
    const locked = new Set(this.lockManager.getAllLockedPoints().keys());

    // Add semaphore-blocked connection points
    for (const piece of this.layout.pieces) {
      if (piece.semaphoreConfig?.locked) {
        // Add both 'in' and 'out' connection points for locked semaphores
        locked.add(`${piece.id}.in`);
        locked.add(`${piece.id}.out`);
      }
    }

    logger.debug('Locked points:', Array.from(locked));
    return locked;
  }

  /**
   * Reset the simulation - clear all trains
   */
  reset(): void {
    this.trains = [];
    this.simulationTime = 0;
    this.resolvedFrequencies.clear();
    this.lockManager.clear();
    // Reset generator spawn times
    for (const piece of this.layout.pieces) {
      if (piece.genConfig) {
        piece.genConfig.lastSpawnTime = -Infinity;
        piece.genConfig.enabled = true;
      }
    }
    this.onUpdate();
    logger.info('Simulation reset');
  }

  /**
   * Get current trains for rendering
   */
  getTrains(): Train[] {
    return this.trains;
  }

  /**
   * Toggle a generator on/off
   */
  toggleGenerator(pieceId: string): void {
    const piece = this.layout.pieces.find(p => p.id === pieceId);
    if (piece?.genConfig) {
      piece.genConfig.enabled = !piece.genConfig.enabled;
      logger.info(`Generator ${pieceId} toggled: ${piece.genConfig.enabled}`);
    }
  }

  /**
   * Clear the cached resolved frequency for a generator so config changes take effect immediately
   */
  clearResolvedFrequency(pieceId: string): void {
    this.resolvedFrequencies.delete(pieceId);
  }

  /**
   * Main animation loop
   */
  private animationLoop = (timestamp: number): void => {
    if (!this.running) return;

    const deltaTime = (timestamp - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = timestamp;

    // Cap delta time to prevent huge jumps (e.g., after tab switch)
    const clampedDelta = Math.min(deltaTime, 0.1);

    this.simulationTime += clampedDelta;

    // Update simulation
    this.checkSpawning();
    this.updateTrains(clampedDelta);
    this.checkRemovals();

    // Notify renderer
    this.onUpdate();

    // Continue loop
    this.animationId = requestAnimationFrame(this.animationLoop);
  };

  /**
   * Check generators for spawning new trains
   */
  private checkSpawning(): void {
    for (const piece of this.layout.pieces) {
      if (!piece.genConfig || !piece.genConfig.enabled) continue;

      const config = piece.genConfig;
      const timeSinceLastSpawn = this.simulationTime - config.lastSpawnTime;

      if (config.frequency === undefined) {
        // One-shot: spawn once, then disable
        if (config.lastSpawnTime === -Infinity) {
          this.spawnTrain(piece);
          config.lastSpawnTime = this.simulationTime;
          config.enabled = false;
        }
      } else {
        // Repeating: spawn every frequency seconds
        // Use config.frequency directly (plain number) or resolve from cache (range)
        let frequency: number;
        if (typeof config.frequency === 'number') {
          // Plain number — always use directly so inspector slider changes take effect immediately
          frequency = config.frequency;
        } else {
          // RangeValue — resolve once per interval and cache
          let cached = this.resolvedFrequencies.get(piece.id);
          if (cached === undefined) {
            cached = resolveIntegerValue(config.frequency, 10);
            this.resolvedFrequencies.set(piece.id, cached);
          }
          frequency = cached;
        }
        if (timeSinceLastSpawn >= frequency) {
          // Timer fires: only reset timer if spawn succeeds.
          // When spawn fails (max trains, track blocked), keep the timer pending
          // so this generator retries next frame — prevents starvation when
          // multiple generators compete for limited train slots.
          if (this.spawnTrain(piece)) {
            config.lastSpawnTime = this.simulationTime;
            // Resolve a new frequency for the next spawn interval
            this.resolvedFrequencies.set(piece.id, resolveIntegerValue(config.frequency, 10));
          }
        }
      }
    }
  }

  /**
   * Check if spawning a new train would exceed the max trains limit
   */
  private canSpawnTrain(): boolean {
    // Default to 5 trains if no limit is specified
    const maxTrains = this.layout.maxTrains ?? 5;

    // Check if we're at or above the limit
    return this.trains.length < maxTrains;
  }

  /**
   * Spawn a new train at a generator
   * Cars spawn inside the generator's internal track section and move forward to exit
   * Returns true if a train was successfully spawned, false otherwise
   */
  private spawnTrain(generatorPiece: TrackPiece): boolean {
    if (!generatorPiece.genConfig) return false;

    // Check maxTrains limit before spawning
    if (!this.canSpawnTrain()) {
      logger.debug(`Cannot spawn train - at max trains limit (${this.layout.maxTrains})`);
      return false;
    }

    // Check if any train still has cars inside this generator
    const genId = generatorPiece.id;
    for (const train of this.trains) {
      if (train.cars.some(c => c.currentPieceId === genId)) {
        logger.debug(`Cannot spawn train - generator ${genId} still occupied`);
        return false;
      }
    }

    const config = generatorPiece.genConfig;

    // Resolve range values to actual values for this train
    const cabCount = resolveIntegerValue(config.cabCount, 1);
    const carCount = resolveIntegerValue(config.carCount, 5);
    const desiredSpeed = resolveRealValue(config.speed, DEFAULT_SPEED);

    const train: Train = {
      id: `train_${this.nextTrainId++}`,
      cars: [],
      desiredSpeed,
      currentSpeed: 0,  // Start at rest, will accelerate
      generatorId: generatorPiece.id,
      routesTaken: new Map(),  // Tracks which route was taken at each switch
      travelDirection: 'forward',
      coupling: false,
      couplingSpeed: COUPLING_SPEED,
    };

    // Generator has an internal section - cars spawn inside it
    const genSectionLength = getSectionLength(generatorPiece, 0);
    if (genSectionLength === 0) {
      logger.debug(`Generator ${generatorPiece.id} has no internal section`);
      return false;
    }

    // Position cars from front to back, starting near the exit (high distance)
    // First cab is closest to exit, last car is furthest back
    let currentDistance = genSectionLength; // Start at the exit point

    // Reset color tracking for this train (so colors can group within trains)
    resetCarColorTracking();

    // Create cabs (front of train)
    // Position is car CENTER, so account for half-lengths when spacing
    for (let i = 0; i < cabCount; i++) {
      currentDistance -= CAB_LENGTH / 2; // Move from front edge to center
      const car: Car = {
        id: `car_${this.nextCarId++}`,
        type: 'cab',
        length: CAB_LENGTH,
        currentPieceId: generatorPiece.id,
        distanceAlongSection: currentDistance,
        visible: false,
        worldPosition: vec3(0, 0, 0),
        rotation: 0,
        facingForward: true,
        sectionDirection: 1,
      };
      train.cars.push(car);
      currentDistance -= CAB_LENGTH / 2 + CAR_GAP; // Move from center to back edge + gap
    }

    // Create cars (behind cabs) with randomly assigned colors
    const colorMode = config.colorMode ?? 'gray';
    for (let i = 0; i < carCount; i++) {
      currentDistance -= CAR_LENGTH / 2; // Move from front edge to center
      const car: Car = {
        id: `car_${this.nextCarId++}`,
        type: 'car',
        length: CAR_LENGTH,
        currentPieceId: generatorPiece.id,
        distanceAlongSection: currentDistance,
        visible: false,
        worldPosition: vec3(0, 0, 0),
        rotation: 0,
        color: getRandomCarColor(colorMode),  // Assign color once at creation based on colorMode
        facingForward: true,
        sectionDirection: 1,
      };
      train.cars.push(car);
      currentDistance -= CAR_LENGTH / 2 + CAR_GAP; // Move from center to back edge + gap
    }

    // Update world positions
    for (const car of train.cars) {
      updateCarWorldPosition(car, this.layout);
    }

    // Try to acquire initial locks — if blocked, spawn anyway but train will wait
    const lockResult = this.lockManager.acquireLeadingLocks(
      train,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );

    if (!lockResult.success) {
      logger.debug(`Train ${train.id} spawned but blocked at ${lockResult.blocked} by ${lockResult.blockingTrainId} - will wait`);
    }

    this.trains.push(train);
    logger.info(`Spawned train ${train.id} with ${train.cars.length} cars`);
    return true;
  }

  /**
   * Update all trains
   */
  private updateTrains(deltaTime: number): void {
    // Collect trains to remove after coupling merges
    const trainsToRemove = new Set<string>();

    for (const train of this.trains) {
      if (trainsToRemove.has(train.id)) continue;

      // Step 1: Try to acquire leading locks (includes internal connection points)
      const lockResult = this.lockManager.acquireLeadingLocks(
        train,
        this.layout,
        this.selectedRoutes,
        this.simulationTime
      );

      // Step 2: Adjust speed based on lock acquisition and coupling mode
      if (train.coupling) {
        // Coupling mode: move at coupling speed, ignore lock failures
        train.currentSpeed = train.couplingSpeed;
      } else if (!lockResult.success) {
        // Can't acquire locks - emergency braking
        train.currentSpeed = Math.max(0, train.currentSpeed - EMERGENCY_BRAKING * deltaTime);
      } else if (train.currentSpeed > train.desiredSpeed) {
        // Locks acquired but going too fast - normal braking to desired speed
        train.currentSpeed = Math.max(
          train.desiredSpeed,
          train.currentSpeed - NORMAL_BRAKING * deltaTime
        );
      } else if (train.currentSpeed < train.desiredSpeed) {
        // Locks acquired - accelerate toward desired speed
        train.currentSpeed = Math.min(
          train.desiredSpeed,
          train.currentSpeed + ACCELERATION * deltaTime
        );
      }

      // Step 3: Move cars based on current speed and travel direction
      const rawDistance = train.currentSpeed * deltaTime;
      const distance = train.travelDirection === 'forward' ? rawDistance : -rawDistance;

      // Track routes used by the tail car - these will be cleared after it passes
      const routesToClear = new Set<string>();

      // Move each car, passing the clear set only to the tail car
      const tailCarIdx = getTailCarIndex(train);
      for (let i = 0; i < train.cars.length; i++) {
        const isLastCar = i === tailCarIdx;
        moveCar(
          train.cars[i],
          distance,
          this.layout,
          this.selectedRoutes,
          train.routesTaken,
          isLastCar ? routesToClear : undefined
        );
      }

      // Clear routes that the last car has now passed
      // This ensures all cars use the same route, then it's forgotten for the next lap
      for (const routeKey of routesToClear) {
        train.routesTaken.delete(routeKey);
        logger.debug(`Cleared route memory: ${routeKey} for train ${train.id}`);
      }

      // Step 3b: Check for coupling contact if in coupling mode
      if (train.coupling) {
        const mergedTrainId = this.checkCouplingContact(train);
        if (mergedTrainId) {
          trainsToRemove.add(mergedTrainId);
        }
      }

      // Step 4: Release locks for connection points the train has cleared
      this.lockManager.releaseTrailingLocks(
        train,
        this.layout,
        this.selectedRoutes,
        this.simulationTime
      );

      // Update visibility for each car
      for (const car of train.cars) {
        this.updateCarVisibility(car);
      }
    }

    // Remove trains that were merged during coupling
    if (trainsToRemove.size > 0) {
      this.trains = this.trains.filter(t => !trainsToRemove.has(t.id));
    }
  }

  /**
   * Update car visibility based on current piece and position
   */
  private updateCarVisibility(car: Car): void {
    const piece = this.layout.pieces.find(p => p.id === car.currentPieceId);
    if (!piece) return;

    const archetype = getArchetype(piece.archetypeCode);
    if (!archetype) return;

    if (archetype.code === 'gen') {
      // Car is inside generator's internal track - keep hidden
      car.visible = false;
    } else if (archetype.code === 'bin') {
      // Car entered bin - hide it
      car.visible = false;
    } else if (piece.inTunnel) {
      // Car is inside a tunnel section - hide it
      car.visible = false;
    } else {
      // Regular track - car is visible
      car.visible = true;
    }
  }

  /**
   * Check for trains that should be removed (all cars in bin)
   */
  private checkRemovals(): void {
    this.trains = this.trains.filter(train => {
      // Check if all cars are in a bin
      const allInBin = train.cars.every(car => {
        const piece = this.layout.pieces.find(p => p.id === car.currentPieceId);
        if (!piece) return false;
        const archetype = getArchetype(piece.archetypeCode);
        return archetype?.code === 'bin';
      });

      if (allInBin) {
        // Release all locks held by this train
        this.lockManager.releaseAllLocks(train.id);
        logger.info(`Removing train ${train.id} - all cars in bin`);
        return false; // Remove this train
      }
      return true; // Keep this train
    });
  }

  /**
   * Start coupling mode for a train (must be stopped first)
   * Train will move at coupling speed and ignore lock failures until contact
   */
  startCoupling(trainId: string): boolean {
    const train = this.trains.find(t => t.id === trainId);
    if (!train) return false;

    if (train.currentSpeed !== 0) {
      logger.info(`Cannot start coupling for train ${trainId} - still moving`);
      return false;
    }

    train.coupling = true;
    logger.info(`Train ${trainId} entering coupling mode`);
    return true;
  }

  /**
   * Check if a coupling train has made contact with a stopped train
   * Uses world position distance so contact works across piece boundaries
   * Returns the ID of the merged (removed) train, or null if no contact
   */
  private checkCouplingContact(couplingTrain: Train): string | null {
    const leadCar = getLeadCar(couplingTrain);

    // Check against all other trains
    for (const otherTrain of this.trains) {
      if (otherTrain.id === couplingTrain.id) continue;
      if (otherTrain.currentSpeed !== 0) continue; // Only couple with stopped trains

      // Check if lead car is close to any car in the other train (using world position)
      for (const otherCar of otherTrain.cars) {
        const dx = leadCar.worldPosition.x - otherCar.worldPosition.x;
        const dz = leadCar.worldPosition.z - otherCar.worldPosition.z;
        const worldDist = Math.sqrt(dx * dx + dz * dz);
        const minGap = (leadCar.length + otherCar.length) / 2 + CAR_GAP;

        if (worldDist <= minGap) {
          // Contact! Merge trains
          this.coupleTrains(couplingTrain, otherTrain);
          return otherTrain.id;
        }
      }
    }

    return null;
  }

  /**
   * Merge a coupling train with a stopped train
   * The coupling train absorbs the stopped train's cars
   */
  private coupleTrains(couplingTrain: Train, stoppedTrain: Train): void {
    logger.info(`Coupling train ${couplingTrain.id} with train ${stoppedTrain.id}`);

    // Determine which end of the coupling train contacted the stopped train
    const leadCar = getLeadCar(couplingTrain);
    const leadCarPiece = leadCar.currentPieceId;

    // Find which end of the stopped train is closest to the coupling train's lead car
    const stoppedFirst = stoppedTrain.cars[0];
    const stoppedLast = stoppedTrain.cars[stoppedTrain.cars.length - 1];

    const distToFirst = stoppedFirst.currentPieceId === leadCarPiece
      ? Math.abs(leadCar.distanceAlongSection - stoppedFirst.distanceAlongSection)
      : Infinity;
    const distToLast = stoppedLast.currentPieceId === leadCarPiece
      ? Math.abs(leadCar.distanceAlongSection - stoppedLast.distanceAlongSection)
      : Infinity;

    // Merge car arrays based on travel direction and contact point
    if (couplingTrain.travelDirection === 'forward') {
      // Coupling train is moving forward, so contact is at the front (cars[0] end)
      if (distToLast <= distToFirst) {
        // Contacted stopped train's last car - prepend stopped train's cars
        couplingTrain.cars = [...stoppedTrain.cars, ...couplingTrain.cars];
      } else {
        // Contacted stopped train's first car - prepend in reverse order
        couplingTrain.cars = [...stoppedTrain.cars.slice().reverse(), ...couplingTrain.cars];
      }
    } else {
      // Coupling train is moving backward, so contact is at the rear (cars[last] end)
      if (distToFirst <= distToLast) {
        // Contacted stopped train's first car - append stopped train's cars
        couplingTrain.cars = [...couplingTrain.cars, ...stoppedTrain.cars];
      } else {
        // Contacted stopped train's last car - append in reverse order
        couplingTrain.cars = [...couplingTrain.cars, ...stoppedTrain.cars.slice().reverse()];
      }
    }

    // Stop the combined train and exit coupling mode
    couplingTrain.currentSpeed = 0;
    couplingTrain.coupling = false;

    // Clear previousPieceId for all cars so backward movement isn't blocked
    // by the "don't go back" filter in getNextSection (same as reverseTrain)
    for (const car of couplingTrain.cars) {
      car.previousPieceId = undefined;
    }

    // Clear route memory — absorbed train's routes are irrelevant
    couplingTrain.routesTaken.clear();

    // Transfer locks from stopped train to coupling train
    const stoppedLocks = this.lockManager.getTrainLocks(stoppedTrain.id);
    for (const lockPoint of stoppedLocks) {
      this.lockManager.releaseLock(stoppedTrain.id, lockPoint);
    }
    // Re-acquire locks for the combined train
    this.lockManager.acquireLeadingLocks(
      couplingTrain,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );

    logger.info(`Combined train ${couplingTrain.id} now has ${couplingTrain.cars.length} cars`);
  }

  /**
   * Reverse a train's travel direction (only when stopped)
   * Returns true if reversed, false if train is still moving
   */
  reverseTrain(trainId: string): boolean {
    const train = this.trains.find(t => t.id === trainId);
    if (!train) return false;

    if (train.currentSpeed !== 0) {
      logger.info(`Cannot reverse train ${trainId} - still moving`);
      return false;
    }

    train.travelDirection = train.travelDirection === 'forward' ? 'backward' : 'forward';

    // Clear previousPieceId for all cars so backward travel isn't blocked
    // by the "don't go back" filter in getNextSection
    for (const car of train.cars) {
      car.previousPieceId = undefined;
    }

    // Clear route memory — forward-pass routes are irrelevant after reversal
    train.routesTaken.clear();

    // Release all existing locks and re-acquire for new direction
    this.lockManager.releaseAllLocks(train.id);
    this.lockManager.acquireLeadingLocks(
      train,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );

    logger.info(`Train ${trainId} reversed to ${train.travelDirection}`);
    return true;
  }

  /**
   * Activate a decoupler to split a stopped train at the decoupler's position
   * Returns the ID of the new train created, or null if no split occurred
   */
  activateDecoupler(pieceId: string): string | null {
    const piece = this.layout.pieces.find(p => p.id === pieceId);
    if (!piece || !piece.decouplerConfig) return null;

    // Find a stopped train that straddles this decoupler
    // The decoupler is at the world position of the piece
    for (const train of this.trains) {
      if (train.currentSpeed !== 0) continue;

      // Find a coupler gap between consecutive cars that is near the decoupler
      // The decoupler is zero-length, so we look for cars on pieces adjacent to it
      for (let i = 0; i < train.cars.length - 1; i++) {
        const carA = train.cars[i];
        const carB = train.cars[i + 1];

        // Check if the coupler between these cars is near the decoupler
        // The decoupler piece connects to adjacent pieces; check if cars are on those pieces
        // or if cars are on the same piece and the decoupler is between them
        if (this.isCouplerNearDecoupler(carA, carB, piece)) {
          return this.splitTrain(train, i + 1);
        }
      }
    }

    logger.info(`Decoupler ${pieceId}: no stopped train found straddling this position`);
    return null;
  }

  /**
   * Check if the coupler between two consecutive cars is near a decoupler piece
   */
  private isCouplerNearDecoupler(carA: Car, carB: Car, decouplerPiece: TrackPiece): boolean {
    const tolerance = 2.0; // inches

    // Get decoupler world position
    const decX = decouplerPiece.position.x;
    const decZ = decouplerPiece.position.z;

    // Calculate coupler position (midpoint between rear of carA and front of carB)
    const couplerX = (carA.worldPosition.x + carB.worldPosition.x) / 2;
    const couplerZ = (carA.worldPosition.z + carB.worldPosition.z) / 2;

    const dist = Math.sqrt(
      (couplerX - decX) * (couplerX - decX) +
      (couplerZ - decZ) * (couplerZ - decZ)
    );

    return dist <= tolerance;
  }

  /**
   * Split a train at the given index into two trains
   * Cars [0..splitIndex-1] stay in the original train
   * Cars [splitIndex..end] become a new stopped train
   * Returns the ID of the new train
   */
  private splitTrain(train: Train, splitIndex: number): string {
    const frontCars = train.cars.slice(0, splitIndex);
    const rearCars = train.cars.slice(splitIndex);

    logger.info(`Splitting train ${train.id} at index ${splitIndex}: ` +
      `${frontCars.length} front cars, ${rearCars.length} rear cars`);

    // Create new train for the rear portion
    const newTrain: Train = {
      id: `train_${this.nextTrainId++}`,
      cars: rearCars,
      desiredSpeed: 0,
      currentSpeed: 0,
      generatorId: train.generatorId,
      routesTaken: new Map(),
      travelDirection: train.travelDirection,
      coupling: false,
      couplingSpeed: COUPLING_SPEED,
    };

    // Update original train to only have front cars
    train.cars = frontCars;

    // Both trains are stopped
    train.currentSpeed = 0;
    train.desiredSpeed = 0;

    // Release all locks and re-acquire for both trains
    this.lockManager.releaseAllLocks(train.id);
    this.lockManager.acquireLeadingLocks(
      train,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );
    this.lockManager.acquireLeadingLocks(
      newTrain,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );

    this.trains.push(newTrain);
    logger.info(`Created new train ${newTrain.id} from split`);
    return newTrain.id;
  }

  /**
   * Check if a junction (switch) is locked by any train
   * Used to prevent switch changes while a train is in the junction
   */
  isJunctionLocked(routeKey: string): boolean {
    return this.lockManager.isJunctionLocked(routeKey);
  }

  /**
   * Find the next virtual switch ahead of a train's lead car.
   * Walks forward along the track and returns info about the first switch
   * (connection point with multiple route options in the travel direction).
   */
  findNextSwitch(trainId: string): NextSwitchInfo | null {
    const train = this.trains.find(t => t.id === trainId);
    if (!train) return null;

    const leadCar = getLeadCar(train);
    const piece = this.layout.pieces.find(p => p.id === leadCar.currentPieceId);
    if (!piece) return null;

    const travelDirection = train.travelDirection;

    // Start from current piece
    let currentPieceId = leadCar.currentPieceId;
    let currentPiece = piece;
    let exitPoint = travelDirection === 'forward' ? 'out' : 'in';

    // Handle crossings — determine which track we're on
    const archetype = getArchetype(piece.archetypeCode);
    if (archetype && (archetype.code === 'x90' || archetype.code === 'x45')) {
      if (leadCar.entryPoint === 'in1' || leadCar.entryPoint === 'out1') {
        exitPoint = travelDirection === 'forward' ? 'out1' : 'in1';
      } else if (leadCar.entryPoint === 'in2' || leadCar.entryPoint === 'out2') {
        exitPoint = travelDirection === 'forward' ? 'out2' : 'in2';
      }
    }

    let previousPieceId: string | undefined = undefined;

    for (let step = 0; step < 50; step++) {
      // Get all connections at exit point
      const allConnections = currentPiece.connections.get(exitPoint);
      if (!allConnections || allConnections.length === 0) {
        return null; // Dead end
      }

      // Filter out the previous piece
      const validConnections = allConnections.filter(c => c.pieceId !== previousPieceId);
      if (validConnections.length === 0) return null;

      // Separate by direction type
      const forwardConnections = validConnections.filter(c => isInPoint(c.pointName));
      const backwardConnections = validConnections.filter(c => isOutPoint(c.pointName));

      let connections: typeof validConnections;
      let switchDirection: 'fwd' | 'bwd';

      if (travelDirection === 'backward') {
        if (backwardConnections.length > 0) {
          connections = backwardConnections;
          switchDirection = 'bwd';
        } else {
          connections = forwardConnections;
          switchDirection = 'fwd';
        }
      } else {
        if (forwardConnections.length > 0) {
          connections = forwardConnections;
          switchDirection = 'fwd';
        } else {
          connections = backwardConnections;
          switchDirection = 'bwd';
        }
      }

      if (connections.length === 0) {
        connections = validConnections;
        switchDirection = 'fwd';
      }

      if (connections.length > 1) {
        // This is a switch! Compute route key and spatial ordering.
        const junctionPoints = allConnections.map(c => `${c.pieceId}.${c.pointName}`);
        junctionPoints.push(`${currentPieceId}.${exitPoint}`);
        junctionPoints.sort();
        const canonicalJunctionId = junctionPoints[0];
        const routeKey = `junction.${canonicalJunctionId}.${switchDirection}`;

        // Compute spatial ordering using cross product
        const options = this.computeSpatialLabels(currentPiece, exitPoint, connections);

        // Check if train has an override set
        let currentOverride: number | undefined;
        if (train.routesTaken.has(routeKey)) {
          currentOverride = train.routesTaken.get(routeKey)!;
        }

        return { routeKey, options, currentOverride };
      }

      // Single connection — follow it to next piece
      const nextConn = connections[0];
      const nextPiece = this.layout.pieces.find(p => p.id === nextConn.pieceId);
      if (!nextPiece) return null;

      previousPieceId = currentPieceId;
      currentPieceId = nextConn.pieceId;
      currentPiece = nextPiece;

      // Determine exit point for next piece
      const nextArchetype = getArchetype(nextPiece.archetypeCode);
      if (nextArchetype && (nextArchetype.code === 'x90' || nextArchetype.code === 'x45')) {
        if (nextConn.pointName === 'in1') exitPoint = 'out1';
        else if (nextConn.pointName === 'out1') exitPoint = 'in1';
        else if (nextConn.pointName === 'in2') exitPoint = 'out2';
        else exitPoint = 'in2';
      } else {
        exitPoint = getOppositePoint(nextConn.pointName);
      }
    }

    return null; // Exceeded search limit
  }

  /**
   * Compute spatial labels (Left/Right/Center) for switch connections.
   * Classifies each connected piece as effectively left, straight, or right
   * based on its archetype code and which connection point joins the switch.
   */
  private computeSpatialLabels(
    _switchPiece: TrackPiece,
    _exitPointName: string,
    connections: { pieceId: string; pointName: string }[]
  ): { index: number; label: string }[] {
    // For each connection, classify as left/straight/right based on archetype
    const scored: { index: number; group: number; radiusKey: number }[] = [];
    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      const connPiece = this.layout.pieces.find(p => p.id === conn.pieceId);
      if (!connPiece) {
        scored.push({ index: i, group: 1, radiusKey: 0 });
        continue;
      }

      const code = connPiece.archetypeCode.toLowerCase();
      const match = code.match(/^crv([lr])(\d+)?$/);
      if (!match) {
        // Straight or unrecognized piece — center group
        scored.push({ index: i, group: 1, radiusKey: 0 });
        continue;
      }

      const physicalDir = match[1]; // 'l' or 'r'
      const radius = match[2] ? parseInt(match[2], 10) : 22;
      const isInPoint = conn.pointName.startsWith('in');

      // Determine effective direction:
      // Connected at 'in' point = normal traversal, connected at 'out' = reversed
      let effectivelyLeft: boolean;
      if (isInPoint) {
        effectivelyLeft = physicalDir === 'l';
      } else {
        effectivelyLeft = physicalDir === 'r'; // reversed: right becomes left
      }

      if (effectivelyLeft) {
        // Group 0 = left, radius ascending (tightest curve = leftmost)
        scored.push({ index: i, group: 0, radiusKey: radius });
      } else {
        // Group 2 = right, -radius so ascending sort = descending radius
        scored.push({ index: i, group: 2, radiusKey: -radius });
      }
    }

    // Sort by (group ascending, radiusKey ascending)
    scored.sort((a, b) => a.group - b.group || a.radiusKey - b.radiusKey);

    // Assign labels
    const n = scored.length;
    const labeled: { index: number; label: string }[] = [];
    for (let i = 0; i < n; i++) {
      let label: string;
      if (n === 2) {
        label = i === 0 ? 'Left' : 'Right';
      } else if (n === 3) {
        label = i === 0 ? 'Left' : i === 1 ? 'Center' : 'Right';
      } else {
        // 4+: Left, 2, 3, ..., Right
        if (i === 0) label = 'Left';
        else if (i === n - 1) label = 'Right';
        else label = String(i + 1);
      }
      labeled.push({ index: scored[i].index, label });
    }

    return labeled;
  }

  /**
   * Set a switch override for a train at a specific route key.
   * Pre-sets the route in train.routesTaken so the first car uses this route.
   */
  setTrainSwitchOverride(trainId: string, routeKey: string, index: number): void {
    const train = this.trains.find(t => t.id === trainId);
    if (!train) return;
    train.routesTaken.set(routeKey, index);
  }

  /**
   * Clear a switch override for a train at a specific route key.
   * Removes the entry from train.routesTaken, restoring normal switch logic.
   */
  clearTrainSwitchOverride(trainId: string, routeKey: string): void {
    const train = this.trains.find(t => t.id === trainId);
    if (!train) return;
    train.routesTaken.delete(routeKey);
  }
}
