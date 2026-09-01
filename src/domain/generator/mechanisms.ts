/**
 * Реализация десяти механизмов построения ника из Task.md §16.
 *
 * Каждая функция получает пул материала ({@link MaterialPool}) и пытается
 * построить один ник данным механизмом. Возвращает `undefined`, если
 * механизм неприменим при текущем материале (например, нет второго слова
 * для комбинирования) — вызывающий код (`generateNicknames`) в этом случае
 * пробует следующий механизм, а не прекращает генерацию.
 */
import { NUMBER_POOL, PREFIX_POOL, SUFFIX_POOL, WORD_SEPARATORS } from "../data";
import type { MaterialPool, MaterialWord } from "./materialPool";
import { pickRandom, pickWeighted, type Rng } from "./rng";
import {
  applyLetterReplacement,
  applyPhoneticVariation,
  capitalize,
  compactForm as compactWord,
  mutateCustomKeyword,
  shortenWord,
} from "./transformations";

function pickPrimaryWord(pool: MaterialPool, rng: Rng): MaterialWord | undefined {
  return pickWeighted(pool.words, (w) => w.weight, rng);
}

function pickSecondaryWord(pool: MaterialPool, exclude: string, rng: Rng): MaterialWord | undefined {
  const candidates = pool.words.filter((w) => w.word !== exclude);
  return pickWeighted(candidates, (w) => w.weight, rng);
}

export function wordCombination(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const secondary = pickSecondaryWord(pool, primary.word, rng);
  const separator = pickRandom(WORD_SEPARATORS, rng) ?? "";

  const secondaryPart = secondary
    ? (shortenWord(secondary.word, rng) ?? secondary.word)
    : shortenWord(primary.word, rng);
  if (!secondaryPart) return undefined;

  return secondary
    ? `${capitalize(primary.word)}${separator}${capitalize(secondaryPart)}`
    : capitalize(primary.word) + capitalize(secondaryPart);
}

export function wordShortening(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const shortened = shortenWord(primary.word, rng);
  return shortened ? capitalize(shortened) : undefined;
}

export function phoneticModification(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const mutated = applyPhoneticVariation(primary.word, rng);
  return mutated ? capitalize(mutated) : undefined;
}

export function letterReplacement(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const mutated = applyLetterReplacement(primary.word, rng);
  return mutated ? capitalize(mutated) : undefined;
}

export function prefixMechanism(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const prefix = pickRandom(PREFIX_POOL, rng);
  if (!prefix) return undefined;
  return capitalize(prefix) + capitalize(primary.word);
}

export function suffixMechanism(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const suffix = pickRandom(SUFFIX_POOL, rng);
  if (!suffix) return undefined;
  return capitalize(primary.word) + suffix;
}

export function semanticCombination(pool: MaterialPool, rng: Rng): string | undefined {
  const flavorWords = pool.words.filter((w) => w.origin === "semantic_flavor" || w.origin === "fallback");
  if (flavorWords.length === 0) return undefined;
  const primary = pickPrimaryWord(pool, rng);
  const flavor = pickRandom(flavorWords, rng);
  if (!flavor) return undefined;
  if (!primary || primary.word === flavor.word) {
    return capitalize(flavor.word);
  }
  const separator = pickRandom(WORD_SEPARATORS, rng) ?? "";
  return `${capitalize(primary.word)}${separator}${capitalize(flavor.word)}`;
}

export function customKeywordMutation(pool: MaterialPool, rng: Rng): string | undefined {
  const keyword = pickRandom(pool.unknownKeywords, rng);
  if (!keyword) return undefined;
  const variants = mutateCustomKeyword(keyword, SUFFIX_POOL, rng);
  const variant = pickRandom(variants, rng);
  return variant ? capitalize(variant) : undefined;
}

export function compactForm(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const compacted = compactWord(primary.word);
  return compacted ? capitalize(compacted) : undefined;
}

export function multiWordForm(pool: MaterialPool, rng: Rng): string | undefined {
  const primary = pickPrimaryWord(pool, rng);
  if (!primary) return undefined;
  const secondary = pickSecondaryWord(pool, primary.word, rng);
  if (!secondary) return undefined;
  return capitalize(primary.word) + capitalize(secondary.word);
}

/** Числовой суффикс (база §18) — не отдельный механизм из §16, но
 * применяется как надстройка поверх любого механизма при `useNumbers`. */
export function appendNumberSuffix(value: string, pool: MaterialPool, rng: Rng): string {
  const userNumber = pickRandom(pool.userNumbers, rng);
  const number = userNumber ?? String(pickRandom(NUMBER_POOL, rng) ?? 1);
  const separator = pickRandom(WORD_SEPARATORS, rng) ?? "";
  return `${value}${separator}${number}`;
}
