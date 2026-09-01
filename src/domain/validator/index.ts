/**
 * Validator результата генерации — Task.md §19. Намеренно отделён от
 * `generator/` и не знает ничего про SemanticProfile/механизмы: получает на
 * вход только готовую строку-кандидат.
 *
 * Минимальные проверки по Task.md §19:
 *  - допустимая длина;
 *  - допустимые символы;
 *  - отсутствие пустого значения;
 *  - отсутствие явного технического мусора;
 *  - отсутствие запрещённых комбинаций из локального фильтра;
 *  - отсутствие дублирования внутри текущей выдачи.
 */
import type { LengthPreference } from "../types";
import { LENGTH_RANGES } from "../data";
import { containsBannedWord } from "./bannedWords";

export type ValidationFailureReason =
  | "empty"
  | "too_short"
  | "too_long"
  | "invalid_characters"
  | "technical_garbage"
  | "banned_word"
  | "duplicate";

export interface ValidationResult {
  valid: boolean;
  reason?: ValidationFailureReason;
}

export interface ValidationContext {
  /** Уже принятые в текущей выдаче ники (для проверки дублей), в нижнем регистре. */
  existingInBatch?: ReadonlySet<string>;
  /** Желаемая длина — используется как более узкий, но не строгий диапазон
   * поверх общего технического предела (мягкий допуск ±, т.к. не каждая
   * комбинация механизмов попадает в диапазон день-в-день). */
  lengthPreference?: LengthPreference;
}

// Общий технический предел, действующий независимо от lengthPreference.
const ABSOLUTE_MIN_LENGTH = 2;
const ABSOLUTE_MAX_LENGTH = 24;
const LENGTH_SLACK_MIN = 1;
const LENGTH_SLACK_MAX = 4;

const ALLOWED_CHARACTERS_PATTERN = /^[A-Za-z0-9_-]+$/;
const TECHNICAL_GARBAGE_VALUES = new Set(["undefined", "null", "nan", "object object"]);

function lengthBounds(preference?: LengthPreference): { min: number; max: number } {
  if (!preference) return { min: ABSOLUTE_MIN_LENGTH, max: ABSOLUTE_MAX_LENGTH };
  const range = LENGTH_RANGES[preference];
  return {
    min: Math.max(ABSOLUTE_MIN_LENGTH, range.min - LENGTH_SLACK_MIN),
    max: Math.min(ABSOLUTE_MAX_LENGTH, range.max + LENGTH_SLACK_MAX),
  };
}

export function validateNickname(value: string, context: ValidationContext = {}): ValidationResult {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { valid: false, reason: "empty" };
  }

  const { min, max } = lengthBounds(context.lengthPreference);
  if (trimmed.length < min) return { valid: false, reason: "too_short" };
  if (trimmed.length > max) return { valid: false, reason: "too_long" };

  if (!ALLOWED_CHARACTERS_PATTERN.test(trimmed)) {
    return { valid: false, reason: "invalid_characters" };
  }

  const lettersOnly = trimmed.toLowerCase().replace(/[^a-z]/g, "");
  if (lettersOnly.length === 0 || TECHNICAL_GARBAGE_VALUES.has(trimmed.toLowerCase())) {
    return { valid: false, reason: "technical_garbage" };
  }

  if (containsBannedWord(lettersOnly)) {
    return { valid: false, reason: "banned_word" };
  }

  if (context.existingInBatch?.has(trimmed.toLowerCase())) {
    return { valid: false, reason: "duplicate" };
  }

  return { valid: true };
}

export { containsBannedWord, BANNED_WORD_STEMS } from "./bannedWords";
