/**
 * Layout Builder - transforms AST into placed track pieces
 */

import { parse, Statement, PieceStatement, NewStatement, ReferenceStatement, LoopCloseStatement, TitleStatement, DescriptionStatement, SpliceStatement } from './parser';
import { Layout, TrackPiece, Vec3, vec2, ConnectionPointDef } from '../core/types';
import { getArchetype, registerRuntimeArchetype } from '../core/archetypes';
import type { TrackArchetype } from '../core/archetypes';

interface SpliceInfo {
  label?: string;
  point?: string;
  // If no label, use these (captured at parse time)
  currentPieceId?: string;
  currentPointName?: string;
  line: number;
}

interface Segment {
  pieces: TrackPiece[];
  startPosition: Vec3;
  startRotation: number;
}

interface BuilderState {
  pieces: TrackPiece[];
  labeledPieces: Map<string, TrackPiece>;
  segments: Segment[];
  currentSegment: Segment;
  currentPosition: Vec3;
  currentRotation: number;
  currentPiece: TrackPiece | null;
  currentPointName: string;
  nextPieceId: number;
  title?: string;
  descriptions: string[];
  pendingSplices: SpliceInfo[];
}

/**
 * Build a layout from DSL text
 */
export function buildLayout(input: string): Layout {
  const statements = parse(input);
  const builder = new LayoutBuilder();
  return builder.build(statements);
}

class LayoutBuilder {
  private state: BuilderState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): BuilderState {
    const initialSegment: Segment = {
      pieces: [],
      startPosition: vec2(0, 0),
      startRotation: 0,
    };

    return {
      pieces: [],
      labeledPieces: new Map(),
      segments: [],
      currentSegment: initialSegment,
      currentPosition: vec2(0, 0),
      currentRotation: 0,
      currentPiece: null,
      currentPointName: 'out',
      nextPieceId: 1,
      title: undefined,
      descriptions: [],
      pendingSplices: [],
    };
  }

  build(statements: Statement[]): Layout {
    for (const stmt of statements) {
      this.processStatement(stmt);
    }

    // Finalize current segment
    if (this.state.currentSegment.pieces.length > 0) {
      this.state.segments.push(this.state.currentSegment);
    }

    // Process pending splices (before auto-connect)
    this.processPendingSplices();

    // Detect auto-connections
    this.detectAutoConnections();

    return {
      title: this.state.title || 'Simulador de Tren',
      description: this.state.descriptions.length > 0
        ? this.state.descriptions.join(' ')
        : undefined,
      pieces: this.state.pieces,
    };
  }

  private processStatement(stmt: Statement): void {
    switch (stmt.type) {
      case 'new':
        this.processNew(stmt);
        break;
      case 'piece':
        this.processPiece(stmt);
        break;
      case 'reference':
        this.processReference(stmt);
        break;
      case 'loopClose':
        this.processLoopClose(stmt);
        break;
      case 'title':
        this.processTitle(stmt);
        break;
      case 'description':
        this.processDescription(stmt);
        break;
      case 'splice':
        this.processSplice(stmt);
        break;
    }
  }

  private processTitle(stmt: TitleStatement): void {
    if (this.state.title !== undefined) {
      throw new Error(`Duplicate title statement at line ${stmt.line}. Only one title allowed.`);
    }
    this.state.title = stmt.text;
  }

  private processDescription(stmt: DescriptionStatement): void {
    this.state.descriptions.push(stmt.text);
  }

  private processSplice(stmt: SpliceStatement): void {
    // Collect for post-processing (after all pieces are placed)
    // If no label provided, capture current piece/point for later use
    this.state.pendingSplices.push({
      label: stmt.label,
      point: stmt.point,
      currentPieceId: this.state.currentPiece?.id,
      currentPointName: this.state.currentPointName,
      line: stmt.line,
    });
  }

  private processNew(stmt: NewStatement): void {
    // Save current segment if it has pieces
    if (this.state.currentSegment.pieces.length > 0) {
      this.state.segments.push(this.state.currentSegment);
    }

    // Convert degrees to radians
    const degreesRadians = (stmt.degrees * Math.PI) / 180;

    // Check if starting from a labeled piece
    if (stmt.baseLabel) {
      const labeledPiece = this.state.labeledPieces.get(stmt.baseLabel);
      if (!labeledPiece) {
        throw new Error(`Unknown label '${stmt.baseLabel}' in 'new' at line ${stmt.line}`);
      }

      const archetype = getArchetype(labeledPiece.archetypeCode);
      const pointName = stmt.basePoint || 'out';
      const point = this.getConnectionPoint(archetype, pointName);

      if (!point) {
        throw new Error(`Connection point '${pointName}' not found on '${stmt.baseLabel}' at line ${stmt.line}`);
      }

      // Calculate world position of the connection point
      const rotatedPoint = this.rotatePoint(point.position, labeledPiece.rotation);
      const basePos: Vec3 = {
        x: labeledPiece.position.x + rotatedPoint.x,
        y: 0,
        z: labeledPiece.position.z + rotatedPoint.z,
      };

      // Calculate base direction from connection point
      const rotatedDir = this.rotatePoint(point.direction, labeledPiece.rotation);
      const baseAngle = Math.atan2(rotatedDir.z, rotatedDir.x);

      // Apply degrees rotation relative to base direction
      const worldRotation = baseAngle + degreesRadians;

      // Apply offset along the resulting direction
      const offsetPos: Vec3 = {
        x: basePos.x + Math.cos(worldRotation) * stmt.offset,
        y: 0,
        z: basePos.z + Math.sin(worldRotation) * stmt.offset,
      };

      this.state.currentSegment = {
        pieces: [],
        startPosition: offsetPos,
        startRotation: worldRotation,
      };
      this.state.currentPosition = offsetPos;
      this.state.currentRotation = worldRotation;
      this.state.currentPiece = labeledPiece;
      this.state.currentPointName = pointName;
    } else {
      // Start at origin with specified rotation and offset
      const worldRotation = degreesRadians;
      const startPos: Vec3 = {
        x: Math.cos(worldRotation) * stmt.offset,
        y: 0,
        z: Math.sin(worldRotation) * stmt.offset,
      };

      this.state.currentSegment = {
        pieces: [],
        startPosition: startPos,
        startRotation: worldRotation,
      };
      this.state.currentPosition = startPos;
      this.state.currentRotation = worldRotation;
      this.state.currentPiece = null;
      this.state.currentPointName = 'out';
    }
  }

  private processPiece(stmt: PieceStatement): void {
    const archetype = getArchetype(stmt.archetypeCode);

    for (let i = 0; i < stmt.count; i++) {
      const piece = this.placePiece(archetype, stmt.attachPoint);

      // Apply label only to the first piece (or last? Let's use first)
      if (i === 0 && stmt.label) {
        piece.label = stmt.label;
        this.state.labeledPieces.set(stmt.label, piece);
      }

      // Apply generator config for 'gen' pieces
      if (archetype.code === 'gen' && i === 0) {
        piece.genConfig = {
          cabCount: stmt.genCabs ?? 1,
          carCount: stmt.genCars ?? 5,
          speed: stmt.genSpeed,  // undefined means use default (12)
          frequency: stmt.genEvery,
          lastSpawnTime: -Infinity,  // Never spawned yet
          enabled: true,
        };
      }

      this.state.pieces.push(piece);
      this.state.currentSegment.pieces.push(piece);
      this.state.currentPiece = piece;
    }
  }

  private placePiece(archetype: TrackArchetype, explicitAttachPoint?: string): TrackPiece {
    // Determine which connection point to attach
    // For first piece of segment or pieces with only one connection, be flexible
    let attachPointName = explicitAttachPoint || 'in';
    let attachPoint = this.getConnectionPoint(archetype, attachPointName);

    // If 'in' doesn't exist (e.g., generator only has 'out'), use first available point
    if (!attachPoint) {
      if (archetype.connectionPoints.length > 0) {
        attachPoint = archetype.connectionPoints[0];
        attachPointName = attachPoint.name;
      } else {
        throw new Error(`No connection points found on archetype '${archetype.code}'`);
      }
    }

    // Determine continue point (opposite of attach)
    const continuePointName = this.getOppositePoint(archetype, attachPointName);
    const continuePoint = continuePointName ? this.getConnectionPoint(archetype, continuePointName) : null;

    // Calculate rotation to align attach point with current direction
    // The attach point's direction should face opposite to our incoming direction
    const attachDir = attachPoint.direction;
    const attachAngle = Math.atan2(attachDir.z, attachDir.x);

    // Incoming direction at current position (opposite of current point's direction)
    const incomingAngle = this.state.currentRotation + Math.PI;

    // Piece rotation aligns attach point direction with incoming direction
    const pieceRotation = incomingAngle - attachAngle;

    // Calculate piece world position
    // The attach point in local coords, rotated and translated
    const rotatedAttach = this.rotatePoint(attachPoint.position, pieceRotation);
    const piecePosition: Vec3 = {
      x: this.state.currentPosition.x - rotatedAttach.x,
      y: 0,
      z: this.state.currentPosition.z - rotatedAttach.z,
    };

    // Create the piece
    const piece: TrackPiece = {
      id: `piece_${this.state.nextPieceId++}`,
      archetypeCode: archetype.code,
      position: piecePosition,
      rotation: pieceRotation,
      connections: new Map(),
    };

    // Update current position and rotation for next piece
    if (continuePoint) {
      const rotatedContinue = this.rotatePoint(continuePoint.position, pieceRotation);
      this.state.currentPosition = {
        x: piecePosition.x + rotatedContinue.x,
        y: 0,
        z: piecePosition.z + rotatedContinue.z,
      };

      const continueDir = this.rotatePoint(continuePoint.direction, pieceRotation);
      this.state.currentRotation = Math.atan2(continueDir.z, continueDir.x);
      this.state.currentPointName = continuePointName!; // Non-null: continuePoint implies continuePointName is defined
    }

    return piece;
  }

  private processReference(stmt: ReferenceStatement): void {
    const labeledPiece = this.state.labeledPieces.get(stmt.label);
    if (!labeledPiece) {
      throw new Error(`Unknown label reference: $${stmt.label} at line ${stmt.line}`);
    }

    const archetype = getArchetype(labeledPiece.archetypeCode);
    const pointName = stmt.point || 'out';
    const point = this.getConnectionPoint(archetype, pointName);

    if (!point) {
      throw new Error(`Connection point '${pointName}' not found on labeled piece '${stmt.label}' at line ${stmt.line}`);
    }

    // Calculate world position of the connection point
    const rotatedPoint = this.rotatePoint(point.position, labeledPiece.rotation);
    this.state.currentPosition = {
      x: labeledPiece.position.x + rotatedPoint.x,
      y: 0,
      z: labeledPiece.position.z + rotatedPoint.z,
    };

    const rotatedDir = this.rotatePoint(point.direction, labeledPiece.rotation);
    this.state.currentRotation = Math.atan2(rotatedDir.z, rotatedDir.x);
    this.state.currentPiece = labeledPiece;
    this.state.currentPointName = pointName;
  }

  private processLoopClose(stmt: LoopCloseStatement): void {
    // Connect current segment's output to the labeled piece's specified point
    // This repositions all pieces in the current segment to align the connection
    const labeledPiece = this.state.labeledPieces.get(stmt.label);
    if (!labeledPiece) {
      throw new Error(`Unknown label reference in loop close: $${stmt.label} at line ${stmt.line}`);
    }

    const targetArchetype = getArchetype(labeledPiece.archetypeCode);
    const targetPoint = this.getConnectionPoint(targetArchetype, stmt.point);
    if (!targetPoint) {
      throw new Error(`Connection point '${stmt.point}' not found on '${stmt.label}' at line ${stmt.line}`);
    }

    // Calculate target world position and direction
    const targetWorldPos = this.rotatePoint(targetPoint.position, labeledPiece.rotation);
    const targetPos: Vec3 = {
      x: labeledPiece.position.x + targetWorldPos.x,
      y: 0,
      z: labeledPiece.position.z + targetWorldPos.z,
    };
    const targetDir = this.rotatePoint(targetPoint.direction, labeledPiece.rotation);
    const targetAngle = Math.atan2(targetDir.z, targetDir.x);

    // Current segment's output position and direction
    const currentPos = this.state.currentPosition;
    const currentAngle = this.state.currentRotation;

    // Calculate the transform needed to align current output with target
    // The current output direction should be OPPOSITE to target direction (facing each other)
    const desiredAngle = targetAngle + Math.PI; // Opposite direction
    const rotationDelta = desiredAngle - currentAngle;

    // Rotate all pieces in current segment around the segment's start position
    const segmentStart = this.state.currentSegment.startPosition;

    for (const piece of this.state.currentSegment.pieces) {
      // Rotate piece position around segment start
      const relX = piece.position.x - segmentStart.x;
      const relZ = piece.position.z - segmentStart.z;
      const rotated = this.rotatePoint({ x: relX, y: 0, z: relZ }, rotationDelta);
      piece.position.x = segmentStart.x + rotated.x;
      piece.position.z = segmentStart.z + rotated.z;

      // Update piece rotation
      piece.rotation += rotationDelta;
    }

    // Recalculate current position after rotation
    const relCurrentX = currentPos.x - segmentStart.x;
    const relCurrentZ = currentPos.z - segmentStart.z;
    const rotatedCurrent = this.rotatePoint({ x: relCurrentX, y: 0, z: relCurrentZ }, rotationDelta);
    const rotatedCurrentPos: Vec3 = {
      x: segmentStart.x + rotatedCurrent.x,
      y: 0,
      z: segmentStart.z + rotatedCurrent.z,
    };

    // Now translate all pieces so rotated current position matches target position
    const translateX = targetPos.x - rotatedCurrentPos.x;
    const translateZ = targetPos.z - rotatedCurrentPos.z;

    for (const piece of this.state.currentSegment.pieces) {
      piece.position.x += translateX;
      piece.position.z += translateZ;
    }

    // Update segment start position
    this.state.currentSegment.startPosition.x += translateX;
    this.state.currentSegment.startPosition.z += translateZ;

    // Create connection records
    if (this.state.currentPiece) {
      const currentConnections = this.state.currentPiece.connections.get(this.state.currentPointName) || [];
      currentConnections.push({
        pieceId: labeledPiece.id,
        pointName: stmt.point,
      });
      this.state.currentPiece.connections.set(this.state.currentPointName, currentConnections);

      // Bidirectional connection
      const labeledConnections = labeledPiece.connections.get(stmt.point) || [];
      labeledConnections.push({
        pieceId: this.state.currentPiece.id,
        pointName: this.state.currentPointName,
      });
      labeledPiece.connections.set(stmt.point, labeledConnections);
    }
  }

  private getConnectionPoint(archetype: TrackArchetype, name: string): ConnectionPointDef | undefined {
    return archetype.connectionPoints.find(cp => cp.name === name);
  }

  private getOppositePoint(archetype: TrackArchetype, pointName: string): string | undefined {
    // For standard pieces: in <-> out
    if (pointName === 'in') return archetype.connectionPoints.find(cp => cp.name === 'out') ? 'out' : undefined;
    if (pointName === 'out') return archetype.connectionPoints.find(cp => cp.name === 'in') ? 'in' : undefined;

    // For crossings: in1 <-> out1, in2 <-> out2
    if (pointName === 'in1') return 'out1';
    if (pointName === 'out1') return 'in1';
    if (pointName === 'in2') return 'out2';
    if (pointName === 'out2') return 'in2';

    return undefined;
  }

  private rotatePoint(point: Vec3, angle: number): Vec3 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos,
    };
  }

  /**
   * Process all pending splice statements.
   * Splices are processed after all pieces are placed but before auto-connect.
   */
  private processPendingSplices(): void {
    for (const splice of this.state.pendingSplices) {
      this.performSplice(splice);
    }
  }

  private performSplice(splice: SpliceInfo): void {
    let splicePiece: TrackPiece | undefined;
    let pointName: string;

    if (splice.label) {
      // Use labeled piece
      splicePiece = this.state.labeledPieces.get(splice.label);
      if (!splicePiece) {
        throw new Error(`Unknown label '${splice.label}' in splice at line ${splice.line}`);
      }
      pointName = splice.point || 'out';
    } else {
      // Use current piece (captured when splice statement was processed)
      if (!splice.currentPieceId) {
        throw new Error(`No current piece for splice at line ${splice.line}`);
      }
      splicePiece = this.state.pieces.find(p => p.id === splice.currentPieceId);
      if (!splicePiece) {
        throw new Error(`Current piece not found for splice at line ${splice.line}`);
      }
      pointName = splice.currentPointName || 'out';
    }

    const archetype = getArchetype(splicePiece.archetypeCode);
    const point = this.getConnectionPoint(archetype, pointName);

    if (!point) {
      throw new Error(`Connection point '${pointName}' not found on piece at line ${splice.line}`);
    }

    // Calculate world position of the splice point
    const rotatedPoint = this.rotatePoint(point.position, splicePiece.rotation);
    const spliceWorldPos: Vec3 = {
      x: splicePiece.position.x + rotatedPoint.x,
      y: 0,
      z: splicePiece.position.z + rotatedPoint.z,
    };

    // Calculate world direction at splice point
    const rotatedDir = this.rotatePoint(point.direction, splicePiece.rotation);

    // Find the piece that this point falls on
    // Use a generous tolerance since curves may have accumulated errors
    const POSITION_TOLERANCE = 2.0;
    let targetPiece: TrackPiece | null = null;
    let targetSectionIndex = 0;
    let splitT = 0.5;

    for (const piece of this.state.pieces) {
      // Skip the piece that contains the splice point itself
      if (piece.id === splicePiece.id) continue;

      const pieceArchetype = getArchetype(piece.archetypeCode);

      for (let sIdx = 0; sIdx < pieceArchetype.sections.length; sIdx++) {
        const section = pieceArchetype.sections[sIdx];
        if (section.splinePoints.length < 2) continue;

        // Transform spline points to world coordinates
        const worldPoints = section.splinePoints.map(p => {
          const rotated = this.rotatePoint(p, piece.rotation);
          return {
            x: piece.position.x + rotated.x,
            y: 0,
            z: piece.position.z + rotated.z,
          };
        });

        // Check if splice point is close to this spline
        const result = this.findClosestPointOnSpline(worldPoints, spliceWorldPos);
        if (result.distance <= POSITION_TOLERANCE) {
          targetPiece = piece;
          targetSectionIndex = sIdx;
          splitT = result.t;
          break;
        }
      }
      if (targetPiece) break;
    }

    if (!targetPiece) {
      const pointRef = splice.label ? `$${splice.label}.${pointName}` : `current piece .${pointName}`;
      console.warn(`No track found at splice point ${pointRef} (world pos: ${spliceWorldPos.x.toFixed(2)}, ${spliceWorldPos.z.toFixed(2)}) at line ${splice.line}`);

      // Mark the piece with "can't splice" label for visual debugging
      splicePiece.label = (splicePiece.label ? splicePiece.label + ' ' : '') + "can't splice";
      return; // Continue with layout, don't fail
    }

    // Split the target piece at splitT
    this.splitPieceAt(targetPiece, targetSectionIndex, splitT, spliceWorldPos, rotatedDir, splice.line);
  }

  private findClosestPointOnSpline(worldPoints: Vec3[], target: Vec3): { t: number; distance: number } {
    // Simple linear approximation for finding closest point on piecewise linear segments
    let bestT = 0;
    let bestDistance = Infinity;
    const segments = worldPoints.length - 1;

    for (let i = 0; i < segments; i++) {
      const p1 = worldPoints[i];
      const p2 = worldPoints[i + 1];

      // Project target onto segment
      const dx = p2.x - p1.x;
      const dz = p2.z - p1.z;
      const len2 = dx * dx + dz * dz;

      if (len2 === 0) continue;

      let segT = ((target.x - p1.x) * dx + (target.z - p1.z) * dz) / len2;
      segT = Math.max(0, Math.min(1, segT));

      const closestX = p1.x + segT * dx;
      const closestZ = p1.z + segT * dz;
      const dist = Math.sqrt((target.x - closestX) ** 2 + (target.z - closestZ) ** 2);

      if (dist < bestDistance) {
        bestDistance = dist;
        bestT = (i + segT) / segments;
      }
    }

    return { t: bestT, distance: bestDistance };
  }

  private splitPieceAt(
    piece: TrackPiece,
    sectionIndex: number,
    t: number,
    _spliceWorldPos: Vec3,  // Reserved for future use
    _spliceWorldDir: Vec3,  // Reserved for future use
    line: number
  ): void {
    const archetype = getArchetype(piece.archetypeCode);
    const section = archetype.sections[sectionIndex];
    const splinePoints = section.splinePoints;

    // Calculate the split index in the spline points
    const totalSegments = splinePoints.length - 1;
    const splitSegment = Math.floor(t * totalSegments);
    const segmentT = (t * totalSegments) - splitSegment;

    // Interpolate the split point in local coordinates
    const p1 = splinePoints[Math.min(splitSegment, splinePoints.length - 1)];
    const p2 = splinePoints[Math.min(splitSegment + 1, splinePoints.length - 1)];
    const splitLocal: Vec3 = {
      x: p1.x + segmentT * (p2.x - p1.x),
      y: 0,
      z: p1.z + segmentT * (p2.z - p1.z),
    };

    // Calculate tangent at split point (local)
    const tangentLocal: Vec3 = {
      x: p2.x - p1.x,
      y: 0,
      z: p2.z - p1.z,
    };
    const tangentLen = Math.sqrt(tangentLocal.x ** 2 + tangentLocal.z ** 2);
    if (tangentLen > 0) {
      tangentLocal.x /= tangentLen;
      tangentLocal.z /= tangentLen;
    }

    // Create spline points for piece A (from 'in' to split point)
    const pointsA: Vec3[] = [];
    for (let i = 0; i <= splitSegment; i++) {
      pointsA.push({ ...splinePoints[i] });
    }
    pointsA.push(splitLocal);

    // Create spline points for piece B (from split point to 'out')
    const pointsB: Vec3[] = [splitLocal];
    for (let i = splitSegment + 1; i < splinePoints.length; i++) {
      pointsB.push({ ...splinePoints[i] });
    }

    // Get original connection points
    const inPoint = archetype.connectionPoints.find(cp => cp.name === 'in');
    const outPoint = archetype.connectionPoints.find(cp => cp.name === 'out');

    if (!inPoint || !outPoint) {
      throw new Error(`Cannot splice piece without 'in' and 'out' connection points at line ${line}`);
    }

    // Create dynamic archetypes for the split pieces
    const spliceId = `splice_${this.state.nextPieceId}`;

    const archetypeA: TrackArchetype = {
      code: `${spliceId}_a`,
      aliases: [],
      sections: [{ splinePoints: pointsA }],
      connectionPoints: [
        { ...inPoint, sectionIndices: [0] },
        {
          name: 'out',
          position: splitLocal,
          direction: tangentLocal,
          sectionIndices: [0],
        },
      ],
    };

    const archetypeB: TrackArchetype = {
      code: `${spliceId}_b`,
      aliases: [],
      sections: [{ splinePoints: pointsB }],
      connectionPoints: [
        {
          name: 'in',
          position: splitLocal,
          direction: { x: -tangentLocal.x, y: 0, z: -tangentLocal.z },
          sectionIndices: [0],
        },
        { ...outPoint, sectionIndices: [0] },
      ],
    };

    // Register dynamic archetypes
    registerRuntimeArchetype(archetypeA);
    registerRuntimeArchetype(archetypeB);

    // Create new pieces
    const pieceA: TrackPiece = {
      id: `piece_${this.state.nextPieceId++}`,
      archetypeCode: archetypeA.code,
      position: { ...piece.position },
      rotation: piece.rotation,
      connections: new Map(),
    };

    const pieceB: TrackPiece = {
      id: `piece_${this.state.nextPieceId++}`,
      archetypeCode: archetypeB.code,
      position: { ...piece.position },
      rotation: piece.rotation,
      connections: new Map(),
    };

    // Transfer connections from original piece
    // 'in' connections go to pieceA
    const inConnections = piece.connections.get('in');
    if (inConnections) {
      pieceA.connections.set('in', [...inConnections]);
      // Update the connected pieces to point to pieceA
      for (const conn of inConnections) {
        const connectedPiece = this.state.pieces.find(p => p.id === conn.pieceId);
        if (connectedPiece) {
          const theirConns = connectedPiece.connections.get(conn.pointName);
          if (theirConns) {
            for (const c of theirConns) {
              if (c.pieceId === piece.id) {
                c.pieceId = pieceA.id;
              }
            }
          }
        }
      }
    }

    // 'out' connections go to pieceB
    const outConnections = piece.connections.get('out');
    if (outConnections) {
      pieceB.connections.set('out', [...outConnections]);
      // Update the connected pieces to point to pieceB
      for (const conn of outConnections) {
        const connectedPiece = this.state.pieces.find(p => p.id === conn.pieceId);
        if (connectedPiece) {
          const theirConns = connectedPiece.connections.get(conn.pointName);
          if (theirConns) {
            for (const c of theirConns) {
              if (c.pieceId === piece.id) {
                c.pieceId = pieceB.id;
              }
            }
          }
        }
      }
    }

    // Connect pieceA.out to pieceB.in
    pieceA.connections.set('out', [{ pieceId: pieceB.id, pointName: 'in' }]);
    pieceB.connections.set('in', [{ pieceId: pieceA.id, pointName: 'out' }]);

    // If the original piece was labeled, transfer label to pieceA
    if (piece.label) {
      pieceA.label = piece.label;
      this.state.labeledPieces.set(piece.label, pieceA);
    }

    // Remove original piece from pieces array and add the new pieces
    const pieceIndex = this.state.pieces.indexOf(piece);
    if (pieceIndex >= 0) {
      this.state.pieces.splice(pieceIndex, 1, pieceA, pieceB);
    }
  }

  /**
   * Detect auto-connections between pieces.
   * Connection points at the same position with opposite directions are automatically connected.
   * Groups points by position first, then connects all opposite-direction points within each group.
   */
  private detectAutoConnections(): void {
    const POSITION_TOLERANCE = 0.5;  // inches
    const DIRECTION_TOLERANCE = 0.1; // dot product threshold (cos ~174°)

    // Collect all connection points with their world positions/directions
    interface WorldPoint {
      piece: TrackPiece;
      pointName: string;
      worldPos: Vec3;
      worldDir: Vec3;
    }

    const worldPoints: WorldPoint[] = [];

    for (const piece of this.state.pieces) {
      const archetype = getArchetype(piece.archetypeCode);
      for (const cp of archetype.connectionPoints) {
        const worldPos = this.rotatePoint(cp.position, piece.rotation);
        const worldDir = this.rotatePoint(cp.direction, piece.rotation);
        worldPoints.push({
          piece,
          pointName: cp.name,
          worldPos: {
            x: piece.position.x + worldPos.x,
            y: 0,
            z: piece.position.z + worldPos.z,
          },
          worldDir,
        });
      }
    }

    // Group points by position (using union-find approach)
    // Two points are in the same group if they're within tolerance of each other
    const groups: WorldPoint[][] = [];
    const pointToGroup = new Map<WorldPoint, WorldPoint[]>();

    for (const point of worldPoints) {
      // Find existing group this point belongs to
      let foundGroup: WorldPoint[] | null = null;

      for (const group of groups) {
        // Check if point is within tolerance of any point in this group
        for (const groupPoint of group) {
          const dx = point.worldPos.x - groupPoint.worldPos.x;
          const dz = point.worldPos.z - groupPoint.worldPos.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          if (distance <= POSITION_TOLERANCE) {
            foundGroup = group;
            break;
          }
        }
        if (foundGroup) break;
      }

      if (foundGroup) {
        foundGroup.push(point);
        pointToGroup.set(point, foundGroup);
      } else {
        // Create new group
        const newGroup = [point];
        groups.push(newGroup);
        pointToGroup.set(point, newGroup);
      }
    }

    // Merge groups that should be connected (transitive closure)
    // If group A has a point near group B, merge them
    let merged = true;
    while (merged) {
      merged = false;
      for (let i = 0; i < groups.length && !merged; i++) {
        for (let j = i + 1; j < groups.length && !merged; j++) {
          // Check if any point in group i is near any point in group j
          outer: for (const pi of groups[i]) {
            for (const pj of groups[j]) {
              const dx = pi.worldPos.x - pj.worldPos.x;
              const dz = pi.worldPos.z - pj.worldPos.z;
              const distance = Math.sqrt(dx * dx + dz * dz);
              if (distance <= POSITION_TOLERANCE) {
                // Merge group j into group i
                for (const p of groups[j]) {
                  groups[i].push(p);
                  pointToGroup.set(p, groups[i]);
                }
                groups.splice(j, 1);
                merged = true;
                break outer;
              }
            }
          }
        }
      }
    }

    // Within each group, connect all opposite-direction pairs
    for (const group of groups) {
      if (group.length < 2) continue;

      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const a = group[i];
          const b = group[j];

          // Skip if same piece
          if (a.piece.id === b.piece.id) continue;

          // Skip if already connected
          const aConnections = a.piece.connections.get(a.pointName) || [];
          const alreadyConnected = aConnections.some(
            c => c.pieceId === b.piece.id && c.pointName === b.pointName
          );
          if (alreadyConnected) continue;

          // Check directions are opposite (dot product close to -1)
          const dot = a.worldDir.x * b.worldDir.x + a.worldDir.z * b.worldDir.z;
          if (dot > -1 + DIRECTION_TOLERANCE) continue;

          // Auto-connect!
          const aConns = a.piece.connections.get(a.pointName) || [];
          aConns.push({ pieceId: b.piece.id, pointName: b.pointName, isAutoConnect: true });
          a.piece.connections.set(a.pointName, aConns);

          const bConns = b.piece.connections.get(b.pointName) || [];
          bConns.push({ pieceId: a.piece.id, pointName: a.pointName, isAutoConnect: true });
          b.piece.connections.set(b.pointName, bConns);
        }
      }
    }
  }
}
