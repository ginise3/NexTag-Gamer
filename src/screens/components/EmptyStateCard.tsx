interface EmptyStateCardProps {
  title: string;
  description: string;
  examplesLabel?: string;
  /** Обычные текстовые примеры-плитки (иллюстративные, не результаты
   * генерации — просто наглядные образцы того, что получится). */
  examples?: readonly string[];
  /** Для Invisible Nickname: показать несколько визуально пустых плиток
   * вместо текстовых примеров — сразу понятно, что "пусто" тут ожидаемо. */
  blankExampleCount?: number;
  blankCaption?: string;
}

/** Приветственная карточка-плейсхолдер в основной области до первой
 * генерации — чтобы блок результатов не выглядел "пустым и мёртвым". */
export function EmptyStateCard({
  title,
  description,
  examplesLabel,
  examples,
  blankExampleCount,
  blankCaption,
}: EmptyStateCardProps) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon" aria-hidden="true">
        ✨
      </div>
      <h3>{title}</h3>
      <p className="field-hint">{description}</p>

      {examples && examples.length > 0 && (
        <div className="empty-state-examples">
          {examplesLabel && <div className="empty-state-examples-label">{examplesLabel}</div>}
          <div className="example-chips">
            {examples.map((example) => (
              <code key={example} className="example-chip">
                {example}
              </code>
            ))}
          </div>
        </div>
      )}

      {!!blankExampleCount && blankExampleCount > 0 && (
        <div className="empty-state-examples">
          <div className="example-chips">
            {Array.from({ length: blankExampleCount }, (_, i) => (
              <span key={i} className="example-chip example-chip--blank" />
            ))}
          </div>
          {blankCaption && <p className="field-hint">{blankCaption}</p>}
        </div>
      )}
    </div>
  );
}
