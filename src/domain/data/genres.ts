/**
 * GENRE — SEMANTIC_GAME_PARAMETER_BASE.md §5.
 * Разрешён выбор нескольких совместимых жанров.
 */
import type { ParameterOption } from "../types";

export const GENRES: readonly ParameterOption[] = [
  { id: "fps", label: { en: "FPS", ru: "Шутер от первого лица" } },
  { id: "tactical_shooter", label: { en: "Tactical Shooter", ru: "Тактический шутер" } },
  { id: "hero_shooter", label: { en: "Hero Shooter", ru: "Геройский шутер" } },
  { id: "extraction_shooter", label: { en: "Extraction Shooter", ru: "Экстракшен-шутер" } },
  { id: "battle_royale", label: { en: "Battle Royale", ru: "Королевская битва" } },
  { id: "moba", label: { en: "MOBA", ru: "MOBA" } },
  { id: "rpg", label: { en: "RPG", ru: "Ролевая игра" } },
  { id: "mmorpg", label: { en: "MMORPG", ru: "MMORPG" } },
  { id: "sandbox", label: { en: "Sandbox", ru: "Песочница" } },
  { id: "survival", label: { en: "Survival", ru: "Выживание" } },
  { id: "open_world", label: { en: "Open World", ru: "Открытый мир" } },
  { id: "action", label: { en: "Action", ru: "Экшен" } },
  { id: "strategy", label: { en: "Strategy", ru: "Стратегия" } },
  { id: "simulation", label: { en: "Simulation", ru: "Симулятор" } },
  { id: "racing", label: { en: "Racing", ru: "Гонки" } },
  { id: "sports", label: { en: "Sports", ru: "Спорт" } },
  { id: "horror", label: { en: "Horror", ru: "Хоррор" } },
  { id: "asymmetric_horror", label: { en: "Asymmetric Horror", ru: "Асимметричный хоррор" } },
  { id: "vehicle_combat", label: { en: "Vehicle Combat", ru: "Бои на технике" } },
  { id: "arena_action", label: { en: "Arena Action", ru: "Арена / быстрый экшен" } },
  { id: "creation", label: { en: "Creation", ru: "Создание / творчество" } },
  { id: "adventure", label: { en: "Adventure", ru: "Приключения" } },
] as const;
