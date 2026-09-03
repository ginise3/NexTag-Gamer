/**
 * Тексты интерфейса RU/EN (Task.md §23–§26).
 *
 * Переводятся только строки интерфейса. Не переводятся: канонические ID
 * параметров (хранятся отдельно в `src/domain/data`, а не здесь),
 * пользовательские custom words и сгенерированные ники (§26–§27) — они
 * остаются на английском независимо от выбранного языка интерфейса.
 *
 * RU/EN-подписи для значений стандартных параметров (Genre/Setting/Role/...)
 * уже хранятся вместе с каждым параметром в `src/domain/data/*.ts`
 * (`label.en`/`label.ru`) — здесь дублировать их не нужно.
 */
export type Lang = "en" | "ru";

/** Короткие подписи-бейджи для механизма построения ника (Task.md §16) —
 * чисто презентационные ярлыки на карточке результата, не влияют на логику. */
export type MechanismLabels = {
  word_combination: string;
  word_shortening: string;
  phonetic_modification: string;
  prefix: string;
  suffix: string;
  letter_replacement: string;
  semantic_combination: string;
  custom_keyword_mutation: string;
  compact_form: string;
  multi_word_form: string;
};

export interface Translations {
  appTagline: string;
  language: string;
  openMenu: string;
  closeMenu: string;
  modes: {
    quick: string;
    custom: string;
    invisible: string;
    comingSoon: string;
  };
  common: {
    optional: string;
    any: string;
    generate: string;
    generateMore: string;
    copy: string;
    copied: string;
    addNumbers: string;
    lengthLabel: string;
    lengthOptions: { any: string; short: string; medium: string; long: string };
    leetBadge: string;
    emptyStateTitle: string;
    examplesLabel: string;
  };
  mechanisms: MechanismLabels;
  quick: {
    heading: string;
    hint: string;
    nickStyleLabel: string;
  };
  custom: {
    heading: string;
    hint: string;
    genreLabel: string;
    genreHint: string;
    settingLabel: string;
    roleLabel: string;
    playStyleLabel: string;
    nickStyleLabel: string;
    additionalWordsLabel: string;
    additionalWordsHint: string;
    additionalWordsPlaceholder: string;
    emptyHint: string;
  };
  invisible: {
    hint: string;
    typeLabel: string;
    types: { fully_invisible: string; almost_invisible: string; spaced: string };
    repeatCountLabel: string;
    /** Ровно текст из Task.md §22 — обязательная оговорка о совместимости. */
    compatibilityNotice: string;
    charactersUsedLabel: string;
    resultCaption: (charCount: number) => string;
    emptyStateTitle: string;
    blankExampleCaption: string;
  };
  additionalWordsIssues: {
    cyrillic: (raw: string) => string;
    disallowedCharacters: (raw: string) => string;
    tooLong: (raw: string, max: number) => string;
    tooManyItems: (max: number) => string;
  };
  classicOptions: {
    heading: string;
    hint: string;
    baseWordLabel: string;
    baseWordPlaceholder: string;
    stylePresetLabel: string;
    stylePresetOptions: { random: string; gamer: string; cute: string };
    leetLabel: string;
    countLabel: string;
  };
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    appTagline: "Gamer Nickname Generator",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    modes: {
      quick: "Quick Nick",
      custom: "Custom Nick",
      invisible: "Invisible Nick",
      comingSoon: "coming soon",
    },
    common: {
      optional: "optional",
      any: "Any",
      generate: "Generate",
      generateMore: "Generate more",
      copy: "Copy",
      copied: "Copied!",
      addNumbers: "Add numbers",
      lengthLabel: "Length",
      lengthOptions: { any: "Any length", short: "Short", medium: "Medium", long: "Long" },
      leetBadge: "Leet",
      emptyStateTitle: "No nicknames yet",
      examplesLabel: "Examples",
    },
    mechanisms: {
      word_combination: "Combo",
      word_shortening: "Short",
      phonetic_modification: "Phonetic",
      prefix: "Prefix",
      suffix: "Suffix",
      letter_replacement: "Letters",
      semantic_combination: "Semantic",
      custom_keyword_mutation: "Mutation",
      compact_form: "Compact",
      multi_word_form: "Multi-word",
    },
    quick: {
      heading: "Quick Nick",
      hint: "Optional settings — leave everything as is and just press Generate.",
      nickStyleLabel: "Nick Style",
    },
    custom: {
      heading: "Custom Nick",
      hint: "Describe the nickname you want — every field below is optional, fill in as much or as little as you like.",
      genreLabel: "Genre",
      genreHint: "optional, pick any number",
      settingLabel: "Setting",
      roleLabel: "Role",
      playStyleLabel: "Play Style",
      nickStyleLabel: "Nick Style",
      additionalWordsLabel: "Additional words",
      additionalWordsHint: "optional, English only",
      additionalWordsPlaceholder: "dragon, frost, ancient wolf",
      emptyHint:
        "You can leave everything empty and just press Generate — filling in fields makes the result more personal.",
    },
    invisible: {
      hint: "A separate mode that does not use the Genre/Setting/Role/... profile — pick a type and press Generate.",
      typeLabel: "Type",
      types: {
        fully_invisible: "Fully invisible",
        almost_invisible: "Almost invisible",
        spaced: "Spaced",
      },
      repeatCountLabel: "Length",
      compatibilityNotice: "Compatibility depends on the game or platform.",
      charactersUsedLabel: "Characters used",
      resultCaption: (charCount) => `${charCount} character${charCount === 1 ? "" : "s"} — looks blank above`,
      emptyStateTitle: "Nothing generated yet",
      blankExampleCaption: "These will look empty too — that's the point.",
    },
    additionalWordsIssues: {
      cyrillic: (raw) => `"${raw}" — please enter custom words in English only.`,
      disallowedCharacters: (raw) =>
        `"${raw}" contains characters that aren't supported (letters, digits, spaces, "-", "'" only).`,
      tooLong: (raw, max) => `"${raw}" is too long (max ${max} characters).`,
      tooManyItems: (max) => `Only the first ${max} words/phrases were used — the rest were ignored.`,
    },
    classicOptions: {
      heading: "Classic style options",
      hint: "Optional extras carried over from the earlier generator.",
      baseWordLabel: "Base word or name",
      baseWordPlaceholder: "e.g. Alex",
      stylePresetLabel: "Style preset",
      stylePresetOptions: { random: "Random", gamer: "Gamer", cute: "Cute" },
      leetLabel: "Leet-speak (a → 4, o → 0, etc.)",
      countLabel: "Number of nicknames",
    },
  },
  ru: {
    appTagline: "Генератор игровых ников",
    language: "Язык",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    modes: {
      quick: "Быстрый ник",
      custom: "Индивидуальный ник",
      invisible: "Невидимый ник",
      comingSoon: "скоро",
    },
    common: {
      optional: "необязательно",
      any: "Любой",
      generate: "Сгенерировать",
      generateMore: "Сгенерировать ещё",
      copy: "Скопировать",
      copied: "Скопировано!",
      addNumbers: "Добавлять числа",
      lengthLabel: "Длина",
      lengthOptions: { any: "Любая длина", short: "Короткая", medium: "Средняя", long: "Длинная" },
      leetBadge: "Leet",
      emptyStateTitle: "Пока нет ни одного ника",
      examplesLabel: "Примеры",
    },
    mechanisms: {
      word_combination: "Комбо",
      word_shortening: "Кратко",
      phonetic_modification: "Фонетика",
      prefix: "Префикс",
      suffix: "Суффикс",
      letter_replacement: "Замена букв",
      semantic_combination: "Семантика",
      custom_keyword_mutation: "Мутация",
      compact_form: "Компакт",
      multi_word_form: "Из двух слов",
    },
    quick: {
      heading: "Быстрый ник",
      hint: "Необязательные настройки — можно ничего не менять и просто нажать «Сгенерировать».",
      nickStyleLabel: "Стиль ника",
    },
    custom: {
      heading: "Индивидуальный ник",
      hint: "Опишите нужный вам ник — каждое поле ниже необязательно, заполните столько, сколько хотите.",
      genreLabel: "Жанр",
      genreHint: "необязательно, можно выбрать несколько",
      settingLabel: "Сеттинг",
      roleLabel: "Роль",
      playStyleLabel: "Стиль игры",
      nickStyleLabel: "Стиль ника",
      additionalWordsLabel: "Дополнительные слова",
      additionalWordsHint: "необязательно, только на английском",
      additionalWordsPlaceholder: "dragon, frost, ancient wolf",
      emptyHint:
        "Можно оставить всё пустым и просто нажать «Сгенерировать» — заполнение полей делает результат более персональным.",
    },
    invisible: {
      hint: "Отдельный режим, не использующий профиль Genre/Setting/Role/... — выберите тип и нажмите «Сгенерировать».",
      typeLabel: "Тип",
      types: {
        fully_invisible: "Полностью невидимый",
        almost_invisible: "Почти невидимый",
        spaced: "С пробелами",
      },
      repeatCountLabel: "Длина",
      compatibilityNotice: "Совместимость зависит от игры или платформы.",
      charactersUsedLabel: "Использованные символы",
      resultCaption: (charCount) => `${charCount} симв. — сверху выглядит пустым`,
      emptyStateTitle: "Пока ничего не сгенерировано",
      blankExampleCaption: "Результат тоже будет выглядеть пустым — в этом весь смысл.",
    },
    additionalWordsIssues: {
      cyrillic: (raw) => `«${raw}» — дополнительные слова нужно вводить только на английском языке.`,
      disallowedCharacters: (raw) =>
        `«${raw}» содержит недопустимые символы (только буквы, цифры, пробел, "-", "'").`,
      tooLong: (raw, max) => `«${raw}» слишком длинное (максимум ${max} символов).`,
      tooManyItems: (max) => `Учтены только первые ${max} слов/фраз — остальные проигнорированы.`,
    },
    classicOptions: {
      heading: "Классические опции стиля",
      hint: "Необязательные допопции, перенесённые из прежнего генератора.",
      baseWordLabel: "Слово или имя для основы",
      baseWordPlaceholder: "например, Alex",
      stylePresetLabel: "Пресет стиля",
      stylePresetOptions: { random: "Случайный", gamer: "Геймерский", cute: "Милый" },
      leetLabel: "Leet-speak (а → 4, о → 0 и т.д.)",
      countLabel: "Количество ников",
    },
  },
};
