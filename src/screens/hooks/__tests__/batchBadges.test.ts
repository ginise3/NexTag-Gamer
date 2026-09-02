import { describe, expect, it } from "vitest";
import { TRANSLATIONS } from "../../../i18n/translations";
import { createDefaultClassicOptions } from "../../components/classicOptionsState";
import { computeBatchBadges } from "../batchBadges";

describe("computeBatchBadges", () => {
  it("returns no badges for a fully default state", () => {
    expect(computeBatchBadges("", createDefaultClassicOptions(), TRANSLATIONS.en, "en")).toEqual([]);
  });

  it("adds the localized Nick Style label when one is selected", () => {
    const badges = computeBatchBadges("cyber", createDefaultClassicOptions(), TRANSLATIONS.en, "en");
    expect(badges).toEqual(["Cyber"]);
    const ruBadges = computeBatchBadges("cyber", createDefaultClassicOptions(), TRANSLATIONS.ru, "ru");
    expect(ruBadges).toEqual(["Кибер"]);
  });

  it("adds the classic style preset label when it isn't 'none'", () => {
    const classic = { ...createDefaultClassicOptions(), stylePreset: "gamer" as const };
    expect(computeBatchBadges("", classic, TRANSLATIONS.en, "en")).toEqual(["Gamer"]);
  });

  it("adds a Leet badge when leet-speak is enabled", () => {
    const classic = { ...createDefaultClassicOptions(), useLeetSpeak: true };
    expect(computeBatchBadges("", classic, TRANSLATIONS.en, "en")).toEqual(["Leet"]);
  });

  it("combines all active badges in order: nick style, style preset, leet", () => {
    const classic = { ...createDefaultClassicOptions(), stylePreset: "cute" as const, useLeetSpeak: true };
    expect(computeBatchBadges("dark", classic, TRANSLATIONS.en, "en")).toEqual(["Dark", "Cute", "Leet"]);
  });
});
