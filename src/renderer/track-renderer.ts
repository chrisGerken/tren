/**
 * Track Piece Renderer - creates Three.js geometry for track pieces
 */

import * as THREE from 'three';
import { TrackPiece, Layout, Connection } from '../core/types';
import { getArchetype, TrackArchetype } from '../core/archetypes';
import { TrackScene } from './scene';
import { logger } from '../core/logger';

// Track colors (hex values with RGB equivalents)
const RAIL_COLOR = 0x5c4033;  // Silver (R:192, G:192, B:192)    0xc0c0c0
const TIE_COLOR = 0x5c4033;  // Dark wood brown (R:92, G:64, B:51)
const BALLAST_COLOR = 0xd8d8c8;  // Light gray (R:216, G:216, B:200)
const ROADBED_COLOR = 0xc8b8a0;  // Light tan (R:200, G:184, B:160)
const CONNECTION_POINT_UNLOCKED_COLOR = 0xffffff;  // White for unlocked
const CONNECTION_POINT_LOCKED_COLOR = 0xff0000;  // Red for locked
const GENERATOR_COLOR = 0x22aa22;  // Green
const BIN_COLOR = 0xcc2222;  // Red
const BUMPER_COLOR = 0x444444;  // Dark gray
const TUNNEL_COLOR = 0x4a4a4a;  // Dark gray for tunnel portal
const SWITCH_SELECTED_COLOR = 0x00ff00;  // Bright green for selected route
const SWITCH_UNSELECTED_COLOR = 0xff0000;  // Red for unselected routes
const SEMAPHORE_UNLOCKED_COLOR = 0x00ff00;  // Green for unlocked (open)
const SEMAPHORE_LOCKED_COLOR = 0xff0000;    // Red for locked (blocked)
const SEMAPHORE_RING_COLOR = 0x333333;      // Dark gray for the circle outline
const DECOUPLER_INACTIVE_COLOR = 0xff8800;  // Orange for inactive decoupler
const DECOUPLER_ACTIVE_COLOR = 0xff0000;    // Red for activated decoupler

// Track dimensions (in inches - model scale)
const RAIL_GAUGE = 1.045;  // Distance between rails
const RAIL_RADIUS = 0.08;  // Rail thickness
const TIE_WIDTH = 1.45;  // Tie length (perpendicular to track)
const TIE_HEIGHT = 0.15;  // Tie height (visible in top-down)
const TIE_DEPTH = 0.25;  // Tie thickness along track direction
const TIE_SPACING = 1.0;  // Distance between ties
const BALLAST_WIDTH = 2.0;  // Width of gravel bed
const ROADBED_WIDTH = 2.4;  // Width of raised dirt surface
const ROADBED_HEIGHT = 0.1;  // Height of roadbed above ground

// Set to true to show simplified debug view
const DEBUG_MODE = false;

// Track selected routes for virtual switches
// Key: "pieceId.pointName", Value: index of selected connection (0-based)
const selectedRoutes = new Map<string, number>();

// Store connection point meshes for dynamic color updates
// Key: "pieceId.pointName", Value: THREE.Mesh
const connectionPointMeshes = new Map<string, THREE.Mesh>();

// Store semaphore meshes for click handling and color updates
// Key: pieceId, Value: { dot: THREE.Mesh, ring: THREE.Mesh }
const semaphoreMeshes = new Map<string, { dot: THREE.Mesh; ring: THREE.Mesh }>();

// Store decoupler meshes for click handling and color updates
// Key: pieceId, Value: array of triangle meshes
const decouplerMeshes = new Map<string, THREE.Mesh[]>();

/**
 * Get or initialize the selected route by full key
 */
function getSelectedRouteByKey(key: string): number {
  if (!selectedRoutes.has(key)) {
    selectedRoutes.set(key, 0); // Default to first connection
  }
  const value = selectedRoutes.get(key)!;
  logger.debug(`getSelectedRouteByKey: key="${key}" → ${value}`);
  return value;
}

/**
 * Set the selected route by full key (includes direction)
 */
export function setSelectedRouteByKey(key: string, connectionIndex: number): void {
  const oldValue = selectedRoutes.get(key);
  logger.debug(`setSelectedRouteByKey: key="${key}" ${oldValue} → ${connectionIndex}`);
  selectedRoutes.set(key, connectionIndex);
}

/**
 * Set the selected route for a switch point (legacy, without direction)
 */
export function setSelectedRoute(pieceId: string, pointName: string, connectionIndex: number): void {
  setSelectedRouteByKey(`${pieceId}.${pointName}`, connectionIndex);
}

/**
 * Get the selected routes map for use by simulation
 */
export function getSelectedRoutes(): Map<string, number> {
  return selectedRoutes;
}

/**
 * Update connection point colors and visibility based on lock state and labels toggle
 * @param lockedPoints - Set of connection point IDs that are currently locked
 * @param visible - Whether connection points should be visible (tied to Labels toggle)
 */
export function updateConnectionPointColors(lockedPoints: Set<string>, visible: boolean): void {
  for (const [id, mesh] of connectionPointMeshes) {
    mesh.visible = visible;
    if (visible) {
      const material = mesh.material as THREE.MeshBasicMaterial;
      const isLocked = lockedPoints.has(id);
      material.color.setHex(isLocked ? CONNECTION_POINT_LOCKED_COLOR : CONNECTION_POINT_UNLOCKED_COLOR);
    }
  }
}

/**
 * Update a semaphore's visual state
 * @param pieceId - The piece ID of the semaphore
 * @param locked - Whether the semaphore is now locked
 */
export function updateSemaphoreColor(pieceId: string, locked: boolean): void {
  const meshes = semaphoreMeshes.get(pieceId);
  if (meshes) {
    const material = meshes.dot.material as THREE.MeshBasicMaterial;
    material.color.setHex(locked ? SEMAPHORE_LOCKED_COLOR : SEMAPHORE_UNLOCKED_COLOR);
  }
}

/**
 * Update a decoupler's visual state
 * @param pieceId - The piece ID of the decoupler
 * @param activated - Whether the decoupler is activated (red) or inactive (orange)
 */
export function updateDecouplerColor(pieceId: string, activated: boolean): void {
  const meshes = decouplerMeshes.get(pieceId);
  if (meshes) {
    for (const mesh of meshes) {
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.color.setHex(activated ? DECOUPLER_ACTIVE_COLOR : DECOUPLER_INACTIVE_COLOR);
    }
  }
}

/**
 * Render a complete layout
 */
export function renderLayout(scene: TrackScene, layout: Layout): void {
  scene.clearLayout();

  // Clear connection point mesh references
  connectionPointMeshes.clear();
  // Clear semaphore mesh references
  semaphoreMeshes.clear();
  // Clear decoupler mesh references
  decouplerMeshes.clear();

  // Build a map for quick piece lookup
  const pieceMap = new Map<string, TrackPiece>();
  for (const piece of layout.pieces) {
    pieceMap.set(piece.id, piece);
  }

  // Check if random mode is on - if so, hide switch indicators
  const hideIndicators = layout.randomSwitches ?? false;

  for (const piece of layout.pieces) {
    const archetype = getArchetype(piece.archetypeCode);
    const group = DEBUG_MODE
      ? renderTrackPieceDebug(piece, archetype)
      : renderTrackPiece(piece, archetype, pieceMap, hideIndicators);
    scene.addTrackGroup(group);

    // Add label if piece has one
    if (piece.label) {
      // Calculate piece center from connection points
      const center = getPieceCenter(piece, archetype);
      // Add slight offset perpendicular to track to avoid overlap
      // Note: offsetZ is negated to match the Z-flip in rendering
      const labelOffset = 2;
      const offsetX = Math.cos(piece.rotation + Math.PI / 2) * labelOffset;
      const offsetZ = -Math.sin(piece.rotation + Math.PI / 2) * labelOffset;
      scene.addLabel(piece.label, center.x + offsetX, center.z + offsetZ);
    }
  }

  scene.fitToLayout();
  scene.render();
}

/**
 * Debug render - show connection points at WORLD coordinates (no group transform)
 */
function renderTrackPieceDebug(piece: TrackPiece, archetype: TrackArchetype): THREE.Group {
  const group = new THREE.Group();
  // NOTE: NOT applying group transform - positioning everything in world coords directly

  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  // Helper to transform local to world (with Z negated for screen orientation)
  const toWorld = (local: { x: number; z: number }) => ({
    x: piece.position.x + (local.x * cos - local.z * sin),
    z: -(piece.position.z + (local.x * sin + local.z * cos)),
  });

  // Find 'in' and 'out' connection points
  const inPoint = archetype.connectionPoints.find(cp => cp.name === 'in');
  const outPoint = archetype.connectionPoints.find(cp => cp.name === 'out');

  // Draw line from in to out (if both exist) - in WORLD coords
  if (inPoint && outPoint) {
    const inWorld = toWorld(inPoint.position);
    const outWorld = toWorld(outPoint.position);
    const points = [
      new THREE.Vector3(inWorld.x, 0.2, inWorld.z),
      new THREE.Vector3(outWorld.x, 0.2, outWorld.z),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: RAIL_COLOR, linewidth: 2 });
    const line = new THREE.Line(geometry, material);
    group.add(line);
  }

  // Render connection points as spheres at WORLD coords
  for (const cp of archetype.connectionPoints) {
    const world = toWorld(cp.position);
    const color = cp.name.startsWith('in') ? 0x00ff00 : 0xff0000; // green for in, red for out
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.MeshBasicMaterial({ color })
    );
    sphere.position.set(world.x, 0.5, world.z);
    group.add(sphere);

    logger.debug(`  ${piece.id}.${cp.name}: world=(${world.x.toFixed(3)}, ${world.z.toFixed(3)})`);
  }

  // Log piece position for debugging
  logger.debug(`Piece ${piece.id} (${archetype.code}): pos=(${piece.position.x.toFixed(2)}, ${piece.position.z.toFixed(2)}), rot=${(piece.rotation * 180 / Math.PI).toFixed(1)}°`);

  return group;
}

/**
 * Render a single track piece using explicit world coordinates
 * @param hideIndicators - If true, skip rendering switch indicators (for random mode)
 */
function renderTrackPiece(
  piece: TrackPiece,
  archetype: TrackArchetype,
  pieceMap: Map<string, TrackPiece>,
  hideIndicators: boolean = false
): THREE.Group {
  const group = new THREE.Group();

  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  // Helper to transform local to world (with Z negated for screen orientation)
  // The coordinate convention has +Z as "left", but the camera shows -Z as "up".
  // By negating Z, we flip the layout so +Z appears at the top of the screen,
  // making left curves visually curve upward (which looks like "left" when traveling right).
  const toWorld = (local: { x: number; y: number; z: number }): THREE.Vector3 => {
    return new THREE.Vector3(
      piece.position.x + (local.x * cos - local.z * sin),
      local.y,
      -(piece.position.z + (local.x * sin + local.z * cos))
    );
  };

  // Render track sections (skip for gen/bin/inTunnel - they have internal invisible sections)
  const isGenOrBin = archetype.code === 'gen' || archetype.code === 'bin';
  const isHidden = isGenOrBin || piece.inTunnel;
  if (!isHidden) {
    for (const section of archetype.sections) {
      if (section.splinePoints.length >= 2) {
        // Transform spline points to world coordinates
        const worldPoints = section.splinePoints.map(p => toWorld(p));
        const sectionMesh = renderTrackSectionWorld(worldPoints);
        group.add(sectionMesh);
      }
    }
  }
  // Render connection points for visible pieces only (skip gen/bin/inTunnel)
  // Connection points start hidden and are shown when Labels toggle is on
  if (!isHidden) {
    for (const cp of archetype.connectionPoints) {
      const worldPos = toWorld({ x: cp.position.x, y: 0, z: cp.position.z });
      // Create connection point ID for tracking
      const connectionPointId = `${piece.id}.${cp.name}`;
      const connections = piece.connections.get(cp.name) || [];
      const cpMesh = renderConnectionPointWorld(worldPos, connectionPointId);
      group.add(cpMesh);

      // Render switch indicators if this is a virtual switch (multiple connections)
      // Skip if random mode is on (hideIndicators)
      logger.debug(`  ${piece.id}.${cp.name}: ${connections.length} connections`);
      if (connections.length > 1 && !hideIndicators) {
      const switchIndicators = renderSwitchIndicators(
        piece,
        cp.name,
        worldPos,
        connections,
        pieceMap
      );
      for (const indicator of switchIndicators) {
        group.add(indicator);
      }
    }
    }

    // Render internal connection points (cross connect intersections)
    if (piece.internalConnectionPoints) {
      for (const icp of piece.internalConnectionPoints) {
        // Internal connection points store world position, but we need to negate Z for screen
        const screenPos = new THREE.Vector3(
          icp.worldPosition.x,
          0,
          -icp.worldPosition.z
        );
        const icpMesh = renderConnectionPointWorld(screenPos, icp.id);
        group.add(icpMesh);
        logger.debug(`  Internal connection point ${icp.id} at (${icp.worldPosition.x.toFixed(1)}, ${icp.worldPosition.z.toFixed(1)})`);
      }
    }
  }

  // Special rendering for generator/bin
  if (archetype.code === 'gen') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const genMesh = renderGeneratorWorld(worldPos);
    genMesh.userData = { isGenerator: true, pieceId: piece.id };
    group.add(genMesh);
  } else if (archetype.code === 'bin') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const binMesh = renderBinWorld(worldPos);
    group.add(binMesh);
  } else if (archetype.code === 'bump' || archetype.code === 'bumper') {
    const bumperMesh = renderBumperStopWorld(piece, archetype, toWorld);
    group.add(bumperMesh);
  } else if (archetype.code === 'tun' || archetype.code === 'tunnel') {
    const tunnelMeshes = renderTunnelWorld(piece);
    for (const mesh of tunnelMeshes) {
      group.add(mesh);
    }
  } else if (archetype.code === 'sem' || archetype.code === 'semaphore') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const locked = piece.semaphoreConfig?.locked ?? false;
    const semaphoreGroup = renderSemaphoreWorld(worldPos, piece.id, locked);
    group.add(semaphoreGroup);
  } else if (archetype.code === 'dec' || archetype.code === 'decoupler') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const activated = piece.decouplerConfig?.activated ?? false;
    const decouplerGroup = renderDecouplerWorld(worldPos, piece.id, piece.rotation, activated);
    group.add(decouplerGroup);
  }

  return group;
}

/**
 * Render a track section with rails, ties, ballast, and roadbed - points already in world coordinates
 * Returns a Group containing all track components
 */
function renderTrackSectionWorld(worldPoints: THREE.Vector3[]): THREE.Group {
  const trackGroup = new THREE.Group();

  // Create spline curve
  const curve = new THREE.CatmullRomCurve3(worldPoints);
  const curveLength = curve.getLength();
  const tubularSegments = Math.max(16, worldPoints.length * 8);

  // Materials
  const railMaterial = new THREE.MeshStandardMaterial({
    color: RAIL_COLOR,
    roughness: 0.5,
    metalness: 0.2,
  });

  const tieMaterial = new THREE.MeshStandardMaterial({
    color: TIE_COLOR,
    roughness: 0.9,
    metalness: 0.0,
  });

  const ballastMaterial = new THREE.MeshStandardMaterial({
    color: BALLAST_COLOR,
    roughness: 1.0,
    metalness: 0.0,
  });

  const roadbedMaterial = new THREE.MeshStandardMaterial({
    color: ROADBED_COLOR,
    roughness: 0.9,
    metalness: 0.0,
  });

  // 1. Render raised roadbed (lowest layer - brown dirt surface)
  const roadbedGeometry = createExtrudedPathGeometry(curve, tubularSegments, ROADBED_WIDTH, ROADBED_HEIGHT);
  const roadbedMesh = new THREE.Mesh(roadbedGeometry, roadbedMaterial);
  roadbedMesh.position.y = 0.01;  // Just above ground
  trackGroup.add(roadbedMesh);

  // 2. Render gravel ballast (on top of roadbed)
  const ballastGeometry = createExtrudedPathGeometry(curve, tubularSegments, BALLAST_WIDTH, 0.08);
  const ballastMesh = new THREE.Mesh(ballastGeometry, ballastMaterial);
  ballastMesh.position.y = ROADBED_HEIGHT + 0.02;
  trackGroup.add(ballastMesh);

  // 3. Render wooden ties
  const tieGeometry = new THREE.BoxGeometry(TIE_DEPTH, TIE_HEIGHT, TIE_WIDTH);
  const numTies = Math.floor(curveLength / TIE_SPACING);

  for (let i = 0; i <= numTies; i++) {
    const t = i / Math.max(numTies, 1);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    const tieMesh = new THREE.Mesh(tieGeometry, tieMaterial);
    tieMesh.position.set(point.x, ROADBED_HEIGHT + 0.08 + TIE_HEIGHT / 2, point.z);

    // Rotate tie to be perpendicular to track direction
    // The tie's long axis (Z) should be perpendicular to the tangent
    const angle = Math.atan2(-tangent.z, tangent.x);
    tieMesh.rotation.y = angle;

    trackGroup.add(tieMesh);
  }

  // 4. Render the two rails (highest layer)
  const halfGauge = RAIL_GAUGE / 2;

  // Generate offset curves for left and right rails
  const leftRailPoints: THREE.Vector3[] = [];
  const rightRailPoints: THREE.Vector3[] = [];
  const railSamples = tubularSegments;

  for (let i = 0; i <= railSamples; i++) {
    const t = i / railSamples;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    // Perpendicular direction (in XZ plane) - tangent is normalized
    const perpX = -tangent.z;
    const perpZ = tangent.x;

    // Offset points for left and right rails
    leftRailPoints.push(new THREE.Vector3(
      point.x + perpX * halfGauge,
      point.y,
      point.z + perpZ * halfGauge
    ));
    rightRailPoints.push(new THREE.Vector3(
      point.x - perpX * halfGauge,
      point.y,
      point.z - perpZ * halfGauge
    ));
  }

  // Create rail curves and tube geometries
  const leftRailCurve = new THREE.CatmullRomCurve3(leftRailPoints);
  const rightRailCurve = new THREE.CatmullRomCurve3(rightRailPoints);

  const leftRailGeometry = new THREE.TubeGeometry(leftRailCurve, tubularSegments, RAIL_RADIUS, 6, false);
  const rightRailGeometry = new THREE.TubeGeometry(rightRailCurve, tubularSegments, RAIL_RADIUS, 6, false);

  const leftRailMesh = new THREE.Mesh(leftRailGeometry, railMaterial);
  const rightRailMesh = new THREE.Mesh(rightRailGeometry, railMaterial);

  // Position rails on top of ties
  const railY = ROADBED_HEIGHT + 0.08 + TIE_HEIGHT + RAIL_RADIUS;
  leftRailMesh.position.y = railY;
  rightRailMesh.position.y = railY;

  trackGroup.add(leftRailMesh);
  trackGroup.add(rightRailMesh);

  return trackGroup;
}

/**
 * Create an extruded geometry that follows a path curve
 * Used for roadbed and ballast which are flat rectangular cross-sections
 */
function createExtrudedPathGeometry(
  curve: THREE.CatmullRomCurve3,
  segments: number,
  width: number,
  height: number
): THREE.BufferGeometry {
  const halfWidth = width / 2;
  const vertices: number[] = [];
  const indices: number[] = [];

  // Generate vertices along the path
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    // Perpendicular direction (in XZ plane)
    const perpX = -tangent.z;
    const perpZ = tangent.x;

    // Four corners of the cross-section at this point
    // Bottom left
    vertices.push(
      point.x + perpX * halfWidth,
      0,
      point.z + perpZ * halfWidth
    );
    // Bottom right
    vertices.push(
      point.x - perpX * halfWidth,
      0,
      point.z - perpZ * halfWidth
    );
    // Top right
    vertices.push(
      point.x - perpX * halfWidth,
      height,
      point.z - perpZ * halfWidth
    );
    // Top left
    vertices.push(
      point.x + perpX * halfWidth,
      height,
      point.z + perpZ * halfWidth
    );
  }

  // Generate indices for the faces
  for (let i = 0; i < segments; i++) {
    const base = i * 4;

    // Top face (visible from above) - vertices 3, 2 and next 3, 2
    indices.push(base + 3, base + 2, base + 6);
    indices.push(base + 3, base + 6, base + 7);

    // Left side face
    indices.push(base + 0, base + 3, base + 7);
    indices.push(base + 0, base + 7, base + 4);

    // Right side face
    indices.push(base + 2, base + 1, base + 5);
    indices.push(base + 2, base + 5, base + 6);

    // Bottom face (usually not visible)
    indices.push(base + 0, base + 4, base + 5);
    indices.push(base + 0, base + 5, base + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Render a connection point as a small sphere at world position
 * @param worldPos - Position in world coordinates
 * @param connectionPointId - ID in format "pieceId.pointName" or internal point ID for tracking
 */
function renderConnectionPointWorld(worldPos: THREE.Vector3, connectionPointId: string): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.25, 16, 16);
  // Start with unlocked color (white) - will be updated dynamically
  const material = new THREE.MeshBasicMaterial({ color: CONNECTION_POINT_UNLOCKED_COLOR });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(worldPos.x, 0.5, worldPos.z);
  // Start hidden - visibility controlled by Labels toggle via updateConnectionPointColors
  mesh.visible = false;

  // Store reference for dynamic updates
  connectionPointMeshes.set(connectionPointId, mesh);

  return mesh;
}

/**
 * Render generator as a green circle at world position
 */
function renderGeneratorWorld(worldPos: THREE.Vector3): THREE.Mesh {
  const geometry = new THREE.CircleGeometry(1.5, 32);  // Same size as bin
  const material = new THREE.MeshBasicMaterial({
    color: GENERATOR_COLOR,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2; // Lay flat
  mesh.position.set(worldPos.x, 0.6, worldPos.z);

  return mesh;
}

/**
 * Render bin as a red circle at world position
 */
function renderBinWorld(worldPos: THREE.Vector3): THREE.Mesh {
  const geometry = new THREE.CircleGeometry(1.5, 32);
  const material = new THREE.MeshBasicMaterial({
    color: BIN_COLOR,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(worldPos.x, 0.5, worldPos.z);

  return mesh;
}

/**
 * Render semaphore as a green/red dot inside a circle outline at world position
 * @param worldPos - Position in world coordinates
 * @param pieceId - The piece ID for tracking clicks
 * @param locked - Whether the semaphore is locked (red) or unlocked (green)
 */
function renderSemaphoreWorld(worldPos: THREE.Vector3, pieceId: string, locked: boolean): THREE.Group {
  const group = new THREE.Group();

  // Create the circle outline (ring) - same size as gen/bin (radius 1.5)
  const ringGeometry = new THREE.RingGeometry(1.3, 1.5, 32);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: SEMAPHORE_RING_COLOR,
    side: THREE.DoubleSide,
  });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.set(worldPos.x, 0.55, worldPos.z);
  group.add(ringMesh);

  // Create the status dot (smaller, inside the ring) - similar to switch indicators
  const dotGeometry = new THREE.SphereGeometry(0.6, 16, 16);
  const dotColor = locked ? SEMAPHORE_LOCKED_COLOR : SEMAPHORE_UNLOCKED_COLOR;
  const dotMaterial = new THREE.MeshBasicMaterial({ color: dotColor });
  const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
  dotMesh.position.set(worldPos.x, 0.7, worldPos.z);

  // Store metadata for click handling
  dotMesh.userData = {
    isSemaphore: true,
    pieceId: pieceId,
  };

  group.add(dotMesh);

  // Store meshes for later updates
  semaphoreMeshes.set(pieceId, { dot: dotMesh, ring: ringMesh });

  return group;
}

/**
 * Render decoupler as two triangles, one on each side of the track
 * Triangles point toward the track center, indicating the decoupling point
 * @param worldPos - Position in world coordinates
 * @param pieceId - The piece ID for click handling
 * @param rotation - Piece rotation in radians
 * @param activated - Whether the decoupler is currently activated
 */
function renderDecouplerWorld(
  worldPos: THREE.Vector3,
  pieceId: string,
  rotation: number,
  activated: boolean
): THREE.Group {
  const group = new THREE.Group();
  const color = activated ? DECOUPLER_ACTIVE_COLOR : DECOUPLER_INACTIVE_COLOR;

  // Triangle dimensions
  const triangleSize = 1.13;  // Size of each triangle (2x area vs original 0.8)
  const offset = 1.5;        // Distance from track center to triangle center

  // Perpendicular direction to track (in screen coords, Z-flipped)
  const perpX = -Math.sin(-rotation);
  const perpZ = -Math.cos(-rotation);

  // Create triangle geometry (pointing inward toward track)
  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(0, triangleSize);
  triangleShape.lineTo(-triangleSize * 0.7, -triangleSize * 0.5);
  triangleShape.lineTo(triangleSize * 0.7, -triangleSize * 0.5);
  triangleShape.lineTo(0, triangleSize);

  const geometry = new THREE.ShapeGeometry(triangleShape);
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });

  // Left triangle (points toward track from left side)
  const leftTriangle = new THREE.Mesh(geometry, material.clone());
  leftTriangle.rotation.x = -Math.PI / 2;  // Lay flat
  leftTriangle.rotation.z = -rotation;       // Align with track
  leftTriangle.position.set(
    worldPos.x + perpX * offset,
    0.6,
    worldPos.z + perpZ * offset
  );
  leftTriangle.userData = {
    isDecoupler: true,
    pieceId: pieceId,
  };
  group.add(leftTriangle);

  // Right triangle (points toward track from right side)
  const rightTriangle = new THREE.Mesh(geometry, material.clone());
  rightTriangle.rotation.x = -Math.PI / 2;  // Lay flat
  rightTriangle.rotation.z = Math.PI - rotation;  // Flip and align with track
  rightTriangle.position.set(
    worldPos.x - perpX * offset,
    0.6,
    worldPos.z - perpZ * offset
  );
  rightTriangle.userData = {
    isDecoupler: true,
    pieceId: pieceId,
  };
  group.add(rightTriangle);

  // Store meshes for dynamic color updates
  decouplerMeshes.set(pieceId, [leftTriangle, rightTriangle]);

  return group;
}

/**
 * Render tunnel portal as two bracket shapes facing opposite directions
 * Each bracket is open toward the visible track (outside the tunnel)
 */
function renderTunnelWorld(piece: TrackPiece): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];

  // Bracket dimensions
  const bracketWidth = 4.2;       // Width of the bracket (perpendicular to track) - ~40% wider than track
  const bracketDepth = 0.8;       // How far the arms extend along the track
  const bracketThickness = 0.3;  // Thickness of the bracket lines
  const bracketHeight = 1.5;     // Height above ground

  const material = new THREE.MeshStandardMaterial({
    color: TUNNEL_COLOR,
    roughness: 0.7,
    metalness: 0.2,
  });

  // Create bracket shape (like [ when viewed from above)
  // The shape is drawn in the XY plane, then extruded in Z
  const createBracketGeometry = (): THREE.ExtrudeGeometry => {
    const shape = new THREE.Shape();
    const halfWidth = bracketWidth / 2;
    const t = bracketThickness;

    // Draw the bracket outline (counterclockwise for front face)
    // Start at bottom-left outer corner
    shape.moveTo(-halfWidth, 0);
    shape.lineTo(-halfWidth, bracketDepth);           // Left arm outer
    shape.lineTo(-halfWidth + t, bracketDepth);       // Left arm inner top
    shape.lineTo(-halfWidth + t, t);                  // Left arm inner
    shape.lineTo(halfWidth - t, t);                   // Bottom inner
    shape.lineTo(halfWidth - t, bracketDepth);        // Right arm inner
    shape.lineTo(halfWidth, bracketDepth);            // Right arm outer top
    shape.lineTo(halfWidth, 0);                       // Right arm outer
    shape.lineTo(-halfWidth, 0);                      // Bottom outer (close)

    const extrudeSettings = {
      depth: bracketHeight,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  const geometry = createBracketGeometry();

  // Create two brackets - one for each tunnel entrance
  // Brackets span across the track (perpendicular to track direction)
  // and open toward the visible track on each side

  // Bracket 1: Opens toward -X (the 'in' side, toward visible track before tunnel)
  // Note: piece.rotation is negated to account for Z-flip in screen coordinates
  const bracket1 = new THREE.Mesh(geometry, material);
  bracket1.rotation.order = 'YXZ';  // Apply Y rotation first
  bracket1.rotation.y = Math.PI / 2;   // Rotate 90° so bracket spans across track
  bracket1.rotation.x = -Math.PI / 2;  // Lay flat (extrusion goes up)
  bracket1.rotation.z = Math.PI + piece.rotation;  // Open toward -X, apply piece rotation (negated for Z-flip)
  bracket1.position.set(piece.position.x, 0, -piece.position.z);
  meshes.push(bracket1);

  // Bracket 2: Opens toward +X (the 'out' side, toward visible track after tunnel)
  const bracket2 = new THREE.Mesh(geometry, material);
  bracket2.rotation.order = 'YXZ';
  bracket2.rotation.y = Math.PI / 2;   // Rotate 90° so bracket spans across track
  bracket2.rotation.x = -Math.PI / 2;  // Lay flat
  bracket2.rotation.z = piece.rotation;  // Open toward +X, apply piece rotation (negated for Z-flip)
  bracket2.position.set(piece.position.x, 0, -piece.position.z);
  meshes.push(bracket2);

  return meshes;
}

/**
 * Calculate the center of a track piece in world coordinates
 */
function getPieceCenter(piece: TrackPiece, archetype: TrackArchetype): { x: number; z: number } {
  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  // Transform local point to world (with Z negated for screen orientation)
  const toWorld = (local: { x: number; z: number }) => ({
    x: piece.position.x + (local.x * cos - local.z * sin),
    z: -(piece.position.z + (local.x * sin + local.z * cos)),
  });

  // Try to find center from 'in' and 'out' connection points
  const inPoint = archetype.connectionPoints.find(cp => cp.name === 'in');
  const outPoint = archetype.connectionPoints.find(cp => cp.name === 'out');

  if (inPoint && outPoint) {
    const inWorld = toWorld(inPoint.position);
    const outWorld = toWorld(outPoint.position);
    return {
      x: (inWorld.x + outWorld.x) / 2,
      z: (inWorld.z + outWorld.z) / 2,
    };
  }

  // For pieces with sections, use the middle of the first section's spline
  if (archetype.sections.length > 0 && archetype.sections[0].splinePoints.length > 0) {
    const points = archetype.sections[0].splinePoints;
    const midIndex = Math.floor(points.length / 2);
    return toWorld(points[midIndex]);
  }

  // Fallback to piece position (with Z negated for screen orientation)
  return { x: piece.position.x, z: -piece.position.z };
}

/**
 * Render bumper stop at world position
 */
function renderBumperStopWorld(
  piece: TrackPiece,
  archetype: TrackArchetype,
  toWorld: (local: { x: number; y: number; z: number }) => THREE.Vector3
): THREE.Mesh {
  const section = archetype.sections[0];
  let worldPos: THREE.Vector3;
  let tangentAngle = piece.rotation;

  if (!section || section.splinePoints.length < 2) {
    worldPos = toWorld({ x: 0, y: 0, z: 0 });
  } else {
    // Get position at end of track
    const endPoint = section.splinePoints[section.splinePoints.length - 1];
    worldPos = toWorld(endPoint);

    // Calculate tangent direction at end of spline (from second-to-last to last point)
    const p1 = section.splinePoints[section.splinePoints.length - 2];
    const p2 = section.splinePoints[section.splinePoints.length - 1];
    const localTangent = { x: p2.x - p1.x, z: p2.z - p1.z };

    // Transform tangent to world coordinates (rotation only, not translation)
    // Note: Z is negated to match the screen orientation flip
    const cos = Math.cos(piece.rotation);
    const sin = Math.sin(piece.rotation);
    const worldTangent = {
      x: localTangent.x * cos - localTangent.z * sin,
      z: -(localTangent.x * sin + localTangent.z * cos),
    };

    // Bumper should be perpendicular to tangent
    tangentAngle = Math.atan2(worldTangent.z, worldTangent.x);
  }

  const geometry = new THREE.BoxGeometry(0.5, 1, 2);
  const material = new THREE.MeshStandardMaterial({ color: BUMPER_COLOR });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(worldPos.x, 0.5, worldPos.z);
  // Rotate bumper perpendicular to track direction
  // The box's long axis (Z) should be perpendicular to the tangent
  mesh.rotation.y = tangentAngle;

  return mesh;
}

// Maximum distance to search along track (inches)
const MAX_INDICATOR_DISTANCE = 30.0;
// Indicator placement fractions based on track configuration:
// Case 1: Track is output for switches at BOTH ends - place at 40%
const INDICATOR_FRACTION_SHARED_TRACK = 0.40;
// Case 2: Track is output for only ONE switch - place at far end (100%)
const INDICATOR_FRACTION_SINGLE_SWITCH = 1.00;
// Case 3: Two consecutive output tracks between switches - place at 75%
const INDICATOR_FRACTION_CONSECUTIVE_TRACKS = 0.75;

/**
 * Information about a track curve for indicator positioning
 */
interface CurveInfo {
  curve: THREE.CatmullRomCurve3;
  curveLength: number;
  isFromIn: boolean;
  // Information about the far end of the track
  farEndHasSwitch: boolean;  // True if far end has multiple connections (is a switch)
  farEndNextTrackHasSwitch: boolean;  // True if track connected at far end leads to a switch
}

/**
 * Render switch indicators (green for selected route, red for others)
 * Positioned along the outgoing tracks where they've visually separated.
 * All indicators are placed at the same distance from the connection point,
 * at the minimum distance where they are all at least MIN_INDICATOR_SEPARATION apart.
 */
/**
 * Check if a connection point name is an "in" type
 */
function isInPoint(pointName: string): boolean {
  return pointName === 'in' || pointName === 'in1' || pointName === 'in2';
}

/**
 * Render switch indicators for a connection point
 * Creates TWO independent sets of indicators if there are multiple forward AND backward connections
 */
function renderSwitchIndicators(
  piece: TrackPiece,
  pointName: string,
  _worldPos: THREE.Vector3,
  allConnections: Connection[],
  pieceMap: Map<string, TrackPiece>
): THREE.Mesh[] {
  const indicators: THREE.Mesh[] = [];

  // Render switch indicators when there are multiple connections at this point.
  // Connections may mix 'in' and 'out' entry points at virtual switch junctions
  // (e.g., an offramp where one route enters via 'out' and another via 'in').
  // The direction for the route key is derived from the point name:
  // 'in' points are exits for backward travel, 'out' points for forward travel.
  if (allConnections.length > 1) {
    const direction: 'fwd' | 'bwd' = isInPoint(pointName) ? 'bwd' : 'fwd';
    const switchIndicators = renderDirectionalSwitchIndicators(
      piece, pointName, direction, allConnections, pieceMap, allConnections
    );
    indicators.push(...switchIndicators);
  }

  return indicators;
}

/**
 * Render switch indicators for one direction (forward or backward)
 */
function renderDirectionalSwitchIndicators(
  piece: TrackPiece,
  pointName: string,
  direction: 'fwd' | 'bwd',
  connections: Connection[],
  pieceMap: Map<string, TrackPiece>,
  allConnections: Connection[]  // All connections at this point (for canonical ID)
): THREE.Mesh[] {
  const indicators: THREE.Mesh[] = [];

  // Use canonical junction ID so all pieces at this junction share the same switch state
  // The canonical ID includes piece.point pairs to distinguish different connection points on same piece
  const junctionPoints = allConnections.map(c => `${c.pieceId}.${c.pointName}`);
  junctionPoints.push(`${piece.id}.${pointName}`);
  junctionPoints.sort();
  const canonicalJunctionId = junctionPoints[0];

  // Route key uses canonical junction ID so all inbound tracks share the same switch
  const routeKey = `junction.${canonicalJunctionId}.${direction}`;
  const selectedIndex = getSelectedRouteByKey(routeKey);

  logger.debug(`renderSwitchIndicators: ${routeKey}, ${connections.length} connections, selectedIndex=${selectedIndex}`);
  connections.forEach((c, i) => logger.debug(`  route[${i}]: ${c.pieceId}.${c.pointName} ${c.isAutoConnect ? '(auto)' : ''}`));

  // Build curve info for each connection
  const curveInfos: (CurveInfo | null)[] = [];
  for (const connection of connections) {
    const curveInfo = buildCurveInfo(connection, pieceMap);
    curveInfos.push(curveInfo);
  }

  // Calculate positions using per-curve distances based on track configuration
  const positions = curveInfos.map(info => {
    if (!info) return null;
    const distance = getIndicatorDistanceForCurve(info);
    return getPositionAtDistance(info, distance);
  });

  // Count valid positions - if only 0 or 1, there's no real switch choice
  const validPositionCount = positions.filter(p => p !== null).length;
  if (validPositionCount <= 1) {
    // No switch needed - either no valid routes or only one valid route
    return indicators;
  }

  // Create indicator meshes
  for (let i = 0; i < connections.length; i++) {
    const pos = positions[i];
    logger.debug(`  Indicator ${i}: pos=${pos ? `(${pos.x.toFixed(2)}, ${pos.z.toFixed(2)})` : 'null'}, curveInfo=${curveInfos[i] ? 'valid' : 'null'}`);
    if (!pos) continue;

    const isSelected = i === selectedIndex;
    const color = isSelected ? SWITCH_SELECTED_COLOR : SWITCH_UNSELECTED_COLOR;
    const geometry = new THREE.SphereGeometry(0.6, 16, 16);  // Larger for easier clicking
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, 0.7, pos.z);

    // Store metadata for click handling
    // routeKey includes direction for independent forward/backward switches
    mesh.userData = {
      isSwitchIndicator: true,
      routeKey: routeKey,
      connectionIndex: i,
    };

    logger.debug(`  Created indicator ${i} at (${pos.x.toFixed(2)}, 0.7, ${pos.z.toFixed(2)}), selected=${isSelected}, color=${isSelected ? 'green' : 'red'}`);
    indicators.push(mesh);
  }

  return indicators;
}

/**
 * Get the opposite connection point name
 */
function getOppositePointName(pointName: string): string {
  if (pointName === 'in') return 'out';
  if (pointName === 'out') return 'in';
  if (pointName === 'in1') return 'out1';
  if (pointName === 'out1') return 'in1';
  if (pointName === 'in2') return 'out2';
  if (pointName === 'out2') return 'in2';
  return 'out';
}

/**
 * Build curve information for a connection
 */
function buildCurveInfo(
  connection: Connection,
  pieceMap: Map<string, TrackPiece>
): CurveInfo | null {
  const connectedPiece = pieceMap.get(connection.pieceId);
  if (!connectedPiece) return null;

  const connectedArchetype = getArchetype(connectedPiece.archetypeCode);
  if (!connectedArchetype || connectedArchetype.sections.length === 0) return null;

  const section = connectedArchetype.sections[0];
  if (section.splinePoints.length < 2) return null;

  // Build the spline curve in world coordinates (with Z negated for screen orientation)
  const cos = Math.cos(connectedPiece.rotation);
  const sin = Math.sin(connectedPiece.rotation);

  const toWorld = (local: { x: number; y: number; z: number }): THREE.Vector3 => {
    return new THREE.Vector3(
      connectedPiece.position.x + (local.x * cos - local.z * sin),
      local.y,
      -(connectedPiece.position.z + (local.x * sin + local.z * cos))
    );
  };

  const worldPoints = section.splinePoints.map(p => toWorld(p));
  const curve = new THREE.CatmullRomCurve3(worldPoints);
  const curveLength = curve.getLength();

  if (curveLength === 0) return null;

  const isFromIn = connection.pointName === 'in' || connection.pointName === 'in1';

  // Determine what's at the far end of this track
  const farEndPointName = getOppositePointName(connection.pointName);
  const farEndConnections = connectedPiece.connections.get(farEndPointName) || [];
  const farEndHasSwitch = farEndConnections.length > 1;

  // Check if the track connected at the far end leads to a switch (Case 3)
  // Scenario: S1 -> T1 -> T2 -> S2
  // We're on T1, checking if T2 leads to switch S2
  let farEndNextTrackHasSwitch = false;
  if (farEndConnections.length === 1) {
    const nextConnection = farEndConnections[0];  // T1's far end connects to T2
    const nextPiece = pieceMap.get(nextConnection.pieceId);  // T2
    if (nextPiece) {
      const nextFarEndPointName = getOppositePointName(nextConnection.pointName);  // T2's far end
      const nextFarEndConnections = nextPiece.connections.get(nextFarEndPointName) || [];

      if (nextFarEndConnections.length > 1) {
        // T2's far end itself is a switch point
        farEndNextTrackHasSwitch = true;
      } else if (nextFarEndConnections.length === 1) {
        // T2's far end connects to one piece (S2) - check if that connection point is a switch
        const thirdConnection = nextFarEndConnections[0];  // T2 connects to S2
        const thirdPiece = pieceMap.get(thirdConnection.pieceId);  // S2
        if (thirdPiece) {
          // Check if the point on S2 that T2 connects to has multiple connections (is a switch)
          const thirdPointConnections = thirdPiece.connections.get(thirdConnection.pointName) || [];
          farEndNextTrackHasSwitch = thirdPointConnections.length > 1;
        }
      }
    }
  }

  return { curve, curveLength, isFromIn, farEndHasSwitch, farEndNextTrackHasSwitch };
}

/**
 * Get position along a curve at a given distance from the connection point
 */
function getPositionAtDistance(
  info: CurveInfo,
  distance: number
): { x: number; z: number } {
  const t = info.isFromIn
    ? Math.min(distance / info.curveLength, 1.0)
    : Math.max(1.0 - distance / info.curveLength, 0.0);

  const point = info.curve.getPointAt(t);
  return { x: point.x, z: point.z };
}

/**
 * Determine the indicator placement fraction based on track configuration.
 * Case 1: Track has switches at both ends -> 40%
 * Case 2: Track has switch at one end only -> 100% (far end)
 * Case 3: Track leads to another track that has a switch -> 66%
 */
function getIndicatorFraction(info: CurveInfo): number {
  if (info.farEndHasSwitch) {
    // Case 1: Both ends are switches - place at 40%
    return INDICATOR_FRACTION_SHARED_TRACK;
  } else if (info.farEndNextTrackHasSwitch) {
    // Case 3: Next track after this one has a switch - place at 66%
    return INDICATOR_FRACTION_CONSECUTIVE_TRACKS;
  } else {
    // Case 2: Only our end is a switch - place at far end (100%)
    return INDICATOR_FRACTION_SINGLE_SWITCH;
  }
}

/**
 * Get the indicator distance for a specific curve based on its configuration
 */
function getIndicatorDistanceForCurve(info: CurveInfo): number {
  const fraction = getIndicatorFraction(info);
  return Math.min(info.curveLength * fraction, MAX_INDICATOR_DISTANCE);
}

