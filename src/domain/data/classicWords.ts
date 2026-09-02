/**
 * "Классические" словари и leet-таблица, перенесённые из прежнего
 * Streamlit-генератора (`nickname-generator/src/nickname_generator/data.py`)
 * — репозиторий не изменялся, значения скопированы вручную.
 *
 * ВАЖНО: это НЕ часть нормативной модели SEMANTIC_GAME_PARAMETER_BASE.md.
 * По продуктовому решению (см. переписку) используется только как
 * необязательная дополнительная "приправа" поверх канонической модели
 * (Task.md §6–§8) — то есть подмешивается в material pool генератора как
 * ещё один источник слов, а не заменяет genre/setting/role/play_style/
 * nick_style.
 */

export const CLASSIC_GAMER_WORDS: readonly string[] = [
  "shadow", "silent", "crimson", "frozen", "mystic", "rapid", "golden",
  "dark", "silver", "iron", "savage", "lunar", "solar", "phantom",
  "rogue", "feral", "vivid", "cosmic", "toxic", "blazing", "frosty",
  "wild", "electric", "ancient", "neon", "grim", "radiant", "sneaky",
  "wolf", "dragon", "phoenix", "ninja", "falcon", "tiger", "reaper",
  "knight", "ghost", "viper", "panther", "hunter", "raven", "storm",
  "blade", "wizard", "titan", "fox", "bear", "hawk", "samurai",
  "warrior", "sniper", "nomad", "specter", "rider", "cobra", "legend",
];

export const CLASSIC_CUTE_WORDS: readonly string[] = [
  "sweet", "fluffy", "tiny", "sunny", "cozy", "bubbly", "sparkly",
  "cuddly", "giggly", "dreamy", "sugar", "peachy", "honey", "snuggly",
  "bunny", "panda", "kitty", "puppy", "cupcake", "bean", "peach",
  "cookie", "muffin", "marshmallow", "petal", "star", "cloud", "berry",
];

/**
 * "Style preset" (классические допопции поверх канонической модели): какой
 * из словарей выше подмешать в material pool как flavor-слова. `"none"` —
 * значение по умолчанию: ничего не подмешивается, поведение генератора не
 * отличается от того, как если бы классических допопций не существовало.
 */
export type ClassicStylePreset = "none" | "random" | "gamer" | "cute";

export function classicStyleWords(preset: ClassicStylePreset): readonly string[] {
  switch (preset) {
    case "gamer":
      return CLASSIC_GAMER_WORDS;
    case "cute":
      return CLASSIC_CUTE_WORDS;
    case "random":
      return [...CLASSIC_GAMER_WORDS, ...CLASSIC_CUTE_WORDS];
    case "none":
      return [];
  }
}

/** Leet-speak таблица — идентична прежней Streamlit-версии. */
export const LEET_MAP: Readonly<Record<string, string>> = {
  a: "4", e: "3", i: "1", o: "0", s: "5", t: "7",
};
