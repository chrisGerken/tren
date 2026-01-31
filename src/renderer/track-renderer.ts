/**
 * Track Piece Renderer - creates Three.js geometry for track pieces
 */

import * as THREE from 'three';
import { TrackPiece, Layout, Connection } from '../core/types';
import { getArchetype, TrackArchetype } from '../core/archetypes';
import { TrackScene } from './scene';

// Track colors
const TRACK_COLOR = 0x8B4513;  // Brown
const CONNECTION_POINT_COLOR = 0x0066cc;  // Blue
const AUTO_CONNECT_COLOR = 0xffcc00;  // Yellow for auto-connected points
const GENERATOR_COLOR = 0x22aa22;  // Green
const BIN_COLOR = 0xcc2222;  // Red
const BUMPER_COLOR = 0x444444;  // Dark gray
const SWITCH_SELECTED_COLOR = 0x00ff00;  // Bright green for selected route
const SWITCH_UNSELECTED_COLOR = 0xff0000;  // Red for unselected routes

// Set to true to show simplified debug view
const DEBUG_MODE = false;

// Set to true to enable console logging for debugging
const DEBUG_LOGGING = false;

// Track selected routes for virtual switches
// Key: "pieceId.pointName", Value: index of selected connection (0-based)
const selectedRoutes = new Map<string, number>();

/**
 * Get or initialize the selected route for a switch point
 */
function getSelectedRoute(pieceId: string, pointName: string): number {
  const key = `${pieceId}.${pointName}`;
  if (!selectedRoutes.has(key)) {
    selectedRoutes.set(key, 0); // Default to first connection
  }
  const value = selectedRoutes.get(key)!;
  if (DEBUG_LOGGING) console.log(`getSelectedRoute: ${key} = ${value}`);
  return value;
}

/**
 * Set the selected route for a switch point
 */
export function setSelectedRoute(pieceId: string, pointName: string, connectionIndex: number): void {
  const key = `${pieceId}.${pointName}`;
  if (DEBUG_LOGGING) console.log(`setSelectedRoute: ${key} = ${connectionIndex}`);
  selectedRoutes.set(key, connectionIndex);
}

/**
 * Get the selected routes map for use by simulation
 */
export function getSelectedRoutes(): Map<string, number> {
  return selectedRoutes;
}

/**
 * Render a complete layout
 */
export function renderLayout(scene: TrackScene, layout: Layout): void {
  scene.clearLayout();

  // Build a map for quick piece lookup
  const pieceMap = new Map<string, TrackPiece>();
  for (const piece of layout.pieces) {
    pieceMap.set(piece.id, piece);
  }

  for (const piece of layout.pieces) {
    const archetype = getArchetype(piece.archetypeCode);
    const group = DEBUG_MODE
      ? renderTrackPieceDebug(piece, archetype)
      : renderTrackPiece(piece, archetype, pieceMap);
    scene.addTrackGroup(group);

    // Add label if piece has one
    if (piece.label) {
      // Calculate piece center from connection points
      const center = getPieceCenter(piece, archetype);
      // Add slight offset perpendicular to track to avoid overlap
      const labelOffset = 2;
      const offsetX = Math.cos(piece.rotation + Math.PI / 2) * labelOffset;
      const offsetZ = Math.sin(piece.rotation + Math.PI / 2) * labelOffset;
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

  // Helper to transform local to world
  const toWorld = (local: { x: number; z: number }) => ({
    x: piece.position.x + (local.x * cos - local.z * sin),
    z: piece.position.z + (local.x * sin + local.z * cos),
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
    const material = new THREE.LineBasicMaterial({ color: TRACK_COLOR, linewidth: 2 });
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

    console.log(`  ${piece.id}.${cp.name}: world=(${world.x.toFixed(3)}, ${world.z.toFixed(3)})`);
  }

  // Log piece position for debugging
  console.log(`Piece ${piece.id} (${archetype.code}): pos=(${piece.position.x.toFixed(2)}, ${piece.position.z.toFixed(2)}), rot=${(piece.rotation * 180 / Math.PI).toFixed(1)}°`);

  return group;
}

/**
 * Render a single track piece using explicit world coordinates
 */
function renderTrackPiece(
  piece: TrackPiece,
  archetype: TrackArchetype,
  pieceMap: Map<string, TrackPiece>
): THREE.Group {
  const group = new THREE.Group();

  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  // Helper to transform local to world
  const toWorld = (local: { x: number; y: number; z: number }): THREE.Vector3 => {
    return new THREE.Vector3(
      piece.position.x + (local.x * cos - local.z * sin),
      local.y,
      piece.position.z + (local.x * sin + local.z * cos)
    );
  };

  // Render track sections (skip for gen/bin - they have internal invisible sections)
  const isGenOrBin = archetype.code === 'gen' || archetype.code === 'bin';
  if (!isGenOrBin) {
    for (const section of archetype.sections) {
      if (section.splinePoints.length >= 2) {
        // Transform spline points to world coordinates
        const worldPoints = section.splinePoints.map(p => toWorld(p));
        const sectionMesh = renderTrackSectionWorld(worldPoints);
        group.add(sectionMesh);
      }
    }
  }
  if (!isGenOrBin) {
    for (const cp of archetype.connectionPoints) {
      const worldPos = toWorld({ x: cp.position.x, y: 0, z: cp.position.z });
      // Check if this point has auto-connections
      const connections = piece.connections.get(cp.name) || [];
      const hasAutoConnect = connections.some(c => c.isAutoConnect);
      const cpMesh = renderConnectionPointWorld(worldPos, hasAutoConnect);
      group.add(cpMesh);

      // Render switch indicators if this is a virtual switch (multiple connections)
      if (connections.length > 1) {
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
  }

  // Special rendering for generator/bin
  if (archetype.code === 'gen') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const genMesh = renderGeneratorWorld(worldPos);
    group.add(genMesh);
  } else if (archetype.code === 'bin') {
    const worldPos = toWorld({ x: 0, y: 0, z: 0 });
    const binMesh = renderBinWorld(worldPos);
    group.add(binMesh);
  } else if (archetype.code === 'bump' || archetype.code === 'bumper') {
    const bumperMesh = renderBumperStopWorld(piece, archetype, toWorld);
    group.add(bumperMesh);
  }

  return group;
}

/**
 * Render a track section as a tube - points already in world coordinates
 */
function renderTrackSectionWorld(worldPoints: THREE.Vector3[]): THREE.Mesh {
  // Create spline curve
  const curve = new THREE.CatmullRomCurve3(worldPoints);

  // Create tube geometry
  const tubeRadius = 0.2;  // Track width in inches
  const tubularSegments = Math.max(16, worldPoints.length * 8);
  const radialSegments = 8;

  const geometry = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false);
  const material = new THREE.MeshStandardMaterial({
    color: TRACK_COLOR,
    roughness: 0.7,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.2; // Slightly above ground

  return mesh;
}

/**
 * Render a connection point as a small sphere at world position
 * @param worldPos - Position in world coordinates
 * @param isAutoConnect - True if this point has auto-connections (yellow) vs explicit (blue)
 */
function renderConnectionPointWorld(worldPos: THREE.Vector3, isAutoConnect: boolean = false): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.25, 16, 16);
  const color = isAutoConnect ? AUTO_CONNECT_COLOR : CONNECTION_POINT_COLOR;
  const material = new THREE.MeshBasicMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(worldPos.x, 0.5, worldPos.z);

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
 * Calculate the center of a track piece in world coordinates
 */
function getPieceCenter(piece: TrackPiece, archetype: TrackArchetype): { x: number; z: number } {
  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  // Transform local point to world
  const toWorld = (local: { x: number; z: number }) => ({
    x: piece.position.x + (local.x * cos - local.z * sin),
    z: piece.position.z + (local.x * sin + local.z * cos),
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

  // Fallback to piece position
  return { x: piece.position.x, z: piece.position.z };
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
    const cos = Math.cos(piece.rotation);
    const sin = Math.sin(piece.rotation);
    const worldTangent = {
      x: localTangent.x * cos - localTangent.z * sin,
      z: localTangent.x * sin + localTangent.z * cos,
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
  // Negate because Three.js Y rotation is opposite to our coordinate system convention
  mesh.rotation.y = -tangentAngle;

  return mesh;
}

// Minimum separation distance between switch indicators (inches)
const MIN_INDICATOR_SEPARATION = 4.0;
// Step size when searching for optimal indicator distance (inches)
const INDICATOR_STEP_SIZE = 0.25;
// Maximum distance to search along track (inches)
const MAX_INDICATOR_DISTANCE = 30.0;

/**
 * Information about a track curve for indicator positioning
 */
interface CurveInfo {
  curve: THREE.CatmullRomCurve3;
  curveLength: number;
  isFromIn: boolean;
}

/**
 * Render switch indicators (green for selected route, red for others)
 * Positioned along the outgoing tracks where they've visually separated.
 * All indicators are placed at the same distance from the connection point,
 * at the minimum distance where they are all at least MIN_INDICATOR_SEPARATION apart.
 */
function renderSwitchIndicators(
  piece: TrackPiece,
  pointName: string,
  _worldPos: THREE.Vector3,
  connections: Connection[],
  pieceMap: Map<string, TrackPiece>
): THREE.Mesh[] {
  const indicators: THREE.Mesh[] = [];
  const selectedIndex = getSelectedRoute(piece.id, pointName);

  // Build curve info for each connection
  const curveInfos: (CurveInfo | null)[] = [];
  for (const connection of connections) {
    const curveInfo = buildCurveInfo(connection, pieceMap);
    curveInfos.push(curveInfo);
  }

  // Find minimum distance where all indicators are separated enough
  const distance = findOptimalIndicatorDistance(curveInfos);

  // Calculate positions at the optimal distance
  const positions = curveInfos.map(info =>
    info ? getPositionAtDistance(info, distance) : null
  );

  // Create indicator meshes
  for (let i = 0; i < connections.length; i++) {
    const pos = positions[i];
    if (!pos) continue;

    const isSelected = i === selectedIndex;
    const color = isSelected ? SWITCH_SELECTED_COLOR : SWITCH_UNSELECTED_COLOR;
    const geometry = new THREE.SphereGeometry(0.35, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, 0.7, pos.z);

    // Store metadata for click handling
    mesh.userData = {
      isSwitchIndicator: true,
      pieceId: piece.id,
      pointName: pointName,
      connectionIndex: i,
    };

    indicators.push(mesh);
  }

  return indicators;
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

  // Build the spline curve in world coordinates
  const cos = Math.cos(connectedPiece.rotation);
  const sin = Math.sin(connectedPiece.rotation);

  const toWorld = (local: { x: number; y: number; z: number }): THREE.Vector3 => {
    return new THREE.Vector3(
      connectedPiece.position.x + (local.x * cos - local.z * sin),
      local.y,
      connectedPiece.position.z + (local.x * sin + local.z * cos)
    );
  };

  const worldPoints = section.splinePoints.map(p => toWorld(p));
  const curve = new THREE.CatmullRomCurve3(worldPoints);
  const curveLength = curve.getLength();

  if (curveLength === 0) return null;

  const isFromIn = connection.pointName === 'in' || connection.pointName === 'in1';

  return { curve, curveLength, isFromIn };
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
 * Find the minimum distance from connection point where all indicators
 * are at least MIN_INDICATOR_SEPARATION apart from each other
 */
function findOptimalIndicatorDistance(curveInfos: (CurveInfo | null)[]): number {
  const validInfos = curveInfos.filter((info): info is CurveInfo => info !== null);

  // If only one connection, use minimum distance
  if (validInfos.length < 2) {
    return INDICATOR_STEP_SIZE;
  }

  // Search for minimum distance where all pairs are separated enough
  for (let distance = INDICATOR_STEP_SIZE; distance <= MAX_INDICATOR_DISTANCE; distance += INDICATOR_STEP_SIZE) {
    const positions = validInfos.map(info => getPositionAtDistance(info, distance));

    if (allPairsSeparated(positions, MIN_INDICATOR_SEPARATION)) {
      return distance;
    }
  }

  // If we couldn't find separation, use max distance
  return MAX_INDICATOR_DISTANCE;
}

/**
 * Check if all pairs of positions are at least minSeparation apart
 */
function allPairsSeparated(
  positions: { x: number; z: number }[],
  minSeparation: number
): boolean {
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dz = positions[i].z - positions[j].z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minSeparation) {
        return false;
      }
    }
  }
  return true;
}
