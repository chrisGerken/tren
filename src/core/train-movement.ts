/**
 * Train Movement - handles spline traversal and section transitions
 */

import * as THREE from 'three';
import { Car, Layout, TrackPiece, Vec3 } from './types';
import { getArchetype } from './archetypes';

// Car dimensions in inches
export const CAB_LENGTH = 4;
export const CAR_LENGTH = 3;
export const CAR_GAP = 0.5;

/**
 * Get the length of a track section in inches
 */
export function getSectionLength(piece: TrackPiece, sectionIndex: number): number {
  const archetype = getArchetype(piece.archetypeCode);
  if (!archetype || sectionIndex >= archetype.sections.length) {
    return 0;
  }

  const section = archetype.sections[sectionIndex];
  if (section.splinePoints.length < 2) {
    return 0;
  }

  // Transform spline points to world coordinates and calculate length
  const worldPoints = transformSplineToWorld(section.splinePoints, piece);
  const curve = new THREE.CatmullRomCurve3(worldPoints);
  return curve.getLength();
}

/**
 * Transform local spline points to world coordinates
 */
function transformSplineToWorld(points: Vec3[], piece: TrackPiece): THREE.Vector3[] {
  const cos = Math.cos(piece.rotation);
  const sin = Math.sin(piece.rotation);

  return points.map(p => new THREE.Vector3(
    piece.position.x + (p.x * cos - p.z * sin),
    p.y,
    piece.position.z + (p.x * sin + p.z * cos)
  ));
}

/**
 * Get world position and rotation at a distance along a section
 */
export function getPositionOnSection(
  piece: TrackPiece,
  sectionIndex: number,
  distance: number
): { position: Vec3; rotation: number } | null {
  const archetype = getArchetype(piece.archetypeCode);
  if (!archetype || sectionIndex >= archetype.sections.length) {
    return null;
  }

  const section = archetype.sections[sectionIndex];
  if (section.splinePoints.length < 2) {
    // Zero-length piece (like gen, bin, placeholder)
    return {
      position: {
        x: piece.position.x,
        y: 0,
        z: piece.position.z,
      },
      rotation: piece.rotation,
    };
  }

  const worldPoints = transformSplineToWorld(section.splinePoints, piece);
  const curve = new THREE.CatmullRomCurve3(worldPoints);
  const curveLength = curve.getLength();

  if (curveLength === 0) {
    return {
      position: { x: piece.position.x, y: 0, z: piece.position.z },
      rotation: piece.rotation,
    };
  }

  // Clamp t to valid range
  const t = Math.max(0, Math.min(1, distance / curveLength));

  const point = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);
  const rotation = Math.atan2(tangent.z, tangent.x);

  return {
    position: { x: point.x, y: 0, z: point.z },
    rotation,
  };
}

/**
 * Update a car's world position and rotation based on its track position
 */
export function updateCarWorldPosition(car: Car, layout: Layout): void {
  const piece = layout.pieces.find(p => p.id === car.currentPieceId);
  if (!piece) return;

  const sectionIndex = getSectionIndexForEntry(car.entryPoint);
  const result = getPositionOnSection(piece, sectionIndex, car.distanceAlongSection);
  if (result) {
    car.worldPosition = result.position;
    car.rotation = result.rotation;
  }
}

/**
 * Determine if a connection point name is an "in" type
 */
export function isInPoint(pointName: string): boolean {
  return pointName === 'in' || pointName === 'in1' || pointName === 'in2';
}

/**
 * Determine if a connection point name is an "out" type
 */
export function isOutPoint(pointName: string): boolean {
  return pointName === 'out' || pointName === 'out1' || pointName === 'out2';
}

/**
 * Determine the section index for a given entry point.
 * For crossings: in1/out1 -> section 0, in2/out2 -> section 1
 * For regular pieces: always section 0
 */
export function getSectionIndexForEntry(entryPoint: string | undefined): number {
  if (!entryPoint) return 0;
  if (entryPoint === 'in2' || entryPoint === 'out2') return 1;
  return 0; // 'in', 'out', 'in1', 'out1' all use section 0
}

/**
 * Get the next section when exiting a piece at a connection point
 * If trainRoutes is provided, use/record the route taken by the train
 * (ensures all cars in a train take the same route at switches)
 *
 * @param previousPieceId - The piece the car was on before the current piece (to avoid routing back)
 * @param travelDirection - 'forward' if traveling in->out, 'backward' if traveling out->in
 * @param routesToClearAfterLastCar - If provided, routes used from trainRoutes will be added here
 */
export function getNextSection(
  pieceId: string,
  exitPoint: string,
  layout: Layout,
  selectedRoutes: Map<string, number>,
  trainRoutes?: Map<string, number>,
  previousPieceId?: string,
  travelDirection?: 'forward' | 'backward',
  routesToClearAfterLastCar?: Set<string>
): { pieceId: string; entryPoint: string } | null {
  const piece = layout.pieces.find(p => p.id === pieceId);
  if (!piece) return null;

  const allConnections = piece.connections.get(exitPoint);
  if (!allConnections || allConnections.length === 0) {
    return null; // Dead end
  }

  // Filter out the connection back to previous piece
  const validConnections = allConnections.filter(c => c.pieceId !== previousPieceId);

  if (validConnections.length === 0) {
    return null; // Only connection is back to where we came from
  }

  if (validConnections.length === 1) {
    return {
      pieceId: validConnections[0].pieceId,
      entryPoint: validConnections[0].pointName,
    };
  }

  // Multiple connections - this is a switch
  // Separate into "forward" (entering via 'in') and "backward" (entering via 'out') groups
  const forwardConnections = validConnections.filter(c => isInPoint(c.pointName));
  const backwardConnections = validConnections.filter(c => isOutPoint(c.pointName));

  // Determine which group to use based on travel direction
  // Forward travel should use forward connections (entering next piece via 'in')
  // Backward travel should use backward connections (entering next piece via 'out')
  let connections: typeof validConnections;
  let switchDirection: 'fwd' | 'bwd';

  if (travelDirection === 'backward') {
    // Backward travel prefers backward connections
    if (backwardConnections.length > 0) {
      connections = backwardConnections;
      switchDirection = 'bwd';
    } else {
      connections = forwardConnections;
      switchDirection = 'fwd';
    }
  } else {
    // Forward travel (default) prefers forward connections
    if (forwardConnections.length > 0) {
      connections = forwardConnections;
      switchDirection = 'fwd';
    } else {
      connections = backwardConnections;
      switchDirection = 'bwd';
    }
  }

  if (connections.length === 0) {
    // Shouldn't happen, but fall back to all valid
    connections = validConnections;
    switchDirection = 'fwd';
  }

  if (connections.length === 1) {
    return {
      pieceId: connections[0].pieceId,
      entryPoint: connections[0].pointName,
    };
  }

  // Multiple connections in the same direction group - use switch
  // Use canonical junction ID so all pieces at this junction share the same switch state
  // The canonical ID includes piece.point pairs to distinguish different connection points on same piece
  const junctionPoints = allConnections.map(c => `${c.pieceId}.${c.pointName}`);
  junctionPoints.push(`${pieceId}.${exitPoint}`);
  junctionPoints.sort();
  const canonicalJunctionId = junctionPoints[0];

  // Route key uses canonical junction ID so all inbound tracks share the same switch
  const routeKey = `junction.${canonicalJunctionId}.${switchDirection}`;

  let selectedIndex: number;
  if (trainRoutes?.has(routeKey)) {
    // Use stored route (ensures all cars take same path)
    selectedIndex = trainRoutes.get(routeKey)!;
    // If this is the last car, mark this route for clearing after it passes
    if (routesToClearAfterLastCar) {
      routesToClearAfterLastCar.add(routeKey);
    }
  } else {
    // First car to cross - determine route and record it
    if (layout.randomSwitches) {
      // Random mode: randomly select a route
      selectedIndex = Math.floor(Math.random() * connections.length);
    } else {
      // Normal mode: use current switch setting
      selectedIndex = selectedRoutes.get(routeKey) ?? 0;
    }
    if (trainRoutes) {
      trainRoutes.set(routeKey, selectedIndex);
    }
  }

  const connection = connections[Math.min(selectedIndex, connections.length - 1)];

  return {
    pieceId: connection.pieceId,
    entryPoint: connection.pointName,
  };
}

/**
 * Get the opposite connection point name
 */
export function getOppositePoint(pointName: string): string {
  if (pointName === 'in') return 'out';
  if (pointName === 'out') return 'in';
  if (pointName === 'in1') return 'out1';
  if (pointName === 'out1') return 'in1';
  if (pointName === 'in2') return 'out2';
  if (pointName === 'out2') return 'in2';
  return 'out'; // default
}

/**
 * Move a car along the track by a distance
 * Handles section transitions at boundaries
 * trainRoutes ensures all cars in a train take the same route at switches
 *
 * @param routesToClearAfterLastCar - If provided (for last car), routes used will be added here for clearing
 */
export function moveCar(
  car: Car,
  distance: number,
  layout: Layout,
  selectedRoutes: Map<string, number>,
  trainRoutes?: Map<string, number>,
  routesToClearAfterLastCar?: Set<string>
): void {
  car.distanceAlongSection += distance;

  let piece = layout.pieces.find(p => p.id === car.currentPieceId);
  if (!piece) return;

  let sectionIndex = getSectionIndexForEntry(car.entryPoint);
  let sectionLength = getSectionLength(piece, sectionIndex);

  // For zero-length pieces (placeholder, etc.), immediately transition to next piece
  // Exit via the OPPOSITE of entry point to maintain direction
  let safetyCounter = 0;
  while (sectionLength === 0 && safetyCounter < 10) {
    safetyCounter++;

    // Determine exit point: opposite of entry, or based on distance if no entry recorded
    let exitPoint: string;
    let travelDirection: 'forward' | 'backward';

    if (car.entryPoint) {
      // Exit via opposite of where we entered
      exitPoint = getOppositePoint(car.entryPoint);
      // Travel direction: if we entered via 'in' and exit via 'out', we're going forward
      travelDirection = isInPoint(car.entryPoint) ? 'forward' : 'backward';
    } else {
      // No entry point recorded (e.g., spawned here) - use distance to guess
      exitPoint = car.distanceAlongSection >= 0 ? 'out' : 'in';
      travelDirection = 'forward';
    }

    const nextSection = getNextSection(
      car.currentPieceId, exitPoint, layout, selectedRoutes, trainRoutes,
      car.previousPieceId, travelDirection, routesToClearAfterLastCar
    );
    if (!nextSection) {
      car.distanceAlongSection = 0;
      updateCarWorldPosition(car, layout);
      return;
    }

    car.previousPieceId = car.currentPieceId;
    car.currentPieceId = nextSection.pieceId;
    car.entryPoint = nextSection.entryPoint;
    piece = layout.pieces.find(p => p.id === car.currentPieceId);
    if (!piece) return;
    sectionIndex = getSectionIndexForEntry(car.entryPoint);
    sectionLength = getSectionLength(piece, sectionIndex);
  }

  // Handle overflow (moving past end of section - forward direction)
  while (car.distanceAlongSection >= sectionLength && sectionLength > 0) {
    const overflow = car.distanceAlongSection - sectionLength;
    const exitPoint = 'out';

    const nextSection = getNextSection(
      car.currentPieceId, exitPoint, layout, selectedRoutes, trainRoutes,
      car.previousPieceId, 'forward', routesToClearAfterLastCar
    );
    if (!nextSection) {
      car.distanceAlongSection = sectionLength;
      return;
    }

    car.previousPieceId = car.currentPieceId;
    car.currentPieceId = nextSection.pieceId;
    car.entryPoint = nextSection.entryPoint;

    const newPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
    if (newPiece) {
      const newSectionIndex = getSectionIndexForEntry(nextSection.entryPoint);
      const newSectionLength = getSectionLength(newPiece, newSectionIndex);
      if (isOutPoint(nextSection.entryPoint)) {
        // Entering from 'out' end - we're at the end, going backwards on this piece
        car.distanceAlongSection = newSectionLength - overflow;
      } else {
        // Entering from 'in' - start at beginning, going forward
        car.distanceAlongSection = overflow;
      }
      sectionLength = newSectionLength;
    } else {
      car.distanceAlongSection = overflow;
      break;
    }
  }

  // Handle underflow (moving past start of section - backward direction)
  while (car.distanceAlongSection < 0 && sectionLength > 0) {
    const exitPoint = 'in';

    const nextSection = getNextSection(
      car.currentPieceId, exitPoint, layout, selectedRoutes, trainRoutes,
      car.previousPieceId, 'backward', routesToClearAfterLastCar
    );
    if (!nextSection) {
      // Dead end or entering zero-length piece - stop here
      car.distanceAlongSection = 0;
      break;
    }

    const nextPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
    if (nextPiece) {
      const nextSectionIndex = getSectionIndexForEntry(nextSection.entryPoint);
      const nextSectionLength = getSectionLength(nextPiece, nextSectionIndex);
      if (nextSectionLength === 0) {
        // Don't transition into zero-length piece going backward
        car.distanceAlongSection = 0;
        break;
      }

      const underflow = -car.distanceAlongSection;
      car.previousPieceId = car.currentPieceId;
      car.currentPieceId = nextSection.pieceId;
      car.entryPoint = nextSection.entryPoint;

      if (isInPoint(nextSection.entryPoint)) {
        // Entering via 'in' while going backward - start at beginning
        car.distanceAlongSection = underflow;
      } else {
        // Entering via 'out' - we're at the end
        car.distanceAlongSection = nextSectionLength - underflow;
      }
      sectionLength = nextSectionLength;
    } else {
      break;
    }
  }

  // Update world position
  updateCarWorldPosition(car, layout);
}

/**
 * Move all cars in a train
 */
export function moveTrain(
  cars: Car[],
  distance: number,
  layout: Layout,
  selectedRoutes: Map<string, number>,
  trainRoutes?: Map<string, number>
): void {
  for (const car of cars) {
    moveCar(car, distance, layout, selectedRoutes, trainRoutes);
  }
}

/**
 * Update car visibility based on gen/bin
 */
export function updateCarVisibility(car: Car, layout: Layout): void {
  const piece = layout.pieces.find(p => p.id === car.currentPieceId);
  if (!piece) return;

  const archetype = getArchetype(piece.archetypeCode);
  if (!archetype) return;

  if (archetype.code === 'gen') {
    // Car becomes visible when it has moved past the generator
    car.visible = car.distanceAlongSection > 0;
  } else if (archetype.code === 'bin') {
    // Car becomes invisible when it enters the bin
    car.visible = false;
  }
  // For regular track, visibility stays as-is
}
