import type { CustomWordsIssue } from "../domain/normalizer";
import type { Translations } from "./translations";

/** Форматирует проблему валидации custom words на выбранном языке
 * интерфейса (Task.md §11: пользователь должен получать понятное
 * сообщение, а не молчаливый сбой или перевод его слова). */
export function formatCustomWordsIssue(issue: CustomWordsIssue, t: Translations): string {
  const messages = t.additionalWordsIssues;
  switch (issue.type) {
    case "cyrillic":
      return messages.cyrillic(issue.raw);
    case "disallowed_characters":
      return messages.disallowedCharacters(issue.raw);
    case "too_long":
      return messages.tooLong(issue.raw, issue.maxLength);
    case "too_many_items":
      return messages.tooManyItems(issue.maxItems);
    default:
      return issue.type;
  }
}
