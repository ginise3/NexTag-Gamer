import { useMemo, useState } from "react";
import { normalizeCustomWordsInput } from "../../domain/normalizer";
import { createEmptySemanticProfile, type LengthPreference } from "../../domain/types";
import { useClassicOptions } from "./useClassicOptions";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Custom Nickname (Task.md §6, §39). */
export function useCustomNickname() {
  const [genres, setGenres] = useState<Set<string>>(new Set());
  const [setting, setSetting] = useState("");
  const [role, setRole] = useState("");
  const [playStyle, setPlayStyle] = useState("");
  const [nickStyle, setNickStyle] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [additionalWordsRaw, setAdditionalWordsRaw] = useState("");
  const [useNumbers, setUseNumbers] = useState(false);

  const additionalWords = useMemo(() => normalizeCustomWordsInput(additionalWordsRaw), [additionalWordsRaw]);
  const classic = useClassicOptions();
  const session = useNicknameSession();

  function toggleGenre(id: string) {
    setGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleGenerate() {
    const profile = {
      ...createEmptySemanticProfile(),
      genre: [...genres],
      setting: setting || undefined,
      role: role || undefined,
      playStyle: playStyle || undefined,
      nickStyle: nickStyle || undefined,
      length: length || undefined,
      customWords: classic.mergeBaseWordInto(additionalWords.customWords),
    };
    session.generate(profile, {
      useNumbers,
      count: classic.state.count,
      extraFlavorWords: classic.extraFlavorWords,
      useLeetSpeak: classic.state.useLeetSpeak,
    });
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
    handleGenerate,
    results: session.results,
    copiedValue: session.copiedValue,
    copy: session.copy,
  };
}
