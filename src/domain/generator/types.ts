/** Механизмы построения ника — исчерпывающий список из Task.md §16. */
export type GenerationMechanism =
  | "word_combination"
  | "word_shortening"
  | "phonetic_modification"
  | "prefix"
  | "suffix"
  | "letter_replacement"
  | "semantic_combination"
  | "custom_keyword_mutation"
  | "compact_form"
  | "multi_word_form";

export interface GeneratedNickname {
  value: string;
  mechanism: GenerationMechanism;
}
