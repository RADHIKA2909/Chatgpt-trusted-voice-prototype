import type { LanguageHint as LanguageHintValue } from "../state/types";
import styles from "./LanguageHint.module.css";

const OPTIONS: { value: LanguageHintValue; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "hindi", label: "Hindi" },
  { value: "hinglish", label: "Hinglish" },
  { value: "english", label: "English" },
];

interface LanguageHintProps {
  value: LanguageHintValue;
  onChange: (value: LanguageHintValue) => void;
}

export function LanguageHint({ value, onChange }: LanguageHintProps) {
  return (
    <div className={styles.row} role="group" aria-label="Language hint">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.pill} ${value === opt.value ? styles.active : ""}`}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
