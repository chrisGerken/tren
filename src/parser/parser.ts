/**
 * DSL Parser - builds AST from tokens
 */

import { tokenize, Token, TokenType } from './lexer';

/** AST Node Types */
export type Statement =
  | NewStatement
  | PieceStatement
  | ReferenceStatement
  | LoopCloseStatement;

export interface NewStatement {
  type: 'new';
  degrees: number;
  fromLabel?: string;   // Optional: start from this labeled piece
  fromPoint?: string;   // Optional: which connection point (default 'out')
  line: number;
}

export interface PieceStatement {
  type: 'piece';
  label?: string;
  attachPoint?: string;  // 'in' or 'out' for explicit connection syntax
  archetypeCode: string;
  count: number;
  line: number;
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

      case TokenType.LABEL_DEF:
        return this.parseLabeledPiece();

      case TokenType.LABEL_REF:
        return this.parseReference();

      case TokenType.LOOP_CLOSE:
        return this.parseLoopClose();

      case TokenType.IDENTIFIER:
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
    let fromLabel: string | undefined;
    let fromPoint: string | undefined;

    // Check for optional degrees
    if (this.check(TokenType.NUMBER)) {
      degrees = parseFloat(this.advance().value);
    }

    // Check for optional 'from' keyword (skip it if present)
    if (this.check(TokenType.IDENTIFIER) && this.peek().value === 'from') {
      this.advance(); // consume 'from'
    }

    // Check for $label.point syntax
    if (this.check(TokenType.LABEL_REF)) {
      fromLabel = this.advance().value;

      // Check for .point
      if (this.check(TokenType.DOT)) {
        this.advance(); // consume dot
        if (this.check(TokenType.IDENTIFIER)) {
          fromPoint = this.advance().value;
        }
      }
    }
    // Check for point.$label syntax (alternative ordering)
    // Only consume if we see IDENTIFIER followed by DOT followed by LABEL_REF
    else if (this.check(TokenType.IDENTIFIER) && this.peekNext()?.type === TokenType.DOT) {
      const firstIdent = this.advance().value;
      this.advance(); // consume dot
      if (this.check(TokenType.LABEL_REF)) {
        fromPoint = firstIdent;  // First identifier was the point
        fromLabel = this.advance().value;
      }
    }

    return { type: 'new', degrees, fromLabel, fromPoint, line: token.line };
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
    };
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
