import type { GeneratedInvisibleNickname } from "../../domain/invisible";
import type { Translations } from "../../i18n/translations";
import { CopyButton } from "./CopyButton";
import { EmptyStateCard } from "./EmptyStateCard";

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

      {results.length === 0 && (
        <EmptyStateCard
          title={t.invisible.emptyStateTitle}
          description={t.invisible.hint}
          blankExampleCount={3}
          blankCaption={t.invisible.blankExampleCaption}
        />
      )}

      {results.length > 0 && (
        <div className="results-grid">
          {results.map((nickname) => (
            <div key={nickname.value} className="result-card">
              <code className="result-card__value result-code-box">{nickname.value}</code>
              <div className="result-card__badges">
                <span className="badge">{t.invisible.types[nickname.type]}</span>
              </div>
              <p className="result-meta">
                {t.invisible.resultCaption(nickname.value.length)}
                <br />
                {t.invisible.charactersUsedLabel}:{" "}
                {nickname.characters.map((c) => `${c.name} (${c.codepoint})`).join(" + ")}
              </p>
              <div className="result-card__footer">
                <CopyButton
                  value={nickname.value}
                  copied={copiedValue === nickname.value}
                  onCopy={onCopy}
                  copyLabel={t.common.copy}
                  copiedLabel={t.common.copied}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
