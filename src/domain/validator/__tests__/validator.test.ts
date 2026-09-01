import { describe, expect, it } from "vitest";
import { validateNickname } from "../index";

describe("validateNickname — Task.md §19 checklist", () => {
  it("rejects an empty value", () => {
    expect(validateNickname("").valid).toBe(false);
    expect(validateNickname("   ")).toMatchObject({ valid: false, reason: "empty" });
  });

  it("accepts a plain nickname within the generic length bounds", () => {
    expect(validateNickname("FrostWolf")).toEqual({ valid: true });
  });

  it("rejects a value that is too short", () => {
    expect(validateNickname("A")).toMatchObject({ valid: false, reason: "too_short" });
  });

  it("rejects a value that is too long", () => {
    expect(validateNickname("A".repeat(40))).toMatchObject({ valid: false, reason: "too_long" });
  });

  it("respects a tighter length preference with a small slack", () => {
    // "short" = 4-8 символов (база §14), допуск -1/+4 → нижняя граница 3.
    expect(validateNickname("Abc", { lengthPreference: "short" })).toMatchObject({ valid: true });
    expect(validateNickname("Ab", { lengthPreference: "short" })).toMatchObject({
      valid: false,
      reason: "too_short",
    });
    expect(
      validateNickname("A".repeat(20), { lengthPreference: "short" }),
    ).toMatchObject({ valid: false, reason: "too_long" });
  });

  it("rejects disallowed characters", () => {
    expect(validateNickname("Frost Wolf")).toMatchObject({ valid: false, reason: "invalid_characters" });
    expect(validateNickname("Frost<Wolf>")).toMatchObject({ valid: false, reason: "invalid_characters" });
  });

  it("rejects obvious technical garbage", () => {
    expect(validateNickname("undefined")).toMatchObject({ valid: false, reason: "technical_garbage" });
    expect(validateNickname("404")).toMatchObject({ valid: false, reason: "technical_garbage" });
  });

  it("rejects a value containing a banned word stem", () => {
    expect(validateNickname("xShitLordx")).toMatchObject({ valid: false, reason: "banned_word" });
  });

  it("rejects a duplicate within the current batch", () => {
    const existingInBatch = new Set(["frostwolf"]);
    expect(validateNickname("FrostWolf", { existingInBatch })).toMatchObject({
      valid: false,
      reason: "duplicate",
    });
  });
});
