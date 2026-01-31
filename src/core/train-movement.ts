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

  const result = getPositionOnSection(piece, 0, car.distanceAlongSection);
  if (result) {
    car.worldPosition = result.position;
    car.rotation = result.rotation;
  }
}

/**
 * Get the next section when exiting a piece at a connection point
 */
export function getNextSection(
  pieceId: string,
  exitPoint: string,
  layout: Layout,
  selectedRoutes: Map<string, number>
): { pieceId: string; entryPoint: string } | null {
  const piece = layout.pieces.find(p => p.id === pieceId);
  if (!piece) return null;

  const connections = piece.connections.get(exitPoint);
  if (!connections || connections.length === 0) {
    return null; // Dead end
  }

  if (connections.length === 1) {
    // Single connection
    return {
      pieceId: connections[0].pieceId,
      entryPoint: connections[0].pointName,
    };
  }

  // Multiple connections - virtual switch
  const routeKey = `${pieceId}.${exitPoint}`;
  const selectedIndex = selectedRoutes.get(routeKey) ?? 0;
  const connection = connections[Math.min(selectedIndex, connections.length - 1)];

  return {
    pieceId: connection.pieceId,
    entryPoint: connection.pointName,
  };
}

/**
 * Move a car along the track by a distance
 * Handles section transitions at boundaries
 */
export function moveCar(
  car: Car,
  distance: number,
  layout: Layout,
  selectedRoutes: Map<string, number>
): void {
  car.distanceAlongSection += distance;

  const piece = layout.pieces.find(p => p.id === car.currentPieceId);
  if (!piece) return;

  const sectionLength = getSectionLength(piece, 0);

  // Handle overflow (moving past end of section)
  while (car.distanceAlongSection >= sectionLength && sectionLength > 0) {
    const overflow = car.distanceAlongSection - sectionLength;

    // Determine exit point based on direction
    const exitPoint = 'out'; // Simplified: assume forward direction exits via 'out'

    const nextSection = getNextSection(car.currentPieceId, exitPoint, layout, selectedRoutes);
    if (!nextSection) {
      // Dead end - stop at end of section
      car.distanceAlongSection = sectionLength;
      return;
    }

    // Transition to next section
    car.currentPieceId = nextSection.pieceId;
    // Entry point determines where we start on the new section
    // If entering via 'in', start at 0; if entering via 'out', start at end
    const newPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
    if (newPiece) {
      const newSectionLength = getSectionLength(newPiece, 0);
      if (nextSection.entryPoint === 'out') {
        // Entering from the 'out' end, so we're at the end going backwards
        car.distanceAlongSection = newSectionLength - overflow;
      } else {
        // Entering from 'in', start at beginning
        car.distanceAlongSection = overflow;
      }
    } else {
      car.distanceAlongSection = overflow;
    }

    // Get new section length for next iteration
    const newPieceForLength = layout.pieces.find(p => p.id === car.currentPieceId);
    if (!newPieceForLength) break;
  }

  // Handle underflow (moving past start of section - reverse)
  while (car.distanceAlongSection < 0) {
    const underflow = -car.distanceAlongSection;

    const exitPoint = 'in'; // Exiting backwards via 'in'

    const nextSection = getNextSection(car.currentPieceId, exitPoint, layout, selectedRoutes);
    if (!nextSection) {
      // Dead end
      car.distanceAlongSection = 0;
      return;
    }

    car.currentPieceId = nextSection.pieceId;
    const newPiece = layout.pieces.find(p => p.id === nextSection.pieceId);
    if (newPiece) {
      const newSectionLength = getSectionLength(newPiece, 0);
      if (nextSection.entryPoint === 'in') {
        car.distanceAlongSection = underflow;
      } else {
        car.distanceAlongSection = newSectionLength - underflow;
      }
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
  selectedRoutes: Map<string, number>
): void {
  for (const car of cars) {
    moveCar(car, distance, layout, selectedRoutes);
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
