import { describe, expect, it, vi } from "vitest";
import { trackEvent } from "../analytics";

/**
 * В тестовом окружении VITE_FIREBASE_* не заданы (как и в реальном
 * репозитории — см. `.env.example`), поэтому `trackEvent` обязан взять
 * no-op путь, ни разу не тронув настоящий Firebase SDK/сеть.
 */
describe("trackEvent — safe no-op when Firebase is not configured", () => {
  it("does not throw for any event shape, with or without params", async () => {
    expect(() => trackEvent({ name: "app_open" })).not.toThrow();
    expect(() =>
      trackEvent({ name: "generation_completed", params: { generation_mode: "quick", result_count: 8 } }),
    ).not.toThrow();
    // даём микрозадачам внутри trackEvent (fire-and-forget) шанс завершиться
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  it("logs the stub event to the console instead of silently doing nothing", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    trackEvent({ name: "nickname_copied", params: { generation_mode: "invisible" } });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(debugSpy).toHaveBeenCalledWith("[analytics:stub]", "nickname_copied", { generation_mode: "invisible" });
    debugSpy.mockRestore();
  });
});
