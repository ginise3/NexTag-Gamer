import { describe, expect, it } from "vitest";
import { BLANK_GLYPHS, MINIMAL_VISIBLE_MARKS, SPACE_VARIANTS } from "../characters";

function codepointToNumber(codepoint: string): number {
  return parseInt(codepoint.replace("U+", ""), 16);
}

describe("invisible character data — technical verification (base §21)", () => {
  it.each([
    ["BLANK_GLYPHS", BLANK_GLYPHS],
    ["MINIMAL_VISIBLE_MARKS", MINIMAL_VISIBLE_MARKS],
    ["SPACE_VARIANTS", SPACE_VARIANTS],
  ] as const)("%s: each char's actual code unit matches its declared codepoint", (_label, entries) => {
    for (const entry of entries) {
      expect(entry.char.length).toBe(1);
      expect(entry.char.charCodeAt(0)).toBe(codepointToNumber(entry.codepoint));
    }
  });

  it("declares no duplicate codepoints across all three pools", () => {
    const all = [...BLANK_GLYPHS, ...MINIMAL_VISIBLE_MARKS, ...SPACE_VARIANTS];
    const codepoints = all.map((c) => c.codepoint);
    expect(new Set(codepoints).size).toBe(codepoints.length);
  });

  it("blank glyphs are not classified as Unicode whitespace (survive naive trim())", () => {
    for (const glyph of BLANK_GLYPHS) {
      expect(`x${glyph.char}x`.trim()).toBe(`x${glyph.char}x`);
      // .trim() removing it from the edges would prove it IS whitespace-like.
      expect(`${glyph.char}x`.trim()).toBe(`${glyph.char}x`);
    }
  });

  it("space variants ARE trimmed like regular whitespace (documented limitation)", () => {
    for (const space of SPACE_VARIANTS) {
      expect(`${space.char}x${space.char}`.trim()).toBe("x");
    }
  });
});
