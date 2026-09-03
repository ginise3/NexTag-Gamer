import { describe, expect, it } from "vitest";
import { computeBatchBadges } from "../batchBadges";

describe("computeBatchBadges", () => {
  it("returns no badges when no Nick Style is selected", () => {
    expect(computeBatchBadges("", "en")).toEqual([]);
  });

  it("returns the localized Nick Style label when one is selected", () => {
    expect(computeBatchBadges("cyber", "en")).toEqual(["Cyber"]);
    expect(computeBatchBadges("cyber", "ru")).toEqual(["Кибер"]);
  });

  it("returns no badges for an unknown nick style id", () => {
    expect(computeBatchBadges("not-a-real-id", "en")).toEqual([]);
  });
});
