import { useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "./languageContextInstance";
import { TRANSLATIONS, type Lang } from "./translations";

const STORAGE_KEY = "nextag-gamer:lang";

/**
 * Определение языка при первом запуске (Task.md §24): сохранённый выбор
 * приоритетнее системного языка устройства; если ни того, ни другого нет —
 * английский по умолчанию. Определение системного языка — best-effort
 * через `navigator.language`, доступный в любом браузере (§24: "если
 * технология приложения это позволяет").
 */
function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ru") return stored;
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — используем детект по браузеру.
  }
  const systemLang = typeof navigator !== "undefined" ? navigator.language : "en";
  return systemLang.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Сохранить выбор не удалось (например, localStorage заблокирован) —
      // язык всё равно переключается для текущей сессии.
    }
  }

  const value = useMemo<LanguageContextValue>(() => ({ lang, t: TRANSLATIONS[lang], setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
