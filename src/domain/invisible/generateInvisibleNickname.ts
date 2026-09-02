/**
 * Генератор Invisible Nickname (Task.md §20–§21).
 *
 * Намеренно НЕ использует SemanticProfile/generator обычного режима (§20:
 * "Он не использует Semantic Profile обычного генератора") — это отдельный,
 * гораздо более простой механизм: собрать строку из символов-кандидатов.
 */
import { pickRandom, type Rng } from "../generator/rng";
import { BLANK_GLYPHS, MINIMAL_VISIBLE_MARKS, SPACE_VARIANTS, type InvisibleCharacterInfo } from "./characters";

export type InvisibleNicknameType = "fully_invisible" | "almost_invisible" | "spaced";

export interface GeneratedInvisibleNickname {
  value: string;
  type: InvisibleNicknameType;
  /** Использованные символы — показываются пользователю в UI, так как сам
   * `value` по построению не виден на экране. */
  characters: readonly InvisibleCharacterInfo[];
}

const DEFAULT_REPEAT_COUNT = 3;
const MIN_REPEAT_COUNT = 1;
const MAX_REPEAT_COUNT = 10;

export interface GenerateInvisibleNicknameOptions {
  /** Сколько "единиц" (глифов/сегментов) использовать — влияет на длину. */
  repeatCount?: number;
  rng?: Rng;
}

export function generateInvisibleNickname(
  type: InvisibleNicknameType,
  options: GenerateInvisibleNicknameOptions = {},
): GeneratedInvisibleNickname {
  const rng = options.rng ?? Math.random;
  const repeatCount = clamp(options.repeatCount ?? DEFAULT_REPEAT_COUNT, MIN_REPEAT_COUNT, MAX_REPEAT_COUNT);

  switch (type) {
    case "fully_invisible":
      return buildFullyInvisible(repeatCount, rng);
    case "almost_invisible":
      return buildAlmostInvisible(repeatCount, rng);
    case "spaced":
      return buildSpaced(repeatCount, rng);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function buildFullyInvisible(repeatCount: number, rng: Rng): GeneratedInvisibleNickname {
  const glyph = pickRandom(BLANK_GLYPHS, rng) ?? BLANK_GLYPHS[0];
  return {
    value: glyph.char.repeat(repeatCount),
    type: "fully_invisible",
    characters: [glyph],
  };
}

function buildAlmostInvisible(repeatCount: number, rng: Rng): GeneratedInvisibleNickname {
  const glyph = pickRandom(BLANK_GLYPHS, rng) ?? BLANK_GLYPHS[0];
  const mark = pickRandom(MINIMAL_VISIBLE_MARKS, rng) ?? MINIMAL_VISIBLE_MARKS[0];
  // Один едва заметный видимый символ в конце — чтобы платформы, отклоняющие
  // визуально пустые значения (база §22), приняли результат.
  return {
    value: glyph.char.repeat(repeatCount) + mark.char,
    type: "almost_invisible",
    characters: [glyph, mark],
  };
}

function buildSpaced(repeatCount: number, rng: Rng): GeneratedInvisibleNickname {
  const glyph = pickRandom(BLANK_GLYPHS, rng) ?? BLANK_GLYPHS[0];
  const space = pickRandom(SPACE_VARIANTS, rng) ?? SPACE_VARIANTS[0];
  const segments = Array.from({ length: repeatCount }, () => glyph.char);
  return {
    value: segments.join(space.char),
    type: "spaced",
    characters: [glyph, space],
  };
}
