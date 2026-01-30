/**
 * DSL Lexer - tokenizes layout definition text
 */

export enum TokenType {
  IDENTIFIER = 'IDENTIFIER',   // piece codes, labels
  LABEL_DEF = 'LABEL_DEF',     // label: (includes the colon)
  LABEL_REF = 'LABEL_REF',     // $label
  DOT = 'DOT',                 // .
  REPETITION = 'REPETITION',   // x or *
  NUMBER = 'NUMBER',           // numeric values
  NEW = 'NEW',                 // new keyword
  LOOP_CLOSE = 'LOOP_CLOSE',   // >
  EOF = 'EOF',
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

/**
 * Tokenize a DSL input string
 */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const lines = input.split('\n');

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    let line = lines[lineNum];

    // Remove comments
    const commentIndex = line.indexOf('#');
    if (commentIndex !== -1) {
      line = line.substring(0, commentIndex);
    }

    // Split by semicolons and process each statement
    const statements = line.split(';');

    for (const statement of statements) {
      const statementTokens = tokenizeStatement(statement.trim(), lineNum + 1);
      tokens.push(...statementTokens);
    }
  }

  tokens.push({ type: TokenType.EOF, value: '', line: lines.length, column: 0 });
  return tokens;
}

function tokenizeStatement(statement: string, lineNum: number): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < statement.length) {
    // Skip whitespace
    while (pos < statement.length && /\s/.test(statement[pos])) {
      pos++;
    }
    if (pos >= statement.length) break;

    const startPos = pos;
    const char = statement[pos];

    // Label reference: $identifier
    if (char === '$') {
      pos++;
      const start = pos;
      while (pos < statement.length && /[a-zA-Z0-9_]/.test(statement[pos])) {
        pos++;
      }
      tokens.push({
        type: TokenType.LABEL_REF,
        value: statement.substring(start, pos),
        line: lineNum,
        column: startPos + 1,
      });
      continue;
    }

    // Loop close: >
    if (char === '>') {
      tokens.push({
        type: TokenType.LOOP_CLOSE,
        value: '>',
        line: lineNum,
        column: startPos + 1,
      });
      pos++;
      continue;
    }

    // Dot
    if (char === '.') {
      tokens.push({
        type: TokenType.DOT,
        value: '.',
        line: lineNum,
        column: startPos + 1,
      });
      pos++;
      continue;
    }

    // Repetition operator: x or *
    if (char === '*') {
      tokens.push({
        type: TokenType.REPETITION,
        value: '*',
        line: lineNum,
        column: startPos + 1,
      });
      pos++;
      continue;
    }

    // Number (including negative and decimals)
    if (/[0-9]/.test(char) || (char === '-' && pos + 1 < statement.length && /[0-9]/.test(statement[pos + 1]))) {
      const start = pos;
      if (char === '-') pos++;
      while (pos < statement.length && /[0-9.]/.test(statement[pos])) {
        pos++;
      }
      tokens.push({
        type: TokenType.NUMBER,
        value: statement.substring(start, pos),
        line: lineNum,
        column: startPos + 1,
      });
      continue;
    }

    // Identifier (may be followed by : for label definition, or x for repetition)
    if (/[a-zA-Z_]/.test(char)) {
      const start = pos;
      while (pos < statement.length && /[a-zA-Z0-9_]/.test(statement[pos])) {
        pos++;
      }
      const value = statement.substring(start, pos);

      // Check for label definition (followed by :)
      // Skip whitespace first
      let peekPos = pos;
      while (peekPos < statement.length && /\s/.test(statement[peekPos])) {
        peekPos++;
      }
      if (peekPos < statement.length && statement[peekPos] === ':') {
        tokens.push({
          type: TokenType.LABEL_DEF,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        pos = peekPos + 1; // Skip the colon
        continue;
      }

      // Check for 'new' keyword
      if (value === 'new') {
        tokens.push({
          type: TokenType.NEW,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      // Check for 'x' as repetition operator (standalone, not part of identifier like 'x90')
      if (value === 'x') {
        tokens.push({
          type: TokenType.REPETITION,
          value: 'x',
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      tokens.push({
        type: TokenType.IDENTIFIER,
        value: value,
        line: lineNum,
        column: startPos + 1,
      });
      continue;
    }

    // Unknown character - skip
    pos++;
  }

  return tokens;
}
