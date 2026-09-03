import type { InvisibleNicknameType } from "../../domain/invisible";
import type { Translations } from "../../i18n/translations";
import type { useInvisibleNickname } from "../hooks/useInvisibleNickname";
import { GenerateButton } from "./GenerateButton";
import { ResetSettingsButton } from "./ResetSettingsButton";

interface InvisibleControlsProps {
  mode: ReturnType<typeof useInvisibleNickname>;
  t: Translations;
  onGenerate: () => void;
}

const TYPES: InvisibleNicknameType[] = ["fully_invisible", "almost_invisible", "spaced"];
const MIN_REPEAT = 1;
const MAX_REPEAT = 10;

/**
 * Настройки Invisible Nickname (Task.md §20–§21): выбрать тип, задать
 * длину. Обязательная оговорка о совместимости (§22) показана здесь же —
 * пользователь должен увидеть её до генерации, а не только в результате.
 */
export function InvisibleControls({ mode, t, onGenerate }: InvisibleControlsProps) {
  const i = t.invisible;

  return (
    <div>
      <div className="panel-header">
        <h2>{t.modes.invisible}</h2>
        <ResetSettingsButton onReset={mode.resetSettings} t={t} />
      </div>
      <p className="field-hint">{i.hint}</p>

      <label className="field">
        <span className="field-label">{i.typeLabel}</span>
        <select value={mode.type} onChange={(e) => mode.setType(e.target.value as InvisibleNicknameType)}>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {i.types[type]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">
          {i.repeatCountLabel}: {mode.repeatCount}
        </span>
        <input
          type="range"
          min={MIN_REPEAT}
          max={MAX_REPEAT}
          value={mode.repeatCount}
          onChange={(e) => mode.setRepeatCount(Number(e.target.value))}
        />
      </label>

      <p className="notice-warning">⚠️ {i.compatibilityNotice}</p>

      <GenerateButton hasResults={mode.results.length > 0} onGenerate={onGenerate} t={t} />
    </div>
  );
}
