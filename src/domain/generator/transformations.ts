/**
 * Механизмы преобразования отдельного слова (Task.md §16, база §15–§17).
 *
 * Каждая функция — чистое преобразование строки в строку (или `undefined`,
 * если преобразование неприменимо к конкретному слову — например, нечего
 * сокращать в слове из трёх букв). Комбинирование нескольких слов и выбор
 * конкретного механизма — в `mechanisms.ts`.
 *
 * Правило базы §15: "Необходимо избегать полной случайной порчи исходного
 * слова" — поэтому мутации точечные (одна гласная/согласная за раз), а не
 * побуквенная случайная замена.
 */
import { LEET_MAP } from "../data/classicWords";
import { pickRandom, type Rng } from "./rng";

export function onlyLetters(word: string): string {
  return word.replace(/[^a-zA-Z]/g, "");
}

export function capitalize(word: string): string {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

/** Стилизованные замены гласных (база: wolf → wulf). */
const VOWEL_MUTATIONS: Readonly<Record<string, readonly string[]>> = {
  a: ["e", "y"],
  e: ["a", "y"],
  i: ["y", "e"],
  o: ["u", "0"],
  u: ["o", "y"],
};

/** Стилизованные замены концевых согласных (база: dragon → drak, frost → frox). */
const CONSONANT_MUTATIONS: Readonly<Record<string, readonly string[]>> = {
  g: ["k", "x"],
  d: ["k", "x"],
  t: ["x"],
  f: ["x"],
  s: ["x", "z"],
  c: ["k"],
  w: ["v", "x"],
  n: ["x"],
};

/**
 * Контролируемое сокращение (база §15 controlled shortening).
 * Возвращает `undefined`, если слово уже короче минимально осмысленной длины.
 */
export function shortenWord(word: string, rng: Rng = Math.random, minLen = 3, maxLen = 5): string | undefined {
  const clean = onlyLetters(word).toLowerCase();
  if (clean.length <= minLen) return undefined;
  const targetLen = Math.min(maxLen, clean.length - 1);
  const len = Math.min(targetLen, minLen + Math.floor(rng() * (targetLen - minLen + 1)));
  return clean.slice(0, Math.max(len, minLen));
}

/** Фонетическая вариация: точечная замена одной гласной (§15 vowel mutation). */
export function applyPhoneticVariation(word: string, rng: Rng = Math.random): string | undefined {
  const clean = onlyLetters(word).toLowerCase();
  for (let i = clean.length - 1; i >= 0; i--) {
    const ch = clean[i];
    if (VOWELS.has(ch) && VOWEL_MUTATIONS[ch]) {
      const replacement = pickRandom(VOWEL_MUTATIONS[ch], rng);
      if (!replacement) continue;
      return clean.slice(0, i) + replacement + clean.slice(i + 1);
    }
  }
  return undefined;
}

/** Контролируемая замена буквы: точечная замена концевой согласной
 * (§16 controlled letter replacement). */
export function applyLetterReplacement(word: string, rng: Rng = Math.random): string | undefined {
  const clean = onlyLetters(word).toLowerCase();
  for (let i = clean.length - 1; i >= 0; i--) {
    const ch = clean[i];
    if (!VOWELS.has(ch) && CONSONANT_MUTATIONS[ch]) {
      const replacement = pickRandom(CONSONANT_MUTATIONS[ch], rng);
      if (!replacement) continue;
      return clean.slice(0, i) + replacement + clean.slice(i + 1);
    }
  }
  return undefined;
}

/**
 * Компактная форма: убирает гласные из слова, кроме самой первой буквы
 * (база не задаёт конкретный алгоритм — реализация делает результат короче
 * и "плотнее" визуально, не превращая его в нечитаемый набор букв).
 */
export function compactForm(word: string): string | undefined {
  const clean = onlyLetters(word).toLowerCase();
  if (clean.length <= 3) return undefined;
  const compacted = clean[0] + clean.slice(1).replace(/[aeiou]/g, "");
  if (compacted.length < 2 || compacted.length === clean.length) return undefined;
  return compacted;
}

/**
 * Leet-speak — необязательная "классическая" допопция поверх канонической
 * модели (не часть Task.md §16, перенесена из прежнего Streamlit-генератора
 * по отдельному продуктовому решению). Применяется как постобработка уже
 * построенного ника, а не как отдельный механизм §16.
 */
export function applyLeetSpeak(value: string): string {
  return value
    .split("")
    .map((ch) => LEET_MAP[ch.toLowerCase()] ?? ch)
    .join("");
}

/**
 * Мутация неизвестного пользовательского слова (custom keyword) — база §20:
 * слово никогда не отбрасывается, но может быть стилизовано. Возвращает
 * несколько вариантов; вызывающий код выбирает один.
 */
export function mutateCustomKeyword(word: string, suffixPool: readonly string[], rng: Rng = Math.random): string[] {
  const clean = onlyLetters(word);
  if (clean.length < 3) return [clean];

  const variants: string[] = [];

  // Замена окончания на элемент из пула суффиксов: Vornek → Vornex.
  if (clean.length > 4) {
    const stem = clean.slice(0, -2);
    const suffix = pickRandom(suffixPool, rng);
    if (suffix) variants.push(stem + suffix);
  }

  // Удаление одной внутренней буквы: Vornek → Vorek.
  if (clean.length > 4) {
    const dropIndex = 1 + Math.floor(rng() * (clean.length - 2));
    variants.push(clean.slice(0, dropIndex) + clean.slice(dropIndex + 1));
  }

  // Перестановка половин (слоговое слияние в обратном порядке): Vornek → NekVor.
  if (clean.length >= 4) {
    const mid = Math.floor(clean.length / 2);
    variants.push(clean.slice(mid) + clean.slice(0, mid));
  }

  // Сокращение до короткой формы + суффикс: Vornek → VorX.
  const shortened = shortenWord(clean, rng, 3, 4);
  if (shortened) {
    const suffix = pickRandom(suffixPool.filter((s) => s.length <= 2), rng) ?? "x";
    variants.push(shortened + suffix);
  }

  return variants.length > 0 ? variants : [clean];
}
