/**
 * SEMANTIC SYNONYMS — SEMANTIC_GAME_PARAMETER_BASE.md §11.
 * Используется Normalizer'ом (Task.md §12) для приведения известных
 * пользовательских слов к стандартному параметру + семантическим тегам.
 */
import type { SynonymRule } from "../types";

export const SYNONYM_RULES: readonly SynonymRule[] = [
  {
    synonyms: ["sniper", "marksman", "sharpshooter", "longshot", "shooter"],
    target: { category: "role", id: "sniper" },
    semanticTags: ["precision", "scope", "distance", "silent", "cold"],
  },
  {
    synonyms: ["aggressive", "brutal", "fierce", "savage", "violent", "hard", "rush"],
    target: { category: "play_style", id: "aggressive" },
    semanticTags: ["rage", "attack", "rush", "power"],
  },
  {
    synonyms: ["stealth", "silent", "hidden", "covert", "sneaky", "shadow"],
    target: { category: "play_style", id: "stealth" },
    semanticTags: ["shadow", "silent", "ghost", "hidden"],
  },
  {
    synonyms: ["tactical", "smart", "calculated", "planned", "methodical"],
    target: { category: "play_style", id: "tactical" },
    semanticTags: ["precision", "intel", "control", "strategy"],
  },
  {
    synonyms: ["dark", "black", "shadow", "night", "gloom", "void"],
    target: { category: "nick_style", id: "dark" },
    semanticTags: [],
  },
  {
    synonyms: ["fast", "quick", "rapid", "speed", "swift", "rush"],
    target: { category: "play_style", id: "fast" },
    semanticTags: ["velocity", "flash", "dash", "rapid"],
  },
  {
    synonyms: ["power", "strong", "powerful", "mighty", "dominant", "brutal"],
    target: { category: "nick_style", id: "powerful" },
    semanticTags: ["force", "titan", "prime", "alpha"],
  },
  {
    synonyms: ["funny", "joke", "crazy", "silly", "meme", "weird"],
    target: { category: "nick_style", id: "funny" },
    semanticTags: [],
  },
] as const;

/**
 * Индекс "нормализованное слово → правило" для быстрого поиска.
 * При пересечении слова между несколькими правилами (например, "shadow"
 * встречается и в stealth, и в dark) побеждает правило, объявленное раньше
 * в {@link SYNONYM_RULES} — порядок сохраняет порядок из базы.
 */
export const SYNONYM_INDEX: ReadonlyMap<string, SynonymRule> = (() => {
  const index = new Map<string, SynonymRule>();
  for (const rule of SYNONYM_RULES) {
    for (const word of rule.synonyms) {
      const key = word.toLowerCase();
      if (!index.has(key)) {
        index.set(key, rule);
      }
    }
  }
  return index;
})();
