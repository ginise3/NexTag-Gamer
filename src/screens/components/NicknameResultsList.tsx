import type { GeneratedNickname } from "../../domain/generator";
import type { Translations } from "../../i18n/translations";
import { CopyButton } from "./CopyButton";
import { EmptyStateCard } from "./EmptyStateCard";

interface NicknameResultsListProps {
  results: readonly GeneratedNickname[];
  copiedValue: string | null;
  onCopy: (value: string) => void;
  t: Translations;
  emptyHint?: string;
  /** Бейджи, общие для всей выдачи (выбранный Nick Style) — показываются на
   * каждой карточке в дополнение к бейджу конкретного механизма построения
   * (Task.md §16). */
  batchBadges?: readonly string[];
}

/** Иллюстративные примеры для приветственной карточки — не результаты
 * генерации, просто наглядные образцы (Task.md §26/§27: ники — на английском). */
const EXAMPLE_NICKNAMES = ["ShadowWolf", "Nox_Frost77", "IceVex", "DragonCore"];

/** Сетка карточек результатов (Task.md §18–§19). Кнопка Generate/Generate
 * more живёт в сайдбаре, под настройками текущего режима — см. `GenerateButton`. */
export function NicknameResultsList({
  results,
  copiedValue,
  onCopy,
  t,
  emptyHint,
  batchBadges = [],
}: NicknameResultsListProps) {
  if (results.length === 0) {
    return (
      <EmptyStateCard
        title={t.common.emptyStateTitle}
        description={emptyHint ?? ""}
        examplesLabel={t.common.examplesLabel}
        examples={EXAMPLE_NICKNAMES}
      />
    );
  }

  return (
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
  );
}
