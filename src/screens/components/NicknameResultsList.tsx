import type { GeneratedNickname } from "../../domain/generator";
import type { Translations } from "../../i18n/translations";

interface NicknameResultsListProps {
  results: readonly GeneratedNickname[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
  onGenerate: () => void;
  t: Translations;
  emptyHint?: string;
}

/** Список результатов + кнопка Generate/Generate more (Task.md §18–§19). */
export function NicknameResultsList({ results, copiedValue, onCopy, onGenerate, t, emptyHint }: NicknameResultsListProps) {
  return (
    <>
      <button type="button" className="btn-primary" onClick={onGenerate}>
        {results.length === 0 ? t.common.generate : t.common.generateMore}
      </button>

      {results.length === 0 && emptyHint && <p className="field-hint">{emptyHint}</p>}

      {results.length > 0 && (
        <ul className="results-list">
          {results.map((nickname) => (
            <li key={nickname.value} className="result-row">
              <code>{nickname.value}</code>
              <button type="button" onClick={() => onCopy(nickname.value)}>
                {copiedValue === nickname.value ? t.common.copied : t.common.copy}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
