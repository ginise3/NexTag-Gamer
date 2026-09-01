/**
 * CORE THEMES — SEMANTIC_GAME_PARAMETER_BASE.md §10.
 * Слова внутри групп — исходный английский материал генерации ников,
 * поэтому не локализуются (только `label` группы переводится для
 * возможного будущего UI обзора тем).
 */
import type { ThemeGroup } from "../types";

export const THEME_GROUPS: readonly ThemeGroup[] = [
  {
    id: "darkness",
    label: { en: "Darkness", ru: "Тьма" },
    words: ["shadow", "night", "dark", "void", "black", "ghost", "phantom", "dusk", "eclipse", "abyss", "shade"],
  },
  {
    id: "cold",
    label: { en: "Cold", ru: "Холод" },
    words: ["ice", "frost", "frozen", "winter", "snow", "cryo", "cold", "glacier"],
  },
  {
    id: "fire",
    label: { en: "Fire", ru: "Огонь" },
    words: ["fire", "flame", "blaze", "ember", "inferno", "burn", "ash", "heat", "pyro"],
  },
  {
    id: "power",
    label: { en: "Power", ru: "Сила" },
    words: ["power", "force", "rage", "fury", "might", "titan", "alpha", "prime", "apex", "dominant"],
  },
  {
    id: "combat",
    label: { en: "Combat", ru: "Бой" },
    words: ["strike", "frag", "shot", "blast", "bullet", "aim", "scope", "clutch", "ace", "rush", "raid", "breach"],
  },
  {
    id: "predator",
    label: { en: "Predator", ru: "Хищник" },
    words: ["wolf", "raven", "hawk", "falcon", "viper", "cobra", "panther", "tiger", "lion", "shark", "hunter", "predator"],
  },
  {
    id: "fantasy",
    label: { en: "Fantasy", ru: "Фэнтези" },
    words: ["dragon", "wyrm", "rune", "arcane", "magic", "spell", "demon", "angel", "orc", "elf", "dwarf", "knight", "sword", "crown", "realm"],
  },
  {
    id: "death_horror",
    label: { en: "Death / Horror", ru: "Смерть / Хоррор" },
    words: ["death", "dead", "grave", "skull", "blood", "bone", "nightmare", "terror", "fear", "reaper", "curse", "haunt"],
  },
  {
    id: "technology",
    label: { en: "Technology", ru: "Технологии" },
    words: ["cyber", "nano", "neon", "tech", "byte", "code", "matrix", "core", "zero", "mech", "bot", "pulse", "vector"],
  },
  {
    id: "space",
    label: { en: "Space", ru: "Космос" },
    words: ["star", "nova", "cosmic", "galaxy", "orbit", "lunar", "solar", "moon", "meteor", "astro", "nebula", "void"],
  },
  {
    id: "military",
    label: { en: "Military", ru: "Военная тема" },
    words: ["war", "strike", "ops", "squad", "unit", "armor", "steel", "combat", "tactical", "command", "intel", "recon"],
  },
  {
    id: "survival",
    label: { en: "Survival", ru: "Выживание" },
    words: ["survivor", "raid", "scrap", "bunker", "wasteland", "stash", "loot", "wild", "base", "shelter", "outcast", "nomad"],
  },
  {
    id: "speed",
    label: { en: "Speed", ru: "Скорость" },
    words: ["speed", "rapid", "rush", "dash", "flash", "turbo", "drift", "velocity", "swift", "quick", "boost"],
  },
  {
    id: "leadership",
    label: { en: "Leadership", ru: "Лидерство" },
    words: ["king", "queen", "lord", "chief", "boss", "alpha", "commander", "captain", "master", "leader", "prime"],
  },
  {
    id: "mystery",
    label: { en: "Mystery", ru: "Тайна" },
    words: ["unknown", "secret", "silent", "hidden", "masked", "mystic", "cryptic", "riddle", "echo", "mirage"],
  },
  {
    id: "chaos",
    label: { en: "Chaos", ru: "Хаос" },
    words: ["chaos", "toxic", "wild", "crazy", "mad", "broken", "anarchy", "random", "riot", "havoc"],
  },
  {
    id: "nature",
    label: { en: "Nature", ru: "Природа" },
    words: ["forest", "storm", "thunder", "river", "mountain", "stone", "earth", "ocean", "wave", "wind", "thorn"],
  },
  {
    id: "creation",
    label: { en: "Creation", ru: "Созидание" },
    words: ["build", "craft", "forge", "maker", "create", "block", "mine", "design", "construct", "architect"],
  },
] as const;

/** Индекс "слово темы → id группы" для распознавания известных custom words
 * (Task.md §12.1). При пересечении слова между группами побеждает первая
 * группа по порядку в {@link THEME_GROUPS}. */
export const THEME_WORD_INDEX: ReadonlyMap<string, string> = (() => {
  const index = new Map<string, string>();
  for (const group of THEME_GROUPS) {
    for (const word of group.words) {
      if (!index.has(word)) {
        index.set(word, group.id);
      }
    }
  }
  return index;
})();
