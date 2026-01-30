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
}

/** Layout (root container) */
export interface Layout {
  pieces: TrackPiece[];
}

/** Helper to create a Vec3 */
export function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

/** Helper to create Vec3 for 2D (y=0) */
export function vec2(x: number, z: number): Vec3 {
  return { x, y: 0, z };
}
