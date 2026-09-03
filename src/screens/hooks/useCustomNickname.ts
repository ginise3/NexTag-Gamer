import { useMemo, useState } from "react";
import {
  trackCustomWordsUsed,
  trackGenerationCompleted,
  trackGenerationStarted,
  trackNicknameCopied,
  trackParameterSelected,
  trackRegenerateClicked,
} from "../../analytics";
import { normalizeCustomWordsInput } from "../../domain/normalizer";
import { createEmptySemanticProfile, type LengthPreference } from "../../domain/types";
import type { Lang } from "../../i18n/translations";
import { computeBatchBadges } from "./batchBadges";
import { DEFAULT_NICKNAME_COUNT } from "./nicknameCount";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Custom Nickname (Task.md §6, §39). */
export function useCustomNickname(lang: Lang) {
  const [genres, setGenres] = useState<Set<string>>(new Set());
  const [setting, setSettingState] = useState("");
  const [role, setRoleState] = useState("");
  const [playStyle, setPlayStyleState] = useState("");
  const [nickStyle, setNickStyleState] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [additionalWordsRaw, setAdditionalWordsRaw] = useState("");
  const [useNumbers, setUseNumbers] = useState(false);
  const [count, setCount] = useState(DEFAULT_NICKNAME_COUNT);

  const additionalWords = useMemo(() => normalizeCustomWordsInput(additionalWordsRaw), [additionalWordsRaw]);
  const session = useNicknameSession();

  const badges = useMemo(() => computeBatchBadges(nickStyle, lang), [nickStyle, lang]);

  function toggleGenre(id: string) {
    setGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        trackParameterSelected("genre", id);
      }
      return next;
    });
  }

  function setSetting(value: string) {
    setSettingState(value);
    if (value) trackParameterSelected("setting", value);
  }

  function setRole(value: string) {
    setRoleState(value);
    if (value) trackParameterSelected("role", value);
  }

  function setPlayStyle(value: string) {
    setPlayStyleState(value);
    if (value) trackParameterSelected("play_style", value);
  }

  function setNickStyle(value: string) {
    setNickStyleState(value);
    if (value) trackParameterSelected("nick_style", value);
  }

  function handleGenerate() {
    const isRegenerate = session.results.length > 0;
    const profile = {
      ...createEmptySemanticProfile(),
      genre: [...genres],
      setting: setting || undefined,
      role: role || undefined,
      playStyle: playStyle || undefined,
      nickStyle: nickStyle || undefined,
      length: length || undefined,
      customWords: additionalWords.customWords,
    };

    trackGenerationStarted("custom");
    if (isRegenerate) trackRegenerateClicked("custom");
    trackCustomWordsUsed(additionalWords.customWords.length);

    const next = session.generate(profile, { useNumbers, count });
    trackGenerationCompleted("custom", next.length);
  }

  async function copy(value: string) {
    await session.copy(value);
    trackNicknameCopied("custom");
  }

  /** Сброс настроек к значениям по умолчанию (в т.ч. до первой генерации) —
   * иначе при возврате в панель после генерации там остаются старые
   * значения, и ввести новые можно только вручную стерев их одно за другим. */
  function resetSettings() {
    setGenres(new Set());
    setSettingState("");
    setRoleState("");
    setPlayStyleState("");
    setNickStyleState("");
    setLength("");
    setAdditionalWordsRaw("");
    setUseNumbers(false);
    setCount(DEFAULT_NICKNAME_COUNT);
    session.reset();
  }

  return {
    genres,
    toggleGenre,
    setting,
    setSetting,
    role,
    setRole,
    playStyle,
    setPlayStyle,
    nickStyle,
    setNickStyle,
    length,
    setLength,
    additionalWordsRaw,
    setAdditionalWordsRaw,
    additionalWordsIssues: additionalWords.issues,
    useNumbers,
    setUseNumbers,
    count,
    setCount,
    badges,
    handleGenerate,
    resetSettings,
    results: session.results,
    copiedValue: session.copiedValue,
    copy,
  };
}
