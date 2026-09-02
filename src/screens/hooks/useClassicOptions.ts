import { useMemo, useState } from "react";
import { classicStyleWords } from "../../domain/data";
import { normalizeCustomWordsInput } from "../../domain/normalizer";
import type { CustomWord } from "../../domain/types";
import { createDefaultClassicOptions, type ClassicOptionsState } from "../components/classicOptionsState";

/**
 * Состояние + производные значения "классических" допопций (base word /
 * style preset / leet-speak / count), общие для Quick и Custom Nickname.
 * По умолчанию ни на что не влияют — см. `createDefaultClassicOptions`.
 */
export function useClassicOptions() {
  const [state, setState] = useState<ClassicOptionsState>(createDefaultClassicOptions);

  // Base word проходит тот же normalizer, что и Additional Words (Task.md
  // §10-§11: только английский, кириллица — с понятным сообщением).
  const baseWordResult = useMemo(() => normalizeCustomWordsInput(state.baseWord), [state.baseWord]);

  const extraFlavorWords = useMemo(() => classicStyleWords(state.stylePreset), [state.stylePreset]);

  function mergeBaseWordInto(customWords: readonly CustomWord[]): CustomWord[] {
    return [...customWords, ...baseWordResult.customWords];
  }

  return {
    state,
    setState,
    baseWordIssues: baseWordResult.issues,
    extraFlavorWords,
    mergeBaseWordInto,
  };
}
