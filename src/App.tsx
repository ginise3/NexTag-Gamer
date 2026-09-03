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

const MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";

function isMobileViewportNow(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
}

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
  // По умолчанию открыт — на мобильных сайдбар виден сразу при запуске,
  // без обязательного тапа по гамбургеру (продуктовое решение пользователя).
  // На десктопе гамбургер и оверлей скрыты через CSS в любом случае (см.
  // App.css) — но эффекты ниже (блокировка скролла, Escape) всё равно
  // должны учитывать реальную ширину экрана, а не только это состояние,
  // иначе десктоп молча остался бы с заблокированным скроллом навсегда.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(isMobileViewportNow);

  const quick = useQuickNickname(t, lang);
  const custom = useCustomNickname(t, lang);
  const invisible = useInvisibleNickname();

  // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно один раз за сессию (Task.md §32 app_open)
  useEffect(() => {
    trackAppOpen();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    function handleChange(e: MediaQueryListEvent) {
      setIsMobileViewport(e.matches);
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const mobileMenuVisible = mobileMenuOpen && isMobileViewport;

  // Закрытие оверлея по Escape — на мобильных сайдбар открывается поверх
  // контента (не сдвигая его), как гамбургер-меню Streamlit.
  useEffect(() => {
    if (!mobileMenuVisible) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuVisible]);

  // Раньше здесь стоял document.body.style.overflow = "hidden" на время
  // открытой панели. Убрано: `overflow: hidden` на <body> в сочетании с
  // `position: fixed`-панелью — известная проблемная комбинация в iOS
  // Safari, из-за которой находящиеся внутри такой панели нативные
  // элементы форм (в частности <select>) иногда не реагируют на выбор
  // значения как положено. Цена отказа — фон может слегка прокручиваться
  // за затемнением, пока панель открыта; это меньшее зло, чем нерабочий
  // выбор языка.

  function handleLanguageChange(next: Lang) {
    setLang(next);
    trackLanguageSelected(next);
  }

  function selectMode(next: Mode) {
    setMode(next);
    // Раньше здесь панель закрывалась сразу после выбора режима (по
    // аналогии с нав-меню) — но пользователю после переключения режима
    // ещё нужно настроить параметры в той же панели, а не сразу видеть
    // результат. Закрывать должен явно (гамбургер/оверлей/Escape).
  }

  return (
    <div className="app-shell">
      <button
        type="button"
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label={mobileMenuVisible ? t.closeMenu : t.openMenu}
        aria-expanded={mobileMenuVisible}
      >
        {mobileMenuVisible ? "✕" : "☰"}
      </button>

      <div
        className={`sidebar-overlay${mobileMenuVisible ? " sidebar-overlay--visible" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sidebar${mobileMenuVisible ? " sidebar--open" : ""}`}>
        <label className="field">
          <span className="field-label">{t.language}</span>
          <select value={lang} onChange={(e) => handleLanguageChange(e.target.value as Lang)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </label>

        <div className="mode-tabs">
          <button type="button" className="mode-tab" onClick={() => selectMode("quick")} disabled={mode === "quick"}>
            {t.modes.quick}
          </button>
          <button
            type="button"
            className="mode-tab"
            onClick={() => selectMode("custom")}
            disabled={mode === "custom"}
          >
            {t.modes.custom}
          </button>
          <button
            type="button"
            className="mode-tab"
            onClick={() => selectMode("invisible")}
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
