import type { Translations } from "../../i18n/translations";

interface GenerateButtonProps {
  hasResults: boolean;
  onGenerate: () => void;
  t: Translations;
}

/** Кнопка Generate/Generate more — низ панели настроек в сайдбаре
 * (Task.md §18–§19). Общая для всех трёх режимов. */
export function GenerateButton({ hasResults, onGenerate, t }: GenerateButtonProps) {
  return (
    <button type="button" className="btn-primary generate-btn" onClick={onGenerate}>
      {hasResults ? t.common.generateMore : t.common.generate}
    </button>
  );
}
