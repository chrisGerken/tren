/**
 * Simulation Engine - manages train spawning, movement, and removal
 */

import { Car, Train, Layout, TrackPiece, vec3, RangeValue } from './types';
import { getArchetype } from './archetypes';
import {
  moveTrain,
  moveCar,
  updateCarWorldPosition,
  CAB_LENGTH,
  CAR_LENGTH,
  CAR_GAP,
  getSectionLength,
} from './train-movement';
import { getRandomCarColor, resetCarColorTracking } from '../renderer/train-renderer';

// Default train speed in inches per second
const DEFAULT_SPEED = 12;

// Collision prevention constants
const LOOK_AHEAD_DISTANCE = 48;      // How far ahead to scan (inches)
const DEFAULT_MIN_GAP = 1;           // Default minimum gap between trains (inches)
const ACCELERATION = 6;              // Speed increase per second (inches/sec²)
const NORMAL_BRAKING = 12;           // Normal deceleration (inches/sec²)
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

  constructor(
    layout: Layout,
    selectedRoutes: Map<string, number>,
    onUpdate: () => void
  ) {
    this.layout = layout;
    this.selectedRoutes = selectedRoutes;
    this.onUpdate = onUpdate;
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
   * Reset the simulation - clear all trains
   */
  reset(): void {
    this.trains = [];
    this.simulationTime = 0;
    this.resolvedFrequencies.clear();
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
          this.spawnTrain(piece);
          config.lastSpawnTime = this.simulationTime;
          // Resolve a new frequency for the next spawn interval
          this.resolvedFrequencies.set(piece.id, resolveIntegerValue(config.frequency, 10));
        }
      }
    }
  }

  /**
   * Spawn a new train at a generator
   * Cars spawn inside the generator's internal track section and move forward to exit
   */
  private spawnTrain(generatorPiece: TrackPiece): void {
    if (!generatorPiece.genConfig) return;

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
      return;
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

    this.trains.push(train);
    if (DEBUG_LOGGING) console.log(`Spawned train ${train.id} with ${train.cars.length} cars`);
  }

  /**
   * Update all trains
   */
  private updateTrains(deltaTime: number): void {
    for (const train of this.trains) {
      // Step 1: Adjust speed based on collision prevention
      this.adjustTrainSpeed(train, deltaTime);

      // Step 2: Move cars based on current speed
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

      // Update visibility for each car
      for (const car of train.cars) {
        this.updateCarVisibility(car);
      }
    }
  }

  /**
   * Get the minimum following gap for this layout
   */
  private getMinGap(): number {
    return this.layout.minGap ?? DEFAULT_MIN_GAP;
  }

  /**
   * Adjust train speed based on collision prevention
   */
  private adjustTrainSpeed(train: Train, deltaTime: number): void {
    // Find distance to train ahead
    const distanceToObstacle = this.findDistanceToTrainAhead(train);
    const minGap = this.getMinGap();

    if (distanceToObstacle === null || distanceToObstacle > LOOK_AHEAD_DISTANCE) {
      // No obstacle or very far away - accelerate toward desired speed
      if (train.currentSpeed < train.desiredSpeed) {
        train.currentSpeed = Math.min(
          train.desiredSpeed,
          train.currentSpeed + ACCELERATION * deltaTime
        );
      } else if (train.currentSpeed > train.desiredSpeed) {
        // Slow down if somehow going faster than desired
        train.currentSpeed = Math.max(
          train.desiredSpeed,
          train.currentSpeed - NORMAL_BRAKING * deltaTime
        );
      }
    } else {
      // Obstacle detected - calculate safe speed
      const safeSpeed = this.calculateSafeSpeed(distanceToObstacle, train.desiredSpeed);

      if (train.currentSpeed > safeSpeed) {
        // Need to slow down
        const brakingRate = distanceToObstacle < minGap * 2
          ? EMERGENCY_BRAKING
          : NORMAL_BRAKING;
        train.currentSpeed = Math.max(
          safeSpeed,
          train.currentSpeed - brakingRate * deltaTime
        );
      } else if (train.currentSpeed < safeSpeed && train.currentSpeed < train.desiredSpeed) {
        // Can speed up (obstacle is moving or far enough)
        train.currentSpeed = Math.min(
          Math.min(safeSpeed, train.desiredSpeed),
          train.currentSpeed + ACCELERATION * deltaTime
        );
      }
    }

    // Ensure speed doesn't go negative
    if (train.currentSpeed < 0) {
      train.currentSpeed = 0;
    }
  }

  /**
   * Calculate safe speed based on distance to obstacle
   */
  private calculateSafeSpeed(distance: number, desiredSpeed: number): number {
    const minGap = this.getMinGap();
    if (distance <= minGap) {
      return 0; // Must stop
    }

    // Linear interpolation: full speed at LOOK_AHEAD_DISTANCE, stop at minGap
    const ratio = (distance - minGap) / (LOOK_AHEAD_DISTANCE - minGap);
    return desiredSpeed * Math.min(1, ratio);
  }

  /**
   * Find the distance to the nearest train ahead along the track
   * Returns null if no train is found within look-ahead distance
   */
  private findDistanceToTrainAhead(train: Train): number | null {
    if (train.cars.length === 0) return null;

    const leadCar = train.cars[0];

    // Check all other trains for their rear-most car position
    let minDistance: number | null = null;

    for (const otherTrain of this.trains) {
      if (otherTrain.id === train.id) continue;
      if (otherTrain.cars.length === 0) continue;

      // Find distance to each car of the other train
      for (const otherCar of otherTrain.cars) {
        const distance = this.calculateTrackDistance(leadCar, otherCar, train);
        if (distance !== null && distance > 0) {
          // Subtract half the other car's length to get distance to its rear
          const distanceToRear = distance - otherCar.length / 2 - leadCar.length / 2;
          if (distanceToRear > 0 && (minDistance === null || distanceToRear < minDistance)) {
            minDistance = distanceToRear;
          }
        }
      }
    }

    return minDistance;
  }

  /**
   * Calculate track distance from one car to another (positive if target is ahead)
   * Returns null if cars are not on the same route or target is not ahead
   */
  private calculateTrackDistance(fromCar: Car, toCar: Car, train: Train): number | null {
    // Simple case: same piece
    if (fromCar.currentPieceId === toCar.currentPieceId) {
      const distance = toCar.distanceAlongSection - fromCar.distanceAlongSection;
      return distance > 0 ? distance : null;
    }

    // Different pieces - trace forward from fromCar to find toCar
    let totalDistance = 0;
    let currentPieceId = fromCar.currentPieceId;
    let distanceInCurrentPiece = fromCar.distanceAlongSection;

    // Trace forward through connected pieces
    for (let steps = 0; steps < 20; steps++) {  // Limit search depth
      const piece = this.layout.pieces.find(p => p.id === currentPieceId);
      if (!piece) break;

      const sectionLength = getSectionLength(piece, 0);

      // Check if toCar is on this piece
      if (toCar.currentPieceId === currentPieceId) {
        const distanceOnThisPiece = toCar.distanceAlongSection - distanceInCurrentPiece;
        if (distanceOnThisPiece > 0) {
          return totalDistance + distanceOnThisPiece;
        }
        return null; // Target is behind us on this piece
      }

      // Add remaining distance on current piece
      totalDistance += sectionLength - distanceInCurrentPiece;

      if (totalDistance > LOOK_AHEAD_DISTANCE) {
        return null; // Too far ahead, stop searching
      }

      // Move to next piece (following train's route selections)
      const nextSection = this.getNextPieceForLookAhead(currentPieceId, train);
      if (!nextSection) break;

      currentPieceId = nextSection.pieceId;
      distanceInCurrentPiece = 0; // Start at beginning of next piece
    }

    return null; // Target not found on route ahead
  }

  /**
   * Get the next piece when looking ahead (respects train's route memory and current switch settings)
   */
  private getNextPieceForLookAhead(pieceId: string, train: Train): { pieceId: string } | null {
    const piece = this.layout.pieces.find(p => p.id === pieceId);
    if (!piece) return null;

    const connections = piece.connections.get('out');
    if (!connections || connections.length === 0) {
      return null;
    }

    if (connections.length === 1) {
      return { pieceId: connections[0].pieceId };
    }

    // Multiple connections - check train's route memory first, then current switch setting
    // Build the canonical junction ID (same logic as in train-movement.ts)
    // Use piece.point pairs to distinguish different connection points on same piece
    const junctionPoints = connections.map(c => `${c.pieceId}.${c.pointName}`);
    junctionPoints.push(`${pieceId}.out`);
    junctionPoints.sort();
    const canonicalJunctionId = junctionPoints[0];
    const routeKey = `junction.${canonicalJunctionId}.fwd`;

    let selectedIndex: number;
    if (train.routesTaken.has(routeKey)) {
      selectedIndex = train.routesTaken.get(routeKey)!;
    } else {
      selectedIndex = this.selectedRoutes.get(routeKey) ?? 0;
    }

    const connection = connections[Math.min(selectedIndex, connections.length - 1)];
    return { pieceId: connection.pieceId };
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
        if (DEBUG_LOGGING) console.log(`Removing train ${train.id} - all cars in bin`);
        return false; // Remove this train
      }
      return true; // Keep this train
    });
  }
}
