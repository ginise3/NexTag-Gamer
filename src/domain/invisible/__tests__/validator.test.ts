import { describe, expect, it } from "vitest";
import { validateInvisibleNickname } from "../validator";

describe("validateInvisibleNickname", () => {
  it("rejects a technically empty string", () => {
    expect(validateInvisibleNickname("")).toEqual({ valid: false, reason: "empty" });
  });

  it("accepts a short invisible-looking value", () => {
    expect(validateInvisibleNickname("ㅤㅤㅤ")).toEqual({ valid: true });
  });

  it("rejects an unreasonably long value", () => {
    expect(validateInvisibleNickname("ㅤ".repeat(100))).toMatchObject({ valid: false, reason: "too_long" });
  });
});
