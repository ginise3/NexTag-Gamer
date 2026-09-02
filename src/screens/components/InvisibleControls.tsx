import type { InvisibleNicknameType } from "../../domain/invisible";
import type { Translations } from "../../i18n/translations";
import type { useInvisibleNickname } from "../hooks/useInvisibleNickname";

interface InvisibleControlsProps {
  mode: ReturnType<typeof useInvisibleNickname>;
  t: Translations;
}

const TYPES: InvisibleNicknameType[] = ["fully_invisible", "almost_invisible", "spaced"];
const MIN_REPEAT = 1;
const MAX_REPEAT = 10;

/**
 * Настройки Invisible Nickname (Task.md §20–§21): выбрать тип, задать
 * длину. Обязательная оговорка о совместимости (§22) показана здесь же —
 * пользователь должен увидеть её до генерации, а не только в результате.
 */
export function InvisibleControls({ mode, t }: InvisibleControlsProps) {
  const i = t.invisible;

  return (
    <div>
      <h2 style={{ fontSize: "1.1rem" }}>{t.modes.invisible}</h2>
      <p style={{ color: "#666", fontSize: "0.85rem" }}>{i.hint}</p>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <div>{i.typeLabel}</div>
        <select value={mode.type} onChange={(e) => mode.setType(e.target.value as InvisibleNicknameType)}>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {i.types[type]}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        <div>
          {i.repeatCountLabel}: {mode.repeatCount}
        </div>
        <input
          type="range"
          min={MIN_REPEAT}
          max={MAX_REPEAT}
          value={mode.repeatCount}
          onChange={(e) => mode.setRepeatCount(Number(e.target.value))}
        />
      </label>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#8a6d00",
          background: "#fff8e1",
          padding: "0.5rem 0.6rem",
          borderRadius: 4,
        }}
      >
        ⚠️ {i.compatibilityNotice}
      </p>
    </div>
  );
}
