import { NICK_STYLES } from "../../domain/data";
import type { Lang } from "../../i18n/translations";

/**
 * Презентационные бейджи, общие для всей текущей выдачи — сейчас это
 * только выбранный Nick Style (если он задан). Чисто UI-слой: не меняет
 * SemanticProfile и не влияет на генерацию.
 */
export function computeBatchBadges(nickStyleId: string, lang: Lang): string[] {
  if (!nickStyleId) return [];
  const option = NICK_STYLES.find((o) => o.id === nickStyleId);
  return option ? [option.label[lang]] : [];
}
