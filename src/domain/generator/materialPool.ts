/**
 * Строит взвешенный пул материала (слов) для генератора из
 * {@link SemanticProfile} — Task.md §16 "standard parameters + semantic
 * tags + custom keywords + generation rules".
 *
 * Веса ориентируются на PARAMETER_WEIGHTS (база §21): custom words сильнее
 * всего влияют на результат, дальше — nick_style, role, setting, play_style,
 * genre. Слова из активных тем/семантических групп — это "приправа"
 * (более низкий вес), а не прямое пожелание пользователя.
 */
import type { SemanticProfile } from "../types";
import { PARAMETER_WEIGHTS, SEMANTIC_GROUPS, THEME_GROUPS, THEME_WORD_INDEX } from "../data";
import { shuffle, type Rng } from "./rng";

export type MaterialOrigin =
  | "custom_word"
  | "nick_style"
  | "role"
  | "setting"
  | "play_style"
  | "genre"
  | "semantic_flavor"
  | "fallback";

export interface MaterialWord {
  word: string;
  weight: number;
  origin: MaterialOrigin;
}

export interface MaterialPool {
  /** Слова-кандидаты для комбинирования/трансформации, отсортированы не гарантированно. */
  words: MaterialWord[];
  /** Исходные (сырые) неизвестные пользовательские слова — материал для
   * custom_keyword_mutation. Только однословные (фразы не мутируются побуквенно). */
  unknownKeywords: string[];
  /** Числа, введённые самим пользователем (приоритет над NUMBER_POOL, база §18). */
  userNumbers: string[];
  /** true, если пул полностью пуст и подстановка выполнена запасным набором
   * (Quick Nickname должен работать даже без единого параметра, Task.md §5). */
  usedFallback: boolean;
}

const FLAVOR_WEIGHT = 0.4;

function addWord(map: Map<string, MaterialWord>, word: string, weight: number, origin: MaterialOrigin) {
  const key = word.toLowerCase();
  if (!key) return;
  const existing = map.get(key);
  if (!existing || existing.weight < weight) {
    map.set(key, { word: key, weight, origin });
  }
}

function activateSemanticFlavor(map: Map<string, MaterialWord>, trigger: string) {
  const themeId = THEME_WORD_INDEX.get(trigger);
  if (themeId) {
    const theme = THEME_GROUPS.find((t) => t.id === themeId);
    theme?.words.forEach((w) => addWord(map, w, FLAVOR_WEIGHT, "semantic_flavor"));
  }
  for (const group of SEMANTIC_GROUPS) {
    if (group.triggers.includes(trigger)) {
      group.pool.forEach((w) => addWord(map, w, FLAVOR_WEIGHT, "semantic_flavor"));
    }
  }
}

export function buildMaterialPool(
  profile: SemanticProfile,
  rng: Rng = Math.random,
  /** Необязательная "классическая" допопция поверх канонической модели
   * (Task.md §6-§8 не меняются): дополнительные flavor-слова, например из
   * прежнего Streamlit-генератора (style preset gamer/cute). Не влияет на
   * то, что считается известным/неизвестным custom word. */
  extraFlavorWords: readonly string[] = [],
): MaterialPool {
  const map = new Map<string, MaterialWord>();
  const unknownKeywords: string[] = [];
  const userNumbers: string[] = [];

  for (const customWord of profile.customWords) {
    if (/^[0-9]+$/.test(customWord.normalized)) {
      userNumbers.push(customWord.normalized);
      continue;
    }

    const tokens = customWord.normalized.split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      addWord(map, token, PARAMETER_WEIGHTS.customWords, "custom_word");
      activateSemanticFlavor(map, token);
    }
    for (const tag of customWord.semanticTags) {
      addWord(map, tag, PARAMETER_WEIGHTS.customWords * 0.75, "semantic_flavor");
      activateSemanticFlavor(map, tag);
    }

    if (!customWord.known && tokens.length === 1) {
      unknownKeywords.push(customWord.raw.trim());
    }
  }

  for (const genreId of profile.genre) {
    addWord(map, genreId, PARAMETER_WEIGHTS.genre, "genre");
    activateSemanticFlavor(map, genreId);
  }
  if (profile.setting) {
    addWord(map, profile.setting, PARAMETER_WEIGHTS.setting, "setting");
    activateSemanticFlavor(map, profile.setting);
  }
  if (profile.role) {
    addWord(map, profile.role, PARAMETER_WEIGHTS.role, "role");
    activateSemanticFlavor(map, profile.role);
  }
  if (profile.playStyle) {
    addWord(map, profile.playStyle, PARAMETER_WEIGHTS.playStyle, "play_style");
    activateSemanticFlavor(map, profile.playStyle);
  }
  if (profile.nickStyle) {
    addWord(map, profile.nickStyle, PARAMETER_WEIGHTS.nickStyle, "nick_style");
    activateSemanticFlavor(map, profile.nickStyle);
  }

  for (const word of extraFlavorWords) {
    addWord(map, word, FLAVOR_WEIGHT, "semantic_flavor");
  }

  let usedFallback = false;
  if (map.size === 0) {
    // Полностью пустой профиль — Quick Nickname обязан работать без единого
    // заполненного параметра (Task.md §5.3). Берём случайно пару тематических
    // групп в качестве нейтрального стартового материала.
    usedFallback = true;
    const shuffled = shuffle(THEME_GROUPS, rng).slice(0, 3);
    for (const theme of shuffled) {
      theme.words.forEach((w) => addWord(map, w, FLAVOR_WEIGHT, "fallback"));
    }
  }

  return {
    words: [...map.values()],
    unknownKeywords,
    userNumbers,
    usedFallback,
  };
}
