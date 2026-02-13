/**
 * Scenery Renderer - grid-based distance scoring, tree and pond placement
 *
 * Algorithm:
 * 1. Compute bounding box of track layout, expand by 30%
 * 2. Overlay a grid (cells ~4 inches wide) on the expanded area
 * 3. Sample all track splines, mark grid cells containing track as score 0
 * 4. BFS flood-fill: unscored cells adjacent to score-N cells get score N+1
 * 5. Place pond (if enabled) — modifies grid to exclude trees from pond/shore
 * 6. Place trees (if enabled) — uses modified grid
 */

import * as THREE from 'three';
import { Layout, TrackPiece } from '../core/types';
import { getArchetype } from '../core/archetypes';
import { TrackScene } from './scene';

// Tree color palette (dark greens)
const TREE_COLORS = [0x2d5a1e, 0x336622, 0x3a6b2a];

// Pond color (single shade of blue)
const POND_COLOR = 0x3a7bbf;

// Shared materials (created lazily)
let treeMaterials: THREE.MeshBasicMaterial[] | null = null;
let pondMaterial: THREE.MeshBasicMaterial | null = null;

function getTreeMaterials(): THREE.MeshBasicMaterial[] {
  if (!treeMaterials) {
    treeMaterials = TREE_COLORS.map(
      color => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
  }
  return treeMaterials;
}

function getPondMaterial(): THREE.MeshBasicMaterial {
  if (!pondMaterial) {
    pondMaterial = new THREE.MeshBasicMaterial({ color: POND_COLOR, side: THREE.DoubleSide });
  }
  return pondMaterial;
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

/** How much to expand bounding box beyond tracks for scenery grid (fraction) */
const BOUNDS_EXPANSION = 0.30;

/** How much to expand bounding box for pond candidate area (matches camera fit) */
const POND_VIEW_EXPANSION = 0.10;

/** Default tree settings */
const DEFAULT_TREE_CLEARANCE = 2;
const DEFAULT_DENSITY = 3;

/** Default pond settings */
const DEFAULT_POND_SIZE = 20;
const DEFAULT_POND_CLEARANCE = 3;

/**
 * Render scenery (trees and/or pond) for a layout
 */
export function renderScenery(scene: TrackScene, layout: Layout): void {
  const treesEnabled = !!layout.treesEnabled;
  const pondEnabled = !!layout.pondEnabled;

  if (!treesEnabled && !pondEnabled) return;

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

  // Place pond BEFORE trees (pond modifies grid to create shore buffer)
  if (pondEnabled) {
    const pondSize = layout.pondSize ?? DEFAULT_POND_SIZE;
    const pondClearance = layout.pondClearance ?? DEFAULT_POND_CLEARANCE;

    // Compute camera-view bounds (10% expansion) to keep pond visible at initial zoom
    const rawBounds = computeTrackBounds(layout.pieces)!;
    const rawSizeX = rawBounds.maxX - rawBounds.minX;
    const rawSizeZ = rawBounds.maxZ - rawBounds.minZ;
    const viewBounds: Bounds = {
      minX: rawBounds.minX - rawSizeX * POND_VIEW_EXPANSION,
      maxX: rawBounds.maxX + rawSizeX * POND_VIEW_EXPANSION,
      minZ: rawBounds.minZ - rawSizeZ * POND_VIEW_EXPANSION,
      maxZ: rawBounds.maxZ + rawSizeZ * POND_VIEW_EXPANSION,
    };

    const { group: pondGroup, pondCells, minOriginalScore } = placePond(
      grid, bounds, viewBounds, gridWidth, gridHeight, pondSize, pondClearance
    );
    scene.addSceneryGroup(pondGroup);

    // Determine score for pond cells: explicit or default (min original - 1, clamped >= 0)
    const pondScore = layout.pondScore ?? Math.max(0, minOriginalScore - 1);

    // Set pond cell scores and re-run BFS so buffer propagates naturally
    applyPondToGrid(grid, gridWidth, gridHeight, pondCells, pondScore);
  }

  // Place trees using (potentially modified) grid
  if (treesEnabled) {
    const clearance = layout.treesClearance ?? DEFAULT_TREE_CLEARANCE;
    const density = layout.treesDensity ?? DEFAULT_DENSITY;

    const treesGroup = placeTrees(grid, bounds, gridWidth, gridHeight, clearance, density);
    scene.addSceneryGroup(treesGroup);
  }
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
 * BFS flood-fill: assign distance scores to all grid cells.
 * Seeds from all cells that already have a score (>= 0), sorted by score
 * so lower scores propagate first. This supports multi-source BFS with
 * different starting scores (e.g., track cells at 0, pond cells at N).
 */
function bfsFloodFill(grid: number[][], gridWidth: number, gridHeight: number): void {
  // Collect all already-scored cells, grouped by score for correct BFS ordering
  const seedsByScore: Map<number, [number, number][]> = new Map();

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const score = grid[row][col];
      if (score >= 0) {
        if (!seedsByScore.has(score)) seedsByScore.set(score, []);
        seedsByScore.get(score)!.push([row, col]);
      }
    }
  }

  // Build queue with seeds sorted by score (lowest first)
  const queue: [number, number][] = [];
  const sortedScores = [...seedsByScore.keys()].sort((a, b) => a - b);
  for (const score of sortedScores) {
    queue.push(...seedsByScore.get(score)!);
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

/**
 * Place a pond using randomized BFS growth for organic shape.
 * Returns the rendered group, the set of pond cell keys ("row,col"),
 * and the minimum original grid score among selected cells.
 */
function placePond(
  grid: number[][],
  bounds: Bounds,
  viewBounds: Bounds,
  gridWidth: number,
  gridHeight: number,
  targetSize: number,
  clearance: number
): { group: THREE.Group; pondCells: Set<string>; minOriginalScore: number } {
  const group = new THREE.Group();
  const pondCells = new Set<string>();

  // True randomness so pond position varies each run
  const random = () => Math.random();

  // Collect candidate cells: score >= clearance AND within camera-view bounds
  const candidates: [number, number][] = [];
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      if (grid[row][col] >= clearance) {
        // Check if cell center falls within the camera-view bounds
        const wx = bounds.minX + (col + 0.5) * CELL_SIZE;
        const wz = bounds.minZ + (row + 0.5) * CELL_SIZE;
        if (wx >= viewBounds.minX && wx <= viewBounds.maxX &&
            wz >= viewBounds.minZ && wz <= viewBounds.maxZ) {
          candidates.push([row, col]);
        }
      }
    }
  }

  if (candidates.length === 0) return { group, pondCells, minOriginalScore: 0 };

  // Pick a random seed cell
  const seedIdx = Math.floor(random() * candidates.length);
  const [seedRow, seedCol] = candidates[seedIdx];

  // Grow pond via randomized BFS frontier selection
  const selected = new Set<string>();
  const frontier: [number, number][] = [];
  const inFrontier = new Set<string>();
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // Track bounding box of selected cells for aspect ratio constraint
  let minRow = seedRow, maxRow = seedRow;
  let minCol = seedCol, maxCol = seedCol;

  // Track minimum original grid score among selected pond cells
  let minOriginalScore = Infinity;

  const addCell = (row: number, col: number) => {
    const key = `${row},${col}`;
    selected.add(key);
    pondCells.add(key);
    minOriginalScore = Math.min(minOriginalScore, grid[row][col]);

    // Update bounding box
    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);

    // Add unvisited neighbors to frontier
    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      const nKey = `${nr},${nc}`;
      if (
        nr >= 0 && nr < gridHeight && nc >= 0 && nc < gridWidth &&
        grid[nr][nc] >= clearance &&
        !selected.has(nKey) &&
        !inFrontier.has(nKey)
      ) {
        frontier.push([nr, nc]);
        inFrontier.add(nKey);
      }
    }
  };

  // Start with seed cell
  addCell(seedRow, seedCol);

  // Grow until target size or frontier exhausted
  while (selected.size < targetSize && frontier.length > 0) {
    // Pick a random frontier cell
    const idx = Math.floor(random() * frontier.length);
    const [fRow, fCol] = frontier[idx];

    // Remove from frontier (swap with last for O(1) removal)
    frontier[idx] = frontier[frontier.length - 1];
    frontier.pop();
    inFrontier.delete(`${fRow},${fCol}`);

    // Skip if already selected (can happen if added via multiple neighbors)
    if (selected.has(`${fRow},${fCol}`)) continue;

    // Check aspect ratio constraint: would adding this cell push ratio outside 0.5-2.0?
    const newMinRow = Math.min(minRow, fRow);
    const newMaxRow = Math.max(maxRow, fRow);
    const newMinCol = Math.min(minCol, fCol);
    const newMaxCol = Math.max(maxCol, fCol);
    const height = newMaxRow - newMinRow + 1;
    const width = newMaxCol - newMinCol + 1;
    const ratio = width / height;
    if (ratio < 0.5 || ratio > 2.0) continue;

    addCell(fRow, fCol);
  }

  if (selected.size === 0) return { group, pondCells, minOriginalScore: 0 };

  // Render pond as smooth body of water:
  // 1. One large base circle per cell (covers full cell + overlap with neighbors)
  // 2. Midpoint circles between adjacent pond cells (fills seams)
  // 3. Multiple border circles at varied angles for smooth organic edges
  const material = getPondMaterial();
  const baseGeometry = getCircleGeometry();
  const instances: { x: number; z: number; radius: number }[] = [];

  for (const key of selected) {
    const [row, col] = key.split(',').map(Number);
    const cx = bounds.minX + (col + 0.5) * CELL_SIZE;
    const cz = bounds.minZ + (row + 0.5) * CELL_SIZE;

    // Base circle: large enough to overlap neighbors
    instances.push({ x: cx, z: cz, radius: CELL_SIZE * 1.1 });

    // Midpoint circles between this cell and adjacent pond cells (right and down only to avoid duplicates)
    for (const [dr, dc] of [[0, 1], [1, 0]] as [number, number][]) {
      const nKey = `${row + dr},${col + dc}`;
      if (selected.has(nKey)) {
        instances.push({
          x: cx + dc * CELL_SIZE * 0.5,
          z: cz + dr * CELL_SIZE * 0.5,
          radius: CELL_SIZE * 0.9,
        });
      }
    }

    // Border smoothing: for each non-pond neighbor direction, add multiple
    // circles at varied offsets along the edge for a smooth curved border
    for (const [dr, dc] of dirs) {
      const nKey = `${row + dr},${col + dc}`;
      if (!selected.has(nKey)) {
        // 3 circles along the border edge at different tangential positions
        for (let b = 0; b < 3; b++) {
          const tangentSpread = (b - 1) * CELL_SIZE * 0.3; // -0.3, 0, +0.3
          const tangentJitter = (random() - 0.5) * CELL_SIZE * 0.15;
          const tx = dc === 0 ? tangentSpread + tangentJitter : 0;
          const tz = dr === 0 ? tangentSpread + tangentJitter : 0;
          instances.push({
            x: cx + dc * CELL_SIZE * 0.3 + tx,
            z: cz + dr * CELL_SIZE * 0.3 + tz,
            radius: CELL_SIZE * (0.5 + random() * 0.25),
          });
        }
      }
    }
  }

  if (instances.length === 0) return { group, pondCells, minOriginalScore };

  // Single InstancedMesh for all pond circles (one material)
  const flatQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );
  const matrix = new THREE.Matrix4();

  const instMesh = new THREE.InstancedMesh(baseGeometry, material, instances.length);
  instMesh.frustumCulled = false;

  for (let i = 0; i < instances.length; i++) {
    const { x, z, radius } = instances[i];
    matrix.compose(
      new THREE.Vector3(x, 0.003, z), // Y=0.003, below trees at 0.005
      flatQuat,
      new THREE.Vector3(radius, radius, radius)
    );
    instMesh.setMatrixAt(i, matrix);
  }

  instMesh.instanceMatrix.needsUpdate = true;
  group.add(instMesh);

  return { group, pondCells, minOriginalScore };
}

/**
 * Modify grid after pond placement: set pond cells to the given score,
 * reset all other non-track cells to unscored, and re-run BFS.
 * This creates a natural buffer around the pond where trees won't grow.
 */
function applyPondToGrid(
  grid: number[][],
  gridWidth: number,
  gridHeight: number,
  pondCells: Set<string>,
  pondScore: number
): void {
  if (pondCells.size === 0) return;

  // Set pond cells to the specified score
  for (const key of pondCells) {
    const [row, col] = key.split(',').map(Number);
    grid[row][col] = pondScore;
  }

  // Reset all non-seed cells to -1 (unscored) for re-BFS
  // Seeds: track cells (score 0) and pond cells (score pondScore)
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const key = `${row},${col}`;
      if (grid[row][col] === 0 || pondCells.has(key)) continue;
      grid[row][col] = -1;
    }
  }

  // Re-run BFS from all scored cells
  bfsFloodFill(grid, gridWidth, gridHeight);
}
