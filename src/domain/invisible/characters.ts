/**
 * Стартовый набор символов для Invisible Nickname — Task.md §20–§22,
 * SEMANTIC_GAME_PARAMETER_BASE.md §21 ("Не считать любой Unicode-символ
 * универсально поддерживаемым").
 *
 * Это НЕ каталог конкретных игр (§22: "создание базы конкретных игр не
 * является обязательным требованием MVP") — только несколько символов с
 * известными, но не гарантированными на 100% свойствами.
 *
 * Символы заданы через `String.fromCharCode(0x....)`, а не как литеральные
 * символы прямо в исходнике: несколько кандидатов ниже (особенно варианты
 * пробела) визуально неотличимы друг от друга и от обычного пробела в любом
 * редакторе, поэтому литералом их легко перепутать. Явный hex-код исключает
 * этот риск и не зависит от кодировки файла.
 *
 *  - Оба "бланк"-глифа ниже относятся к категории Unicode "буква"/"символ",
 *    а не "пробел" (Zs) — поэтому большинство `trim()`-подобных функций на
 *    стороне платформы их НЕ удаляет, в отличие от обычного пробела или
 *    ZERO WIDTH SPACE (которые многие поля обрезают, что и запрещает
 *    полагаться на них здесь).
 *  - Это не гарантия работы на конкретной платформе — платформы вправе
 *    нормализовать Unicode, запрещать визуально пустые значения или в
 *    принципе не поддерживать шрифт для символа (§22).
 */

export interface InvisibleCharacterInfo {
  char: string;
  codepoint: string;
  name: string;
  /** Короткая техническая оговорка — НЕ гарантия совместимости. */
  note: string;
}

/** "Бланк"-глифы: в поддерживающих шрифтах рендерятся полностью пусто. */
export const BLANK_GLYPHS: readonly InvisibleCharacterInfo[] = [
  {
    char: String.fromCharCode(0x3164),
    codepoint: "U+3164",
    name: "HANGUL FILLER",
    note: "Категория Unicode — буква, не пробел: обычно переживает trim() на стороне платформы.",
  },
  {
    char: String.fromCharCode(0x2800),
    codepoint: "U+2800",
    name: "BRAILLE PATTERN BLANK",
    note: "Тоже не пробел по категории Unicode, но в шрифтах без поддержки Braille может отрисоваться как заглушка.",
  },
];

/** Минимальные видимые символы — добавляются, чтобы результат не выглядел
 * platform-side как «пустое значение» (§22). */
export const MINIMAL_VISIBLE_MARKS: readonly InvisibleCharacterInfo[] = [
  {
    char: String.fromCharCode(0x00b7),
    codepoint: "U+00B7",
    name: "MIDDLE DOT",
    note: "Едва заметная точка по центру строки.",
  },
  {
    char: String.fromCharCode(0x2024),
    codepoint: "U+2024",
    name: "ONE DOT LEADER",
    note: "Очень маленькая точка внизу строки.",
  },
];

/** Варианты пробелов разной ширины — категория Unicode Zs (пробел), поэтому
 * могут обрезаться по краям строки, но создают видимые "разрывы" внутри неё. */
export const SPACE_VARIANTS: readonly InvisibleCharacterInfo[] = [
  { char: String.fromCharCode(0x2002), codepoint: "U+2002", name: "EN SPACE", note: "Пробел шириной в половину кегля." },
  { char: String.fromCharCode(0x2003), codepoint: "U+2003", name: "EM SPACE", note: "Пробел шириной в кегль." },
  { char: String.fromCharCode(0x2009), codepoint: "U+2009", name: "THIN SPACE", note: "Очень узкий пробел." },
  {
    char: String.fromCharCode(0x2005),
    codepoint: "U+2005",
    name: "FOUR-PER-EM SPACE",
    note: "Узкий пробел (1/4 кегля).",
  },
];
