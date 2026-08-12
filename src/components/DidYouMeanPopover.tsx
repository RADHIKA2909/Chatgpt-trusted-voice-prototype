import { CheckIcon } from "./icons";
import styles from "./DidYouMeanPopover.module.css";

interface DidYouMeanPopoverProps {
  alternatives: string[];
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

export function DidYouMeanPopover({ alternatives, onSelect, onDismiss }: DidYouMeanPopoverProps) {
  return (
    <div className={styles.panel} role="group" aria-label="Did you mean?">
      <div className={styles.label}>Did you mean?</div>
      <div className={styles.chips}>
        {alternatives.map((alt, i) => (
          <button
            key={alt}
            type="button"
            className={`${styles.chip} ${i === 0 ? styles.best : ""}`}
            onClick={() => onSelect(alt)}
          >
            <span>{alt}</span>
            {i === 0 && <CheckIcon size={13} className={styles.checkIcon} />}
          </button>
        ))}
      </div>
      <button type="button" className={styles.dismiss} onClick={onDismiss}>
        Not it? Edit manually
      </button>
    </div>
  );
}
