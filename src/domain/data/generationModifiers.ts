/**
 * GENERATION MODIFIERS — SEMANTIC_GAME_PARAMETER_BASE.md §14, §16–§18, §21.
 * Данные для будущего генератора (Task.md, этап 5). Здесь фиксируются
 * только стартовые пулы/диапазоны из нормативной базы — сама логика
 * построения ника реализуется отдельно и не должна менять эти значения
 * самостоятельно.
 */
import type { LengthPreference } from "../types";

/** Диапазон длины результата в символах по категориям (база §14). */
export const LENGTH_RANGES: Readonly<Record<LengthPreference, { min: number; max: number }>> = {
  short: { min: 4, max: 8 },
  medium: { min: 7, max: 12 },
  long: { min: 10, max: 16 },
};

/** Стартовый пул префиксов (база §16). Не применять механически ко всем результатам. */
export const PREFIX_POOL: readonly string[] = [
  "neo", "nox", "dark", "void", "zero", "x", "vex", "cry", "nova", "iron", "night", "alpha", "ultra", "hyper",
];

/** Стартовый пул суффиксов (база §17). */
export const SUFFIX_POOL: readonly string[] = [
  "x", "ex", "ix", "ox", "on", "or", "ar", "yn", "ion", "core", "prime", "zero", "one",
];

/**
 * Допустимые числа при `use_numbers` (база §18). Числа, введённые самим
 * пользователем как custom word, имеют приоритет над этим пулом и не
 * заменяются им.
 */
export const NUMBER_POOL: readonly number[] = [0, 1, 7, 13, 21, 42, 47, 77, 99, 101, 404, 777];

/**
 * Стартовый приоритет параметров (база §21 PARAMETER WEIGHTS).
 * Не является обязательным математическим коэффициентом реализации —
 * задаёт лишь относительный порядок влияния параметра на результат:
 * чем ближе параметр к личному пожеланию пользователя, тем сильнее
 * он должен влиять на генерацию. custom_words имеют максимальный приоритет.
 */
export const PARAMETER_WEIGHTS = {
  customWords: 1.0,
  nickStyle: 0.9,
  role: 0.8,
  setting: 0.7,
  playStyle: 0.65,
  genre: 0.5,
} as const;
