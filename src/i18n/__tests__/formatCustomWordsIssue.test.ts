import { describe, expect, it } from "vitest";
import { formatCustomWordsIssue } from "../formatCustomWordsIssue";
import { TRANSLATIONS } from "../translations";
import type { CustomWordsIssue } from "../../domain/normalizer";

const CASES: CustomWordsIssue[] = [
  { type: "cyrillic", raw: "дракон" },
  { type: "disallowed_characters", raw: "dragon<script>" },
  { type: "too_long", raw: "a".repeat(50), maxLength: 40 },
  { type: "too_many_items", maxItems: 15 },
];

describe("formatCustomWordsIssue", () => {
  it.each(["en", "ru"] as const)("produces a non-empty message for every issue type in %s", (lang) => {
    for (const issue of CASES) {
      const message = formatCustomWordsIssue(issue, TRANSLATIONS[lang]);
      expect(message.length).toBeGreaterThan(0);
    }
  });

  it("includes the offending raw text so the user can identify which item failed", () => {
    const issue: CustomWordsIssue = { type: "cyrillic", raw: "дракон" };
    expect(formatCustomWordsIssue(issue, TRANSLATIONS.en)).toContain("дракон");
    expect(formatCustomWordsIssue(issue, TRANSLATIONS.ru)).toContain("дракон");
  });

  it("produces different text for en vs ru (real localization, not a passthrough)", () => {
    const issue: CustomWordsIssue = { type: "too_many_items", maxItems: 15 };
    expect(formatCustomWordsIssue(issue, TRANSLATIONS.en)).not.toBe(formatCustomWordsIssue(issue, TRANSLATIONS.ru));
  });
});
