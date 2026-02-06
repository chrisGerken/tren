/**
 * Layout Builder - transforms AST into placed track pieces
 */

import { parse, Statement, PieceStatement, NewStatement, ReferenceStatement, LoopCloseStatement, TitleStatement, DescriptionStatement, LockAheadStatement, SpliceStatement, RandomStatement, MaxTrainsStatement, FlexConnectStatement, CrossConnectStatement, DefineStatement, LogStatement } from './parser';
import { Layout, TrackPiece, Vec3, vec2, ConnectionPointDef, RangeValue as TypeRangeValue } from '../core/types';
import { getArchetype, registerRuntimeArchetype } from '../core/archetypes';
import type { TrackArchetype } from '../core/archetypes';
import { setLogLevel, LogLevel, logger } from '../core/logger';

interface SpliceInfo {
  label?: string;
  point?: string;
  // If no label, use these (captured at parse time)
  currentPieceId?: string;
  currentPointName?: string;
  line: number;
}

interface FlexConnectInfo {
  point1Label: string;
  point1Name: string;
  point2Label: string;
  point2Name: string;
  line: number;
}

interface FlexSolution {
  type: 'straight-only' | 'curve-only' | 'straight-curve' | 'curve-straight';
  straightLength: number;  // 0 for curve-only
  radius: number;          // Infinity for straight-only
  curveDirection: 'left' | 'right' | 'none';
  P1: Vec3;
  D1: Vec3;
  P2: Vec3;
  D2: Vec3;
}

interface CrossConnectInfo {
  label1: string;
  label2: string;
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
  lockAheadDistance?: number;
  lockAheadCount?: number;
  randomSwitches?: boolean;
  maxTrains?: number;
  logLevel?: string;
  pendingSplices: SpliceInfo[];
  pendingFlexConnects: FlexConnectInfo[];
  pendingCrossConnects: CrossConnectInfo[];
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
      pendingFlexConnects: [],
      pendingCrossConnects: [],
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

    // Process pending cross connects (before flex connects and auto-connect)
    this.processPendingCrossConnects();

    // Process pending flex connects (before auto-connect)
    this.processPendingFlexConnects();

    // Detect auto-connections
    this.detectAutoConnections();

    // Mark pieces that are inside tunnels
    this.markTunnelSections();

    return {
      title: this.state.title || 'Simulador de Tren',
      description: this.state.descriptions.length > 0
        ? this.state.descriptions.join(' ')
        : undefined,
      lockAheadDistance: this.state.lockAheadDistance,
      lockAheadCount: this.state.lockAheadCount,
      randomSwitches: this.state.randomSwitches,
      maxTrains: this.state.maxTrains,
      logLevel: this.state.logLevel,
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
      case 'lockAhead':
        this.processLockAhead(stmt);
        break;
      case 'random':
        this.processRandom(stmt);
        break;
      case 'maxTrains':
        this.processMaxTrains(stmt);
        break;
      case 'splice':
        this.processSplice(stmt);
        break;
      case 'flexConnect':
        this.processFlexConnect(stmt);
        break;
      case 'crossConnect':
        this.processCrossConnect(stmt);
        break;
      case 'define':
        this.processDefine(stmt);
        break;
      case 'log':
        this.processLog(stmt);
        break;
    }
  }

  private processLog(stmt: LogStatement): void {
    this.state.logLevel = stmt.level;
    const levelMap: Record<string, LogLevel> = {
      'debug': LogLevel.DEBUG,
      'info': LogLevel.INFO,
      'warn': LogLevel.WARNING,
      'error': LogLevel.ERROR,
    };
    setLogLevel(levelMap[stmt.level]);
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

  private processLockAhead(stmt: LockAheadStatement): void {
    if (stmt.distance !== undefined) {
      this.state.lockAheadDistance = stmt.distance;
    }
    if (stmt.count !== undefined) {
      this.state.lockAheadCount = stmt.count;
    }
  }

  private processRandom(_stmt: RandomStatement): void {
    this.state.randomSwitches = true;
  }

  private processMaxTrains(stmt: MaxTrainsStatement): void {
    this.state.maxTrains = stmt.value;
  }

  /**
   * Process a define statement to create a custom archetype.
   * Creates and registers a runtime archetype that can be used like built-in archetypes.
   */
  private processDefine(stmt: DefineStatement): void {
    let archetype: TrackArchetype;

    if (stmt.direction === 'straight') {
      // Create a straight piece archetype
      const length = stmt.length!;
      archetype = {
        code: stmt.name,
        aliases: [],
        sections: [
          { splinePoints: [vec2(0, 0), vec2(length, 0)] },
        ],
        connectionPoints: [
          { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
          { name: 'out', position: vec2(length, 0), direction: vec2(1, 0), sectionIndices: [0] },
        ],
      };
    } else {
      // Create a curve piece archetype (left or right)
      const radius = stmt.radius!;
      const arcDegrees = stmt.arc!;
      const arcRadians = (arcDegrees * Math.PI) / 180;

      // Generate spline points for the curve
      // Number of points based on arc angle (at least 3 points, more for larger arcs)
      const numPoints = Math.max(3, Math.ceil(arcDegrees / 15) + 1);
      const points: Vec3[] = [];

      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        const angle = t * arcRadians;

        if (stmt.direction === 'left') {
          // Left curve: center is at (0, radius), curve goes counter-clockwise
          points.push(vec2(
            radius * Math.sin(angle),
            radius * (1 - Math.cos(angle))
          ));
        } else {
          // Right curve: center is at (0, -radius), curve goes clockwise
          points.push(vec2(
            radius * Math.sin(angle),
            -radius * (1 - Math.cos(angle))
          ));
        }
      }

      // Calculate end position and direction
      const endPos = points[points.length - 1];
      let endDir: Vec3;
      if (stmt.direction === 'left') {
        endDir = vec2(Math.cos(arcRadians), Math.sin(arcRadians));
      } else {
        endDir = vec2(Math.cos(arcRadians), -Math.sin(arcRadians));
      }

      archetype = {
        code: stmt.name,
        aliases: [],
        sections: [{ splinePoints: points }],
        connectionPoints: [
          { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
          { name: 'out', position: endPos, direction: endDir, sectionIndices: [0] },
        ],
      };
    }

    // Register the custom archetype
    registerRuntimeArchetype(archetype);

    logger.debug(`Defined custom archetype '${stmt.name}': ${stmt.direction}, ` +
      (stmt.direction === 'straight'
        ? `length=${stmt.length}`
        : `radius=${stmt.radius}, arc=${stmt.arc}°`));
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

  private processFlexConnect(stmt: FlexConnectStatement): void {
    // Collect for post-processing (after all pieces are placed)
    this.state.pendingFlexConnects.push({
      point1Label: stmt.point1Label,
      point1Name: stmt.point1Name || 'out',
      point2Label: stmt.point2Label,
      point2Name: stmt.point2Name || 'in',
      line: stmt.line,
    });
  }

  private processCrossConnect(stmt: CrossConnectStatement): void {
    // Collect for post-processing (after all pieces are placed)
    this.state.pendingCrossConnects.push({
      label1: stmt.label1,
      label2: stmt.label2,
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

      logger.debug(`Line ${stmt.line}: New segment from $${stmt.baseLabel}.${pointName}:`);
      logger.debug(`Line ${stmt.line}:   baseAngle: ${(baseAngle * 180 / Math.PI).toFixed(1)}°`);
      logger.debug(`Line ${stmt.line}:   degrees offset: ${stmt.degrees}°`);
      logger.debug(`Line ${stmt.line}:   currentRotation: ${(worldRotation * 180 / Math.PI).toFixed(1)}°`);
      logger.debug(`Line ${stmt.line}:   position: (${offsetPos.x.toFixed(2)}, ${offsetPos.z.toFixed(2)})`);
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

      logger.debug(`Line ${stmt.line}: New segment at origin:`);
      logger.debug(`Line ${stmt.line}:   degrees: ${stmt.degrees}°`);
      logger.debug(`Line ${stmt.line}:   currentRotation: ${(worldRotation * 180 / Math.PI).toFixed(1)}°`);
      logger.debug(`Line ${stmt.line}:   position: (${startPos.x.toFixed(2)}, ${startPos.z.toFixed(2)})`);
    }
  }

  private processPiece(stmt: PieceStatement): void {
    const archetype = getArchetype(stmt.archetypeCode);

    for (let i = 0; i < stmt.count; i++) {
      const piece = this.placePiece(archetype, stmt.attachPoint, stmt.line, stmt.label);

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
          speed: stmt.genSpeed as TypeRangeValue | number | undefined,  // undefined means use default (12)
          frequency: stmt.genEvery as TypeRangeValue | number | undefined,
          colorMode: stmt.genColorMode ?? 'gray',  // Default to grayscale cars
          lastSpawnTime: -Infinity,  // Never spawned yet
          enabled: true,
        };
      }

      // Apply semaphore config for 'sem' pieces
      if (archetype.code === 'sem' && i === 0) {
        piece.semaphoreConfig = {
          locked: false,  // Start unlocked (green)
        };
      }

      this.state.pieces.push(piece);
      this.state.currentSegment.pieces.push(piece);
      this.state.currentPiece = piece;
    }
  }

  private placePiece(archetype: TrackArchetype, explicitAttachPoint?: string, line?: number, label?: string): TrackPiece {
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

    {
      const labelStr = label ? ` "${label}"` : '';
      const lineStr = line !== undefined ? `Line ${line}` : 'Line ?';
      logger.debug(`${lineStr}: Placed ${archetype.code}${labelStr} (${piece.id}):`);
      logger.debug(`${lineStr}:   incomingRotation: ${(this.state.currentRotation * 180 / Math.PI).toFixed(1)}°`);
      logger.debug(`${lineStr}:   pieceRotation: ${(pieceRotation * 180 / Math.PI).toFixed(1)}°`);
      logger.debug(`${lineStr}:   position: (${piecePosition.x.toFixed(2)}, ${piecePosition.z.toFixed(2)})`);
    }

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

      {
        const lineStr = line !== undefined ? `Line ${line}` : 'Line ?';
        logger.debug(`${lineStr}:   outgoingRotation: ${(this.state.currentRotation * 180 / Math.PI).toFixed(1)}°`);
      }
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

    logger.debug(`Line ${stmt.line}: Reference $${stmt.label}.${pointName}:`);
    logger.debug(`Line ${stmt.line}:   labeledPiece (${labeledPiece.archetypeCode}) rotation: ${(labeledPiece.rotation * 180 / Math.PI).toFixed(1)}°`);
    logger.debug(`Line ${stmt.line}:   point.direction (local): (${point.direction.x.toFixed(3)}, ${point.direction.z.toFixed(3)})`);
    logger.debug(`Line ${stmt.line}:   rotatedDir (world): (${rotatedDir.x.toFixed(3)}, ${rotatedDir.z.toFixed(3)})`);
    logger.debug(`Line ${stmt.line}:   new currentRotation: ${(this.state.currentRotation * 180 / Math.PI).toFixed(1)}°`);
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

    // Update builder state to reflect the post-transform position and rotation
    // This ensures subsequent pieces (without a 'new' statement) use correct values
    this.state.currentPosition = {
      x: targetPos.x,
      y: 0,
      z: targetPos.z,
    };
    this.state.currentRotation = desiredAngle;

    logger.debug(`Line ${stmt.line}: Loop close to $${stmt.label}.${stmt.point}:`);
    logger.debug(`Line ${stmt.line}:   rotationDelta: ${(rotationDelta * 180 / Math.PI).toFixed(1)}°`);
    logger.debug(`Line ${stmt.line}:   new currentPosition: (${targetPos.x.toFixed(2)}, ${targetPos.z.toFixed(2)})`);
    logger.debug(`Line ${stmt.line}:   new currentRotation: ${(desiredAngle * 180 / Math.PI).toFixed(1)}°`);

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

  /**
   * Process all pending flex connect statements.
   * Creates custom curve+straight or straight+curve pieces to bridge gaps.
   */
  private processPendingFlexConnects(): void {
    logger.debug(`Processing ${this.state.pendingFlexConnects.length} flex connects`);
    for (const flexConnect of this.state.pendingFlexConnects) {
      this.performFlexConnect(flexConnect);
    }
  }

  /**
   * Process all pending cross connect statements.
   * Creates crossing pieces where two tracks intersect.
   */
  private processPendingCrossConnects(): void {
    if (this.state.pendingCrossConnects.length > 0) {
      logger.debug(`Processing ${this.state.pendingCrossConnects.length} cross connects`);
    }
    for (const crossConnect of this.state.pendingCrossConnects) {
      this.performCrossConnect(crossConnect);
    }
  }

  /**
   * Create a cross connection where two track pieces intersect.
   * Both tracks remain unchanged but share a lockable internal connection point at the intersection.
   * Only one train can occupy the intersection at a time.
   */
  private performCrossConnect(info: CrossConnectInfo): void {
    // Validate: labels must be different
    if (info.label1 === info.label2) {
      throw new Error(`Cross connect requires two different tracks at line ${info.line}`);
    }

    // Get the two labeled pieces
    const piece1 = this.state.labeledPieces.get(info.label1);
    const piece2 = this.state.labeledPieces.get(info.label2);

    if (!piece1) {
      throw new Error(`Unknown label '${info.label1}' in cross connect at line ${info.line}`);
    }
    if (!piece2) {
      throw new Error(`Unknown label '${info.label2}' in cross connect at line ${info.line}`);
    }

    // Find intersection point
    const intersection = this.findSplineIntersection(piece1, piece2);
    if (!intersection) {
      logger.warn(`No intersection found between $${info.label1} and $${info.label2} at line ${info.line}`);
      return;
    }

    // Calculate section lengths to convert t to distance
    const length1 = this.calculateSectionLength(piece1);
    const length2 = this.calculateSectionLength(piece2);

    const distance1 = intersection.t1 * length1;
    const distance2 = intersection.t2 * length2;

    logger.debug(`Cross connect at line ${info.line}:`);
    logger.debug(`  Intersection at (${intersection.worldPos.x.toFixed(2)}, ${intersection.worldPos.z.toFixed(2)})`);
    logger.debug(`  piece1: t=${intersection.t1.toFixed(3)}, length=${length1.toFixed(1)}, distance=${distance1.toFixed(1)}`);
    logger.debug(`  piece2: t=${intersection.t2.toFixed(3)}, length=${length2.toFixed(1)}, distance=${distance2.toFixed(1)}`);

    // Create shared connection point ID for this intersection
    const sharedPointId = `cross_${piece1.id}_${piece2.id}`;

    // Add internal connection point to piece1
    if (!piece1.internalConnectionPoints) {
      piece1.internalConnectionPoints = [];
    }
    piece1.internalConnectionPoints.push({
      id: sharedPointId,
      t: intersection.t1,
      distance: distance1,
      worldPosition: { ...intersection.worldPos },
    });

    // Add internal connection point to piece2 (same ID - shared point)
    if (!piece2.internalConnectionPoints) {
      piece2.internalConnectionPoints = [];
    }
    piece2.internalConnectionPoints.push({
      id: sharedPointId,
      t: intersection.t2,
      distance: distance2,
      worldPosition: { ...intersection.worldPos },
    });

    logger.debug(`  Created shared internal connection point: ${sharedPointId}`);
  }

  /**
   * Calculate the length of a track piece's section 0 (main track).
   */
  private calculateSectionLength(piece: TrackPiece): number {
    const archetype = getArchetype(piece.archetypeCode);
    if (!archetype || archetype.sections.length === 0) return 0;

    const section = archetype.sections[0];
    if (section.splinePoints.length < 2) return 0;

    // Transform to world and sum segment lengths
    let totalLength = 0;
    let prevPoint: Vec3 | null = null;

    for (const p of section.splinePoints) {
      const rotated = this.rotatePoint(p, piece.rotation);
      const worldPoint: Vec3 = {
        x: piece.position.x + rotated.x,
        y: 0,
        z: piece.position.z + rotated.z,
      };

      if (prevPoint) {
        const dx = worldPoint.x - prevPoint.x;
        const dz = worldPoint.z - prevPoint.z;
        totalLength += Math.sqrt(dx * dx + dz * dz);
      }
      prevPoint = worldPoint;
    }

    return totalLength;
  }

  /**
   * Find where two track pieces' splines intersect.
   * Returns the intersection parameters (t1, t2) and world position, or null if no intersection.
   *
   * Handles three cases:
   * 1. Both pieces have splines - find line segment intersection
   * 2. One piece is zero-length - find if its position lies on the other's spline
   * 3. Both zero-length - check if they're at the same position
   */
  private findSplineIntersection(
    piece1: TrackPiece,
    piece2: TrackPiece
  ): { t1: number; t2: number; worldPos: Vec3 } | null {
    const arch1 = getArchetype(piece1.archetypeCode);
    const arch2 = getArchetype(piece2.archetypeCode);

    const hasSpline1 = arch1.sections.length > 0 && arch1.sections[0].splinePoints.length >= 2;
    const hasSpline2 = arch2.sections.length > 0 && arch2.sections[0].splinePoints.length >= 2;

    // Case 1: Both have splines - standard intersection
    if (hasSpline1 && hasSpline2) {
      return this.findSplineSplineIntersection(piece1, piece2, arch1, arch2);
    }

    // Case 2: piece1 is zero-length point, piece2 has spline
    if (!hasSpline1 && hasSpline2) {
      const point1 = { x: piece1.position.x, y: 0, z: piece1.position.z };
      const result = this.findPointOnSpline(point1, piece2, arch2);
      if (result) {
        return { t1: 0.5, t2: result.t, worldPos: point1 };
      }
      return null;
    }

    // Case 3: piece2 is zero-length point, piece1 has spline
    if (hasSpline1 && !hasSpline2) {
      const point2 = { x: piece2.position.x, y: 0, z: piece2.position.z };
      const result = this.findPointOnSpline(point2, piece1, arch1);
      if (result) {
        return { t1: result.t, t2: 0.5, worldPos: point2 };
      }
      return null;
    }

    // Case 4: Both zero-length - check if same position
    const dist = Math.sqrt(
      Math.pow(piece1.position.x - piece2.position.x, 2) +
      Math.pow(piece1.position.z - piece2.position.z, 2)
    );
    if (dist < 0.5) {
      return {
        t1: 0.5,
        t2: 0.5,
        worldPos: { x: piece1.position.x, y: 0, z: piece1.position.z },
      };
    }

    return null;
  }

  /**
   * Find where two splines intersect (both pieces have track sections).
   */
  private findSplineSplineIntersection(
    piece1: TrackPiece,
    piece2: TrackPiece,
    arch1: ReturnType<typeof getArchetype>,
    arch2: ReturnType<typeof getArchetype>
  ): { t1: number; t2: number; worldPos: Vec3 } | null {
    const section1 = arch1.sections[0];
    const section2 = arch2.sections[0];

    // Transform spline points to world coordinates
    const world1 = section1.splinePoints.map(p => {
      const rotated = this.rotatePoint(p, piece1.rotation);
      return { x: piece1.position.x + rotated.x, y: 0, z: piece1.position.z + rotated.z };
    });

    const world2 = section2.splinePoints.map(p => {
      const rotated = this.rotatePoint(p, piece2.rotation);
      return { x: piece2.position.x + rotated.x, y: 0, z: piece2.position.z + rotated.z };
    });

    // Check each pair of segments for intersection
    const segments1 = world1.length - 1;
    const segments2 = world2.length - 1;

    for (let i = 0; i < segments1; i++) {
      const p1 = world1[i];
      const p2 = world1[i + 1];

      for (let j = 0; j < segments2; j++) {
        const p3 = world2[j];
        const p4 = world2[j + 1];

        // Line segment intersection
        const result = this.lineSegmentIntersection(p1, p2, p3, p4);
        if (result) {
          // Calculate global t parameters
          const t1 = (i + result.s) / segments1;
          const t2 = (j + result.t) / segments2;

          return {
            t1,
            t2,
            worldPos: result.point,
          };
        }
      }
    }

    return null;
  }

  /**
   * Find if a point lies on a piece's spline (within tolerance).
   * Returns the t parameter if found, null otherwise.
   */
  private findPointOnSpline(
    point: Vec3,
    piece: TrackPiece,
    archetype: ReturnType<typeof getArchetype>
  ): { t: number; distance: number } | null {
    const TOLERANCE = 0.5; // inches

    const section = archetype.sections[0];
    const worldPoints = section.splinePoints.map(p => {
      const rotated = this.rotatePoint(p, piece.rotation);
      return { x: piece.position.x + rotated.x, y: 0, z: piece.position.z + rotated.z };
    });

    const segments = worldPoints.length - 1;
    let bestT = -1;
    let bestDist = Infinity;

    for (let i = 0; i < segments; i++) {
      const p1 = worldPoints[i];
      const p2 = worldPoints[i + 1];

      // Find closest point on segment to the target point
      const dx = p2.x - p1.x;
      const dz = p2.z - p1.z;
      const len2 = dx * dx + dz * dz;

      let segT = 0;
      if (len2 > 0.0001) {
        segT = Math.max(0, Math.min(1, ((point.x - p1.x) * dx + (point.z - p1.z) * dz) / len2));
      }

      const closestX = p1.x + segT * dx;
      const closestZ = p1.z + segT * dz;
      const dist = Math.sqrt(Math.pow(point.x - closestX, 2) + Math.pow(point.z - closestZ, 2));

      if (dist < bestDist) {
        bestDist = dist;
        bestT = (i + segT) / segments;
      }
    }

    if (bestDist <= TOLERANCE) {
      return { t: bestT, distance: bestDist };
    }

    return null;
  }

  /**
   * Check if two line segments intersect.
   * Returns the intersection point and parameters (s, t) if they do, null otherwise.
   */
  private lineSegmentIntersection(
    p1: Vec3,
    p2: Vec3,
    p3: Vec3,
    p4: Vec3
  ): { s: number; t: number; point: Vec3 } | null {
    // Segment 1: P1 + s*(P2-P1), s in [0,1]
    // Segment 2: P3 + t*(P4-P3), t in [0,1]
    const d1x = p2.x - p1.x;
    const d1z = p2.z - p1.z;
    const d2x = p4.x - p3.x;
    const d2z = p4.z - p3.z;

    const det = d1x * d2z - d1z * d2x;
    if (Math.abs(det) < 0.0001) return null; // Parallel or collinear

    const dx = p3.x - p1.x;
    const dz = p3.z - p1.z;

    const s = (dx * d2z - dz * d2x) / det;
    const t = (dx * d1z - dz * d1x) / det;

    // Check if intersection is within both segments (allow full range)
    if (s < 0 || s > 1 || t < 0 || t > 1) return null;

    return {
      s,
      t,
      point: {
        x: p1.x + s * d1x,
        y: 0,
        z: p1.z + s * d1z,
      },
    };
  }

  /**
   * Create flex track pieces to connect two connection points.
   * Uses geometric calculation to find curve+straight or straight+curve combination.
   */
  private performFlexConnect(info: FlexConnectInfo): void {
    // Get the two labeled pieces
    const piece1 = this.state.labeledPieces.get(info.point1Label);
    const piece2 = this.state.labeledPieces.get(info.point2Label);

    if (!piece1) {
      throw new Error(`Unknown label '${info.point1Label}' in flex connect at line ${info.line}`);
    }
    if (!piece2) {
      throw new Error(`Unknown label '${info.point2Label}' in flex connect at line ${info.line}`);
    }

    // Get archetypes and connection points
    const arch1 = getArchetype(piece1.archetypeCode);
    const arch2 = getArchetype(piece2.archetypeCode);

    const cp1 = this.getConnectionPoint(arch1, info.point1Name);
    const cp2 = this.getConnectionPoint(arch2, info.point2Name);

    if (!cp1) {
      throw new Error(`Connection point '${info.point1Name}' not found on '${info.point1Label}' at line ${info.line}`);
    }
    if (!cp2) {
      throw new Error(`Connection point '${info.point2Name}' not found on '${info.point2Label}' at line ${info.line}`);
    }

    // Calculate world positions and directions
    const pos1World = this.rotatePoint(cp1.position, piece1.rotation);
    const P1: Vec3 = {
      x: piece1.position.x + pos1World.x,
      y: 0,
      z: piece1.position.z + pos1World.z,
    };
    const dir1World = this.rotatePoint(cp1.direction, piece1.rotation);
    // D1 is the outgoing direction (same as connection point direction)
    const D1: Vec3 = { x: dir1World.x, y: 0, z: dir1World.z };

    const pos2World = this.rotatePoint(cp2.position, piece2.rotation);
    const P2: Vec3 = {
      x: piece2.position.x + pos2World.x,
      y: 0,
      z: piece2.position.z + pos2World.z,
    };
    const dir2World = this.rotatePoint(cp2.direction, piece2.rotation);
    // D2 is the incoming direction (opposite of connection point direction)
    const D2: Vec3 = { x: -dir2World.x, y: 0, z: -dir2World.z };

    logger.debug(`Flex connect at line ${info.line}:`);
    logger.debug(`  P1: (${P1.x.toFixed(2)}, ${P1.z.toFixed(2)}), D1: (${D1.x.toFixed(3)}, ${D1.z.toFixed(3)}) angle=${(Math.atan2(D1.z, D1.x) * 180 / Math.PI).toFixed(1)}°`);
    logger.debug(`  P2: (${P2.x.toFixed(2)}, ${P2.z.toFixed(2)}), D2: (${D2.x.toFixed(3)}, ${D2.z.toFixed(3)}) angle=${(Math.atan2(D2.z, D2.x) * 180 / Math.PI).toFixed(1)}°`);
    logger.debug(`  Distance: ${Math.sqrt((P2.x-P1.x)**2 + (P2.z-P1.z)**2).toFixed(2)}`);

    // Try to find a valid straight+curve or curve+straight solution
    const solution = this.solveFlexConnect(P1, D1, P2, D2, info.line);

    if (!solution) {
      logger.warn(`Could not find flex connect solution at line ${info.line}`);
      return;
    }

    logger.debug(`  Solution: ${solution.type}, straight=${solution.straightLength.toFixed(2)}", radius=${solution.radius.toFixed(2)}", direction=${solution.curveDirection}`);

    // Create the flex track pieces (labels are derived from endpoint labels)
    this.createFlexPieces(solution, piece1, info.point1Name, piece2, info.point2Name, info.point1Label, info.point2Label, info.line);
  }

  /**
   * Perpendicular vector (90° clockwise rotation in 2D)
   * Used for flex connect calculations - the sign of the resulting R value
   * determines whether the curve goes left or right
   */
  private perpRight(v: Vec3): Vec3 {
    return { x: v.z, y: 0, z: -v.x };
  }

  /**
   * Solve for flex connect geometry.
   * Returns either [straight, curve] or [curve, straight] solution.
   */
  private solveFlexConnect(
    P1: Vec3,
    D1: Vec3,
    P2: Vec3,
    D2: Vec3,
    line: number
  ): FlexSolution | null {
    const delta: Vec3 = { x: P2.x - P1.x, y: 0, z: P2.z - P1.z };
    const deltaLength = Math.sqrt(delta.x * delta.x + delta.z * delta.z);
    const MIN_RADIUS = 5; // Minimum curve radius in inches
    const MIN_STRAIGHT = 0.5; // Minimum straight length to create (below this, use curve-only)
    const DIRECTION_TOLERANCE = 0.02; // Tolerance for direction alignment (cos should be > 0.98)
    const COLLINEAR_SIN_TOLERANCE = 0.02; // Tolerance for collinearity (sin of angle < 0.02 ≈ 1.1°)

    logger.debug(`  Solving with delta=(${delta.x.toFixed(2)}, ${delta.z.toFixed(2)}), length=${deltaLength.toFixed(2)}`);

    // Check for straight-only case: D1 ≈ D2 and delta is parallel to D1 (same direction)
    const directionDot = D1.x * D2.x + D1.z * D2.z;  // cos(angle between D1 and D2)
    const isDirectionAligned = Math.abs(directionDot - 1) < DIRECTION_TOLERANCE;

    // For collinearity, normalize the cross product by delta length to get sin(angle)
    // Cross product = |delta| * |D1| * sin(angle) = |delta| * sin(angle) since D1 is unit
    // Also check that delta points in the same direction as D1 (dot product > 0)
    let isCollinear = false;
    let deltaAlongD1 = false;
    if (deltaLength > 0.1) {
      const sinAngle = Math.abs(delta.x * D1.z - delta.z * D1.x) / deltaLength;
      const cosAngle = (delta.x * D1.x + delta.z * D1.z) / deltaLength;  // delta · D1 / |delta|
      isCollinear = sinAngle < COLLINEAR_SIN_TOLERANCE;
      deltaAlongD1 = cosAngle > 0.98;  // delta points in same direction as D1
    }

    logger.debug(`  Direction dot=${directionDot.toFixed(4)}, aligned=${isDirectionAligned}, collinear=${isCollinear}, deltaAlongD1=${deltaAlongD1}`);

    if (isDirectionAligned && isCollinear && deltaAlongD1 && deltaLength > 0.1) {
      // Straight-only solution
      logger.debug(`  [straight-only] length=${deltaLength.toFixed(2)}"`);
      return {
        type: 'straight-only',
        straightLength: deltaLength,
        radius: Infinity,
        curveDirection: 'none',
        P1, D1, P2, D2,
      };
    }

    // Calculate the arc angle between D1 and D2 (used to reject excessive curves)
    // Arc angle is the angle the curve must turn through
    const angle1 = Math.atan2(D1.z, D1.x);
    const angle2 = Math.atan2(D2.z, D2.x);
    let arcAngle = angle2 - angle1;
    // Normalize to [-PI, PI]
    while (arcAngle > Math.PI) arcAngle -= 2 * Math.PI;
    while (arcAngle < -Math.PI) arcAngle += 2 * Math.PI;
    const MAX_ARC_DEGREES = 270; // Reject curves greater than 270 degrees
    const maxArcRadians = MAX_ARC_DEGREES * Math.PI / 180;

    logger.debug(`  Arc angle between D1 and D2: ${(arcAngle * 180 / Math.PI).toFixed(1)}°`);

    // Try curve+straight and straight+curve combinations
    const solutions: FlexSolution[] = [];

    // For straight+curve
    {
      const pr1 = this.perpRight(D1);
      const pr2 = this.perpRight(D2);
      const result = this.solveStraightCurve(D1, pr1, pr2, delta);
      if (result && result.L >= 0 && Math.abs(result.R) >= MIN_RADIUS) {
        // Reject if arc angle is too large (> 270 degrees)
        if (Math.abs(arcAngle) <= maxArcRadians) {
          logger.debug(`  [str+curve] L=${result.L.toFixed(2)}, R=${result.R.toFixed(2)}`);
          if (result.L < MIN_STRAIGHT) {
            // Curve-only solution
            solutions.push({
              type: 'curve-only',
              straightLength: 0,
              radius: Math.abs(result.R),
              curveDirection: result.R > 0 ? 'right' : 'left',
              P1, D1, P2, D2,
            });
          } else {
            solutions.push({
              type: 'straight-curve',
              straightLength: result.L,
              radius: Math.abs(result.R),
              curveDirection: result.R > 0 ? 'right' : 'left',
              P1, D1, P2, D2,
            });
          }
        } else {
          logger.debug(`  [str+curve] rejected: arc angle ${(arcAngle * 180 / Math.PI).toFixed(1)}° exceeds ${MAX_ARC_DEGREES}°`);
        }
      }
    }

    // For curve+straight
    {
      const pr1 = this.perpRight(D1);
      const pr2 = this.perpRight(D2);
      const result = this.solveCurveStraight(D2, pr1, pr2, delta);
      if (result && result.L >= 0 && Math.abs(result.R) >= MIN_RADIUS) {
        // Reject if arc angle is too large (> 270 degrees)
        if (Math.abs(arcAngle) <= maxArcRadians) {
          logger.debug(`  [curve+str] L=${result.L.toFixed(2)}, R=${result.R.toFixed(2)}`);
          if (result.L < MIN_STRAIGHT) {
            // Curve-only solution (avoid duplicates)
            const hasCurveOnly = solutions.some(s => s.type === 'curve-only');
            if (!hasCurveOnly) {
              solutions.push({
                type: 'curve-only',
                straightLength: 0,
                radius: Math.abs(result.R),
                curveDirection: result.R > 0 ? 'right' : 'left',
                P1, D1, P2, D2,
              });
            }
          } else {
            solutions.push({
              type: 'curve-straight',
              straightLength: result.L,
              radius: Math.abs(result.R),
              curveDirection: result.R > 0 ? 'right' : 'left',
              P1, D1, P2, D2,
            });
          }
        } else {
          logger.debug(`  [curve+str] rejected: arc angle ${(arcAngle * 180 / Math.PI).toFixed(1)}° exceeds ${MAX_ARC_DEGREES}°`);
        }
      }
    }

    if (solutions.length === 0) {
      logger.debug(`No valid flex connect solution found at line ${line}`);
      logger.debug(`  P1: (${P1.x.toFixed(2)}, ${P1.z.toFixed(2)}), D1: (${D1.x.toFixed(3)}, ${D1.z.toFixed(3)})`);
      logger.debug(`  P2: (${P2.x.toFixed(2)}, ${P2.z.toFixed(2)}), D2: (${D2.x.toFixed(3)}, ${D2.z.toFixed(3)})`);
      return null;
    }

    // Prefer straight-only, then curve-only, then largest radius for smoothest curve
    solutions.sort((a, b) => {
      if (a.type === 'straight-only') return -1;
      if (b.type === 'straight-only') return 1;
      if (a.type === 'curve-only' && b.type !== 'curve-only') return -1;
      if (b.type === 'curve-only' && a.type !== 'curve-only') return 1;
      return b.radius - a.radius;
    });
    return solutions[0];
  }

  /**
   * Solve for [Straight, Curve] combination.
   * Equation: L * D1 + R * (perp1 - perp2) = delta
   */
  private solveStraightCurve(
    D1: Vec3,
    perp1: Vec3,
    perp2: Vec3,
    delta: Vec3
  ): { L: number; R: number } | null {
    const bx = perp1.x - perp2.x;
    const bz = perp1.z - perp2.z;

    const det = D1.x * bz - D1.z * bx;
    if (Math.abs(det) < 0.0001) return null; // No unique solution

    const L = (delta.x * bz - delta.z * bx) / det;
    const R = (D1.x * delta.z - D1.z * delta.x) / det;

    return { L, R };
  }

  /**
   * Solve for [Curve, Straight] combination.
   * Curve from P1 (direction D1) to P_mid (direction D2), then straight from P_mid to P2.
   *
   * P_mid = P2 - L * D2  (straight goes from P_mid forward to P2)
   * Center = P1 + R * perp(D1) = P_mid + R * perp(D2)
   *
   * Substituting: R * (perp1 - perp2) + L * D2 = delta
   */
  private solveCurveStraight(
    D2: Vec3,
    perp1: Vec3,
    perp2: Vec3,
    delta: Vec3
  ): { L: number; R: number } | null {
    // We solve: L * D2 + R * (perp1 - perp2) = delta
    // Matrix form: | D2.x  (perp1.x - perp2.x) | | L |   | delta.x |
    //              | D2.z  (perp1.z - perp2.z) | | R | = | delta.z |
    const ax = D2.x;
    const az = D2.z;
    const bx = perp1.x - perp2.x;
    const bz = perp1.z - perp2.z;

    const det = ax * bz - az * bx;
    if (Math.abs(det) < 0.0001) return null;

    const L = (delta.x * bz - delta.z * bx) / det;
    const R = (ax * delta.z - az * delta.x) / det;

    return { L, R };
  }

  /**
   * Create the actual track pieces for a flex connect solution.
   * Pieces are automatically labeled as {label1}_{label2}_str and {label1}_{label2}_crv
   */
  private createFlexPieces(
    solution: FlexSolution,
    piece1: TrackPiece,
    point1Name: string,
    piece2: TrackPiece,
    point2Name: string,
    label1: string,
    label2: string,
    line: number
  ): void {
    const flexId = `flex_${this.state.nextPieceId}`;

    // Generate labels for the flex pieces based on endpoint labels
    const straightLabel = `${label1}_${label2}_str`;
    const curveLabel = `${label1}_${label2}_crv`;

    if (solution.type === 'straight-only') {
      // Create only a straight piece
      const straightArch = this.createFlexStraightArchetype(
        flexId + '_str',
        solution.straightLength
      );

      registerRuntimeArchetype(straightArch);

      const straightPiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: straightArch.code,
        position: { ...solution.P1 },
        rotation: Math.atan2(solution.D1.z, solution.D1.x),
        connections: new Map(),
        label: straightLabel,
      };

      // Register label for later reference
      this.state.labeledPieces.set(straightLabel, straightPiece);

      // Connect: piece1.point1 -> straight.in -> straight.out -> piece2.point2
      this.addConnection(piece1, point1Name, straightPiece, 'in');
      this.addConnection(straightPiece, 'out', piece2, point2Name);

      this.state.pieces.push(straightPiece);

      logger.debug(`Flex connect at line ${line}: straight-only(${solution.straightLength.toFixed(2)}") labeled "${straightLabel}"`);
    } else if (solution.type === 'curve-only') {
      // Create only a curve piece
      // curveDirection is always 'left' or 'right' for curve-only solutions
      const curveArch = this.createFlexCurveArchetype(
        flexId + '_crv',
        solution.radius,
        solution.curveDirection as 'left' | 'right',
        solution.D1,
        solution.D2
      );

      registerRuntimeArchetype(curveArch);

      const curvePiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: curveArch.code,
        position: { ...solution.P1 },
        rotation: Math.atan2(solution.D1.z, solution.D1.x),
        connections: new Map(),
        label: curveLabel,
      };

      // Register label for later reference
      this.state.labeledPieces.set(curveLabel, curvePiece);

      // Connect: piece1.point1 -> curve.in -> curve.out -> piece2.point2
      this.addConnection(piece1, point1Name, curvePiece, 'in');
      this.addConnection(curvePiece, 'out', piece2, point2Name);

      this.state.pieces.push(curvePiece);

      logger.debug(`Flex connect at line ${line}: curve-only(R=${solution.radius.toFixed(2)}", ${solution.curveDirection}) labeled "${curveLabel}"`);
    } else if (solution.type === 'straight-curve') {
      // Create straight piece first, then curve
      const straightArch = this.createFlexStraightArchetype(
        flexId + '_str',
        solution.straightLength
      );
      // curveDirection is always 'left' or 'right' for straight-curve solutions
      const curveArch = this.createFlexCurveArchetype(
        flexId + '_crv',
        solution.radius,
        solution.curveDirection as 'left' | 'right',
        solution.D1,
        solution.D2
      );

      registerRuntimeArchetype(straightArch);
      registerRuntimeArchetype(curveArch);

      // Calculate positions
      const straightPiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: straightArch.code,
        position: { ...solution.P1 },
        rotation: Math.atan2(solution.D1.z, solution.D1.x),
        connections: new Map(),
        label: straightLabel,
      };

      // Curve starts where straight ends
      const curveStart: Vec3 = {
        x: solution.P1.x + solution.D1.x * solution.straightLength,
        y: 0,
        z: solution.P1.z + solution.D1.z * solution.straightLength,
      };

      const curvePiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: curveArch.code,
        position: { ...curveStart },
        rotation: Math.atan2(solution.D1.z, solution.D1.x),
        connections: new Map(),
        label: curveLabel,
      };

      // Register labels for later reference
      this.state.labeledPieces.set(straightLabel, straightPiece);
      this.state.labeledPieces.set(curveLabel, curvePiece);

      // Connect: piece1.point1 -> straight.in
      this.addConnection(piece1, point1Name, straightPiece, 'in');
      // Connect: straight.out -> curve.in
      this.addConnection(straightPiece, 'out', curvePiece, 'in');
      // Connect: curve.out -> piece2.point2
      this.addConnection(curvePiece, 'out', piece2, point2Name);

      this.state.pieces.push(straightPiece, curvePiece);

      logger.debug(`Flex connect at line ${line}: straight(${solution.straightLength.toFixed(2)}") labeled "${straightLabel}" + ${solution.curveDirection} curve(R=${solution.radius.toFixed(2)}") labeled "${curveLabel}"`);
    } else {
      // Create curve piece first, then straight (curve-straight case)
      // curveDirection is always 'left' or 'right' for curve-straight solutions
      const curveArch = this.createFlexCurveArchetype(
        flexId + '_crv',
        solution.radius,
        solution.curveDirection as 'left' | 'right',
        solution.D1,
        solution.D2
      );
      const straightArch = this.createFlexStraightArchetype(
        flexId + '_str',
        solution.straightLength
      );

      registerRuntimeArchetype(curveArch);
      registerRuntimeArchetype(straightArch);

      const curvePiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: curveArch.code,
        position: { ...solution.P1 },
        rotation: Math.atan2(solution.D1.z, solution.D1.x),
        connections: new Map(),
        label: curveLabel,
      };

      // Straight starts where curve ends (P2 - L * D2)
      const straightStart: Vec3 = {
        x: solution.P2.x - solution.D2.x * solution.straightLength,
        y: 0,
        z: solution.P2.z - solution.D2.z * solution.straightLength,
      };

      const straightPiece: TrackPiece = {
        id: `piece_${this.state.nextPieceId++}`,
        archetypeCode: straightArch.code,
        position: { ...straightStart },
        rotation: Math.atan2(solution.D2.z, solution.D2.x),
        connections: new Map(),
        label: straightLabel,
      };

      // Register labels for later reference
      this.state.labeledPieces.set(curveLabel, curvePiece);
      this.state.labeledPieces.set(straightLabel, straightPiece);

      // Connect: piece1.point1 -> curve.in
      this.addConnection(piece1, point1Name, curvePiece, 'in');
      // Connect: curve.out -> straight.in
      this.addConnection(curvePiece, 'out', straightPiece, 'in');
      // Connect: straight.out -> piece2.point2
      this.addConnection(straightPiece, 'out', piece2, point2Name);

      this.state.pieces.push(curvePiece, straightPiece);

      logger.debug(`Flex connect at line ${line}: ${solution.curveDirection} curve(R=${solution.radius.toFixed(2)}") labeled "${curveLabel}" + straight(${solution.straightLength.toFixed(2)}") labeled "${straightLabel}"`);
    }
  }

  /**
   * Create a straight track archetype with given length.
   */
  private createFlexStraightArchetype(code: string, length: number): TrackArchetype {
    return {
      code,
      aliases: [],
      sections: [
        { splinePoints: [vec2(0, 0), vec2(length, 0)] },
      ],
      connectionPoints: [
        { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
        { name: 'out', position: vec2(length, 0), direction: vec2(1, 0), sectionIndices: [0] },
      ],
    };
  }

  /**
   * Create a curve track archetype with given radius and direction.
   * The curve goes from direction D1 to direction D2.
   */
  private createFlexCurveArchetype(
    code: string,
    radius: number,
    curveDirection: 'left' | 'right',
    D1: Vec3,
    D2: Vec3
  ): TrackArchetype {
    // Calculate the arc angle from D1 to D2
    const angle1 = Math.atan2(D1.z, D1.x);
    const angle2 = Math.atan2(D2.z, D2.x);

    let arcAngle = angle2 - angle1;

    // Normalize to [-PI, PI] to get the smallest angle difference
    while (arcAngle > Math.PI) arcAngle -= 2 * Math.PI;
    while (arcAngle < -Math.PI) arcAngle += 2 * Math.PI;

    // The sign of arcAngle now tells us the natural curve direction:
    // Positive = counter-clockwise (left), Negative = clockwise (right)
    // If the solver's curveDirection disagrees AND the arc is large (> 90°),
    // then go the long way. Otherwise, trust the geometric arc.
    const naturalDirection = arcAngle >= 0 ? 'left' : 'right';
    if (curveDirection !== naturalDirection && Math.abs(arcAngle) < Math.PI / 2) {
      // Small arc but solver wants opposite direction - this is likely a solver quirk
      // Just use the natural direction (shorter arc)
      // The actual curveDirection parameter came from the sign of R in the solver,
      // but for small angles, the geometric direction is more reliable
    } else if (curveDirection !== naturalDirection) {
      // Large arc and solver wants opposite direction - go the long way
      if (curveDirection === 'left') {
        arcAngle += 2 * Math.PI;  // Make it positive (left)
      } else {
        arcAngle -= 2 * Math.PI;  // Make it negative (right)
      }
    }
    // else: directions agree, use arcAngle as-is

    const arcDegrees = Math.abs(arcAngle * 180 / Math.PI);
    const numPoints = Math.max(3, Math.ceil(arcDegrees / 5) + 1); // At least 3 points

    // Generate spline points in local coordinates (starting at origin, heading +X)
    const points: Vec3[] = [];
    const absArc = Math.abs(arcAngle);

    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      const angle = t * absArc;

      if (curveDirection === 'left') {
        // Left curve: center is at (0, radius), curve goes counter-clockwise
        points.push(vec2(
          radius * Math.sin(angle),
          radius * (1 - Math.cos(angle))
        ));
      } else {
        // Right curve: center is at (0, -radius), curve goes clockwise
        points.push(vec2(
          radius * Math.sin(angle),
          -radius * (1 - Math.cos(angle))
        ));
      }
    }

    // Calculate end position and direction in local coordinates
    const endPos = points[points.length - 1];
    let endDir: Vec3;
    if (curveDirection === 'left') {
      endDir = vec2(Math.cos(absArc), Math.sin(absArc));
    } else {
      endDir = vec2(Math.cos(absArc), -Math.sin(absArc));
    }

    return {
      code,
      aliases: [],
      sections: [{ splinePoints: points }],
      connectionPoints: [
        { name: 'in', position: vec2(0, 0), direction: vec2(-1, 0), sectionIndices: [0] },
        { name: 'out', position: endPos, direction: endDir, sectionIndices: [0] },
      ],
    };
  }

  /**
   * Helper to add bidirectional connection between two pieces.
   */
  private addConnection(
    pieceA: TrackPiece,
    pointA: string,
    pieceB: TrackPiece,
    pointB: string
  ): void {
    const aConns = pieceA.connections.get(pointA) || [];
    aConns.push({ pieceId: pieceB.id, pointName: pointB });
    pieceA.connections.set(pointA, aConns);

    const bConns = pieceB.connections.get(pointB) || [];
    bConns.push({ pieceId: pieceA.id, pointName: pointA });
    pieceB.connections.set(pointB, bConns);
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
      logger.warn(`No track found at splice point ${pointRef} (world pos: ${spliceWorldPos.x.toFixed(2)}, ${spliceWorldPos.z.toFixed(2)}) at line ${splice.line}`);

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

          // Get existing connections for point a
          const aConnections = a.piece.connections.get(a.pointName) || [];

          // Skip if already connected to each other
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

  /**
   * Mark pieces that are inside tunnels.
   * A piece is inside a tunnel if it's between two tunnel pieces.
   * We find tunnel pairs by traversing from each tunnel's 'out' and checking
   * if we reach another tunnel before hitting a dead end or looping back.
   */
  private markTunnelSections(): void {
    // Find all tunnel pieces
    const tunnelPieces = this.state.pieces.filter(p =>
      p.archetypeCode === 'tun' || p.archetypeCode === 'tunnel'
    );

    // Track which tunnels have been used as "exit" tunnels
    const usedAsExit = new Set<string>();

    // For each tunnel that hasn't been used as an exit, try to find a path to another tunnel
    for (const tunnel of tunnelPieces) {
      if (usedAsExit.has(tunnel.id)) continue;

      // Traverse from this tunnel's 'out' connection
      const pathPieces: string[] = [];
      const exitTunnel = this.findTunnelPath(tunnel.id, 'out', pathPieces, new Set<string>());

      // Only mark pieces if we found another tunnel (forming a tunnel pair)
      if (exitTunnel && exitTunnel !== tunnel.id) {
        usedAsExit.add(exitTunnel);
        // Mark all pieces in the path as inTunnel
        for (const pieceId of pathPieces) {
          const piece = this.state.pieces.find(p => p.id === pieceId);
          if (piece) {
            piece.inTunnel = true;
          }
        }
      }
    }
  }

  /**
   * Traverse from a tunnel's connection point to find another tunnel.
   * Returns the ID of the exit tunnel if found, null otherwise.
   * Populates pathPieces with the IDs of pieces along the path.
   */
  private findTunnelPath(
    pieceId: string,
    fromPoint: string,
    pathPieces: string[],
    visited: Set<string>
  ): string | null {
    const piece = this.state.pieces.find(p => p.id === pieceId);
    if (!piece) return null;

    // Get connections from this point
    const connections = piece.connections.get(fromPoint);
    if (!connections || connections.length === 0) return null;

    for (const conn of connections) {
      // Skip if already visited
      const visitKey = `${conn.pieceId}.${conn.pointName}`;
      if (visited.has(visitKey)) continue;
      visited.add(visitKey);

      const connectedPiece = this.state.pieces.find(p => p.id === conn.pieceId);
      if (!connectedPiece) continue;

      // If we hit another tunnel, we found the exit
      if (connectedPiece.archetypeCode === 'tun' || connectedPiece.archetypeCode === 'tunnel') {
        return connectedPiece.id;
      }

      // Add this piece to the path and continue traversal
      pathPieces.push(conn.pieceId);

      // Continue traversal from the opposite connection point
      const oppositePoint = conn.pointName === 'in' ? 'out' :
                           conn.pointName === 'out' ? 'in' :
                           conn.pointName === 'in1' ? 'out1' :
                           conn.pointName === 'out1' ? 'in1' :
                           conn.pointName === 'in2' ? 'out2' : 'in2';

      const result = this.findTunnelPath(conn.pieceId, oppositePoint, pathPieces, visited);
      if (result) return result;

      // If this path didn't lead to a tunnel, remove piece from path (backtrack)
      pathPieces.pop();
    }

    return null;
  }
}
