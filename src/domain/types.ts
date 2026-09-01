/**
 * Канонические типы предметной модели Gamer Nickname Generator.
 *
 * Источник нормативной модели: PRODUCT_TASK.md (см. Task.md в корне проекта)
 * и SEMANTIC_GAME_PARAMETER_BASE.md — обязательное приложение к нему.
 *
 * Все идентификаторы (`id`) — канонические английские ID и не подлежат
 * самостоятельному изменению (Task.md §8, §15, база §4).
 */

/** Локализованная подпись значения для интерфейса (RU/EN). */
export interface LocalizedLabel {
  en: string;
  ru: string;
}

/** Один допустимый вариант стандартного параметра (например, genre=fps). */
export interface ParameterOption {
  /** Канонический английский ID, используемый во внутренней бизнес-логике. */
  id: string;
  /** Локализованные подписи для интерфейса. */
  label: LocalizedLabel;
}

/** Категории стандартных параметров (Task.md §7). */
export type ParameterCategory =
  | "genre"
  | "setting"
  | "role"
  | "play_style"
  | "nick_style";

/** Желаемая длина результата (база §14). */
export type LengthPreference = "short" | "medium" | "long";

/** Группа тематических слов (база §10 CORE THEMES). Слова — исходный
 * английский игровой материал генерации, поэтому не локализуются. */
export interface ThemeGroup {
  id: string;
  label: LocalizedLabel;
  words: readonly string[];
}

/** Правило нормализации синонима в канонический параметр + теги
 * (база §11 SEMANTIC SYNONYMS). */
export interface SynonymRule {
  /** Слова, которые пользователь мог ввести (включая каноническое). */
  synonyms: readonly string[];
  /** К какому стандартному параметру приводится синоним. */
  target: {
    category: Extract<ParameterCategory, "role" | "play_style" | "nick_style">;
    id: string;
  };
  /** Дополнительные семантические теги, которые добавляются в профиль. */
  semanticTags: readonly string[];
}

/** Кросс-игровая семантическая группа (база §13 CROSS-GAME SEMANTIC GROUPS). */
export interface SemanticGroup {
  id: string;
  label: LocalizedLabel;
  /** Входные понятия (значения стандартных параметров/слова), которые
   * активируют эту группу. */
  triggers: readonly string[];
  /** Пул слов, доступный генератору при активной группе. */
  pool: readonly string[];
}

/** Один пользовательский custom word/фраза после нормализации
 * (Task.md §12 Normalizer → Known/Unknown Terms). */
export interface CustomWord {
  /** Как ввёл пользователь, без изменений. */
  raw: string;
  /** Нормализованная форма (trim + lowercase) для сопоставления. */
  normalized: string;
  /** true — слово распознано через словарь/синонимы. */
  known: boolean;
  /** Если known — к какому параметру/группе оно было приведено. */
  resolvedTarget?: {
    category: Extract<ParameterCategory, "role" | "play_style" | "nick_style">;
    id: string;
  };
  /** Дополнительные семантические теги, полученные от известного слова. */
  semanticTags: readonly string[];
}

/**
 * Центральная структура генерации (Task.md §13 Semantic Profile).
 *
 * Ни одно поле, кроме `customWords`/`themes`/`semanticGroups` (пустые массивы
 * по умолчанию), не обязательно — генерация должна работать и с пустым
 * профилем (Task.md §23, база §23 STANDARD PARAMETER SELECTION).
 */
export interface SemanticProfile {
  /** Разрешён выбор нескольких жанров (база §5). */
  genre: readonly string[];
  setting?: string;
  role?: string;
  playStyle?: string;
  nickStyle?: string;
  length?: LengthPreference;
  /** Пользовательские дополнительные слова после нормализации. */
  customWords: readonly CustomWord[];
  /** Темы, полученные из стандартных параметров/синонимов/custom words. */
  themes: readonly string[];
  /** Активные кросс-игровые семантические группы. */
  semanticGroups: readonly string[];
}

/** Пустой профиль — валидный вход для генератора (принцип минимального
 * трения, Task.md §40). */
export function createEmptySemanticProfile(): SemanticProfile {
  return {
    genre: [],
    customWords: [],
    themes: [],
    semanticGroups: [],
  };
}
