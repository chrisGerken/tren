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
  RANGE = 'RANGE',             // range values like 5-10
  STRING = 'STRING',           // string content (for title/description)
  NEW = 'NEW',                 // new keyword
  LOOP_CLOSE = 'LOOP_CLOSE',   // >
  TITLE = 'TITLE',             // title keyword
  DESCRIPTION = 'DESCRIPTION', // description keyword
  LOCKAHEAD = 'LOCKAHEAD',     // lockahead keyword (lock ahead configuration)
  DISTANCE = 'DISTANCE',       // distance keyword (for lockahead)
  COUNT = 'COUNT',             // count keyword (for lockahead)
  DEGREES = 'DEGREES',         // degrees keyword (for new statement)
  OFFSET = 'OFFSET',           // offset keyword (for new statement)
  BASE = 'BASE',               // base keyword (for new statement)
  SPLICE = 'SPLICE',           // splice keyword
  USING = 'USING',             // using keyword (optional for splice)
  CABS = 'CABS',               // cabs keyword (for gen statement)
  CARS = 'CARS',               // cars keyword (for gen statement)
  SPEED = 'SPEED',             // speed keyword (for gen statement)
  EVERY = 'EVERY',             // every keyword (for gen statement)
  COLORFUL = 'COLORFUL',       // colorful keyword (for gen statement - colored cars)
  GRAY = 'GRAY',               // gray keyword (for gen statement - grayscale cars)
  BLACK = 'BLACK',             // black keyword (for gen statement - all black cars)
  RANDOM = 'RANDOM',           // random keyword (for random switch changes)
  MAX = 'MAX',                 // max keyword (for max trains)
  TRAINS = 'TRAINS',           // trains keyword (for max trains)
  FLEX = 'FLEX',               // flex keyword (for flex connect)
  CONNECT = 'CONNECT',         // connect keyword (for flex connect)
  CROSS = 'CROSS',             // cross keyword (for cross connect)
  DEFINE = 'DEFINE',           // define/def keyword (for custom archetype definition)
  LEFT = 'LEFT',               // left/l keyword (for define - left curve)
  RIGHT = 'RIGHT',             // right/r keyword (for define - right curve)
  STRAIGHT = 'STRAIGHT',       // straight/s keyword (for define - straight piece)
  RADIUS = 'RADIUS',           // radius keyword (for define - curve radius)
  ARC = 'ARC',                 // arc keyword (for define - curve arc angle)
  LENGTH = 'LENGTH',           // length keyword (for define - straight length)
  ARRAY = 'ARRAY',             // array keyword (for array statement)
  ANGLE = 'ANGLE',             // angle keyword (for array statement)
  PREFIX = 'PREFIX',           // prefix keyword (for array statement)
  LOG = 'LOG',                 // log/logging keyword (for log level configuration)
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

    // Number (including negative, decimals, and ranges like 5-10)
    if (/[0-9]/.test(char) || (char === '-' && pos + 1 < statement.length && /[0-9]/.test(statement[pos + 1]))) {
      const start = pos;
      if (char === '-') pos++;
      while (pos < statement.length && /[0-9.]/.test(statement[pos])) {
        pos++;
      }

      // Check for range syntax: number immediately followed by - and another number
      // Only treat as range if first number is positive (not a negative number)
      if (char !== '-' && pos < statement.length && statement[pos] === '-') {
        const dashPos = pos;
        pos++; // skip the dash
        if (pos < statement.length && /[0-9]/.test(statement[pos])) {
          // This is a range - parse the second number
          while (pos < statement.length && /[0-9.]/.test(statement[pos])) {
            pos++;
          }
          tokens.push({
            type: TokenType.RANGE,
            value: statement.substring(start, pos),
            line: lineNum,
            column: startPos + 1,
          });
          continue;
        } else {
          // Not a range, revert position
          pos = dashPos;
        }
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
      const lowerValue = value.toLowerCase();

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

      // Check for keywords (case-insensitive)
      if (lowerValue === 'new') {
        tokens.push({
          type: TokenType.NEW,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'title') {
        tokens.push({
          type: TokenType.TITLE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        // Capture the rest of the statement as a STRING token
        const rest = statement.substring(pos).trim();
        if (rest.length > 0) {
          tokens.push({
            type: TokenType.STRING,
            value: rest,
            line: lineNum,
            column: pos + 1,
          });
        }
        return tokens; // Done with this statement
      }

      if (lowerValue === 'description') {
        tokens.push({
          type: TokenType.DESCRIPTION,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        // Capture the rest of the statement as a STRING token
        const rest = statement.substring(pos).trim();
        if (rest.length > 0) {
          tokens.push({
            type: TokenType.STRING,
            value: rest,
            line: lineNum,
            column: pos + 1,
          });
        }
        return tokens; // Done with this statement
      }

      if (lowerValue === 'lockahead') {
        tokens.push({
          type: TokenType.LOCKAHEAD,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'distance') {
        tokens.push({
          type: TokenType.DISTANCE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'count') {
        tokens.push({
          type: TokenType.COUNT,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'degrees') {
        tokens.push({
          type: TokenType.DEGREES,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'offset') {
        tokens.push({
          type: TokenType.OFFSET,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'base') {
        tokens.push({
          type: TokenType.BASE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'splice') {
        tokens.push({
          type: TokenType.SPLICE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'using') {
        tokens.push({
          type: TokenType.USING,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'cabs') {
        tokens.push({
          type: TokenType.CABS,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'cars') {
        tokens.push({
          type: TokenType.CARS,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'speed') {
        tokens.push({
          type: TokenType.SPEED,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'every') {
        tokens.push({
          type: TokenType.EVERY,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'colorful') {
        tokens.push({
          type: TokenType.COLORFUL,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'gray') {
        tokens.push({
          type: TokenType.GRAY,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'black') {
        tokens.push({
          type: TokenType.BLACK,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'random') {
        tokens.push({
          type: TokenType.RANDOM,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'max') {
        tokens.push({
          type: TokenType.MAX,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'trains') {
        tokens.push({
          type: TokenType.TRAINS,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'flex') {
        tokens.push({
          type: TokenType.FLEX,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'connect') {
        tokens.push({
          type: TokenType.CONNECT,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'cross') {
        tokens.push({
          type: TokenType.CROSS,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'log' || lowerValue === 'logging') {
        tokens.push({
          type: TokenType.LOG,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'define' || lowerValue === 'def') {
        tokens.push({
          type: TokenType.DEFINE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'left' || lowerValue === 'l') {
        tokens.push({
          type: TokenType.LEFT,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'right' || lowerValue === 'r') {
        tokens.push({
          type: TokenType.RIGHT,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'straight' || lowerValue === 's') {
        tokens.push({
          type: TokenType.STRAIGHT,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'radius') {
        tokens.push({
          type: TokenType.RADIUS,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'arc') {
        tokens.push({
          type: TokenType.ARC,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'length') {
        tokens.push({
          type: TokenType.LENGTH,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'array') {
        tokens.push({
          type: TokenType.ARRAY,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'angle') {
        tokens.push({
          type: TokenType.ANGLE,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      if (lowerValue === 'prefix') {
        tokens.push({
          type: TokenType.PREFIX,
          value: value,
          line: lineNum,
          column: startPos + 1,
        });
        continue;
      }

      // Check for 'x' as repetition operator (standalone, not part of identifier like 'x90')
      if (lowerValue === 'x') {
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
