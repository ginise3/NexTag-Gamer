/**
 * Конфигурация Firebase из переменных окружения Vite (`VITE_*`).
 *
 * Никаких ключей в репозитории нет и быть не должно — см. `.env.example`
 * (шаблон без значений) и `.gitignore` (`.env*` исключён). Значения задаются
 * локально в `.env` (не коммитится) и в Vercel → Project Settings →
 * Environment Variables, в терминах владельца проекта Firebase.
 *
 * Если хотя бы одно обязательное значение отсутствует — Firebase Analytics
 * не инициализируется вообще (см. `analytics.ts`); это ожидаемое поведение
 * до тех пор, пока к проекту не подключён реальный Firebase-проект, а не
 * ошибка конфигурации.
 */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export function readFirebaseConfigFromEnv(env: ImportMetaEnv = import.meta.env): FirebaseConfig | null {
  const apiKey = env.VITE_FIREBASE_API_KEY;
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  const storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID;
  const appId = env.VITE_FIREBASE_APP_ID;
  const measurementId = env.VITE_FIREBASE_MEASUREMENT_ID;

  // measurementId — обязателен именно для Analytics (не для Firebase вообще).
  if (!apiKey || !projectId || !appId || !measurementId) {
    return null;
  }

  return {
    apiKey,
    authDomain: authDomain ?? "",
    projectId,
    storageBucket: storageBucket ?? "",
    messagingSenderId: messagingSenderId ?? "",
    appId,
    measurementId,
  };
}
