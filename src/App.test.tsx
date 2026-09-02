/**
 * @vitest-environment jsdom
 *
 * Реальный рендер-тест на баг-репорт: "при выборе языка (RU или EN)
 * интерфейс всё равно остаётся на русском". Раньше это проверялось только
 * чтением кода — здесь фактически рендерим <App /> и переключаем язык, как
 * это делает пользователь.
 */
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import App from "./App";
import { TRANSLATIONS } from "./i18n/translations";

// Без globals:true в vite.config.ts RTL не находит глобальный afterEach
// автоматически — регистрируем очистку DOM между тестами явно, иначе
// рендеры из предыдущих it() накапливаются в document.body.
afterEach(cleanup);

// appTagline рендерится ровно один раз (в <main>) — надёжный маркер того,
// на каком языке сейчас интерфейс, в отличие от строк вроде "Быстрый ник",
// которые легитимно повторяются (вкладка режима + заголовок панели).
const ruTagline = TRANSLATIONS.ru.appTagline;
const enTagline = TRANSLATIONS.en.appTagline;

beforeAll(() => {
  // jsdom не реализует matchMedia — App.tsx вызывает его безусловно при
  // монтировании (детект мобильного брейкпоинта).
  window.matchMedia =
    window.matchMedia ||
    ((query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList);

  // Node 22+ подмешивает собственный экспериментальный глобальный
  // localStorage (см. предупреждение "--localstorage-file was provided
  // without a valid path"), который перебивает нормальную jsdom-реализацию
  // и не имеет рабочих setItem/clear. Подменяем простым in-memory моком —
  // это чинит только тестовое окружение, приложения не касается.
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
  };
  // Переопределяем на globalThis (не только window) — код приложения
  // (LanguageContext.tsx) обращается к `localStorage` как к голому
  // глобальному идентификатору, не через `window.localStorage`.
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: mockStorage });
  Object.defineProperty(window, "localStorage", { configurable: true, value: mockStorage });
});

/**
 * Языковой `<select>` — первый select в документе (рендерится в сайдбаре
 * раньше вкладок режимов и полей текущего режима). На странице есть и
 * другие select'ы (Nick Style, Length и т.д.), поэтому находим именно этот
 * по позиции в DOM, а не по accessible name (вычисление accessible name у
 * `<select>` внутри `<label>` в связке jsdom+testing-library ненадёжно —
 * подтягивает текст вложенных `<option>`).
 */
function getLanguageSelect(container: HTMLElement): HTMLSelectElement {
  return container.querySelectorAll("select")[0] as HTMLSelectElement;
}

describe("App — language switch actually re-renders the UI", () => {
  it("shows Russian by default when the system/stored language is 'ru'", () => {
    window.localStorage.setItem("nextag-gamer:lang", "ru");
    const { container } = render(<App />);
    expect(getLanguageSelect(container)).toHaveValue("ru");
    expect(screen.getByText(ruTagline)).toBeInTheDocument();
    window.localStorage.clear();
  });

  it("switches every visible string to English when 'English' is selected", () => {
    window.localStorage.setItem("nextag-gamer:lang", "ru");
    const { container } = render(<App />);

    const select = getLanguageSelect(container);
    expect(select).toHaveValue("ru");

    fireEvent.change(select, { target: { value: "en" } });

    expect(select).toHaveValue("en");
    expect(screen.getByText(enTagline)).toBeInTheDocument();
    expect(screen.queryByText(ruTagline)).not.toBeInTheDocument();
    window.localStorage.clear();
  });

  it("switches back to Russian when 'Русский' is selected", () => {
    window.localStorage.setItem("nextag-gamer:lang", "en");
    const { container } = render(<App />);

    const select = getLanguageSelect(container);
    expect(select).toHaveValue("en");

    fireEvent.change(select, { target: { value: "ru" } });

    expect(select).toHaveValue("ru");
    expect(screen.getByText(ruTagline)).toBeInTheDocument();
    expect(screen.queryByText(enTagline)).not.toBeInTheDocument();
    window.localStorage.clear();
  });

  it("shows the language option labels in their own native language, not translated", () => {
    const { container } = render(<App />);
    const select = getLanguageSelect(container);
    expect(within(select).getByText("English")).toBeInTheDocument();
    expect(within(select).getByText("Русский")).toBeInTheDocument();
    window.localStorage.clear();
  });
});
