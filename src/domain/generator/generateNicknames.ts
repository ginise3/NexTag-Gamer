/**
 * Оркестратор генерации — Task.md §16–§19.
 *
 *   SemanticProfile → material pool → mechanisms (round-robin) → Validator → Results
 *
 * Разнообразие результатов (§17 "Результаты должны различаться по механизму
 * построения") обеспечивается перебором механизмов по кругу в
 * перемешанном порядке, а не случайным выбором с возможными повторами.
 *
 * Повторная генерация без повторов в рамках сессии (§18) — через
 * `previousResults`: вызывающий код (UI) накапливает уже показанные ники и
 * передаёт их сюда при каждом следующем вызове `Generate more`.
 */
import type { SemanticProfile } from "../types";
import { validateNickname } from "../validator";
import { buildMaterialPool } from "./materialPool";
import * as mechanisms from "./mechanisms";
import { pickRandom, shuffle, type Rng } from "./rng";
import { applyLeetSpeak } from "./transformations";
import type { GeneratedNickname, GenerationMechanism } from "./types";

export type { GeneratedNickname, GenerationMechanism } from "./types";

type MechanismFn = (pool: ReturnType<typeof buildMaterialPool>, rng: Rng) => string | undefined;

const MECHANISM_FNS: Record<GenerationMechanism, MechanismFn> = {
  word_combination: mechanisms.wordCombination,
  word_shortening: mechanisms.wordShortening,
  phonetic_modification: mechanisms.phoneticModification,
  prefix: mechanisms.prefixMechanism,
  suffix: mechanisms.suffixMechanism,
  letter_replacement: mechanisms.letterReplacement,
  semantic_combination: mechanisms.semanticCombination,
  custom_keyword_mutation: mechanisms.customKeywordMutation,
  compact_form: mechanisms.compactForm,
  multi_word_form: mechanisms.multiWordForm,
};

const ALL_MECHANISMS = Object.keys(MECHANISM_FNS) as GenerationMechanism[];

export interface GenerateNicknamesOptions {
  /** Сколько ников вернуть (лучший результат — при достаточном материале). */
  count?: number;
  /** Добавлять ли случайные числа к части результатов (база §18). */
  useNumbers?: boolean;
  /** Ники, уже показанные в этой сессии — не повторяются при `Generate more`. */
  previousResults?: readonly string[];
  /** Инжектируемый источник случайности (по умолчанию Math.random) — для тестов. */
  rng?: Rng;
  /**
   * "Классические" допопции поверх канонической модели (продуктовое
   * решение — см. переписку): не входят в Task.md §16, переносят
   * поведение прежнего Streamlit-генератора как необязательную приправу.
   */
  /** Подмешать дополнительные flavor-слова в material pool (например, из
   * старого style preset gamer/cute) — не заменяет genre/setting/role/... */
  extraFlavorWords?: readonly string[];
  /** Применить leet-speak постобработку к результату (a→4, o→0, ...). */
  useLeetSpeak?: boolean;
}

const DEFAULT_COUNT = 8;
const MAX_ATTEMPTS_PER_ITEM = 30;
/** Числа добавляются не ко всем результатам (база §18), а к части из них. */
const NUMBER_SUFFIX_PROBABILITY = 0.4;

export function generateNicknames(
  profile: SemanticProfile,
  options: GenerateNicknamesOptions = {},
): GeneratedNickname[] {
  const {
    count = DEFAULT_COUNT,
    useNumbers = false,
    previousResults = [],
    rng = Math.random,
    extraFlavorWords = [],
    useLeetSpeak = false,
  } = options;
  if (count <= 0) return [];

  const pool = buildMaterialPool(profile, rng, extraFlavorWords);
  const mechanismOrder = shuffle(ALL_MECHANISMS, rng);

  const previousLower = new Set(previousResults.map((v) => v.toLowerCase()));
  const results: GeneratedNickname[] = [];
  const seenInBatch = new Set<string>();

  let attempts = 0;
  const maxAttempts = count * MAX_ATTEMPTS_PER_ITEM;

  while (results.length < count && attempts < maxAttempts) {
    const mechanism = mechanismOrder[attempts % mechanismOrder.length];
    attempts++;

    let candidate = MECHANISM_FNS[mechanism](pool, rng);
    if (!candidate) continue;

    if (useLeetSpeak) {
      candidate = applyLeetSpeak(candidate);
    }

    if (useNumbers && rng() < NUMBER_SUFFIX_PROBABILITY) {
      candidate = mechanisms.appendNumberSuffix(candidate, pool, rng);
    }

    const existingInBatch = new Set([...previousLower, ...seenInBatch]);
    const validation = validateNickname(candidate, {
      existingInBatch,
      lengthPreference: profile.length,
    });
    if (!validation.valid) continue;

    seenInBatch.add(candidate.toLowerCase());
    results.push({ value: candidate, mechanism });
  }

  return results;
}

/** Удобный помощник: один случайный механизм из полного списка §16 — на
 * случай, если UI захочет показать пользователю, "как был построен" ник. */
export function pickAnyMechanism(rng: Rng = Math.random): GenerationMechanism {
  return pickRandom(ALL_MECHANISMS, rng) ?? "word_combination";
}
