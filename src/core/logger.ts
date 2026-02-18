/**
 * Centralized logging with configurable severity levels.
 * Controlled by the DSL 'log' statement.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARNING = 2,
  ERROR = 3,
}

let currentLevel: LogLevel = LogLevel.WARNING;
let debugCategories: Set<string> | null = null; // null = show all, Set = filter

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

export function getLogLevel(): LogLevel {
  return currentLevel;
}

export function setDebugCategories(categories: string[] | null): void {
  debugCategories = categories ? new Set(categories.map(c => c.toUpperCase())) : null;
}

export const logger = {
  isEnabled(level: 'debug' | 'info' | 'warn' | 'error', category?: string): boolean {
    const levelMap = { debug: LogLevel.DEBUG, info: LogLevel.INFO, warn: LogLevel.WARNING, error: LogLevel.ERROR };
    if (currentLevel > levelMap[level]) return false;
    if (level === 'debug' && category) {
      return debugCategories === null || debugCategories.has(category.toUpperCase());
    }
    return true;
  },
  debug(category: string, message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.DEBUG) {
      const cat = category.toUpperCase();
      if (debugCategories === null || debugCategories.has(cat)) {
        console.log(`[DEBUG:${cat}] ${message}`, ...args);
      }
    }
  },
  info(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.INFO) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  warn(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.WARNING) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error(message: string, ...args: unknown[]): void {
    if (currentLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
};
