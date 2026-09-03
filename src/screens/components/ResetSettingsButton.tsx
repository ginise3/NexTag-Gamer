import type { Translations } from "../../i18n/translations";

interface ResetSettingsButtonProps {
  onReset: () => void;
  t: Translations;
}

/**
 * Сброс настроек текущего режима к значениям по умолчанию — доступен
 * всегда, в том числе до первого ввода: без этого при возврате в панель
 * после генерации там остаются старые значения, и ввести новые можно
 * только вручную стерев их одно за другим.
 */
export function ResetSettingsButton({ onReset, t }: ResetSettingsButtonProps) {
  return (
    <button type="button" className="reset-btn" onClick={onReset}>
      {t.common.resetSettings}
    </button>
  );
}
