/**
 * Небольшие рандомизирующие утилиты для генератора.
 *
 * Везде принимают инжектируемую функцию `rng: () => number` (по умолчанию
 * `Math.random`), чтобы тесты могли подставить детерминированный источник
 * случайности вместо мокания глобального `Math.random`.
 */
export type Rng = () => number;

export function pickRandom<T>(items: readonly T[], rng: Rng = Math.random): T | undefined {
  if (items.length === 0) return undefined;
  const index = Math.floor(rng() * items.length);
  return items[Math.min(index, items.length - 1)];
}

/** Взвешенный случайный выбор: элемент с большим `weight` выбирается чаще. */
export function pickWeighted<T>(
  items: readonly T[],
  weightOf: (item: T) => number,
  rng: Rng = Math.random,
): T | undefined {
  if (items.length === 0) return undefined;
  const total = items.reduce((sum, item) => sum + Math.max(weightOf(item), 0), 0);
  if (total <= 0) return pickRandom(items, rng);

  let threshold = rng() * total;
  for (const item of items) {
    threshold -= Math.max(weightOf(item), 0);
    if (threshold <= 0) return item;
  }
  return items[items.length - 1];
}

/** Фишер-Йейтс, не мутирует исходный массив. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
