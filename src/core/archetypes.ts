/**
 * Track archetype definitions
 * Based on docs/track-dimensions.md
 */

import { TrackArchetype, vec2, Vec3 } from './types';

// Re-export TrackArchetype for convenience
export type { TrackArchetype };

/**
 * Generate points along a circular arc for left curves
 * @param radius - curve radius in inches
 * @param arcDegrees - arc angle in degrees
 * @param numPoints - number of points to generate
 */
function leftArcPoints(radius: number, arcDegrees: number, numPoints: number): Vec3[] {
  const points: Vec3[] = [];
  const arcRadians = (arcDegrees * Math.PI) / 180;

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const angle = t * arcRadians;
    points.push(vec2(
      radius * Math.sin(angle),
      radius * (1 - Math.cos(angle))
    ));
  }
  return points;
}

/**
 * Generate points along a circular arc for right curves (mirror of left)
 */
function rightArcPoints(radius: number, arcDegrees: number, numPoints: number): Vec3[] {
  const points = leftArcPoints(radius, arcDegrees, numPoints);
  return points.map(p => vec2(p.x, -p.z));
}

/**
 * Calculate the end direction for a left curve
 */
function leftEndDirection(arcDegrees: number): Vec3 {
  const arcRadians = (arcDegrees * Math.PI) / 180;
  return vec2(Math.cos(arcRadians), Math.sin(arcRadians));
}

/**
 * Calculate the end direction for a right curve
 */
function rightEndDirection(arcDegrees: number): Vec3 {
  const arcRadians = (arcDegrees * Math.PI) / 180;
  return vec2(Math.cos(arcRadians), -Math.sin(arcRadians));
}

/** All track archetypes */
const archetypes: TrackArchetype[] = [
  // Placeholder - zero-length junction point
  {
    code: 'ph',
    aliases: ['placeholder'],
    sections: [],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [] },
      { name: 'out', position: vec2(0, 0), direction: vec2(1, 0), sectionIndices: [] },
    ],
  },

  // Straight 9" (default)
  {
    code: 'str9',
    aliases: ['str'],
    sections: [
      { splinePoints: [vec2(0, 0), vec2(9, 0)] },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: vec2(9, 0), direction: vec2(1, 0), sectionIndices: [0] },
    ],
  },

  // Straight 6"
  {
    code: 'str6',
    aliases: [],
    sections: [
      { splinePoints: [vec2(0, 0), vec2(6, 0)] },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: vec2(6, 0), direction: vec2(1, 0), sectionIndices: [0] },
    ],
  },

  // Straight 3"
  {
    code: 'str3',
    aliases: [],
    sections: [
      { splinePoints: [vec2(0, 0), vec2(3, 0)] },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: vec2(3, 0), direction: vec2(1, 0), sectionIndices: [0] },
    ],
  },

  // Straight 1.5"
  {
    code: 'str15',
    aliases: [],
    sections: [
      { splinePoints: [vec2(0, 0), vec2(1.5, 0)] },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: vec2(1.5, 0), direction: vec2(1, 0), sectionIndices: [0] },
    ],
  },

  // Curve Left 18" radius
  {
    code: 'crvl18',
    aliases: [],
    sections: [
      { splinePoints: leftArcPoints(18, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: leftArcPoints(18, 22.5, 7)[6], direction: leftEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Curve Left 22" radius (default)
  {
    code: 'crvl22',
    aliases: ['crvl', 'crv'],
    sections: [
      { splinePoints: leftArcPoints(22, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: leftArcPoints(22, 22.5, 7)[6], direction: leftEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Curve Left 24" radius
  {
    code: 'crvl24',
    aliases: [],
    sections: [
      { splinePoints: leftArcPoints(24, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: leftArcPoints(24, 22.5, 7)[6], direction: leftEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Curve Right 18" radius
  {
    code: 'crvr18',
    aliases: [],
    sections: [
      { splinePoints: rightArcPoints(18, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: rightArcPoints(18, 22.5, 7)[6], direction: rightEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Curve Right 22" radius (default)
  {
    code: 'crvr22',
    aliases: ['crvr'],
    sections: [
      { splinePoints: rightArcPoints(22, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: rightArcPoints(22, 22.5, 7)[6], direction: rightEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Curve Right 24" radius
  {
    code: 'crvr24',
    aliases: [],
    sections: [
      { splinePoints: rightArcPoints(24, 22.5, 7) },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out', position: rightArcPoints(24, 22.5, 7)[6], direction: rightEndDirection(22.5), sectionIndices: [0] },
    ],
  },

  // Bumper / Buffer Stop
  {
    code: 'bump',
    aliases: ['bumper'],
    sections: [
      { splinePoints: [vec2(0, 0), vec2(3, 0)] },
    ],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
    ],
  },

  // Generator (train source)
  {
    code: 'gen',
    aliases: ['generator'],
    sections: [],  // Internal section, not rendered as track
    connectionPoints: [
      { name: 'out', position: vec2(0, 0), direction: vec2(1, 0), sectionIndices: [] },
    ],
  },

  // Bin (train sink)
  {
    code: 'bin',
    aliases: [],
    sections: [],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [] },
    ],
  },

  // Tunnel (visibility toggle)
  {
    code: 'tun',
    aliases: ['tunnel'],
    sections: [],
    connectionPoints: [
      { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [] },
      { name: 'out', position: vec2(0, 0), direction: vec2(1, 0), sectionIndices: [] },
    ],
  },

  // 90° Crossing
  {
    code: 'x90',
    aliases: [],
    sections: [
      { splinePoints: [vec2(-3, 0), vec2(3, 0)] },
      { splinePoints: [vec2(0, -3), vec2(0, 3)] },
    ],
    connectionPoints: [
      { name: 'in1', position: vec2(-3, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out1', position: vec2(3, 0), direction: vec2(1, 0), sectionIndices: [0] },
      { name: 'in2', position: vec2(0, -3), direction: vec2(0, -1), sectionIndices: [1] },
      { name: 'out2', position: vec2(0, 3), direction: vec2(0, 1), sectionIndices: [1] },
    ],
  },

  // 45° Crossing
  {
    code: 'x45',
    aliases: [],
    sections: [
      { splinePoints: [vec2(-3, 0), vec2(3, 0)] },
      { splinePoints: [vec2(-2.12, -2.12), vec2(2.12, 2.12)] },
    ],
    connectionPoints: [
      { name: 'in1', position: vec2(-3, 0), direction: vec2(-1, 0), sectionIndices: [0] },
      { name: 'out1', position: vec2(3, 0), direction: vec2(1, 0), sectionIndices: [0] },
      { name: 'in2', position: vec2(-2.12, -2.12), direction: vec2(-0.707, -0.707), sectionIndices: [1] },
      { name: 'out2', position: vec2(2.12, 2.12), direction: vec2(0.707, 0.707), sectionIndices: [1] },
    ],
  },
];

/** Build lookup maps for fast access */
const archetypeByCode = new Map<string, TrackArchetype>();
const archetypeByAlias = new Map<string, TrackArchetype>();

for (const archetype of archetypes) {
  archetypeByCode.set(archetype.code, archetype);
  for (const alias of archetype.aliases) {
    archetypeByAlias.set(alias, archetype);
  }
}

/** Runtime archetype registry for dynamically created archetypes (e.g., from splice) */
const runtimeArchetypes = new Map<string, TrackArchetype>();

/**
 * Register a dynamically created archetype at runtime
 */
export function registerRuntimeArchetype(archetype: TrackArchetype): void {
  runtimeArchetypes.set(archetype.code, archetype);
}

/**
 * Clear all runtime archetypes (useful for tests or reloading layouts)
 */
export function clearRuntimeArchetypes(): void {
  runtimeArchetypes.clear();
}

/**
 * Get an archetype by code or alias
 * Checks runtime archetypes first, then static archetypes
 * @throws Error if archetype not found
 */
export function getArchetype(codeOrAlias: string): TrackArchetype {
  // Check runtime archetypes first (for dynamically created ones like splice results)
  const runtime = runtimeArchetypes.get(codeOrAlias);
  if (runtime) return runtime;

  const archetype = archetypeByCode.get(codeOrAlias) || archetypeByAlias.get(codeOrAlias);
  if (!archetype) {
    throw new Error(`Unknown track archetype: ${codeOrAlias}`);
  }
  return archetype;
}

/**
 * Check if a code or alias is a valid archetype
 */
export function isValidArchetype(codeOrAlias: string): boolean {
  return archetypeByCode.has(codeOrAlias) || archetypeByAlias.has(codeOrAlias);
}

/**
 * Get all archetype codes (not aliases)
 */
export function getAllArchetypeCodes(): string[] {
  return Array.from(archetypeByCode.keys());
}
