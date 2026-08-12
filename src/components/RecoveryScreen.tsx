import { VoiceHeader } from "./VoiceHeader";
import { FaceIcon, MicIcon } from "./icons";
import styles from "./RecoveryScreen.module.css";

interface RecoveryScreenProps {
  onTryAgain: () => void;
  onEditTranscript: () => void;
  onTypeInstead: () => void;
  onClose: () => void;
}

export function RecoveryScreen({ onTryAgain, onEditTranscript, onTypeInstead, onClose }: RecoveryScreenProps) {
  return (
    <div className={styles.screen}>
      <VoiceHeader title="ChatGPT" onClose={onClose} />

      <div className={styles.center}>
        <div className={styles.iconCircle}>
          <FaceIcon size={30} />
        </div>
        <h2 className={styles.headline}>Couldn't understand that clearly.</h2>
        <p className={styles.subtitle}>Try speaking again or edit the transcript.</p>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={onTryAgain}>
          <MicIcon size={16} />
          Try again
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onEditTranscript}>
          Edit transcript
        </button>
        <button type="button" className={styles.textButton} onClick={onTypeInstead}>
          Type instead
        </button>
      </div>
    </div>
  );
}
