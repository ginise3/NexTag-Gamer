import { describe, expect, it } from "vitest";
import { CLASSIC_CUTE_WORDS, CLASSIC_GAMER_WORDS, LEET_MAP, classicStyleWords } from "../classicWords";

describe("classicStyleWords (classic option layered on top of the canonical model)", () => {
  it("returns nothing for 'none' — the default that must not affect generation", () => {
    expect(classicStyleWords("none")).toEqual([]);
  });

  it("returns the matching word list for 'gamer' and 'cute'", () => {
    expect(classicStyleWords("gamer")).toBe(CLASSIC_GAMER_WORDS);
    expect(classicStyleWords("cute")).toBe(CLASSIC_CUTE_WORDS);
  });

  it("mixes both lists for 'random'", () => {
    const combined = classicStyleWords("random");
    expect(combined.length).toBe(CLASSIC_GAMER_WORDS.length + CLASSIC_CUTE_WORDS.length);
    expect(combined).toEqual(expect.arrayContaining([...CLASSIC_GAMER_WORDS, ...CLASSIC_CUTE_WORDS]));
  });
});

describe("LEET_MAP", () => {
  it("matches the original Streamlit generator's mapping exactly", () => {
    expect(LEET_MAP).toEqual({ a: "4", e: "3", i: "1", o: "0", s: "5", t: "7" });
  });
});
