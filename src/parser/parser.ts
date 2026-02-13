/**
 * DSL Parser - builds AST from tokens
 */

import { tokenize, Token, TokenType } from './lexer';

/** AST Node Types */
export type Statement =
  | NewStatement
  | PieceStatement
  | ReferenceStatement
  | LoopCloseStatement
  | TitleStatement
  | DescriptionStatement
  | LockAheadStatement
  | SpliceStatement
  | RandomStatement
  | MaxTrainsStatement
  | FlexConnectStatement
  | CrossConnectStatement
  | DefineStatement
  | LogStatement
  | ArrayStatement
  | PrefabStatement
  | UseStatement;

export interface NewStatement {
  type: 'new';
  degrees: number;
  offset: number;       // Offset distance along direction (default 0)
  baseLabel?: string;   // Optional: start from this labeled piece
  basePoint?: string;   // Optional: which connection point (default 'out')
  line: number;
}

/** Range value for generator parameters */
export interface RangeValue {
  min: number;
  max: number;
}

export interface PieceStatement {
  type: 'piece';
  label?: string;
  attachPoint?: string;  // 'in' or 'out' for explicit connection syntax
  archetypeCode: string;
  count: number;
  line: number;
  // Generator-specific parameters (only for 'gen' archetype)
  // Each can be a single value or a range (min-max)
  genCabs?: number | RangeValue;      // Number of cabs (default 1)
  genCars?: number | RangeValue;      // Number of cars (default 5)
  genSpeed?: number | RangeValue;     // Train speed in inches/second (default 12)
  genEvery?: number | RangeValue;     // Spawn frequency in seconds (undefined = one-shot)
  genColorMode?: 'colorful' | 'gray' | 'black'; // Car color mode ('colorful', 'gray', or 'black', default 'gray')
}

export interface ReferenceStatement {
  type: 'reference';
  label: string;
  point?: string;  // Connection point, default 'out'
  line: number;
}

export interface LoopCloseStatement {
  type: 'loopClose';
  point: string;
  label: string;
  line: number;
}

export interface TitleStatement {
  type: 'title';
  text: string;
  line: number;
}

export interface DescriptionStatement {
  type: 'description';
  text: string;
  line: number;
}

export interface LockAheadStatement {
  type: 'lockAhead';
  distance?: number;  // Lock ahead distance in inches (default: 10)
  count?: number;     // Minimum connection points to lock (default: 2)
  line: number;
}

export interface SpliceStatement {
  type: 'splice';
  label?: string;   // Optional: if not provided, use current piece
  point?: string;   // Connection point, default 'out'
  line: number;
}

export interface RandomStatement {
  type: 'random';
  line: number;
}

export interface MaxTrainsStatement {
  type: 'maxTrains';
  value: number;
  line: number;
}

export interface FlexConnectStatement {
  type: 'flexConnect';
  point1Label: string;
  point1Name?: string;  // Connection point name, default 'out'
  point2Label: string;
  point2Name?: string;  // Connection point name, default 'in'
  line: number;
}

export interface CrossConnectStatement {
  type: 'crossConnect';
  label1: string;
  label2: string;
  line: number;
}

/** Direction for custom archetype definition */
export type DefineDirection = 'left' | 'right' | 'straight';

export interface DefineStatement {
  type: 'define';
  name: string;                // Custom archetype name
  direction: DefineDirection;  // 'left', 'right', or 'straight'
  radius?: number;             // Curve radius (required for left/right)
  arc?: number;                // Curve arc angle in degrees (required for left/right)
  length?: number;             // Straight length (required for straight)
  line: number;
}

export interface LogStatement {
  type: 'log';
  level: 'debug' | 'info' | 'warn' | 'error';
  line: number;
}

export interface ArrayStatement {
  type: 'array';
  count: number;
  angle: number;      // degrees
  distance: number;   // inches
  prefix: string;
  line: number;
}

export interface PrefabStatement {
  type: 'prefab';
  name: string;
  body: string;   // Raw DSL text to be expanded later
  line: number;
}

export interface UseStatement {
  type: 'use';
  name: string;
  params: Record<string, string>;  // key → value map
  line: number;
}

/**
 * Parse DSL text into an array of statements
 */
export function parse(input: string): Statement[] {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parse();
}

class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): Statement[] {
    const statements: Statement[] = [];

    while (!this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    return statements;
  }

  private parseStatement(): Statement | null {
    const token = this.peek();

    switch (token.type) {
      case TokenType.NEW:
        return this.parseNewStatement();

      case TokenType.TITLE:
        return this.parseTitleStatement();

      case TokenType.DESCRIPTION:
        return this.parseDescriptionStatement();

      case TokenType.LOCKAHEAD:
        return this.parseLockAheadStatement();

      case TokenType.RANDOM:
        return this.parseRandomStatement();

      case TokenType.MAX:
        return this.parseMaxTrainsStatement();

      case TokenType.FLEX:
        return this.parseFlexConnectStatement();

      case TokenType.CROSS:
        return this.parseCrossConnectStatement();

      case TokenType.DEFINE:
        return this.parseDefineStatement();

      case TokenType.LOG:
        return this.parseLogStatement();

      case TokenType.SPLICE:
        return this.parseSpliceStatement();

      case TokenType.ARRAY:
        return this.parseArrayStatement();

      case TokenType.PREFAB:
        return this.parsePrefabStatement();

      case TokenType.USE:
        return this.parseUseStatement();

      case TokenType.LABEL_DEF:
        return this.parseLabeledPiece();

      case TokenType.LABEL_REF:
        return this.parseReference();

      case TokenType.LOOP_CLOSE:
        return this.parseLoopClose();

      case TokenType.IDENTIFIER:
        // Check for point.$label reference syntax (e.g., out.$sw1)
        if (this.peekNext()?.type === TokenType.DOT) {
          const tokenAfterDot = this.tokens[this.pos + 2];
          if (tokenAfterDot?.type === TokenType.LABEL_REF) {
            return this.parsePointLabelReference();
          }
        }
        return this.parsePieceOrExplicitConnection();

      case TokenType.EOF:
        return null;

      default:
        // Skip unexpected tokens
        this.advance();
        return null;
    }
  }

  private parseNewStatement(): NewStatement {
    const token = this.advance(); // consume 'new'

    let degrees = 0;
    let offset = 0;
    let baseLabel: string | undefined;
    let basePoint: string | undefined;

    // Parse modifiers in any order
    while (this.isNewModifier()) {
      if (this.check(TokenType.DEGREES)) {
        this.advance(); // consume 'degrees'
        if (this.check(TokenType.NUMBER)) {
          degrees = parseFloat(this.advance().value);
        }
      } else if (this.check(TokenType.OFFSET)) {
        this.advance(); // consume 'offset'
        if (this.check(TokenType.NUMBER)) {
          offset = parseFloat(this.advance().value);
        }
      } else if (this.check(TokenType.BASE)) {
        this.advance(); // consume 'base'
        const ref = this.parseConnectionPointRef();
        if (ref) {
          baseLabel = ref.label;
          basePoint = ref.point;
        }
      } else if (this.check(TokenType.NUMBER)) {
        // Legacy: bare number is degrees
        degrees = parseFloat(this.advance().value);
      } else if (this.check(TokenType.IDENTIFIER) && this.peek().value.toLowerCase() === 'from') {
        // Legacy: 'from $label.point'
        this.advance(); // consume 'from'
        const ref = this.parseConnectionPointRef();
        if (ref) {
          baseLabel = ref.label;
          basePoint = ref.point;
        }
      } else if (this.check(TokenType.LABEL_REF)) {
        // Legacy: '$label.point' without 'base'
        const ref = this.parseConnectionPointRef();
        if (ref) {
          baseLabel = ref.label;
          basePoint = ref.point;
        }
      } else {
        break;
      }
    }

    return { type: 'new', degrees, offset, baseLabel, basePoint, line: token.line };
  }

  private isNewModifier(): boolean {
    const type = this.peek().type;
    const value = this.peek().value;
    return (
      type === TokenType.DEGREES ||
      type === TokenType.OFFSET ||
      type === TokenType.BASE ||
      type === TokenType.NUMBER ||
      type === TokenType.LABEL_REF ||
      (type === TokenType.IDENTIFIER && value.toLowerCase() === 'from') ||
      (type === TokenType.IDENTIFIER && this.peekNext()?.type === TokenType.DOT)
    );
  }

  private parseConnectionPointRef(): { label: string; point?: string } | null {
    // Handle: $label, $label.point, point.$label
    if (this.check(TokenType.LABEL_REF)) {
      const label = this.advance().value;
      let point: string | undefined;
      if (this.check(TokenType.DOT)) {
        this.advance(); // consume dot
        if (this.check(TokenType.IDENTIFIER)) {
          point = this.advance().value.toLowerCase();
        }
      }
      return { label, point };
    } else if (this.check(TokenType.IDENTIFIER) && this.peekNext()?.type === TokenType.DOT) {
      // point.$label syntax
      const point = this.advance().value.toLowerCase();
      this.advance(); // consume dot
      if (this.check(TokenType.LABEL_REF)) {
        const label = this.advance().value;
        return { label, point };
      }
    }
    return null;
  }

  private parseTitleStatement(): TitleStatement {
    const token = this.advance(); // consume 'title'
    let text = '';
    if (this.check(TokenType.STRING)) {
      text = this.advance().value;
    }
    return { type: 'title', text, line: token.line };
  }

  private parseDescriptionStatement(): DescriptionStatement {
    const token = this.advance(); // consume 'description'
    let text = '';
    if (this.check(TokenType.STRING)) {
      text = this.advance().value;
    }
    return { type: 'description', text, line: token.line };
  }

  private parseLockAheadStatement(): LockAheadStatement {
    const token = this.advance(); // consume 'lockahead'
    let distance: number | undefined;
    let count: number | undefined;

    // Parse modifiers in any order: distance N, count N
    while (this.check(TokenType.DISTANCE) || this.check(TokenType.COUNT) || this.check(TokenType.NUMBER)) {
      if (this.check(TokenType.DISTANCE)) {
        this.advance(); // consume 'distance'
        if (this.check(TokenType.NUMBER)) {
          distance = parseFloat(this.advance().value);
        }
      } else if (this.check(TokenType.COUNT)) {
        this.advance(); // consume 'count'
        if (this.check(TokenType.NUMBER)) {
          count = parseInt(this.advance().value, 10);
        }
      } else if (this.check(TokenType.NUMBER)) {
        // Bare number defaults to distance for backward compatibility
        distance = parseFloat(this.advance().value);
      }
    }

    return { type: 'lockAhead', distance, count, line: token.line };
  }

  private parseRandomStatement(): RandomStatement {
    const token = this.advance(); // consume 'random'
    return { type: 'random', line: token.line };
  }

  private parseMaxTrainsStatement(): MaxTrainsStatement {
    const token = this.advance(); // consume 'max'

    // Expect 'trains' keyword
    if (this.check(TokenType.TRAINS)) {
      this.advance(); // consume 'trains'
    }

    // Expect a number
    let value = 1; // default
    if (this.check(TokenType.NUMBER)) {
      value = parseInt(this.advance().value, 10);
    }

    return { type: 'maxTrains', value, line: token.line };
  }

  private parseFlexConnectStatement(): FlexConnectStatement {
    const token = this.advance(); // consume 'flex'

    // Expect 'connect' keyword
    if (this.check(TokenType.CONNECT)) {
      this.advance(); // consume 'connect'
    }

    // Parse first connection point reference: $label or $label.point
    const ref1 = this.parseConnectionPointRef();
    if (!ref1) {
      throw new Error(`Expected connection point reference after 'flex connect' at line ${token.line}`);
    }

    // Parse second connection point reference
    const ref2 = this.parseConnectionPointRef();
    if (!ref2) {
      throw new Error(`Expected second connection point reference in 'flex connect' at line ${token.line}`);
    }

    return {
      type: 'flexConnect',
      point1Label: ref1.label,
      point1Name: ref1.point,
      point2Label: ref2.label,
      point2Name: ref2.point,
      line: token.line,
    };
  }

  private parseCrossConnectStatement(): CrossConnectStatement {
    const token = this.advance(); // consume 'cross'

    // Expect 'connect' keyword
    if (this.check(TokenType.CONNECT)) {
      this.advance(); // consume 'connect'
    }

    // Parse first label reference: $label
    if (!this.check(TokenType.LABEL_REF)) {
      throw new Error(`Expected $label after 'cross connect' at line ${token.line}`);
    }
    const label1 = this.advance().value;

    // Parse second label reference: $label
    if (!this.check(TokenType.LABEL_REF)) {
      throw new Error(`Expected second $label in 'cross connect' at line ${token.line}`);
    }
    const label2 = this.advance().value;

    return {
      type: 'crossConnect',
      label1,
      label2,
      line: token.line,
    };
  }

  private parseLogStatement(): LogStatement {
    const token = this.advance(); // consume 'log' or 'logging'

    if (!this.check(TokenType.IDENTIFIER)) {
      throw new Error(`Expected log level (debug, info, warn, error) after 'log' at line ${token.line}`);
    }

    const levelToken = this.advance();
    let levelStr = levelToken.value.toLowerCase();

    // Accept 'warning' as alias for 'warn'
    if (levelStr === 'warning') levelStr = 'warn';

    if (levelStr !== 'debug' && levelStr !== 'info' && levelStr !== 'warn' && levelStr !== 'error') {
      throw new Error(`Invalid log level '${levelToken.value}' at line ${token.line}. Expected: debug, info, warn, or error`);
    }

    return {
      type: 'log',
      level: levelStr as 'debug' | 'info' | 'warn' | 'error',
      line: token.line,
    };
  }

  private parseDefineStatement(): DefineStatement {
    const token = this.advance(); // consume 'define' or 'def'

    // Expect archetype name (IDENTIFIER)
    if (!this.check(TokenType.IDENTIFIER)) {
      throw new Error(`Expected archetype name after 'define' at line ${token.line}`);
    }
    const name = this.advance().value.toLowerCase();

    // Expect direction: LEFT, RIGHT, or STRAIGHT
    let direction: DefineDirection;
    if (this.check(TokenType.LEFT)) {
      this.advance();
      direction = 'left';
    } else if (this.check(TokenType.RIGHT)) {
      this.advance();
      direction = 'right';
    } else if (this.check(TokenType.STRAIGHT)) {
      this.advance();
      direction = 'straight';
    } else {
      throw new Error(`Expected direction (left, right, straight, l, r, or s) after archetype name at line ${token.line}`);
    }

    let radius: number | undefined;
    let arc: number | undefined;
    let length: number | undefined;

    if (direction === 'left' || direction === 'right') {
      // For curves: require radius and arc
      // Parse in any order
      while (this.check(TokenType.RADIUS) || this.check(TokenType.ARC)) {
        if (this.check(TokenType.RADIUS)) {
          this.advance(); // consume 'radius'
          if (!this.check(TokenType.NUMBER)) {
            throw new Error(`Expected number after 'radius' at line ${token.line}`);
          }
          radius = parseFloat(this.advance().value);
        } else if (this.check(TokenType.ARC)) {
          this.advance(); // consume 'arc'
          if (!this.check(TokenType.NUMBER)) {
            throw new Error(`Expected number after 'arc' at line ${token.line}`);
          }
          arc = parseFloat(this.advance().value);
        }
      }

      // Validate that both radius and arc are provided
      if (radius === undefined) {
        throw new Error(`Curve definition requires 'radius' at line ${token.line}`);
      }
      if (arc === undefined) {
        throw new Error(`Curve definition requires 'arc' at line ${token.line}`);
      }

      // Check that length is not provided for curves
      if (this.check(TokenType.LENGTH)) {
        throw new Error(`'length' is not allowed for curve definitions at line ${token.line}`);
      }
    } else {
      // For straights: require length
      if (!this.check(TokenType.LENGTH)) {
        throw new Error(`Straight definition requires 'length' at line ${token.line}`);
      }
      this.advance(); // consume 'length'
      if (!this.check(TokenType.NUMBER)) {
        throw new Error(`Expected number after 'length' at line ${token.line}`);
      }
      length = parseFloat(this.advance().value);

      // Check that radius and arc are not provided for straights
      if (this.check(TokenType.RADIUS) || this.check(TokenType.ARC)) {
        throw new Error(`'radius' and 'arc' are not allowed for straight definitions at line ${token.line}`);
      }
    }

    return {
      type: 'define',
      name,
      direction,
      radius,
      arc,
      length,
      line: token.line,
    };
  }

  private parseSpliceStatement(): SpliceStatement {
    const token = this.advance(); // consume 'splice'

    // Optional 'using' keyword
    if (this.check(TokenType.USING)) {
      this.advance();
    }

    // Parse optional connection point reference
    const ref = this.parseConnectionPointRef();

    return {
      type: 'splice',
      label: ref?.label,
      point: ref?.point,
      line: token.line,
    };
  }

  private parseArrayStatement(): ArrayStatement {
    const token = this.advance(); // consume 'array'

    let count: number | undefined;
    let angle: number | undefined;
    let distance: number | undefined;
    let prefix: string | undefined;

    // Parse parameters in any order
    while (this.check(TokenType.COUNT) || this.check(TokenType.ANGLE) || this.check(TokenType.DISTANCE) || this.check(TokenType.PREFIX)) {
      if (this.check(TokenType.COUNT)) {
        this.advance(); // consume 'count'
        if (this.check(TokenType.NUMBER)) {
          count = parseInt(this.advance().value, 10);
        }
      } else if (this.check(TokenType.ANGLE)) {
        this.advance(); // consume 'angle'
        if (this.check(TokenType.NUMBER)) {
          angle = parseFloat(this.advance().value);
        }
      } else if (this.check(TokenType.DISTANCE)) {
        this.advance(); // consume 'distance'
        if (this.check(TokenType.NUMBER)) {
          distance = parseFloat(this.advance().value);
        }
      } else if (this.check(TokenType.PREFIX)) {
        this.advance(); // consume 'prefix'
        if (this.check(TokenType.IDENTIFIER)) {
          prefix = this.advance().value;
        }
      }
    }

    // Validate all parameters were provided
    if (count === undefined) {
      throw new Error(`'array' requires 'count' parameter at line ${token.line}`);
    }
    if (angle === undefined) {
      throw new Error(`'array' requires 'angle' parameter at line ${token.line}`);
    }
    if (distance === undefined) {
      throw new Error(`'array' requires 'distance' parameter at line ${token.line}`);
    }
    if (prefix === undefined) {
      throw new Error(`'array' requires 'prefix' parameter at line ${token.line}`);
    }

    return {
      type: 'array',
      count,
      angle,
      distance,
      prefix,
      line: token.line,
    };
  }

  private parsePrefabStatement(): PrefabStatement {
    const token = this.advance(); // consume 'prefab'

    if (!this.check(TokenType.IDENTIFIER)) {
      throw new Error(`Expected prefab name after '${token.value}' at line ${token.line}`);
    }
    const name = this.advance().value;

    if (!this.check(TokenType.STRING)) {
      throw new Error(`Expected prefab body after name '${name}' at line ${token.line}`);
    }
    const body = this.advance().value;

    return { type: 'prefab', name, body, line: token.line };
  }

  private parseUseStatement(): UseStatement {
    const token = this.advance(); // consume 'use'

    if (!this.check(TokenType.IDENTIFIER)) {
      throw new Error(`Expected prefab name after 'use' at line ${token.line}`);
    }
    const name = this.advance().value;

    const params: Record<string, string> = {};

    // Parse key-value pairs: key value [key value ...]
    while (this.check(TokenType.IDENTIFIER) || this.check(TokenType.STRING)) {
      const key = this.advance().value;

      if (!this.check(TokenType.IDENTIFIER) && !this.check(TokenType.NUMBER) && !this.check(TokenType.STRING)) {
        throw new Error(`Expected value for parameter '${key}' in 'use ${name}' at line ${token.line}`);
      }
      const value = this.advance().value;
      params[key] = value;
    }

    return { type: 'use', name, params, line: token.line };
  }

  private parseLabeledPiece(): PieceStatement {
    const labelToken = this.advance(); // consume label definition
    const label = labelToken.value;

    // Parse the piece that follows
    const result = this.parsePieceOrExplicitConnection();
    if (result.type !== 'piece') {
      throw new Error(`Expected piece after label '${label}:' at line ${labelToken.line}`);
    }

    result.label = label;
    return result;
  }

  private parseReference(): ReferenceStatement {
    const refToken = this.advance(); // consume $label
    const label = refToken.value;

    let point: string | undefined;
    if (this.check(TokenType.DOT)) {
      this.advance(); // consume dot
      if (this.check(TokenType.IDENTIFIER)) {
        point = this.advance().value.toLowerCase();
      }
    }

    return { type: 'reference', label, point, line: refToken.line };
  }

  /**
   * Parse point.$label reference syntax (e.g., out.$sw1)
   * This is an alternative to $label.point syntax
   */
  private parsePointLabelReference(): ReferenceStatement {
    const pointToken = this.advance(); // consume point name (e.g., 'out')
    const point = pointToken.value.toLowerCase();

    this.advance(); // consume dot

    if (!this.check(TokenType.LABEL_REF)) {
      throw new Error(`Expected $label after '${point}.' at line ${pointToken.line}`);
    }
    const label = this.advance().value;

    return { type: 'reference', label, point, line: pointToken.line };
  }

  private parseLoopClose(): LoopCloseStatement {
    const startToken = this.advance(); // consume '>'

    // Support two formats:
    // 1. > point.$label  (e.g., > in.$start)
    // 2. > $label.point  (e.g., > $in1.in)

    let point: string;
    let label: string;

    if (this.check(TokenType.IDENTIFIER)) {
      // Format 1: > point.$label
      point = this.advance().value.toLowerCase();

      if (!this.check(TokenType.DOT)) {
        throw new Error(`Expected "." after connection point in loop close at line ${startToken.line}`);
      }
      this.advance(); // consume dot

      if (!this.check(TokenType.LABEL_REF)) {
        throw new Error(`Expected $label after "." in loop close at line ${startToken.line}`);
      }
      label = this.advance().value;
    } else if (this.check(TokenType.LABEL_REF)) {
      // Format 2: > $label.point
      label = this.advance().value;

      if (!this.check(TokenType.DOT)) {
        throw new Error(`Expected "." after $${label} in loop close at line ${startToken.line}`);
      }
      this.advance(); // consume dot

      if (!this.check(TokenType.IDENTIFIER)) {
        throw new Error(`Expected connection point after "$${label}." in loop close at line ${startToken.line}`);
      }
      point = this.advance().value.toLowerCase();
    } else {
      throw new Error(`Expected connection point reference after ">" at line ${startToken.line}`);
    }

    return { type: 'loopClose', point, label, line: startToken.line };
  }

  private parsePieceOrExplicitConnection(): PieceStatement {
    let attachPoint: string | undefined;
    let archetypeCode: string;

    const firstToken = this.advance(); // consume identifier

    // Check for explicit connection syntax: in.piece or out.piece
    if (this.check(TokenType.DOT)) {
      // This is explicit connection syntax
      attachPoint = firstToken.value.toLowerCase(); // 'in' or 'out'
      this.advance(); // consume dot

      if (!this.check(TokenType.IDENTIFIER)) {
        throw new Error(`Expected piece code after '${attachPoint}.' at line ${firstToken.line}`);
      }
      archetypeCode = this.advance().value.toLowerCase();
    } else {
      archetypeCode = firstToken.value.toLowerCase();
    }

    // Parse gen-specific parameters: gen [cabs N|N-M] [cars N|N-M] [speed S|S-S] [every T|T-T] [colorful|gray]
    let genCabs: number | RangeValue | undefined;
    let genCars: number | RangeValue | undefined;
    let genSpeed: number | RangeValue | undefined;
    let genEvery: number | RangeValue | undefined;
    let genColorMode: 'colorful' | 'gray' | 'black' | undefined;

    if (archetypeCode === 'gen' || archetypeCode === 'generator') {
      while (this.isGenModifier()) {
        if (this.check(TokenType.CABS)) {
          this.advance(); // consume 'cabs'
          genCabs = this.parseNumberOrRange(true);
        } else if (this.check(TokenType.CARS)) {
          this.advance(); // consume 'cars'
          genCars = this.parseNumberOrRange(true);
        } else if (this.check(TokenType.SPEED)) {
          this.advance(); // consume 'speed'
          genSpeed = this.parseNumberOrRange(false);
        } else if (this.check(TokenType.EVERY)) {
          this.advance(); // consume 'every'
          genEvery = this.parseNumberOrRange(true);
        } else if (this.check(TokenType.COLORFUL)) {
          this.advance(); // consume 'colorful'
          genColorMode = 'colorful';
        } else if (this.check(TokenType.GRAY)) {
          this.advance(); // consume 'gray'
          genColorMode = 'gray';
        } else if (this.check(TokenType.BLACK)) {
          this.advance(); // consume 'black'
          genColorMode = 'black';
        } else {
          break;
        }
      }
    }

    // Check for repetition: x N or * N
    let count = 1;
    if (this.check(TokenType.REPETITION)) {
      this.advance(); // consume x or *
      if (this.check(TokenType.NUMBER)) {
        count = parseInt(this.advance().value, 10);
      }
    }

    return {
      type: 'piece',
      attachPoint,
      archetypeCode,
      count,
      line: firstToken.line,
      genCabs,
      genCars,
      genSpeed,
      genEvery,
      genColorMode,
    };
  }

  private isGenModifier(): boolean {
    const type = this.peek().type;
    return type === TokenType.CABS || type === TokenType.CARS || type === TokenType.SPEED || type === TokenType.EVERY || type === TokenType.COLORFUL || type === TokenType.GRAY || type === TokenType.BLACK;
  }

  /**
   * Parse a NUMBER or RANGE token into a value or range object
   * @param asInteger - if true, parse as integers; if false, parse as floats
   */
  private parseNumberOrRange(asInteger: boolean): number | RangeValue | undefined {
    if (this.check(TokenType.NUMBER)) {
      const value = this.advance().value;
      return asInteger ? parseInt(value, 10) : parseFloat(value);
    } else if (this.check(TokenType.RANGE)) {
      const value = this.advance().value;
      const parts = value.split('-');
      if (parts.length === 2) {
        const min = asInteger ? parseInt(parts[0], 10) : parseFloat(parts[0]);
        const max = asInteger ? parseInt(parts[1], 10) : parseFloat(parts[1]);
        return { min, max };
      }
    }
    return undefined;
  }

  private peek(): Token {
    return this.tokens[this.pos] || { type: TokenType.EOF, value: '', line: 0, column: 0 };
  }

  private peekNext(): Token | undefined {
    return this.tokens[this.pos + 1];
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.pos++;
    }
    return this.tokens[this.pos - 1];
  }

  private check(type: TokenType): boolean {
    return this.peek().type === type;
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }
}
