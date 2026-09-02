import { CheckIcon, ClipboardIcon } from "./icons";

interface CopyButtonProps {
  value: string;
  copied: boolean;
  onCopy: (value: string) => void;
  copyLabel: string;
  copiedLabel: string;
}

/**
 * Кнопка копирования с мгновенной визуальной обратной связью: иконка
 * меняется на галочку и кнопка на короткое время подсвечивается акцентным
 * цветом (сброс — по истечении `COPY_FEEDBACK_MS` в вызывающем хуке).
 */
export function CopyButton({ value, copied, onCopy, copyLabel, copiedLabel }: CopyButtonProps) {
  return (
    <button
      type="button"
      className={`copy-btn${copied ? " copy-btn--success" : ""}`}
      onClick={() => onCopy(value)}
      aria-label={copied ? copiedLabel : copyLabel}
      title={copied ? copiedLabel : copyLabel}
    >
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
}
