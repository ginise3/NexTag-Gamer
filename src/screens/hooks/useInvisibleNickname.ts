import { useState } from "react";
import {
  trackGenerationCompleted,
  trackGenerationStarted,
  trackNicknameCopied,
  trackRegenerateClicked,
} from "../../analytics";
import { generateInvisibleNickname, validateInvisibleNickname } from "../../domain/invisible";
import type { GeneratedInvisibleNickname, InvisibleNicknameType } from "../../domain/invisible";

const RESULTS_PER_GENERATION = 5;
const MAX_ATTEMPTS = 40;
const COPY_FEEDBACK_MS = 1500;

/**
 * Состояние + генерация для режима Invisible Nickname (Task.md §20–§22).
 * Полностью независим от `useNicknameSession`/generator обычного режима —
 * Invisible Nickname не использует SemanticProfile (§20).
 */
export function useInvisibleNickname() {
  const [type, setType] = useState<InvisibleNicknameType>("fully_invisible");
  const [repeatCount, setRepeatCount] = useState(3);
  const [results, setResults] = useState<GeneratedInvisibleNickname[]>([]);
  const [shownValues, setShownValues] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  function handleGenerate() {
    const isRegenerate = results.length > 0;
    trackGenerationStarted("invisible");
    if (isRegenerate) trackRegenerateClicked("invisible");

    const seen = new Set(shownValues);
    const next: GeneratedInvisibleNickname[] = [];
    let attempts = 0;

    while (next.length < RESULTS_PER_GENERATION && attempts < MAX_ATTEMPTS) {
      attempts++;
      const candidate = generateInvisibleNickname(type, { repeatCount });
      if (!validateInvisibleNickname(candidate.value).valid) continue;
      if (seen.has(candidate.value)) continue;
      seen.add(candidate.value);
      next.push(candidate);
    }

    setResults(next);
    setShownValues((prev) => [...prev, ...next.map((r) => r.value)]);
    trackGenerationCompleted("invisible", next.length);
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue((current) => (current === value ? null : current)), COPY_FEEDBACK_MS);
      trackNicknameCopied("invisible");
    } catch {
      // Clipboard API недоступен — молча игнорируем.
    }
  }

  return { type, setType, repeatCount, setRepeatCount, results, copiedValue, handleGenerate, copy };
}
