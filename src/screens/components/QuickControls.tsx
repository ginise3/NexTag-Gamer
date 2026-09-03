import { NICK_STYLES } from "../../domain/data";
import type { LengthPreference } from "../../domain/types";
import type { Lang, Translations } from "../../i18n/translations";
import type { useQuickNickname } from "../hooks/useQuickNickname";
import { GenerateButton } from "./GenerateButton";
import { NicknameCountField } from "./NicknameCountField";
import { ResetSettingsButton } from "./ResetSettingsButton";

interface QuickControlsProps {
  mode: ReturnType<typeof useQuickNickname>;
  t: Translations;
  lang: Lang;
  onGenerate: () => void;
}

/** Настройки Quick Nickname в сайдбаре (Task.md §5.2 — все необязательные). */
export function QuickControls({ mode, t, lang, onGenerate }: QuickControlsProps) {
  return (
    <div>
      <div className="panel-header">
        <h2>{t.quick.heading}</h2>
        <ResetSettingsButton onReset={mode.resetSettings} t={t} />
      </div>
      <p className="field-hint">{t.quick.hint}</p>

      <label className="field">
        <span className="field-label">{t.quick.nickStyleLabel}</span>
        <select value={mode.nickStyle} onChange={(e) => mode.setNickStyle(e.target.value)}>
          <option value="">{t.common.any}</option>
          {NICK_STYLES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label[lang]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">{t.common.lengthLabel}</span>
        <select value={mode.length} onChange={(e) => mode.setLength(e.target.value as LengthPreference | "")}>
          <option value="">{t.common.lengthOptions.any}</option>
          <option value="short">{t.common.lengthOptions.short}</option>
          <option value="medium">{t.common.lengthOptions.medium}</option>
          <option value="long">{t.common.lengthOptions.long}</option>
        </select>
      </label>

      <label className="checkbox-row">
        <input type="checkbox" checked={mode.useNumbers} onChange={(e) => mode.setUseNumbers(e.target.checked)} />
        {t.common.addNumbers}
      </label>

      <NicknameCountField value={mode.count} onChange={mode.setCount} t={t} />

      <GenerateButton hasResults={mode.results.length > 0} onGenerate={onGenerate} t={t} />
    </div>
  );
}
