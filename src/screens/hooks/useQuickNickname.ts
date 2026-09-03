import { useMemo, useState } from "react";
import {
  trackCustomWordsUsed,
  trackGenerationCompleted,
  trackGenerationStarted,
  trackNicknameCopied,
  trackParameterSelected,
  trackRegenerateClicked,
} from "../../analytics";
import { createEmptySemanticProfile, type LengthPreference } from "../../domain/types";
import type { Lang } from "../../i18n/translations";
import { computeBatchBadges } from "./batchBadges";
import { DEFAULT_NICKNAME_COUNT } from "./nicknameCount";
import { useNicknameSession } from "./useNicknameSession";

/** Состояние + генерация для режима Quick Nickname (Task.md §5). */
export function useQuickNickname(lang: Lang) {
  const [nickStyle, setNickStyleState] = useState("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [useNumbers, setUseNumbers] = useState(false);
  const [count, setCount] = useState(DEFAULT_NICKNAME_COUNT);

  function setNickStyle(value: string) {
    setNickStyleState(value);
    if (value) trackParameterSelected("nick_style", value);
  }

  const session = useNicknameSession();

  const badges = useMemo(() => computeBatchBadges(nickStyle, lang), [nickStyle, lang]);

  function handleGenerate() {
    const isRegenerate = session.results.length > 0;
    const profile = {
      ...createEmptySemanticProfile(),
      nickStyle: nickStyle || undefined,
      length: length || undefined,
    };

    trackGenerationStarted("quick");
    if (isRegenerate) trackRegenerateClicked("quick");
    trackCustomWordsUsed(0);

    const next = session.generate(profile, { useNumbers, count });
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
    count,
    setCount,
    badges,
    handleGenerate,
    results: session.results,
    copiedValue: session.copiedValue,
    copy,
  };
}
