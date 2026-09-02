/**
 * Именованные функции-обёртки над `trackEvent` — чтобы места вызова в UI не
 * собирали объекты событий вручную и не могли случайно передать лишнее поле
 * (например, сам текст ника).
 */
import { trackEvent } from "./analytics";
import { parameterSelectedEvent, type GenerationMode, type StandardParameterCategory } from "./events";

export function trackAppOpen(): void {
  trackEvent({ name: "app_open" });
}

export function trackLanguageSelected(language: "en" | "ru"): void {
  trackEvent({ name: "language_selected", params: { language } });
}

export function trackGenerationStarted(generationMode: GenerationMode): void {
  trackEvent({ name: "generation_started", params: { generation_mode: generationMode } });
}

export function trackGenerationCompleted(generationMode: GenerationMode, resultCount: number): void {
  trackEvent({ name: "generation_completed", params: { generation_mode: generationMode, result_count: resultCount } });
}

export function trackParameterSelected(category: StandardParameterCategory, value: string): void {
  trackEvent(parameterSelectedEvent(category, value));
}

/** Обезличенный агрегат по custom words (Task.md §33) — НИКОГДА не передавать
 * сюда сами слова, только количество. */
export function trackCustomWordsUsed(count: number): void {
  trackEvent({ name: "custom_words_used", params: { used: count > 0, count } });
}

export function trackNicknameCopied(generationMode: GenerationMode): void {
  trackEvent({ name: "nickname_copied", params: { generation_mode: generationMode } });
}

export function trackRegenerateClicked(generationMode: GenerationMode): void {
  trackEvent({ name: "regenerate_clicked", params: { generation_mode: generationMode } });
}
