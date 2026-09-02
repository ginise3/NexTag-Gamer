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

  const quick = useQuickNickname(t, lang);
  const custom = useCustomNickname(t, lang);
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
    <div className="app-shell">
      <aside className="sidebar">
        <label className="field">
          <span className="field-label">{t.language}</span>
          <select value={lang} onChange={(e) => handleLanguageChange(e.target.value as Lang)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </label>

        <div className="mode-tabs">
          <button type="button" className="mode-tab" onClick={() => setMode("quick")} disabled={mode === "quick"}>
            {t.modes.quick}
          </button>
          <button type="button" className="mode-tab" onClick={() => setMode("custom")} disabled={mode === "custom"}>
            {t.modes.custom}
          </button>
          <button
            type="button"
            className="mode-tab"
            onClick={() => setMode("invisible")}
            disabled={mode === "invisible"}
          >
            {t.modes.invisible}
          </button>
        </div>

        {mode === "quick" && <QuickControls mode={quick} t={t} lang={lang} />}
        {mode === "custom" && <CustomControls mode={custom} t={t} lang={lang} />}
        {mode === "invisible" && <InvisibleControls mode={invisible} t={t} />}
      </aside>

      <main className="main-content">
        <h1>NexTag Gamer</h1>
        <p className="app-tagline">{t.appTagline}</p>

        {mode === "quick" && (
          <NicknameResultsList
            results={quick.results}
            copiedValue={quick.copiedValue}
            onCopy={quick.copy}
            onGenerate={quick.handleGenerate}
            t={t}
            emptyHint={t.quick.hint}
            batchBadges={quick.badges}
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
            batchBadges={custom.badges}
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
