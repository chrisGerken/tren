/**
 * Core type definitions for the Tren train simulator
 */

/** 3D vector (Y always 0 for 2D mode) */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Connection point definition from archetype */
export interface ConnectionPointDef {
  name: string;           // 'in', 'out', 'in1', etc.
  position: Vec3;         // Local coordinates
  direction: Vec3;        // Outward-pointing unit vector
  sectionIndices: number[]; // Which sections this point belongs to
}

/** Track section definition (traversable path) */
export interface TrackSectionDef {
  splinePoints: Vec3[];   // Control points for CatmullRomCurve3
}

/** Track archetype (template) */
export interface TrackArchetype {
  code: string;           // 'str9', 'crvl22', etc.
  aliases: string[];      // ['str'], ['crvl', 'crv'], etc.
  sections: TrackSectionDef[];
  connectionPoints: ConnectionPointDef[];
}

/** Connection to another piece */
export interface Connection {
  pieceId: string;
  pointName: string;
  isAutoConnect?: boolean;  // True if this was auto-detected rather than explicit
}

/** Internal connection point (not at piece endpoint) */
export interface InternalConnectionPoint {
  id: string;             // Unique ID shared between intersecting pieces (e.g., "cross_piece1_piece2")
  t: number;              // Position along spline (0-1), converted to distance for locking
  distance: number;       // Distance along section in inches (computed from t * sectionLength)
  worldPosition: Vec3;    // World coordinates of the point
}

/** Placed track piece instance */
export interface TrackPiece {
  id: string;
  archetypeCode: string;
  position: Vec3;         // World position
  rotation: number;       // Rotation in radians around Y axis
  label?: string;         // Optional label for references
  connections: Map<string, Connection[]>;  // Connection point name -> connected pieces
  genConfig?: GeneratorConfig;  // Generator configuration (only for 'gen' pieces)
  semaphoreConfig?: SemaphoreConfig;  // Semaphore configuration (only for 'sem' pieces)
  decouplerConfig?: DecouplerConfig;  // Decoupler configuration (only for 'dec' pieces)
  inTunnel?: boolean;     // True if piece is inside a tunnel (between tunnel pieces)
  internalConnectionPoints?: InternalConnectionPoint[];  // Connection points along the track (not at endpoints)
}

/** Layout (root container) */
export interface Layout {
  title?: string;        // Layout title for UI (default: "Simulador de Tren")
  description?: string;  // Layout description (concatenated from all description statements)
  lockAheadDistance?: number;  // Lock ahead distance in inches (default: 10)
  lockAheadCount?: number;     // Minimum connection points to lock (default: 2)
  randomSwitches?: boolean;  // If true, switches randomly change when trains pass
  maxTrains?: number;    // Maximum number of trains allowed on the layout at once
  logLevel?: string;     // Log level from DSL: 'debug', 'info', 'warn', 'error'
  treesEnabled?: boolean;       // Whether trees are enabled (default: false)
  treesClearance?: number;      // Min grid score for tree placement (default: 2)
  treesDensity?: number;        // Max trees per cell (default: 3)
  pieces: TrackPiece[];
}

// =============================================================================
// Train Simulation Types
// =============================================================================

/** Car type - cab (engine) or car (rolling stock) */
export type CarType = 'cab' | 'car';

/** Individual car in a train */
export interface Car {
  id: string;
  type: CarType;
  length: number;                  // Length in inches
  currentPieceId: string;          // Which track piece the car is on
  previousPieceId?: string;        // Previous piece (to avoid routing back)
  entryPoint?: string;             // Which connection point we entered via ('in' or 'out')
  distanceAlongSection: number;    // Distance from section start in inches
  visible: boolean;                // For gen/bin/tunnel transitions
  worldPosition: Vec3;             // Cached world position
  rotation: number;                // Rotation in radians (heading)
  color?: number;                  // Car color (hex, assigned at creation for non-cabs)
  facingForward: boolean;          // True if car faces same direction as original train travel
  sectionDirection: 1 | -1;       // 1 = traverse spline in→out, -1 = traverse out→in (flipped at same-polarity junctions)
}

/** Train consist (ordered list of cars) */
export interface Train {
  id: string;
  cars: Car[];                     // Ordered list: cars[0] is original front, cars[last] is original rear
  desiredSpeed: number;            // Target speed in inches per second
  currentSpeed: number;            // Actual speed (may be lower due to collision prevention)
  generatorId: string;             // Which generator spawned this train
  routesTaken: Map<string, number>; // Switch routes taken (pieceId.pointName -> connectionIndex)
  travelDirection: 'forward' | 'backward'; // Current direction of travel
  coupling: boolean;               // True when in coupling mode (moving to connect with another train)
  couplingSpeed: number;           // Speed during coupling (inches/sec, default 3)
}

/** Range value for randomized parameters */
export interface RangeValue {
  min: number;
  max: number;
}

/** Color mode for train cars */
export type ColorMode = 'colorful' | 'gray' | 'black';

/** Generator configuration (from DSL) */
export interface GeneratorConfig {
  cabCount: number | RangeValue;   // Number of cabs (default 1)
  carCount: number | RangeValue;   // Number of cars (default 5)
  speed?: number | RangeValue;     // Train speed in inches/second (default 12)
  frequency?: number | RangeValue; // Seconds between trains (undefined = one-shot)
  colorMode: ColorMode;            // Color mode for cars ('colorful' or 'gray', default 'gray')
  lastSpawnTime: number;           // Simulation time of last spawn
  enabled: boolean;                // Whether generator is active
}

/** Semaphore configuration - manual lock control point */
export interface SemaphoreConfig {
  locked: boolean;                 // True = red (blocked), false = green (open)
}

/** Decoupler configuration - splits a stopped train */
export interface DecouplerConfig {
  activated: boolean;              // True when decoupler has been triggered (briefly)
}

/** Helper to create a Vec3 */
export function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

/** Helper to create Vec3 for 2D (y=0) */
export function vec2(x: number, z: number): Vec3 {
  return { x, y: 0, z };
}

// =============================================================================
// Connection Point Locking Types
// =============================================================================

/** Connection point identifier: "pieceId.pointName" */
export type ConnectionPointId = string;

/** Lock held on a connection point */
export interface ConnectionPointLock {
  trainId: string;
  acquiredAt: number;  // simulation time
}

/** Per-train lock tracking */
export interface TrainLockState {
  heldLocks: Set<ConnectionPointId>;
}
