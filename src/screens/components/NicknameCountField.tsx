import type { Translations } from "../../i18n/translations";
import { MAX_NICKNAME_COUNT, MIN_NICKNAME_COUNT } from "../hooks/nicknameCount";

interface NicknameCountFieldProps {
  value: number;
  onChange: (value: number) => void;
  t: Translations;
}

/** Видимое поле "количество ников" — под всеми остальными настройками,
 * не спрятано в свёрнутые блоки. Общее для Quick и Custom Nickname. */
export function NicknameCountField({ value, onChange, t }: NicknameCountFieldProps) {
  return (
    <label className="field">
      <span className="field-label">
        {t.common.countLabel}: {value}
      </span>
      <input
        type="range"
        min={MIN_NICKNAME_COUNT}
        max={MAX_NICKNAME_COUNT}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
