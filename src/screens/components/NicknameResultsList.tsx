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
      <button type="button" onClick={onGenerate}>
        {results.length === 0 ? t.common.generate : t.common.generateMore}
      </button>

      {results.length === 0 && emptyHint && (
        <p style={{ color: "#666", marginTop: "0.75rem" }}>{emptyHint}</p>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {results.map((nickname) => (
            <li
              key={nickname.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.4rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <code style={{ fontSize: "1rem" }}>{nickname.value}</code>
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
