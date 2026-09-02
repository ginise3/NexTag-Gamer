/**
 * Validator для Invisible Nickname — отдельный от обычного `domain/validator`
 * (Task.md §19 применяется здесь по духу, но с другими правилами: невидимый
 * ник по определению не содержит "слов", поэтому проверки на технический
 * мусор/запрещённую лексику неприменимы; актуальны лишь длина и то, что
 * значение не является технически пустой строкой).
 */
export type InvisibleValidationFailureReason = "empty" | "too_long";

export interface InvisibleValidationResult {
  valid: boolean;
  reason?: InvisibleValidationFailureReason;
}

const MAX_LENGTH = 40;

export function validateInvisibleNickname(value: string): InvisibleValidationResult {
  if (value.length === 0) {
    return { valid: false, reason: "empty" };
  }
  if (value.length > MAX_LENGTH) {
    return { valid: false, reason: "too_long" };
  }
  return { valid: true };
}
