/**
 * Firebase Analytics — тонкая обёртка (Task.md §31).
 *
 * Firebase-модули подгружаются динамическим `import()` только если конфиг
 * из окружения присутствует (см. `firebaseConfig.ts`) — пока к проекту не
 * подключён реальный Firebase-проект, код Firebase вообще не попадает в
 * загружаемый бандл на этом пути, а `trackEvent` тихо no-op'ается (в dev —
 * с логом в консоль, чтобы разработчик видел, что событие "ушло бы").
 *
 * Инициализация — ленивая и однократная (важно для SPA: `trackEvent`
 * может быть вызван до того, как страница успела что-либо загрузить).
 */
import type { Analytics } from "firebase/analytics";
import { readFirebaseConfigFromEnv } from "./firebaseConfig";
import type { AnalyticsEvent } from "./events";

interface AnalyticsHandle {
  analytics: Analytics;
  logEvent: typeof import("firebase/analytics").logEvent;
}

let cachedHandle: AnalyticsHandle | null = null;
let initPromise: Promise<AnalyticsHandle | null> | null = null;

async function ensureInitialized(): Promise<AnalyticsHandle | null> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const config = readFirebaseConfigFromEnv();
    if (!config) {
      if (import.meta.env.DEV) {
        console.info(
          "[analytics] VITE_FIREBASE_* env vars are not set — Firebase Analytics stays disabled (events are logged locally only).",
        );
      }
      return null;
    }

    try {
      const [{ initializeApp }, { getAnalytics, isSupported, logEvent }] = await Promise.all([
        import("firebase/app"),
        import("firebase/analytics"),
      ]);

      const supported = await isSupported();
      if (!supported) {
        console.warn("[analytics] Firebase Analytics is not supported in this browser environment.");
        return null;
      }

      const app = initializeApp(config);
      const analytics = getAnalytics(app);
      cachedHandle = { analytics, logEvent };
      return cachedHandle;
    } catch (error) {
      console.warn("[analytics] Failed to initialize Firebase Analytics — events will not be sent.", error);
      return null;
    }
  })();

  return initPromise;
}

/**
 * Отправляет одно аналитическое событие. Fire-and-forget: вызывающий код
 * никогда не должен ждать или падать из-за аналитики (генерация ника не
 * должна зависеть от Firebase).
 */
export function trackEvent(event: AnalyticsEvent): void {
  void (async () => {
    const handle = await ensureInitialized();
    const params = "params" in event ? event.params : undefined;
    if (handle) {
      handle.logEvent(handle.analytics, event.name, params);
    } else if (import.meta.env.DEV) {
      console.debug("[analytics:stub]", event.name, params ?? {});
    }
  })();
}
