import { useState } from "react";
import { NICK_STYLES } from "../domain/data";
import { generateNicknames, type GeneratedNickname } from "../domain/generator";
import { createEmptySemanticProfile, type LengthPreference } from "../domain/types";

/**
 * Режим Quick Nickname (Task.md §5): результат должен быть доступен
 * практически одним действием, без обязательного заполнения параметров.
 * Настройки ниже — необязательные (§5.2) и не блокируют генерацию (§5.3).
 */
const LENGTH_OPTIONS: { value: LengthPreference | ""; label: string }[] = [
  { value: "", label: "Any length" },
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const RESULTS_PER_GENERATION = 8;
const COPY_FEEDBACK_MS = 1500;

export function QuickNickname() {
  const [nickStyle, setNickStyle] = useState<string>("");
  const [length, setLength] = useState<LengthPreference | "">("");
  const [useNumbers, setUseNumbers] = useState(false);

  const [results, setResults] = useState<GeneratedNickname[]>([]);
  const [shownValues, setShownValues] = useState<string[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  function handleGenerate() {
    const profile = {
      ...createEmptySemanticProfile(),
      nickStyle: nickStyle || undefined,
      length: length || undefined,
    };
    const next = generateNicknames(profile, {
      count: RESULTS_PER_GENERATION,
      useNumbers,
      previousResults: shownValues,
    });
    setResults(next);
    setShownValues((prev) => [...prev, ...next.map((r) => r.value)]);
  }

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue((current) => (current === value ? null : current)), COPY_FEEDBACK_MS);
    } catch {
      // Clipboard API недоступен (например, небезопасный контекст) —
      // молча игнорируем, пользователь может скопировать текст вручную.
    }
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Quick Nickname</h2>
      <p style={{ color: "#666" }}>Optional settings — leave everything as is and just press Generate.</p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <label>
          Nick Style{" "}
          <select value={nickStyle} onChange={(e) => setNickStyle(e.target.value)}>
            <option value="">Any</option>
            {NICK_STYLES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label.en}
              </option>
            ))}
          </select>
        </label>

        <label>
          Length{" "}
          <select value={length} onChange={(e) => setLength(e.target.value as LengthPreference | "")}>
            {LENGTH_OPTIONS.map((option) => (
              <option key={option.value || "any"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> Add
          numbers
        </label>
      </div>

      <button type="button" onClick={handleGenerate}>
        {results.length === 0 ? "Generate" : "Generate more"}
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
                padding: "0.4rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <code style={{ fontSize: "1rem" }}>{nickname.value}</code>
              <button type="button" onClick={() => handleCopy(nickname.value)}>
                {copiedValue === nickname.value ? "Copied!" : "Copy"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
