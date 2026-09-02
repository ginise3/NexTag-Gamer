import type { ClassicStylePreset } from "../../domain/data";
import { formatCustomWordsIssue } from "../../i18n/formatCustomWordsIssue";
import type { Translations } from "../../i18n/translations";
import type { CustomWordsIssue } from "../../domain/normalizer";
import type { ClassicOptionsState } from "./classicOptionsState";

interface ClassicOptionsSectionProps {
  t: Translations;
  value: ClassicOptionsState;
  onChange: (next: ClassicOptionsState) => void;
  baseWordIssues: readonly CustomWordsIssue[];
}

const MIN_COUNT = 1;
const MAX_COUNT = 20;

/**
 * Допопции, перенесённые из прежнего Streamlit-генератора (base word,
 * style preset, leet-speak, количество ников) — по продуктовому решению
 * добавлены поверх канонической модели Task.md/SEMANTIC_GAME_PARAMETER_BASE.md,
 * а не вместо неё. По умолчанию ни на что не влияют (style preset "none",
 * пустое base word, leet выключен) — использование строго необязательно.
 */
export function ClassicOptionsSection({ t, value, onChange, baseWordIssues }: ClassicOptionsSectionProps) {
  const c = t.classicOptions;

  return (
    <details style={{ marginBottom: "1rem" }}>
      <summary style={{ cursor: "pointer", fontWeight: 600 }}>{c.heading}</summary>
      <p style={{ color: "#666", fontSize: "0.85rem", margin: "0.4rem 0 0.75rem" }}>{c.hint}</p>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <div>{c.baseWordLabel}</div>
        <input
          type="text"
          value={value.baseWord}
          onChange={(e) => onChange({ ...value, baseWord: e.target.value })}
          placeholder={c.baseWordPlaceholder}
        />
        {baseWordIssues.length > 0 && (
          <ul style={{ color: "#b3261e", margin: "0.25rem 0 0", paddingLeft: "1.25rem", fontSize: "0.85rem" }}>
            {baseWordIssues.map((issue, index) => (
              <li key={`${issue.type}-${index}`}>{formatCustomWordsIssue(issue, t)}</li>
            ))}
          </ul>
        )}
      </label>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <div>{c.stylePresetLabel}</div>
        <select
          value={value.stylePreset}
          onChange={(e) => onChange({ ...value, stylePreset: e.target.value as ClassicStylePreset })}
        >
          <option value="none">{t.common.any}</option>
          <option value="random">{c.stylePresetOptions.random}</option>
          <option value="gamer">{c.stylePresetOptions.gamer}</option>
          <option value="cute">{c.stylePresetOptions.cute}</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <input
          type="checkbox"
          checked={value.useLeetSpeak}
          onChange={(e) => onChange({ ...value, useLeetSpeak: e.target.checked })}
        />{" "}
        {c.leetLabel}
      </label>

      <label style={{ display: "block" }}>
        <div>
          {c.countLabel}: {value.count}
        </div>
        <input
          type="range"
          min={MIN_COUNT}
          max={MAX_COUNT}
          value={value.count}
          onChange={(e) => onChange({ ...value, count: Number(e.target.value) })}
        />
      </label>
    </details>
  );
}
