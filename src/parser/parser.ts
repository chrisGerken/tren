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
  | MingapStatement
  | SpliceStatement
  | RandomStatement
  | MaxTrainsStatement
  | FlexConnectStatement;

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

export interface MingapStatement {
  type: 'mingap';
  value: number;
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

      case TokenType.MINGAP:
        return this.parseMingapStatement();

      case TokenType.RANDOM:
        return this.parseRandomStatement();

      case TokenType.MAX:
        return this.parseMaxTrainsStatement();

      case TokenType.FLEX:
        return this.parseFlexConnectStatement();

      case TokenType.SPLICE:
        return this.parseSpliceStatement();

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
      } else if (this.check(TokenType.IDENTIFIER) && this.peek().value === 'from') {
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
      (type === TokenType.IDENTIFIER && value === 'from') ||
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
          point = this.advance().value;
        }
      }
      return { label, point };
    } else if (this.check(TokenType.IDENTIFIER) && this.peekNext()?.type === TokenType.DOT) {
      // point.$label syntax
      const point = this.advance().value;
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

  private parseMingapStatement(): MingapStatement {
    const token = this.advance(); // consume 'mingap'
    let value = 1; // default
    if (this.check(TokenType.NUMBER)) {
      value = parseFloat(this.advance().value);
    }
    return { type: 'mingap', value, line: token.line };
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
        point = this.advance().value;
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
    const point = pointToken.value;

    this.advance(); // consume dot

    if (!this.check(TokenType.LABEL_REF)) {
      throw new Error(`Expected $label after '${point}.' at line ${pointToken.line}`);
    }
    const label = this.advance().value;

    return { type: 'reference', label, point, line: pointToken.line };
  }

  private parseLoopClose(): LoopCloseStatement {
    const startToken = this.advance(); // consume '>'

    // Expect: point.$label
    if (!this.check(TokenType.IDENTIFIER)) {
      throw new Error(`Expected connection point after ">" at line ${startToken.line}`);
    }
    const point = this.advance().value;

    if (!this.check(TokenType.DOT)) {
      throw new Error(`Expected "." after connection point in loop close at line ${startToken.line}`);
    }
    this.advance(); // consume dot

    if (!this.check(TokenType.LABEL_REF)) {
      throw new Error(`Expected $label after "." in loop close at line ${startToken.line}`);
    }
    const label = this.advance().value;

    return { type: 'loopClose', point, label, line: startToken.line };
  }

  private parsePieceOrExplicitConnection(): PieceStatement {
    let attachPoint: string | undefined;
    let archetypeCode: string;

    const firstToken = this.advance(); // consume identifier

    // Check for explicit connection syntax: in.piece or out.piece
    if (this.check(TokenType.DOT)) {
      // This is explicit connection syntax
      attachPoint = firstToken.value; // 'in' or 'out'
      this.advance(); // consume dot

      if (!this.check(TokenType.IDENTIFIER)) {
        throw new Error(`Expected piece code after '${attachPoint}.' at line ${firstToken.line}`);
      }
      archetypeCode = this.advance().value;
    } else {
      archetypeCode = firstToken.value;
    }

    // Parse gen-specific parameters: gen [cabs N|N-M] [cars N|N-M] [speed S|S-S] [every T|T-T]
    let genCabs: number | RangeValue | undefined;
    let genCars: number | RangeValue | undefined;
    let genSpeed: number | RangeValue | undefined;
    let genEvery: number | RangeValue | undefined;

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
    };
  }

  private isGenModifier(): boolean {
    const type = this.peek().type;
    return type === TokenType.CABS || type === TokenType.CARS || type === TokenType.SPEED || type === TokenType.EVERY;
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
