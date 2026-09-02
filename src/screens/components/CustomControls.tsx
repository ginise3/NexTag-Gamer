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
    <label className="field">
      <span className="field-label">{label}</span>
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
      <h2>{c.heading}</h2>
      <p className="field-hint">{c.hint}</p>

      <div className="field">
        <span className="field-label">
          {c.genreLabel} <span className="field-hint">({c.genreHint})</span>
        </span>
        <div className="genre-grid scroll-list">
          {GENRES.map((genre) => (
            <label key={genre.id}>
              <input type="checkbox" checked={mode.genres.has(genre.id)} onChange={() => mode.toggleGenre(genre.id)} />
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

      <label className="field">
        <span className="field-label">{t.common.lengthLabel}</span>
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

      <label className="checkbox-row">
        <input type="checkbox" checked={mode.useNumbers} onChange={(e) => mode.setUseNumbers(e.target.checked)} />
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
