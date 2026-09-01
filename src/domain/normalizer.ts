/**
 * Normalizer пользовательских custom words (Task.md §10–§12).
 *
 *   User Input → Normalizer → Known Terms / Unknown Terms → Semantic Profile
 *
 * Обязательное продуктовое правило (Task.md §10): пользовательские параметры
 * вводятся только на английском языке, независимо от языка интерфейса.
 * Неизвестное английское слово никогда не отбрасывается (Task.md §12.2–12.3,
 * база §20) — оно сохраняется как custom_keyword и может использоваться
 * генератором напрямую.
 */
import type { CustomWord } from "./types";
import { SYNONYM_INDEX } from "./data/synonyms";
import { THEME_WORD_INDEX } from "./data/themes";

/** Технические ограничения ввода — инженерные защитные пределы, а не
 * продуктовое решение о смысле параметров. Значения можно пересмотреть
 * отдельно, если потребуется. */
export const CUSTOM_WORDS_LIMITS = {
  /** Максимальная длина одного слова/фразы. */
  maxItemLength: 40,
  /** Максимальное число слов/фраз за один ввод. */
  maxItemCount: 15,
} as const;

export type CustomWordsIssue =
  | { type: "empty" }
  | { type: "cyrillic"; raw: string }
  | { type: "disallowed_characters"; raw: string }
  | { type: "too_long"; raw: string; maxLength: number }
  | { type: "too_many_items"; maxItems: number };

export interface NormalizeCustomWordsResult {
  customWords: CustomWord[];
  issues: CustomWordsIssue[];
}

const CYRILLIC_PATTERN = /[Ѐ-ӿ]/;
// Разрешены: латиница, цифры, внутренние пробелы/дефисы/апострофы между
// буквенно-цифровыми символами (короткие фразы, "Alex-77", "O'Brien").
const ALLOWED_ITEM_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9'\- ]*[A-Za-z0-9])?$/;
// Разделители между отдельными словами/фразами: запятая, точка с запятой,
// перенос строки. Пробел НЕ является разделителем сам по себе, чтобы не
// ломать короткие фразы вида "ancient dragon" (Task.md §9).
const ITEM_SEPARATOR_PATTERN = /[,;\n]+/;

/** Разбивает сырой текст поля "Additional words" на отдельные пункты. */
export function splitCustomWordsInput(input: string): string[] {
  return input
    .split(ITEM_SEPARATOR_PATTERN)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/** Приводит одно слово/фразу к распознанному известному термину, если это
 * возможно (Task.md §12.1), не теряя при этом исходное неизвестное слово. */
function resolveKnownTerm(normalized: string): Pick<CustomWord, "known" | "resolvedTarget" | "semanticTags"> {
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const tags = new Set<string>();
  let resolvedTarget: CustomWord["resolvedTarget"];

  for (const token of tokens) {
    const synonymRule = SYNONYM_INDEX.get(token);
    if (synonymRule) {
      resolvedTarget ??= synonymRule.target;
      for (const tag of synonymRule.semanticTags) tags.add(tag);
      continue;
    }
    const themeId = THEME_WORD_INDEX.get(token);
    if (themeId) {
      tags.add(themeId);
    }
  }

  return {
    known: resolvedTarget !== undefined || tags.size > 0,
    resolvedTarget,
    semanticTags: [...tags],
  };
}

/**
 * Нормализует сырой пользовательский ввод в список {@link CustomWord} плюс
 * список проблем валидации. Валидные известные и неизвестные слова
 * попадают в `customWords` независимо друг от друга — генератору передаются
 * все распознанные валидные элементы, а `issues` используется только для
 * отображения пользователю понятных сообщений (Task.md §11).
 */
export function normalizeCustomWordsInput(input: string): NormalizeCustomWordsResult {
  const items = splitCustomWordsInput(input);
  const issues: CustomWordsIssue[] = [];
  const customWords: CustomWord[] = [];

  if (items.length === 0) {
    // Пустой ввод — не ошибка: custom words необязательны (Task.md §7).
    return { customWords, issues };
  }

  const limitedItems = items.slice(0, CUSTOM_WORDS_LIMITS.maxItemCount);
  if (items.length > CUSTOM_WORDS_LIMITS.maxItemCount) {
    issues.push({ type: "too_many_items", maxItems: CUSTOM_WORDS_LIMITS.maxItemCount });
  }

  for (const raw of limitedItems) {
    if (CYRILLIC_PATTERN.test(raw)) {
      issues.push({ type: "cyrillic", raw });
      continue;
    }
    if (raw.length > CUSTOM_WORDS_LIMITS.maxItemLength) {
      issues.push({ type: "too_long", raw, maxLength: CUSTOM_WORDS_LIMITS.maxItemLength });
      continue;
    }
    if (!ALLOWED_ITEM_PATTERN.test(raw)) {
      issues.push({ type: "disallowed_characters", raw });
      continue;
    }

    const normalized = raw.toLowerCase().replace(/\s+/g, " ").trim();
    const resolved = resolveKnownTerm(normalized);
    customWords.push({
      raw,
      normalized,
      ...resolved,
    });
  }

  return { customWords, issues };
}
