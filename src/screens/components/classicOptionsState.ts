import type { ClassicStylePreset } from "../../domain/data";

export interface ClassicOptionsState {
  baseWord: string;
  stylePreset: ClassicStylePreset;
  useLeetSpeak: boolean;
  count: number;
}

export function createDefaultClassicOptions(): ClassicOptionsState {
  return { baseWord: "", stylePreset: "none", useLeetSpeak: false, count: 8 };
}
