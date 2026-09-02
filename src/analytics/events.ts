/**
 * Минимальные аналитические события — Task.md §32.
 *
 * Правило §32/§33: НЕ передавать сам сгенерированный ник и НЕ передавать
 * сырые пользовательские слова. Это обеспечено на уровне типов: ни у одного
 * события ниже нет поля для текста ника или для содержимого custom words —
 * только канонические английские ID стандартных параметров и обезличенные
 * агрегаты (`used`/`count`).
 *
 * Часть событий (`nickname_saved`, `pro_screen_opened`, `purchase_started`,
 * `purchase_completed`) описана по требованию §32, но нигде не вызывается —
 * соответствующих функций (favorites, PRO-экран, покупки) в MVP ещё нет.
 * Схема готова заранее, чтобы не переделывать её задним числом.
 */

export type GenerationMode = "quick" | "custom" | "invisible";

export type StandardParameterCategory = "genre" | "setting" | "role" | "play_style" | "nick_style";

export type AnalyticsEvent =
  | { name: "app_open" }
  | { name: "language_selected"; params: { language: "en" | "ru" } }
  | { name: "generation_started"; params: { generation_mode: GenerationMode } }
  | { name: "generation_completed"; params: { generation_mode: GenerationMode; result_count: number } }
  | { name: "genre_selected"; params: { value: string } }
  | { name: "setting_selected"; params: { value: string } }
  | { name: "role_selected"; params: { value: string } }
  | { name: "play_style_selected"; params: { value: string } }
  | { name: "nick_style_selected"; params: { value: string } }
  | { name: "custom_words_used"; params: { used: boolean; count: number } }
  | { name: "nickname_copied"; params: { generation_mode: GenerationMode } }
  | { name: "nickname_saved"; params: { generation_mode: GenerationMode } }
  | { name: "regenerate_clicked"; params: { generation_mode: GenerationMode } }
  | { name: "pro_screen_opened" }
  | { name: "purchase_started" }
  | { name: "purchase_completed" };

/** Событие `<category>_selected` для стандартного параметра — используется
 * в контролах Custom/Quick Nickname, чтобы не дублировать 5 почти
 * одинаковых веток на местах вызова. */
export function parameterSelectedEvent(category: StandardParameterCategory, value: string): AnalyticsEvent {
  switch (category) {
    case "genre":
      return { name: "genre_selected", params: { value } };
    case "setting":
      return { name: "setting_selected", params: { value } };
    case "role":
      return { name: "role_selected", params: { value } };
    case "play_style":
      return { name: "play_style_selected", params: { value } };
    case "nick_style":
      return { name: "nick_style_selected", params: { value } };
  }
}
