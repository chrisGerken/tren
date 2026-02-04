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
} from './train-movement';
import { getRandomCarColor, resetCarColorTracking } from '../renderer/train-renderer';
import { LockManager } from './lock-manager';

// Default train speed in inches per second
const DEFAULT_SPEED = 12;

// Speed adjustment constants
const ACCELERATION = 6;              // Speed increase per second (inches/sec²)
const EMERGENCY_BRAKING = 24;        // Hard braking (inches/sec²)

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

// Debug logging
const DEBUG_LOGGING = false;

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
    if (DEBUG_LOGGING) console.log('Simulation started');
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
    if (DEBUG_LOGGING) console.log('Simulation stopped');
  }

  /**
   * Get all currently locked connection point IDs
   */
  getLockedPoints(): Set<string> {
    const locked = new Set(this.lockManager.getAllLockedPoints().keys());
    if (locked.size > 0 && DEBUG_LOGGING) {
      console.log('Locked points:', Array.from(locked));
    }
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
    if (DEBUG_LOGGING) console.log('Simulation reset');
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
      if (DEBUG_LOGGING) console.log(`Generator ${pieceId} toggled: ${piece.genConfig.enabled}`);
    }
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
        // Get cached frequency or resolve a new one (for range support)
        let frequency = this.resolvedFrequencies.get(piece.id);
        if (frequency === undefined) {
          frequency = resolveIntegerValue(config.frequency, 10);
          this.resolvedFrequencies.set(piece.id, frequency);
        }
        if (timeSinceLastSpawn >= frequency) {
          // Timer fires: always reset timer, but only spawn if under max trains
          this.spawnTrain(piece);
          config.lastSpawnTime = this.simulationTime;
          // Resolve a new frequency for the next spawn interval
          this.resolvedFrequencies.set(piece.id, resolveIntegerValue(config.frequency, 10));
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
      if (DEBUG_LOGGING) {
        console.log(`Cannot spawn train - at max trains limit (${this.layout.maxTrains})`);
      }
      return false;
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
    };

    // Generator has an internal section - cars spawn inside it
    const genSectionLength = getSectionLength(generatorPiece, 0);
    if (genSectionLength === 0) {
      if (DEBUG_LOGGING) console.log(`Generator ${generatorPiece.id} has no internal section`);
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
      };
      train.cars.push(car);
      currentDistance -= CAB_LENGTH / 2 + CAR_GAP; // Move from center to back edge + gap
    }

    // Create cars (behind cabs) with randomly assigned colors
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
        color: getRandomCarColor(),  // Assign color once at creation
      };
      train.cars.push(car);
      currentDistance -= CAR_LENGTH / 2 + CAR_GAP; // Move from center to back edge + gap
    }

    // Update world positions
    for (const car of train.cars) {
      updateCarWorldPosition(car, this.layout);
    }

    // Try to acquire initial locks before spawning
    const lockResult = this.lockManager.acquireLeadingLocks(
      train,
      this.layout,
      this.selectedRoutes,
      this.simulationTime
    );

    if (!lockResult.success) {
      // Track ahead is blocked - don't spawn yet
      if (DEBUG_LOGGING) {
        console.log(`Cannot spawn train - blocked at ${lockResult.blocked} by ${lockResult.blockingTrainId}`);
      }
      return false;
    }

    this.trains.push(train);
    if (DEBUG_LOGGING) console.log(`Spawned train ${train.id} with ${train.cars.length} cars`);
    return true;
  }

  /**
   * Update all trains
   */
  private updateTrains(deltaTime: number): void {
    for (const train of this.trains) {
      // Step 1: Try to acquire leading locks
      const lockResult = this.lockManager.acquireLeadingLocks(
        train,
        this.layout,
        this.selectedRoutes,
        this.simulationTime
      );

      // Step 2: Adjust speed based on lock acquisition
      if (!lockResult.success) {
        // Can't acquire locks - decelerate to stop
        train.currentSpeed = Math.max(0, train.currentSpeed - EMERGENCY_BRAKING * deltaTime);
      } else {
        // Locks acquired - accelerate toward desired speed
        if (train.currentSpeed < train.desiredSpeed) {
          train.currentSpeed = Math.min(
            train.desiredSpeed,
            train.currentSpeed + ACCELERATION * deltaTime
          );
        }
      }

      // Step 3: Move cars based on current speed
      const distance = train.currentSpeed * deltaTime;

      // Track routes used by the last car - these will be cleared after it passes
      const routesToClear = new Set<string>();

      // Move each car, passing the clear set only to the last car
      const lastCarIndex = train.cars.length - 1;
      for (let i = 0; i < train.cars.length; i++) {
        const isLastCar = i === lastCarIndex;
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
        if (DEBUG_LOGGING) console.log(`Cleared route memory: ${routeKey} for train ${train.id}`);
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
        if (DEBUG_LOGGING) console.log(`Removing train ${train.id} - all cars in bin`);
        return false; // Remove this train
      }
      return true; // Keep this train
    });
  }

  /**
   * Check if a junction (switch) is locked by any train
   * Used to prevent switch changes while a train is in the junction
   */
  isJunctionLocked(routeKey: string): boolean {
    return this.lockManager.isJunctionLocked(routeKey);
  }
}
