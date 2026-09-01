import { describe, expect, it } from "vitest";
import {
  applyLetterReplacement,
  applyPhoneticVariation,
  capitalize,
  compactForm,
  mutateCustomKeyword,
  onlyLetters,
  shortenWord,
} from "../transformations";
import { constantRng } from "./testRng";

describe("capitalize / onlyLetters", () => {
  it("capitalizes only the first letter", () => {
    expect(capitalize("dRAGON")).toBe("Dragon");
  });

  it("strips non-letter characters", () => {
    expect(onlyLetters("fr0st-77")).toBe("frst");
  });
});

describe("shortenWord", () => {
  it("shortens a long word to within [min, max]", () => {
    const result = shortenWord("shadow", constantRng(0), 3, 5);
    expect(result).toBeDefined();
    expect(result!.length).toBeGreaterThanOrEqual(3);
    expect(result!.length).toBeLessThanOrEqual(5);
    expect("shadow".startsWith(result!)).toBe(true);
  });

  it("returns undefined for a word already at/below the minimum length", () => {
    expect(shortenWord("go", constantRng(0), 3, 5)).toBeUndefined();
  });
});

describe("applyPhoneticVariation", () => {
  it("mutates a vowel without changing the word length", () => {
    const result = applyPhoneticVariation("wolf", constantRng(0));
    expect(result).toBeDefined();
    expect(result).not.toBe("wolf");
    expect(result!.length).toBe("wolf".length);
  });

  it("returns undefined when there is no mutable vowel", () => {
    expect(applyPhoneticVariation("xyz", constantRng(0))).toBeUndefined();
  });
});

describe("applyLetterReplacement", () => {
  it("mutates a trailing consonant (base example: dragon-like endings)", () => {
    const result = applyLetterReplacement("frost", constantRng(0));
    expect(result).toBeDefined();
    expect(result).not.toBe("frost");
    expect(result!.length).toBe("frost".length);
  });
});

describe("compactForm", () => {
  it("keeps the first letter and strips internal vowels", () => {
    expect(compactForm("shadow")).toBe("shdw");
  });

  it("returns undefined for very short words", () => {
    expect(compactForm("ai")).toBeUndefined();
  });
});

describe("mutateCustomKeyword (base §20 — Vornek example)", () => {
  it("never drops the unknown word — always returns at least one variant", () => {
    const variants = mutateCustomKeyword("Vornek", ["ex", "x", "prime"], constantRng(0));
    expect(variants.length).toBeGreaterThan(0);
    for (const variant of variants) {
      expect(variant.length).toBeGreaterThan(0);
    }
  });

  it("returns the word unchanged when too short to mutate meaningfully", () => {
    expect(mutateCustomKeyword("Al", ["ex"], constantRng(0))).toEqual(["Al"]);
  });
});
