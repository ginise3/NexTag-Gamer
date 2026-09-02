import { useState } from "react";
import {
  trackCustomWordsUsed,
  trackGenerationCompleted,
  trackGenerationStarted,
  trackNicknameCopied,
  trackParameterSelected,
  trackRegenerateClicked,
} from "../../analytics";
import { createEmptySemanticProfile, type LengthPreference } from "../../domain/types";
import { useClassicOptions } from "./useClassicOptions";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Quick Nickname (Task.md §5). */
export function useQuickNickname() {
  const [nickStyle, setNickStyleState] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [useNumbers, setUseNumbers] = useState(false);

  function setNickStyle(value: string) {
    setNickStyleState(value);
    if (value) trackParameterSelected("nick_style", value);
  }

  const classic = useClassicOptions();
  const session = useNicknameSession();

  function handleGenerate() {
    const isRegenerate = session.results.length > 0;
    const customWords = classic.mergeBaseWordInto([]);
    const profile = {
      ...createEmptySemanticProfile(),
      nickStyle: nickStyle || undefined,
      length: length || undefined,
      customWords,
    };

    trackGenerationStarted("quick");
    if (isRegenerate) trackRegenerateClicked("quick");
    trackCustomWordsUsed(customWords.length);

    const next = session.generate(profile, {
      useNumbers,
      count: classic.state.count,
      extraFlavorWords: classic.extraFlavorWords,
      useLeetSpeak: classic.state.useLeetSpeak,
    });
    trackGenerationCompleted("quick", next.length);
  }

  async function copy(value: string) {
    await session.copy(value);
    trackNicknameCopied("quick");
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
    copy,
  };
}
