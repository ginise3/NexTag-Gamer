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
    <details className="classic-options">
      <summary>{c.heading}</summary>
      <p className="field-hint" style={{ margin: "6px 0 10px" }}>
        {c.hint}
      </p>

      <label className="field">
        <span className="field-label">{c.baseWordLabel}</span>
        <input
          type="text"
          value={value.baseWord}
          onChange={(e) => onChange({ ...value, baseWord: e.target.value })}
          placeholder={c.baseWordPlaceholder}
        />
        {baseWordIssues.length > 0 && (
          <ul className="field-error-list">
            {baseWordIssues.map((issue, index) => (
              <li key={`${issue.type}-${index}`}>{formatCustomWordsIssue(issue, t)}</li>
            ))}
          </ul>
        )}
      </label>

      <label className="field">
        <span className="field-label">{c.stylePresetLabel}</span>
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

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={value.useLeetSpeak}
          onChange={(e) => onChange({ ...value, useLeetSpeak: e.target.checked })}
        />
        {c.leetLabel}
      </label>

      <label className="field" style={{ marginBottom: 0 }}>
        <span className="field-label">
          {c.countLabel}: {value.count}
        </span>
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
