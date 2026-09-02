import { useState } from "react";
import { createEmptySemanticProfile, type LengthPreference } from "../../domain/types";
import { useClassicOptions } from "./useClassicOptions";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Quick Nickname (Task.md §5). */
export function useQuickNickname() {
  const [nickStyle, setNickStyle] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [useNumbers, setUseNumbers] = useState(false);

  const classic = useClassicOptions();
  const session = useNicknameSession();

  function handleGenerate() {
    const profile = {
      ...createEmptySemanticProfile(),
      nickStyle: nickStyle || undefined,
      length: length || undefined,
      customWords: classic.mergeBaseWordInto([]),
    };
    session.generate(profile, {
      useNumbers,
      count: classic.state.count,
      extraFlavorWords: classic.extraFlavorWords,
      useLeetSpeak: classic.state.useLeetSpeak,
    });
  }

  return {
    nickStyle,
    setNickStyle,
    length,
    setLength,
    useNumbers,
    setUseNumbers,
    classic,
    handleGenerate,
    results: session.results,
    copiedValue: session.copiedValue,
    copy: session.copy,
  };
}
