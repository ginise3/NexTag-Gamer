import { describe, expect, it } from "vitest";
import {
  GENRES,
  SETTINGS,
  ROLES,
  PLAY_STYLES,
  NICK_STYLES,
  THEME_GROUPS,
  SYNONYM_RULES,
  SEMANTIC_GROUPS,
} from "../data";

function expectUniqueIds(items: readonly { id: string }[], label: string) {
  const ids = items.map((item) => item.id);
  const unique = new Set(ids);
  expect(unique.size, `duplicate id in ${label}`).toBe(ids.length);
}

describe("canonical parameter categories", () => {
  it.each([
    ["GENRES", GENRES],
    ["SETTINGS", SETTINGS],
    ["ROLES", ROLES],
    ["PLAY_STYLES", PLAY_STYLES],
    ["NICK_STYLES", NICK_STYLES],
  ] as const)("%s has unique non-empty ids and RU/EN labels", (label, options) => {
    expect(options.length).toBeGreaterThan(0);
    expectUniqueIds(options, label);
    for (const option of options) {
      expect(option.id).toMatch(/^[a-z][a-z0-9_]*$/);
      expect(option.label.en.trim().length).toBeGreaterThan(0);
      expect(option.label.ru.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("theme groups", () => {
  it("have unique ids and non-empty English word lists", () => {
    expectUniqueIds(THEME_GROUPS, "THEME_GROUPS");
    for (const group of THEME_GROUPS) {
      expect(group.words.length).toBeGreaterThan(0);
      for (const word of group.words) {
        expect(word).toMatch(/^[a-z]+$/);
      }
    }
  });
});

describe("synonym rules", () => {
  it("target an existing canonical parameter value", () => {
    const byCategory = {
      role: new Set(ROLES.map((r) => r.id)),
      play_style: new Set(PLAY_STYLES.map((r) => r.id)),
      nick_style: new Set(NICK_STYLES.map((r) => r.id)),
    };
    for (const rule of SYNONYM_RULES) {
      expect(rule.synonyms.length).toBeGreaterThan(0);
      expect(byCategory[rule.target.category].has(rule.target.id)).toBe(true);
    }
  });
});

describe("semantic groups", () => {
  it("have unique ids and non-empty triggers/pool", () => {
    expectUniqueIds(SEMANTIC_GROUPS, "SEMANTIC_GROUPS");
    for (const group of SEMANTIC_GROUPS) {
      expect(group.triggers.length).toBeGreaterThan(0);
      expect(group.pool.length).toBeGreaterThan(0);
    }
  });
});
