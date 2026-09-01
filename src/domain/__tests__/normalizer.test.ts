import { describe, expect, it } from "vitest";
import {
  CUSTOM_WORDS_LIMITS,
  normalizeCustomWordsInput,
  splitCustomWordsInput,
} from "../normalizer";

describe("splitCustomWordsInput", () => {
  it("splits on comma, semicolon and newline but keeps short phrases intact", () => {
    expect(splitCustomWordsInput("dragon, frost\nwolf; ancient dragon")).toEqual([
      "dragon",
      "frost",
      "wolf",
      "ancient dragon",
    ]);
  });

  it("returns an empty list for empty input", () => {
    expect(splitCustomWordsInput("")).toEqual([]);
    expect(splitCustomWordsInput("   ")).toEqual([]);
  });
});

describe("normalizeCustomWordsInput — English words", () => {
  it("accepts plain English words", () => {
    const result = normalizeCustomWordsInput("dragon, frost");
    expect(result.issues).toEqual([]);
    expect(result.customWords.map((w) => w.normalized)).toEqual(["dragon", "frost"]);
  });

  it("accepts digits as a standalone custom word", () => {
    const result = normalizeCustomWordsInput("77");
    expect(result.issues).toEqual([]);
    expect(result.customWords[0].normalized).toBe("77");
  });

  it("accepts short English phrases as a single item", () => {
    const result = normalizeCustomWordsInput("ancient dragon");
    expect(result.issues).toEqual([]);
    expect(result.customWords).toHaveLength(1);
    expect(result.customWords[0].normalized).toBe("ancient dragon");
  });

  it("accepts allowed separators combined with words and digits", () => {
    const result = normalizeCustomWordsInput("wolf, frost, moon, Alex, 77");
    expect(result.issues).toEqual([]);
    expect(result.customWords).toHaveLength(5);
  });
});

describe("normalizeCustomWordsInput — known vs unknown terms", () => {
  it("recognizes a synonym and resolves it to the canonical parameter + tags", () => {
    const result = normalizeCustomWordsInput("marksman");
    expect(result.customWords[0].known).toBe(true);
    expect(result.customWords[0].resolvedTarget).toEqual({ category: "role", id: "sniper" });
    expect(result.customWords[0].semanticTags).toContain("precision");
  });

  it("recognizes a theme word without turning it into a parameter override", () => {
    const result = normalizeCustomWordsInput("dragon");
    expect(result.customWords[0].known).toBe(true);
    expect(result.customWords[0].resolvedTarget).toBeUndefined();
    expect(result.customWords[0].semanticTags).toContain("fantasy");
  });

  it("keeps an unknown English word instead of dropping it (base §20)", () => {
    const result = normalizeCustomWordsInput("Vornek");
    expect(result.issues).toEqual([]);
    expect(result.customWords).toHaveLength(1);
    expect(result.customWords[0].raw).toBe("Vornek");
    expect(result.customWords[0].known).toBe(false);
  });

  it("handles a mixed set of known and unknown words", () => {
    const result = normalizeCustomWordsInput("dragon, Vornek, marksman");
    expect(result.customWords).toHaveLength(3);
    expect(result.customWords.map((w) => w.known)).toEqual([true, false, true]);
  });
});

describe("normalizeCustomWordsInput — validation (Task.md §11, §44)", () => {
  it("rejects Cyrillic input with a dedicated issue instead of transliterating it", () => {
    const result = normalizeCustomWordsInput("дракон");
    expect(result.customWords).toEqual([]);
    expect(result.issues).toEqual([{ type: "cyrillic", raw: "дракон" }]);
  });

  it("flags only the Cyrillic item in a mixed English/Cyrillic input, keeping the valid one", () => {
    const result = normalizeCustomWordsInput("dragon, дракон");
    expect(result.customWords.map((w) => w.normalized)).toEqual(["dragon"]);
    expect(result.issues).toEqual([{ type: "cyrillic", raw: "дракон" }]);
  });

  it("rejects disallowed special characters", () => {
    const result = normalizeCustomWordsInput("dragon<script>");
    expect(result.customWords).toEqual([]);
    expect(result.issues[0]).toMatchObject({ type: "disallowed_characters" });
  });

  it("returns no custom words and no issues for empty input (custom words are optional)", () => {
    const result = normalizeCustomWordsInput("");
    expect(result.customWords).toEqual([]);
    expect(result.issues).toEqual([]);
  });

  it("flags an item that is too long instead of silently truncating it", () => {
    const tooLong = "a".repeat(CUSTOM_WORDS_LIMITS.maxItemLength + 1);
    const result = normalizeCustomWordsInput(tooLong);
    expect(result.customWords).toEqual([]);
    expect(result.issues[0]).toMatchObject({ type: "too_long", maxLength: CUSTOM_WORDS_LIMITS.maxItemLength });
  });

  it("caps the number of accepted items and reports the overflow", () => {
    const many = Array.from({ length: CUSTOM_WORDS_LIMITS.maxItemCount + 5 }, (_, i) => `word${i}`).join(", ");
    const result = normalizeCustomWordsInput(many);
    expect(result.customWords).toHaveLength(CUSTOM_WORDS_LIMITS.maxItemCount);
    expect(result.issues).toContainEqual({ type: "too_many_items", maxItems: CUSTOM_WORDS_LIMITS.maxItemCount });
  });
});
