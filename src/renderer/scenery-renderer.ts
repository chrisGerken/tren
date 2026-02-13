/**
 * Scenery Renderer - grid-based distance scoring and tree placement
 *
 * Algorithm:
 * 1. Compute bounding box of track layout, expand by 30%
 * 2. Overlay a grid (cells ~4 inches wide) on the expanded area
 * 3. Sample all track splines, mark grid cells containing track as score 0
 * 4. BFS flood-fill: unscored cells adjacent to score-N cells get score N+1
 * 5. Place trees based on distance scores
 */

import * as THREE from 'three';
import { Layout, TrackPiece } from '../core/types';
import { getArchetype } from '../core/archetypes';
import { TrackScene } from './scene';

// Tree color palette (dark greens)
const TREE_COLORS = [0x2d5a1e, 0x336622, 0x3a6b2a];

// Shared materials (created lazily)
let treeMaterials: THREE.MeshBasicMaterial[] | null = null;

function getTreeMaterials(): THREE.MeshBasicMaterial[] {
  if (!treeMaterials) {
    treeMaterials = TREE_COLORS.map(
      color => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
  }
  return treeMaterials;
}

// Shared circle geometry (created lazily)
let sharedCircleGeometry: THREE.CircleGeometry | null = null;

function getCircleGeometry(): THREE.CircleGeometry {
  if (!sharedCircleGeometry) {
    sharedCircleGeometry = new THREE.CircleGeometry(1, 12);
  }
  return sharedCircleGeometry;
}

/** Grid cell size in inches */
const CELL_SIZE = 4;

/** How much to expand bounding box beyond tracks (fraction) */
const BOUNDS_EXPANSION = 0.30;

/** Default tree settings */
const DEFAULT_CLEARANCE = 2;
const DEFAULT_DENSITY = 3;

/**
 * Render scenery (trees) for a layout
 */
export function renderScenery(scene: TrackScene, layout: Layout): void {
  if (!layout.treesEnabled) return;

  const clearance = layout.treesClearance ?? DEFAULT_CLEARANCE;
  const density = layout.treesDensity ?? DEFAULT_DENSITY;

  // Compute track bounding box from pieces
  const bounds = computeTrackBounds(layout.pieces);
  if (!bounds) return;

  // Expand bounds by 30%
  const sizeX = bounds.maxX - bounds.minX;
  const sizeZ = bounds.maxZ - bounds.minZ;
  const expandX = sizeX * BOUNDS_EXPANSION;
  const expandZ = sizeZ * BOUNDS_EXPANSION;
  bounds.minX -= expandX;
  bounds.maxX += expandX;
  bounds.minZ -= expandZ;
  bounds.maxZ += expandZ;

  // Create grid
  const gridWidth = Math.max(1, Math.ceil((bounds.maxX - bounds.minX) / CELL_SIZE));
  const gridHeight = Math.max(1, Math.ceil((bounds.maxZ - bounds.minZ) / CELL_SIZE));

  // Initialize grid with -1 (unscored)
  const grid: number[][] = [];
  for (let row = 0; row < gridHeight; row++) {
    grid[row] = new Array(gridWidth).fill(-1);
  }

  // Mark track cells as score 0
  markTrackCells(grid, bounds, layout.pieces, gridWidth, gridHeight);

  // BFS flood-fill
  bfsFloodFill(grid, gridWidth, gridHeight);

  // Place trees
  const treesGroup = placeTrees(grid, bounds, gridWidth, gridHeight, clearance, density);

  scene.addSceneryGroup(treesGroup);
}

interface Bounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/**
 * Compute bounding box of track in world/screen coordinates (Z negated)
 */
function computeTrackBounds(pieces: TrackPiece[]): Bounds | null {
  if (pieces.length === 0) return null;

  let minX = Infinity, maxX = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (const piece of pieces) {
    const archetype = getArchetype(piece.archetypeCode);
    if (!archetype) continue;

    const cos = Math.cos(piece.rotation);
    const sin = Math.sin(piece.rotation);

    const toWorldScreen = (local: { x: number; z: number }) => ({
      x: piece.position.x + (local.x * cos - local.z * sin),
      z: -(piece.position.z + (local.x * sin + local.z * cos)),
    });

    // Check connection points
    for (const cp of archetype.connectionPoints) {
      const w = toWorldScreen(cp.position);
      minX = Math.min(minX, w.x);
      maxX = Math.max(maxX, w.x);
      minZ = Math.min(minZ, w.z);
      maxZ = Math.max(maxZ, w.z);
    }

    // Check spline points
    for (const section of archetype.sections) {
      for (const sp of section.splinePoints) {
        const w = toWorldScreen(sp);
        minX = Math.min(minX, w.x);
        maxX = Math.max(maxX, w.x);
        minZ = Math.min(minZ, w.z);
        maxZ = Math.max(maxZ, w.z);
      }
    }
  }

  if (!isFinite(minX)) return null;
  return { minX, maxX, minZ, maxZ };
}

/**
 * Convert world coordinates to grid cell indices
 */
function worldToGrid(
  wx: number,
  wz: number,
  bounds: Bounds,
  gridWidth: number,
  gridHeight: number
): { col: number; row: number } | null {
  const col = Math.floor((wx - bounds.minX) / CELL_SIZE);
  const row = Math.floor((wz - bounds.minZ) / CELL_SIZE);
  if (col < 0 || col >= gridWidth || row < 0 || row >= gridHeight) return null;
  return { col, row };
}

/**
 * Mark grid cells containing track as score 0
 * Samples splines at ~1-inch intervals for smooth coverage
 */
function markTrackCells(
  grid: number[][],
  bounds: Bounds,
  pieces: TrackPiece[],
  gridWidth: number,
  gridHeight: number
): void {
  for (const piece of pieces) {
    const archetype = getArchetype(piece.archetypeCode);
    if (!archetype) continue;

    const cos = Math.cos(piece.rotation);
    const sin = Math.sin(piece.rotation);

    const toWorldScreen = (local: { x: number; y: number; z: number }): THREE.Vector3 => {
      return new THREE.Vector3(
        piece.position.x + (local.x * cos - local.z * sin),
        local.y,
        -(piece.position.z + (local.x * sin + local.z * cos))
      );
    };

    for (const section of archetype.sections) {
      if (section.splinePoints.length < 2) continue;

      const worldPoints = section.splinePoints.map(p => toWorldScreen(p));
      const curve = new THREE.CatmullRomCurve3(worldPoints);
      const curveLength = curve.getLength();

      // Sample at ~1 inch intervals
      const numSamples = Math.max(2, Math.ceil(curveLength));
      for (let i = 0; i <= numSamples; i++) {
        const t = i / numSamples;
        const point = curve.getPointAt(t);
        const cell = worldToGrid(point.x, point.z, bounds, gridWidth, gridHeight);
        if (cell) {
          grid[cell.row][cell.col] = 0;
        }
      }
    }

    // Also mark connection point locations
    for (const cp of archetype.connectionPoints) {
      const w = toWorldScreen(cp.position);
      const cell = worldToGrid(w.x, w.z, bounds, gridWidth, gridHeight);
      if (cell) {
        grid[cell.row][cell.col] = 0;
      }
    }
  }
}

/**
 * BFS flood-fill: assign distance scores to all grid cells
 */
function bfsFloodFill(grid: number[][], gridWidth: number, gridHeight: number): void {
  const queue: [number, number][] = [];

  // Seed BFS with all score-0 cells
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      if (grid[row][col] === 0) {
        queue.push([row, col]);
      }
    }
  }

  // 4-directional BFS
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let head = 0;

  while (head < queue.length) {
    const [row, col] = queue[head++];
    const score = grid[row][col];

    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < gridHeight && nc >= 0 && nc < gridWidth && grid[nr][nc] === -1) {
        grid[nr][nc] = score + 1;
        queue.push([nr, nc]);
      }
    }
  }
}

/** Instance data collected during first pass */
interface CircleInstance {
  x: number;
  z: number;
  radius: number;
  materialIndex: number;
}

/**
 * Place trees using InstancedMesh for performance.
 * One InstancedMesh per material color = 3 draw calls total.
 */
function placeTrees(
  grid: number[][],
  bounds: Bounds,
  gridWidth: number,
  gridHeight: number,
  clearance: number,
  density: number
): THREE.Group {
  const group = new THREE.Group();
  const materials = getTreeMaterials();
  const baseGeometry = getCircleGeometry();

  // Seeded pseudo-random for deterministic placement
  let seed = 12345;
  const random = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // First pass: collect all circle instances
  const instances: CircleInstance[] = [];

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const score = grid[row][col];
      if (score < clearance) continue;

      const treeCount = Math.min(density, score - clearance + 1);

      for (let t = 0; t < treeCount; t++) {
        const wx = bounds.minX + (col + random()) * CELL_SIZE;
        const wz = bounds.minZ + (row + random()) * CELL_SIZE;

        const clusterSize = 3 + Math.floor(random() * 3); // 3-5 circles

        for (let c = 0; c < clusterSize; c++) {
          const materialIndex = Math.floor(random() * materials.length);
          const radius = 1 + random() * 2; // 1-3 inches
          const offsetX = (random() - 0.5) * 2;
          const offsetZ = (random() - 0.5) * 2;

          instances.push({
            x: wx + offsetX,
            z: wz + offsetZ,
            radius,
            materialIndex,
          });
        }
      }
    }
  }

  if (instances.length === 0) return group;

  // Second pass: bucket by material, build one InstancedMesh per color
  const buckets: CircleInstance[][] = materials.map(() => []);
  for (const inst of instances) {
    buckets[inst.materialIndex].push(inst);
  }

  // Rotation quaternion for laying circles flat (rotation.x = -PI/2)
  const flatQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );
  const matrix = new THREE.Matrix4();

  for (let mi = 0; mi < materials.length; mi++) {
    const bucket = buckets[mi];
    if (bucket.length === 0) continue;

    const instMesh = new THREE.InstancedMesh(baseGeometry, materials[mi], bucket.length);
    instMesh.frustumCulled = false; // Static scenery, always in view

    for (let i = 0; i < bucket.length; i++) {
      const { x, z, radius } = bucket[i];
      matrix.compose(
        new THREE.Vector3(x, 0.005, z),
        flatQuat,
        new THREE.Vector3(radius, radius, radius)
      );
      instMesh.setMatrixAt(i, matrix);
    }

    instMesh.instanceMatrix.needsUpdate = true;
    group.add(instMesh);
  }

  return group;
}
