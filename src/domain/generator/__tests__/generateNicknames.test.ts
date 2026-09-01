import { describe, expect, it } from "vitest";
import { createEmptySemanticProfile } from "../../types";
import { normalizeCustomWordsInput } from "../../normalizer";
import { generateNicknames } from "../generateNicknames";

function richProfile() {
  return {
    ...createEmptySemanticProfile(),
    genre: ["rpg"],
    setting: "dark_fantasy",
    role: "necromancer",
    playStyle: "strategic",
    nickStyle: "mysterious",
    length: "short" as const,
    customWords: normalizeCustomWordsInput("dragon, frost, Vornek").customWords,
  };
}

describe("generateNicknames — Task.md §16-§19", () => {
  it("returns the requested count when there is enough material", () => {
    const results = generateNicknames(richProfile(), { count: 8 });
    expect(results.length).toBe(8);
  });

  it("produces results that differ by construction mechanism, not just by suffix (Task.md §17)", () => {
    const results = generateNicknames(richProfile(), { count: 8 });
    const mechanisms = new Set(results.map((r) => r.mechanism));
    expect(mechanisms.size).toBeGreaterThan(1);
  });

  it("never returns two identical values within one batch", () => {
    const results = generateNicknames(richProfile(), { count: 10 });
    const values = results.map((r) => r.value.toLowerCase());
    expect(new Set(values).size).toBe(values.length);
  });

  it("works for a completely empty profile — Quick Nickname must always produce a result (Task.md §5.3)", () => {
    const results = generateNicknames(createEmptySemanticProfile(), { count: 5 });
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.value.length).toBeGreaterThan(0);
    }
  });

  it("does not repeat nicknames already shown in the session (Generate more, Task.md §18)", () => {
    const first = generateNicknames(richProfile(), { count: 10 });
    const previousResults = first.map((r) => r.value);
    const second = generateNicknames(richProfile(), { count: 10, previousResults });
    const overlap = second.filter((r) => previousResults.some((p) => p.toLowerCase() === r.value.toLowerCase()));
    expect(overlap).toEqual([]);
  });

  it("adds digits to only part of the results when useNumbers is enabled (base §18)", () => {
    const results = generateNicknames(richProfile(), { count: 20, useNumbers: true });
    const withDigits = results.filter((r) => /[0-9]/.test(r.value));
    expect(withDigits.length).toBeGreaterThan(0);
    expect(withDigits.length).toBeLessThan(results.length);
  });

  it("returns nothing for a non-positive count", () => {
    expect(generateNicknames(richProfile(), { count: 0 })).toEqual([]);
  });
});
