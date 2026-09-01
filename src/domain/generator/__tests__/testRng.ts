/** Детерминированный ГСЧ для тестов (mulberry32) — вместо мокания Math.random. */
export function makeRng(seed: number): () => number {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** ГСЧ, всегда возвращающий заданную константу — удобно там, где нужен
 * предсказуемый выбор первого элемента пула (pickRandom(arr, rng) === arr[0]). */
export function constantRng(value: number): () => number {
  return () => value;
}
