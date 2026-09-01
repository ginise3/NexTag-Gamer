/** PLAY STYLE — SEMANTIC_GAME_PARAMETER_BASE.md §8. */
import type { ParameterOption } from "../types";

export const PLAY_STYLES: readonly ParameterOption[] = [
  { id: "aggressive", label: { en: "Aggressive", ru: "Агрессивный" } },
  { id: "tactical", label: { en: "Tactical", ru: "Тактический" } },
  { id: "strategic", label: { en: "Strategic", ru: "Стратегический" } },
  { id: "defensive", label: { en: "Defensive", ru: "Оборонительный" } },
  { id: "stealth", label: { en: "Stealth", ru: "Скрытный" } },
  { id: "fast", label: { en: "Fast", ru: "Быстрый" } },
  { id: "patient", label: { en: "Patient", ru: "Терпеливый" } },
  { id: "risky", label: { en: "Risky", ru: "Рискованный" } },
  { id: "precise", label: { en: "Precise", ru: "Точный" } },
  { id: "long_range", label: { en: "Long Range", ru: "Дальний бой" } },
  { id: "close_range", label: { en: "Close Range", ru: "Ближний бой" } },
  { id: "ambush", label: { en: "Ambush", ru: "Засада" } },
  { id: "rush", label: { en: "Rush", ru: "Натиск" } },
  { id: "survivalist", label: { en: "Survivalist", ru: "Выживальщик" } },
  { id: "creative", label: { en: "Creative", ru: "Творческий" } },
  { id: "explorer", label: { en: "Explorer", ru: "Исследовательский" } },
  { id: "competitive", label: { en: "Competitive", ru: "Соревновательный" } },
  { id: "casual", label: { en: "Casual", ru: "Неформальный" } },
  { id: "solo", label: { en: "Solo", ru: "Одиночный" } },
  { id: "team", label: { en: "Team", ru: "Командный" } },
  { id: "objective_focused", label: { en: "Objective Focused", ru: "Игра на цель" } },
  { id: "adaptive", label: { en: "Adaptive", ru: "Адаптивный" } },
  { id: "chaotic", label: { en: "Chaotic", ru: "Хаотичный" } },
] as const;
