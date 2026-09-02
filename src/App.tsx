import { useEffect, useState } from "react";
import "./App.css";
import { trackAppOpen, trackLanguageSelected } from "./analytics";
import { CustomControls } from "./screens/components/CustomControls";
import { InvisibleControls } from "./screens/components/InvisibleControls";
import { InvisibleResultsList } from "./screens/components/InvisibleResultsList";
import { NicknameResultsList } from "./screens/components/NicknameResultsList";
import { QuickControls } from "./screens/components/QuickControls";
import { useCustomNickname } from "./screens/hooks/useCustomNickname";
import { useInvisibleNickname } from "./screens/hooks/useInvisibleNickname";
import { useQuickNickname } from "./screens/hooks/useQuickNickname";
import { LanguageProvider } from "./i18n/LanguageContext";
import { useLanguage } from "./i18n/useLanguage";
import type { Lang } from "./i18n/translations";

type Mode = "quick" | "custom" | "invisible";

const SIDEBAR_WIDTH = 300;

/**
 * Сайдбар (все настройки ввода) + основная область (приветственный блок и
 * результаты) — по продуктовому решению, компоновка похожа на прежний
 * Streamlit-интерфейс. Реализовано по этапам Task.md §43: каноническая
 * модель параметров, SemanticProfile, normalizer, генератор с несколькими
 * механизмами, Validator (`src/domain`), Quick/Custom/Invisible Nickname,
 * RU/EN локализация (`src/i18n`).
 */
function AppShell() {
  const { lang, t, setLang } = useLanguage();
  const [mode, setMode] = useState<Mode>("quick");

  const quick = useQuickNickname();
  const custom = useCustomNickname();
  const invisible = useInvisibleNickname();

  // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно один раз за сессию (Task.md §32 app_open)
  useEffect(() => {
    trackAppOpen();
  }, []);

  function handleLanguageChange(next: Lang) {
    setLang(next);
    trackLanguageSelected(next);
  }

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
          <select value={lang} onChange={(e) => handleLanguageChange(e.target.value as Lang)}>
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
          <button type="button" onClick={() => setMode("invisible")} disabled={mode === "invisible"}>
            {t.modes.invisible}
          </button>
        </div>

        {mode === "quick" && <QuickControls mode={quick} t={t} lang={lang} />}
        {mode === "custom" && <CustomControls mode={custom} t={t} lang={lang} />}
        {mode === "invisible" && <InvisibleControls mode={invisible} t={t} />}
      </aside>

      <main style={{ flex: 1, padding: "2rem 2.5rem", maxWidth: 720 }}>
        <h1 style={{ marginTop: 0 }}>NexTag Gamer</h1>
        <p style={{ color: "#666" }}>{t.appTagline}</p>

        {mode === "quick" && (
          <NicknameResultsList
            results={quick.results}
            copiedValue={quick.copiedValue}
            onCopy={quick.copy}
            onGenerate={quick.handleGenerate}
            t={t}
          />
        )}
        {mode === "custom" && (
          <NicknameResultsList
            results={custom.results}
            copiedValue={custom.copiedValue}
            onCopy={custom.copy}
            onGenerate={custom.handleGenerate}
            t={t}
            emptyHint={t.custom.emptyHint}
          />
        )}
        {mode === "invisible" && (
          <InvisibleResultsList
            results={invisible.results}
            copiedValue={invisible.copiedValue}
            onCopy={invisible.copy}
            onGenerate={invisible.handleGenerate}
            t={t}
          />
        )}
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
