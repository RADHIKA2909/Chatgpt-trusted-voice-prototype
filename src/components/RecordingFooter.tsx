import type { LanguageHint as LanguageHintValue } from "../state/types";
import { LanguageHint } from "./LanguageHint";
import { KeyboardIcon, StopIcon } from "./icons";
import styles from "./RecordingFooter.module.css";

interface RecordingFooterProps {
  languageHint: LanguageHintValue;
  onLanguageChange: (value: LanguageHintValue) => void;
  onStop: () => void;
  onSwitchToKeyboard: () => void;
  stopLabel?: string;
}

export function RecordingFooter({
  languageHint,
  onLanguageChange,
  onStop,
  onSwitchToKeyboard,
  stopLabel = "Stop recording",
}: RecordingFooterProps) {
  return (
    <div className={styles.footer}>
      <LanguageHint value={languageHint} onChange={onLanguageChange} />
      <div className={styles.controls}>
        <button type="button" className={styles.secondaryButton} onClick={onSwitchToKeyboard} aria-label="Switch to keyboard">
          <KeyboardIcon size={19} />
        </button>
        <button type="button" className={styles.stopButton} onClick={onStop} aria-label={stopLabel}>
          <StopIcon size={18} />
        </button>
        <div className={styles.spacer} />
      </div>
    </div>
  );
}
