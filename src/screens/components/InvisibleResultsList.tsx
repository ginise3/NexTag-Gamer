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
      <button type="button" onClick={onGenerate}>
        {results.length === 0 ? t.common.generate : t.common.generateMore}
      </button>

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {results.map((nickname) => (
            <li
              key={nickname.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <code
                style={{
                  fontSize: "1rem",
                  border: "1px dashed #ccc",
                  borderRadius: 4,
                  padding: "0.15rem 0.6rem",
                  minWidth: "4rem",
                  display: "inline-block",
                }}
              >
                {nickname.value}
              </code>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
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
