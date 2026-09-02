import type { GeneratedNickname } from "../../domain/generator";
import type { Translations } from "../../i18n/translations";
import { CopyButton } from "./CopyButton";
import { EmptyStateCard } from "./EmptyStateCard";

interface NicknameResultsListProps {
  results: readonly GeneratedNickname[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
  onGenerate: () => void;
  t: Translations;
  emptyHint?: string;
  /** Бейджи, общие для всей выдачи (выбранный Nick Style/Style preset,
   * "Leet", если включён) — показываются на каждой карточке в дополнение
   * к бейджу конкретного механизма построения (Task.md §16). */
  batchBadges?: readonly string[];
}

/** Иллюстративные примеры для приветственной карточки — не результаты
 * генерации, просто наглядные образцы (Task.md §26/§27: ники — на английском). */
const EXAMPLE_NICKNAMES = ["ShadowWolf", "Nox_Frost77", "IceVex", "DragonCore"];

/** Сетка карточек результатов + кнопка Generate/Generate more (Task.md §18–§19). */
export function NicknameResultsList({
  results,
  copiedValue,
  onCopy,
  onGenerate,
  t,
  emptyHint,
  batchBadges = [],
}: NicknameResultsListProps) {
  return (
    <>
      <button type="button" className="btn-primary" onClick={onGenerate}>
        {results.length === 0 ? t.common.generate : t.common.generateMore}
      </button>

      {results.length === 0 && (
        <EmptyStateCard
          title={t.common.emptyStateTitle}
          description={emptyHint ?? ""}
          examplesLabel={t.common.examplesLabel}
          examples={EXAMPLE_NICKNAMES}
        />
      )}

      {results.length > 0 && (
        <div className="results-grid">
          {results.map((nickname) => (
            <div key={nickname.value} className="result-card">
              <code className="result-card__value">{nickname.value}</code>
              <div className="result-card__badges">
                <span className="badge">{t.mechanisms[nickname.mechanism]}</span>
                {batchBadges.map((badge) => (
                  <span key={badge} className="badge">
                    {badge}
                  </span>
                ))}
              </div>
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
