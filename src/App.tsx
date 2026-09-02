import { useState } from "react";
import "./App.css";
import { CustomControls } from "./screens/components/CustomControls";
import { NicknameResultsList } from "./screens/components/NicknameResultsList";
import { QuickControls } from "./screens/components/QuickControls";
import { useCustomNickname } from "./screens/hooks/useCustomNickname";
import { useQuickNickname } from "./screens/hooks/useQuickNickname";
import { LanguageProvider } from "./i18n/LanguageContext";
import { useLanguage } from "./i18n/useLanguage";
import type { Lang } from "./i18n/translations";

type Mode = "quick" | "custom";

const SIDEBAR_WIDTH = 300;

/**
 * Сайдбар (все настройки ввода) + основная область (приветственный блок и
 * результаты) — по продуктовому решению, компоновка похожа на прежний
 * Streamlit-интерфейс. Реализовано по этапам Task.md §43: каноническая
 * модель параметров, SemanticProfile, normalizer, генератор с несколькими
 * механизмами, Validator (`src/domain`), Quick/Custom Nickname, RU/EN
 * локализация (`src/i18n`). Invisible Nickname — следующий этап.
 */
function AppShell() {
  const { lang, t, setLang } = useLanguage();
  const [mode, setMode] = useState<Mode>("quick");

  const quick = useQuickNickname();
  const custom = useCustomNickname();
  const active = mode === "quick" ? quick : custom;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif", lineHeight: 1.5 }}>
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          padding: "1.5rem 1.25rem",
          borderRight: "1px solid #e5e5e5",
          overflowY: "auto",
        }}
      >
        <label style={{ display: "block", marginBottom: "1rem" }}>
          <div>{t.language}</div>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setMode("quick")} disabled={mode === "quick"}>
            {t.modes.quick}
          </button>
          <button type="button" onClick={() => setMode("custom")} disabled={mode === "custom"}>
            {t.modes.custom}
          </button>
          <button type="button" disabled title={`${t.modes.invisible} — ${t.modes.comingSoon}`}>
            {t.modes.invisible}
          </button>
        </div>

        {mode === "quick" && <QuickControls mode={quick} t={t} lang={lang} />}
        {mode === "custom" && <CustomControls mode={custom} t={t} lang={lang} />}
      </aside>

      <main style={{ flex: 1, padding: "2rem 2.5rem", maxWidth: 720 }}>
        <h1 style={{ marginTop: 0 }}>NexTag Gamer</h1>
        <p style={{ color: "#666" }}>{t.appTagline}</p>

        <NicknameResultsList
          results={active.results}
          copiedValue={active.copiedValue}
          onCopy={active.copy}
          onGenerate={active.handleGenerate}
          t={t}
          emptyHint={mode === "custom" ? t.custom.emptyHint : undefined}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

export default App;
