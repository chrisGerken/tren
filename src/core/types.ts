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

/** Placed track piece instance */
export interface TrackPiece {
  id: string;
  archetypeCode: string;
  position: Vec3;         // World position
  rotation: number;       // Rotation in radians around Y axis
  label?: string;         // Optional label for references
  connections: Map<string, Connection[]>;  // Connection point name -> connected pieces
  genConfig?: GeneratorConfig;  // Generator configuration (only for 'gen' pieces)
}

/** Layout (root container) */
export interface Layout {
  title?: string;        // Layout title for UI (default: "Simulador de Tren")
  description?: string;  // Layout description (concatenated from all description statements)
  minGap?: number;       // Minimum following distance between trains (default: 1 inch)
  randomSwitches?: boolean;  // If true, switches randomly change when trains pass
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
}

/** Train consist (ordered list of cars) */
export interface Train {
  id: string;
  cars: Car[];                     // First car is the head
  desiredSpeed: number;            // Target speed in inches per second
  currentSpeed: number;            // Actual speed (may be lower due to collision prevention)
  generatorId: string;             // Which generator spawned this train
  routesTaken: Map<string, number>; // Switch routes taken (pieceId.pointName -> connectionIndex)
}

/** Range value for randomized parameters */
export interface RangeValue {
  min: number;
  max: number;
}

/** Generator configuration (from DSL) */
export interface GeneratorConfig {
  cabCount: number | RangeValue;   // Number of cabs (default 1)
  carCount: number | RangeValue;   // Number of cars (default 5)
  speed?: number | RangeValue;     // Train speed in inches/second (default 12)
  frequency?: number | RangeValue; // Seconds between trains (undefined = one-shot)
  lastSpawnTime: number;           // Simulation time of last spawn
  enabled: boolean;                // Whether generator is active
}

/** Helper to create a Vec3 */
export function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

/** Helper to create Vec3 for 2D (y=0) */
export function vec2(x: number, z: number): Vec3 {
  return { x, y: 0, z };
}
