/**
 * Simulation Engine - manages train spawning, movement, and removal
 */

import { Car, Train, Layout, TrackPiece, vec3 } from './types';
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

// Default train speed in inches per second
const DEFAULT_SPEED = 12;

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
        if (timeSinceLastSpawn >= config.frequency) {
          this.spawnTrain(piece);
          config.lastSpawnTime = this.simulationTime;
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
    const train: Train = {
      id: `train_${this.nextTrainId++}`,
      cars: [],
      speed: config.speed ?? DEFAULT_SPEED,
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

    // Create cabs (front of train)
    // Position is car CENTER, so account for half-lengths when spacing
    for (let i = 0; i < config.cabCount; i++) {
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

    // Create cars (behind cabs)
    for (let i = 0; i < config.carCount; i++) {
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
      const distance = train.speed * deltaTime;

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
