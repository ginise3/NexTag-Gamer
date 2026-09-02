import { GENRES, NICK_STYLES, PLAY_STYLES, ROLES, SETTINGS } from "../../domain/data";
import type { LengthPreference, ParameterOption } from "../../domain/types";
import type { Lang, Translations } from "../../i18n/translations";
import type { useCustomNickname } from "../hooks/useCustomNickname";
import { AdditionalWordsInput } from "./AdditionalWordsInput";
import { ClassicOptionsSection } from "./ClassicOptionsSection";

interface SingleSelectProps {
  label: string;
  options: readonly ParameterOption[];
  value: string;
  onChange: (value: string) => void;
  anyLabel: string;
  lang: Lang;
}

function SingleSelect({ label, options, value, onChange, anyLabel, lang }: SingleSelectProps) {
  return (
    <label style={{ display: "block", marginBottom: "0.75rem" }}>
      <div>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label[lang]}
          </option>
        ))}
      </select>
    </label>
  );
}

interface CustomControlsProps {
  mode: ReturnType<typeof useCustomNickname>;
  t: Translations;
  lang: Lang;
}

/**
 * Настройки Custom Nickname в сайдбаре — последовательность из Task.md §39:
 * Genre → Setting → Role → Play Style → Nick Style → Length → Additional
 * Words. Ни один параметр не обязателен (§7, база §23).
 */
export function CustomControls({ mode, t, lang }: CustomControlsProps) {
  const c = t.custom;

  return (
    <div>
      <h2 style={{ fontSize: "1.1rem" }}>{c.heading}</h2>
      <p style={{ color: "#666", fontSize: "0.85rem" }}>{c.hint}</p>

      <div style={{ marginBottom: "0.75rem" }}>
        <div>
          {c.genreLabel} <span style={{ color: "#999", fontSize: "0.85rem" }}>({c.genreHint})</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 0.75rem", maxHeight: 160, overflowY: "auto" }}>
          {GENRES.map((genre) => (
            <label key={genre.id} style={{ fontSize: "0.85rem" }}>
              <input
                type="checkbox"
                checked={mode.genres.has(genre.id)}
                onChange={() => mode.toggleGenre(genre.id)}
              />{" "}
              {genre.label[lang]}
            </label>
          ))}
        </div>
      </div>

      <SingleSelect
        label={c.settingLabel}
        options={SETTINGS}
        value={mode.setting}
        onChange={mode.setSetting}
        anyLabel={t.common.any}
        lang={lang}
      />
      <SingleSelect
        label={c.roleLabel}
        options={ROLES}
        value={mode.role}
        onChange={mode.setRole}
        anyLabel={t.common.any}
        lang={lang}
      />
      <SingleSelect
        label={c.playStyleLabel}
        options={PLAY_STYLES}
        value={mode.playStyle}
        onChange={mode.setPlayStyle}
        anyLabel={t.common.any}
        lang={lang}
      />
      <SingleSelect
        label={c.nickStyleLabel}
        options={NICK_STYLES}
        value={mode.nickStyle}
        onChange={mode.setNickStyle}
        anyLabel={t.common.any}
        lang={lang}
      />

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <div>{t.common.lengthLabel}</div>
        <select value={mode.length} onChange={(e) => mode.setLength(e.target.value as LengthPreference | "")}>
          <option value="">{t.common.lengthOptions.any}</option>
          <option value="short">{t.common.lengthOptions.short}</option>
          <option value="medium">{t.common.lengthOptions.medium}</option>
          <option value="long">{t.common.lengthOptions.long}</option>
        </select>
      </label>

      <AdditionalWordsInput
        value={mode.additionalWordsRaw}
        onChangeValue={mode.setAdditionalWordsRaw}
        issues={mode.additionalWordsIssues}
        t={t}
      />

      <label style={{ display: "block", marginBottom: "1rem" }}>
        <input type="checkbox" checked={mode.useNumbers} onChange={(e) => mode.setUseNumbers(e.target.checked)} />{" "}
        {t.common.addNumbers}
      </label>

      <ClassicOptionsSection
        t={t}
        value={mode.classic.state}
        onChange={mode.classic.setState}
        baseWordIssues={mode.classic.baseWordIssues}
      />
    </div>
  );
}
