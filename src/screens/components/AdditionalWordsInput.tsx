import { formatCustomWordsIssue } from "../../i18n/formatCustomWordsIssue";
import type { Translations } from "../../i18n/translations";
import type { CustomWordsIssue } from "../../domain/normalizer";

interface AdditionalWordsInputProps {
  value: string;
  onChangeValue: (value: string) => void;
  issues: readonly CustomWordsIssue[];
  t: Translations;
}

/**
 * Поле "Additional words" (Task.md §9–§11): только английский, короткие
 * фразы через запятую/точку с запятой/перенос строки. Кириллица не
 * транслитерируется — пользователю явно сообщается, что нужно ввести
 * английский текст (§11), а не молча отбрасывается или переводится.
 * Плейсхолдер и сами слова остаются на английском в любой локализации
 * интерфейса (§10, §26) — переводится только окружающий текст.
 */
export function AdditionalWordsInput({ value, onChangeValue, issues, t }: AdditionalWordsInputProps) {
  return (
    <label style={{ display: "block", marginBottom: "1rem" }}>
      <div>
        {t.custom.additionalWordsLabel} <span style={{ color: "#999", fontWeight: "normal" }}>({t.custom.additionalWordsHint})</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder={t.custom.additionalWordsPlaceholder}
        rows={2}
        style={{ width: "100%", maxWidth: 420, fontFamily: "inherit" }}
      />
      {issues.length > 0 && (
        <ul style={{ color: "#b3261e", margin: "0.25rem 0 0", paddingLeft: "1.25rem" }}>
          {issues.map((issue, index) => (
            <li key={`${issue.type}-${index}`}>{formatCustomWordsIssue(issue, t)}</li>
          ))}
        </ul>
      )}
    </label>
  );
}
