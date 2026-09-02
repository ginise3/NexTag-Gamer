import type { GeneratedInvisibleNickname } from "../../domain/invisible";
import type { Translations } from "../../i18n/translations";

interface InvisibleResultsListProps {
  results: readonly GeneratedInvisibleNickname[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
  onGenerate: () => void;
  t: Translations;
}

/**
 * Результаты Invisible Nickname. Сам `value` по построению не виден на
 * экране (в этом весь смысл режима) — поэтому под каждым результатом
 * показывается состав использованных символов (codepoints), чтобы
 * пользователь мог убедиться, что результат вообще не пустой (Task.md §22:
 * не всё, что выглядит пустым, действительно пусто технически).
 */
export function InvisibleResultsList({ results, copiedValue, onCopy, onGenerate, t }: InvisibleResultsListProps) {
  return (
    <>
      <button type="button" className="btn-primary" onClick={onGenerate}>
        {results.length === 0 ? t.common.generate : t.common.generateMore}
      </button>

      {results.length > 0 && (
        <ul className="results-list">
          {results.map((nickname) => (
            <li key={nickname.value} className="result-row">
              <code className="result-code-box">{nickname.value}</code>
              <div className="result-meta">
                <div>{t.invisible.resultCaption(nickname.value.length)}</div>
                <div>
                  {t.invisible.charactersUsedLabel}:{" "}
                  {nickname.characters.map((c) => `${c.name} (${c.codepoint})`).join(" + ")}
                </div>
              </div>
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
