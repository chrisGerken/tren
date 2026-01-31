/**
 * Simulation Engine - manages train spawning, movement, and removal
 */

import { Car, Train, Layout, TrackPiece, vec3 } from './types';
import { getArchetype } from './archetypes';
import {
  moveTrain,
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
   */
  private spawnTrain(generatorPiece: TrackPiece): void {
    if (!generatorPiece.genConfig) return;

    const config = generatorPiece.genConfig;
    const train: Train = {
      id: `train_${this.nextTrainId++}`,
      cars: [],
      speed: DEFAULT_SPEED,
      generatorId: generatorPiece.id,
    };

    // Find the first connected piece (where trains will emerge)
    const connections = generatorPiece.connections.get('out');
    if (!connections || connections.length === 0) {
      if (DEBUG_LOGGING) console.log(`Generator ${generatorPiece.id} has no output connection`);
      return;
    }

    const firstConnection = connections[0];
    const startPieceId = firstConnection.pieceId;
    const startPiece = this.layout.pieces.find(p => p.id === startPieceId);
    if (!startPiece) return;

    // Calculate starting position
    // Cars start behind the generator (negative distance) and emerge as they move forward
    const sectionLength = getSectionLength(startPiece, 0);
    let currentDistance = 0;

    // Determine if we enter via 'in' or 'out'
    const entersViaIn = firstConnection.pointName === 'in';

    // Create cabs
    for (let i = 0; i < config.cabCount; i++) {
      const car = this.createCar('cab', startPieceId, currentDistance, entersViaIn, sectionLength);
      train.cars.push(car);
      currentDistance -= (CAB_LENGTH + CAR_GAP);
    }

    // Create cars
    for (let i = 0; i < config.carCount; i++) {
      const car = this.createCar('car', startPieceId, currentDistance, entersViaIn, sectionLength);
      train.cars.push(car);
      currentDistance -= (CAR_LENGTH + CAR_GAP);
    }

    // Update world positions
    for (const car of train.cars) {
      updateCarWorldPosition(car, this.layout);
      // All cars start invisible (inside generator)
      car.visible = false;
    }

    this.trains.push(train);
    if (DEBUG_LOGGING) console.log(`Spawned train ${train.id} with ${train.cars.length} cars`);
  }

  /**
   * Create a single car
   */
  private createCar(
    type: 'cab' | 'car',
    pieceId: string,
    distance: number,
    entersViaIn: boolean,
    sectionLength: number
  ): Car {
    // If entering via 'out', we need to flip the starting position
    let actualDistance = distance;
    if (!entersViaIn) {
      actualDistance = sectionLength + distance;
    }

    return {
      id: `car_${this.nextCarId++}`,
      type,
      length: type === 'cab' ? CAB_LENGTH : CAR_LENGTH,
      currentPieceId: pieceId,
      distanceAlongSection: actualDistance,
      visible: false,
      worldPosition: vec3(0, 0, 0),
      rotation: 0,
    };
  }

  /**
   * Update all trains
   */
  private updateTrains(deltaTime: number): void {
    for (const train of this.trains) {
      const distance = train.speed * deltaTime;
      moveTrain(train.cars, distance, this.layout, this.selectedRoutes);

      // Update visibility for each car
      for (const car of train.cars) {
        this.updateCarVisibility(car);
      }
    }
  }

  /**
   * Update car visibility based on current piece
   */
  private updateCarVisibility(car: Car): void {
    const piece = this.layout.pieces.find(p => p.id === car.currentPieceId);
    if (!piece) return;

    const archetype = getArchetype(piece.archetypeCode);
    if (!archetype) return;

    if (archetype.code === 'gen') {
      // Car is still at generator - keep hidden until it moves to next piece
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
