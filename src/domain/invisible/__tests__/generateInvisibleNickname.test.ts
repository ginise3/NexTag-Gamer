import { describe, expect, it } from "vitest";
import { BLANK_GLYPHS, MINIMAL_VISIBLE_MARKS, SPACE_VARIANTS } from "../characters";
import { generateInvisibleNickname } from "../generateInvisibleNickname";
import { validateInvisibleNickname } from "../validator";

const BLANK_CHARS = new Set(BLANK_GLYPHS.map((g) => g.char));
const MARK_CHARS = new Set(MINIMAL_VISIBLE_MARKS.map((m) => m.char));
const SPACE_CHARS = new Set(SPACE_VARIANTS.map((s) => s.char));

describe("generateInvisibleNickname — Task.md §20-§22", () => {
  it("does not use SemanticProfile — takes only a type and repeat count", () => {
    const result = generateInvisibleNickname("fully_invisible", { repeatCount: 4 });
    expect(result.type).toBe("fully_invisible");
    expect(result.value.length).toBeGreaterThan(0);
  });

  it("fully_invisible is made only of blank glyphs, repeated the requested number of times", () => {
    const result = generateInvisibleNickname("fully_invisible", { repeatCount: 5 });
    expect(result.value.length).toBe(5);
    for (const ch of result.value) {
      expect(BLANK_CHARS.has(ch)).toBe(true);
    }
  });

  it("almost_invisible appends exactly one minimal visible mark after the blank glyphs", () => {
    const result = generateInvisibleNickname("almost_invisible", { repeatCount: 3 });
    const last = result.value[result.value.length - 1];
    expect(MARK_CHARS.has(last)).toBe(true);
    for (const ch of result.value.slice(0, -1)) {
      expect(BLANK_CHARS.has(ch)).toBe(true);
    }
  });

  it("spaced interleaves blank glyphs with a space-variant character", () => {
    const result = generateInvisibleNickname("spaced", { repeatCount: 3 });
    const chars = [...result.value];
    expect(chars.length).toBe(5); // glyph, space, glyph, space, glyph
    expect(BLANK_CHARS.has(chars[0])).toBe(true);
    expect(SPACE_CHARS.has(chars[1])).toBe(true);
  });

  it("clamps repeatCount to a sane range instead of producing an empty or huge result", () => {
    expect(generateInvisibleNickname("fully_invisible", { repeatCount: 0 }).value.length).toBeGreaterThan(0);
    expect(generateInvisibleNickname("fully_invisible", { repeatCount: 999 }).value.length).toBeLessThanOrEqual(10);
  });

  it("every generated variant passes its own validator (never technically empty)", () => {
    for (const type of ["fully_invisible", "almost_invisible", "spaced"] as const) {
      const result = generateInvisibleNickname(type);
      expect(validateInvisibleNickname(result.value)).toEqual({ valid: true });
    }
  });

  it("reports which characters were used, for a UI that cannot rely on visually showing the value", () => {
    const result = generateInvisibleNickname("almost_invisible");
    expect(result.characters.length).toBeGreaterThan(0);
    expect(result.characters.every((c) => c.codepoint.startsWith("U+"))).toBe(true);
  });
});
