import { BackIcon, CloseIcon } from "./icons";
import styles from "./VoiceHeader.module.css";

interface VoiceHeaderProps {
  title: string;
  onBack?: () => void;
  onClose: () => void;
}

export function VoiceHeader({ title, onBack, onClose }: VoiceHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.side}>
        {onBack && (
          <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Back">
            <BackIcon size={19} />
          </button>
        )}
      </div>
      <span className={styles.title}>{title}</span>
      <div className={`${styles.side} ${styles.right}`}>
        <button type="button" className={styles.iconButton} onClick={onClose} aria-label="Close">
          <CloseIcon size={19} />
        </button>
      </div>
    </header>
  );
}
