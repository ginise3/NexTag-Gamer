import { useState } from "react";
import { generateNicknames, type GeneratedNickname, type GenerateNicknamesOptions } from "../../domain/generator";
import type { SemanticProfile } from "../../domain/types";

const RESULTS_PER_GENERATION = 8;
const COPY_FEEDBACK_MS = 1500;

/**
 * Общее поведение экранов генерации (Quick / Custom): выдача результатов,
 * копирование в буфер, "Generate more" без повторов в рамках сессии
 * (Task.md §18) — накопленный `shownValues` передаётся как
 * `previousResults` в каждый следующий вызов генератора.
 */
export function useNicknameSession() {
  const [results, setResults] = useState<GeneratedNickname[]>([]);
  const [shownValues, setShownValues] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  function generate(
    profile: SemanticProfile,
    options: Omit<GenerateNicknamesOptions, "previousResults"> = {},
  ): GeneratedNickname[] {
    const next = generateNicknames(profile, {
      count: RESULTS_PER_GENERATION,
      ...options,
      previousResults: shownValues,
    });
    setResults(next);
    setShownValues((prev) => [...prev, ...next.map((r) => r.value)]);
    return next;
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue((current) => (current === value ? null : current)), COPY_FEEDBACK_MS);
    } catch {
      // Clipboard API недоступен (например, небезопасный контекст) —
      // молча игнорируем, пользователь может скопировать текст вручную.
    }
  }

  /** Очищает показанные результаты и историю "уже выданных" ников —
   * используется кнопкой сброса настроек, чтобы старые результаты не
   * оставались на экране/в памяти дедупликации после сброса параметров. */
  function reset() {
    setResults([]);
    setShownValues([]);
    setCopiedValue(null);
  }

  return { results, copiedValue, generate, copy, reset };
}
