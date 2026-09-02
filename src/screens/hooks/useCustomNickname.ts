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
import type { Lang, Translations } from "../../i18n/translations";
import { computeBatchBadges } from "./batchBadges";
import { useClassicOptions } from "./useClassicOptions";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Custom Nickname (Task.md §6, §39). */
export function useCustomNickname(t: Translations, lang: Lang) {
  const [genres, setGenres] = useState<Set<string>>(new Set());
  const [setting, setSettingState] = useState("");
  const [role, setRoleState] = useState("");
  const [playStyle, setPlayStyleState] = useState("");
  const [nickStyle, setNickStyleState] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [additionalWordsRaw, setAdditionalWordsRaw] = useState("");
  const [useNumbers, setUseNumbers] = useState(false);

  const additionalWords = useMemo(() => normalizeCustomWordsInput(additionalWordsRaw), [additionalWordsRaw]);
  const classic = useClassicOptions();
  const session = useNicknameSession();

  const badges = useMemo(
    () => computeBatchBadges(nickStyle, classic.state, t, lang),
    [nickStyle, classic.state, t, lang],
  );

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
    const customWords = classic.mergeBaseWordInto(additionalWords.customWords);
    const profile = {
      ...createEmptySemanticProfile(),
      genre: [...genres],
      setting: setting || undefined,
      role: role || undefined,
      playStyle: playStyle || undefined,
      nickStyle: nickStyle || undefined,
      length: length || undefined,
      customWords,
    };

    trackGenerationStarted("custom");
    if (isRegenerate) trackRegenerateClicked("custom");
    trackCustomWordsUsed(customWords.length);

    const next = session.generate(profile, {
      useNumbers,
      count: classic.state.count,
      extraFlavorWords: classic.extraFlavorWords,
      useLeetSpeak: classic.state.useLeetSpeak,
    });
    trackGenerationCompleted("custom", next.length);
  }

  async function copy(value: string) {
    await session.copy(value);
    trackNicknameCopied("custom");
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
    classic,
    badges,
    handleGenerate,
    results: session.results,
    copiedValue: session.copiedValue,
    copy,
  };
}
