import { NICK_STYLES } from "../../domain/data";
import type { Lang, Translations } from "../../i18n/translations";
import type { ClassicOptionsState } from "../components/classicOptionsState";

/**
 * Презентационные бейджи, общие для всей текущей выдачи (не для конкретного
 * механизма построения одного ника) — выбранный Nick Style, включённый
 * "классический" style preset и leet-speak. Чисто UI-слой: не меняет
 * SemanticProfile и не влияет на генерацию.
 */
export function computeBatchBadges(
  nickStyleId: string,
  classicState: ClassicOptionsState,
  t: Translations,
  lang: Lang,
): string[] {
  const badges: string[] = [];

  if (nickStyleId) {
    const option = NICK_STYLES.find((o) => o.id === nickStyleId);
    if (option) badges.push(option.label[lang]);
  }

  if (classicState.stylePreset !== "none") {
    badges.push(t.classicOptions.stylePresetOptions[classicState.stylePreset]);
  }

  if (classicState.useLeetSpeak) {
    badges.push(t.common.leetBadge);
  }

  return badges;
}
