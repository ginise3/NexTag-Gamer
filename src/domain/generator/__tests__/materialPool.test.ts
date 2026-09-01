import { describe, expect, it } from "vitest";
import { createEmptySemanticProfile } from "../../types";
import { normalizeCustomWordsInput } from "../../normalizer";
import { buildMaterialPool } from "../materialPool";

describe("buildMaterialPool", () => {
  it("falls back to a non-empty pool for a completely empty profile (Quick Nickname must work, Task.md §5.3)", () => {
    const pool = buildMaterialPool(createEmptySemanticProfile());
    expect(pool.usedFallback).toBe(true);
    expect(pool.words.length).toBeGreaterThan(0);
  });

  it("gives custom words the highest weight", () => {
    const profile = {
      ...createEmptySemanticProfile(),
      nickStyle: "dark",
      customWords: normalizeCustomWordsInput("wolf").customWords,
    };
    const pool = buildMaterialPool(profile);
    const wolf = pool.words.find((w) => w.word === "wolf");
    const dark = pool.words.find((w) => w.word === "dark");
    expect(wolf).toBeDefined();
    expect(dark).toBeDefined();
    expect(wolf!.weight).toBeGreaterThan(dark!.weight);
    expect(pool.usedFallback).toBe(false);
  });

  it("separates user-provided numbers from text material", () => {
    const profile = {
      ...createEmptySemanticProfile(),
      customWords: normalizeCustomWordsInput("wolf, 77").customWords,
    };
    const pool = buildMaterialPool(profile);
    expect(pool.userNumbers).toEqual(["77"]);
    expect(pool.words.some((w) => w.word === "77")).toBe(false);
  });

  it("keeps a single-word unknown custom keyword available for mutation", () => {
    const profile = {
      ...createEmptySemanticProfile(),
      customWords: normalizeCustomWordsInput("Vornek").customWords,
    };
    const pool = buildMaterialPool(profile);
    expect(pool.unknownKeywords).toEqual(["Vornek"]);
  });

  it("does not treat a multi-word phrase as a mutable single keyword", () => {
    const profile = {
      ...createEmptySemanticProfile(),
      customWords: normalizeCustomWordsInput("ancient dragon").customWords,
    };
    const pool = buildMaterialPool(profile);
    expect(pool.unknownKeywords).toEqual([]);
    // но токены фразы всё равно попадают в материал как известные/тематические слова
    expect(pool.words.some((w) => w.word === "dragon")).toBe(true);
  });

  it("activates a semantic group's flavor pool when a role trigger is present", () => {
    const profile = { ...createEmptySemanticProfile(), role: "sniper" };
    const pool = buildMaterialPool(profile);
    // "sniper" role триггерит cross-game группу Precision (база §13)
    expect(pool.words.some((w) => w.word === "scope")).toBe(true);
  });
});
