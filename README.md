# NexTag Gamer — Gamer Nickname Generator

Приложение для генерации игровых ников: без каталога конкретных игр,
на основе стандартных игровых параметров (жанр, сеттинг, роль, стиль игры,
стиль ника) и пользовательских английских слов.

Нормативные требования и предметная модель:

- [`Task.md`](./Task.md) — техническое задание.
- [`SEMANTIC_GAME_PARAMETER_BASE.md`](./SEMANTIC_GAME_PARAMETER_BASE.md) — обязательное приложение: канонические параметры, синонимы, семантические группы.
- [`CURRENT_STATE_REPORT.md`](./CURRENT_STATE_REPORT.md) — отчёт аудита (этап 1) и статус реализации по этапам.

## Стек

React + TypeScript + Vite, без отдельного бэкенда (Task.md §34). Развёртывание
предполагается как статический сайт на бесплатном хостинге (Vercel / Netlify /
Cloudflare Pages / GitHub Pages).

## Структура

```
src/
  domain/
    types.ts             # ParameterOption, SemanticProfile, CustomWord, ...
    normalizer.ts         # нормализация пользовательских custom words
    data/                 # каноническая семантическая база (genres, settings,
                           # roles, play_styles, nick_styles, themes, synonyms,
                           # semantic_groups, generation_modifiers)
    __tests__/            # vitest: целостность данных + normalizer
```

## Разработка

```bash
npm install
npm run dev       # локальный сервер разработки
npm run build     # production-сборка (tsc + vite build)
npm run test      # vitest
npm run lint      # oxlint
```

## Статус

MVP реализуется поэтапно (см. `CURRENT_STATE_REPORT.md`, раздел "Рекомендуемый
порядок реализации"). На данный момент готова каноническая модель параметров,
`SemanticProfile` и normalizer пользовательского ввода. Экраны Quick / Custom /
Invisible Nickname — в разработке.
