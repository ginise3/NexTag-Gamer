/**
 * CROSS-GAME SEMANTIC GROUPS — SEMANTIC_GAME_PARAMETER_BASE.md §13.
 * `triggers` — стандартные значения параметров и слова, активирующие группу;
 * `pool` — словарь, доступный генератору, когда группа активна.
 */
import type { SemanticGroup } from "../types";

export const SEMANTIC_GROUPS: readonly SemanticGroup[] = [
  {
    id: "precision",
    label: { en: "Precision", ru: "Точность" },
    triggers: ["sniper", "marksman", "precise", "long_range", "scope", "aim"],
    pool: ["scope", "zero", "vector", "focus", "edge", "point", "hawk", "falcon", "cold", "silent"],
  },
  {
    id: "aggression",
    label: { en: "Aggression", ru: "Агрессия" },
    triggers: ["assault", "fighter", "aggressive", "rush", "close_range"],
    pool: ["rage", "fury", "strike", "blast", "savage", "brutal", "rush", "fang", "claw", "fire"],
  },
  {
    id: "stealth",
    label: { en: "Stealth", ru: "Скрытность" },
    triggers: ["stealth", "assassin", "rogue", "scout", "ambush"],
    pool: ["shadow", "ghost", "silent", "night", "shade", "phantom", "veil", "hidden", "raven"],
  },
  {
    id: "magic",
    label: { en: "Magic", ru: "Магия" },
    triggers: ["mage", "magic", "fantasy", "dark_fantasy", "necromancer"],
    pool: ["arcane", "rune", "hex", "spell", "void", "frost", "flame", "wyrm", "mystic", "curse"],
  },
  {
    id: "technology",
    label: { en: "Technology", ru: "Технологии" },
    triggers: ["sci_fi", "futuristic", "cyber", "pilot", "controller"],
    pool: ["cyber", "nano", "vector", "zero", "core", "pulse", "byte", "neon", "mech", "nova"],
  },
  {
    id: "survival",
    label: { en: "Survival", ru: "Выживание" },
    triggers: ["survival", "survivor", "raider", "survivalist", "post_apocalypse"],
    pool: ["raid", "scrap", "wild", "bunker", "nomad", "outcast", "steel", "ash", "waste", "scar"],
  },
  {
    id: "leadership",
    label: { en: "Leadership", ru: "Лидерство" },
    triggers: ["commander", "leader", "strategist", "vanguard"],
    pool: ["alpha", "prime", "lord", "chief", "crown", "command", "king", "master", "apex"],
  },
  {
    id: "speed",
    label: { en: "Speed", ru: "Скорость" },
    triggers: ["fast", "racer", "driver", "rush"],
    pool: ["rapid", "dash", "flash", "swift", "velocity", "turbo", "drift", "boost", "storm"],
  },
] as const;
