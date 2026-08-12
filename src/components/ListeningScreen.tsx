import type { LanguageHint as LanguageHintValue } from "../state/types";
import { RecordingFooter } from "./RecordingFooter";
import { Waveform } from "./Waveform";
import { VoiceHeader } from "./VoiceHeader";
import styles from "./ListeningScreen.module.css";

interface ListeningScreenProps {
  languageHint: LanguageHintValue;
  onLanguageChange: (value: LanguageHintValue) => void;
  onStop: () => void;
  onSwitchToKeyboard: () => void;
  onClose: () => void;
}

export function ListeningScreen({ languageHint, onLanguageChange, onStop, onSwitchToKeyboard, onClose }: ListeningScreenProps) {
  return (
    <div className={styles.screen}>
      <VoiceHeader title="ChatGPT" onClose={onClose} />

      <div className={styles.center}>
        <p className={styles.listeningLabel}>Listening…</p>
        <div className={styles.ring}>
          <Waveform size="large" />
        </div>
        <p className={styles.speakNow}>Speak now</p>
        <p className={styles.subtitle}>You can speak in Hinglish</p>
      </div>

      <RecordingFooter
        languageHint={languageHint}
        onLanguageChange={onLanguageChange}
        onStop={onStop}
        onSwitchToKeyboard={onSwitchToKeyboard}
      />
    </div>
  );
}
