/** SETTING — SEMANTIC_GAME_PARAMETER_BASE.md §6. */
import type { ParameterOption } from "../types";

export const SETTINGS: readonly ParameterOption[] = [
  { id: "modern", label: { en: "Modern", ru: "Современность" } },
  { id: "urban", label: { en: "Urban", ru: "Городской" } },
  { id: "military", label: { en: "Military", ru: "Военный" } },
  { id: "tactical", label: { en: "Tactical", ru: "Тактический" } },
  { id: "historical", label: { en: "Historical", ru: "Исторический" } },
  { id: "fantasy", label: { en: "Fantasy", ru: "Фэнтези" } },
  { id: "high_fantasy", label: { en: "High Fantasy", ru: "Высокое фэнтези" } },
  { id: "dark_fantasy", label: { en: "Dark Fantasy", ru: "Тёмное фэнтези" } },
  { id: "magic", label: { en: "Magic", ru: "Магический" } },
  { id: "mythology", label: { en: "Mythology", ru: "Мифология" } },
  { id: "sci_fi", label: { en: "Sci-Fi", ru: "Научная фантастика" } },
  { id: "futuristic", label: { en: "Futuristic", ru: "Будущее" } },
  { id: "cyberpunk", label: { en: "Cyberpunk", ru: "Киберпанк" } },
  { id: "space", label: { en: "Space", ru: "Космос" } },
  { id: "superhero", label: { en: "Superhero", ru: "Супергеройский" } },
  { id: "post_apocalypse", label: { en: "Post-Apocalypse", ru: "Постапокалипсис" } },
  { id: "wilderness", label: { en: "Wilderness", ru: "Дикая природа" } },
  { id: "horror", label: { en: "Horror", ru: "Хоррор" } },
  { id: "dark", label: { en: "Dark", ru: "Мрачный" } },
  { id: "stylized", label: { en: "Stylized", ru: "Стилизованный" } },
  { id: "block_world", label: { en: "Block World", ru: "Блочный мир" } },
  { id: "crime", label: { en: "Crime", ru: "Криминальный" } },
  { id: "survival_world", label: { en: "Survival World", ru: "Мир выживания" } },
] as const;
