import type { LanguageHint as LanguageHintValue, Segment } from "../state/types";
import { LiveTranscript } from "./LiveTranscript";
import { RecordingFooter } from "./RecordingFooter";
import { VoiceHeader } from "./VoiceHeader";
import { Waveform } from "./Waveform";
import styles from "./LiveTranscriptScreen.module.css";

interface LiveTranscriptScreenProps {
  segments: Segment[];
  languageHint: LanguageHintValue;
  onLanguageChange: (value: LanguageHintValue) => void;
  activeSuggestionGroupId?: string;
  onWordTap: (groupId: string) => void;
  onSelectSuggestion: (groupId: string, value: string) => void;
  onDismissSuggestion: () => void;
  onStop: () => void;
  onSwitchToKeyboard: () => void;
  onClose: () => void;
}

export function LiveTranscriptScreen({
  segments,
  languageHint,
  onLanguageChange,
  activeSuggestionGroupId,
  onWordTap,
  onSelectSuggestion,
  onDismissSuggestion,
  onStop,
  onSwitchToKeyboard,
  onClose,
}: LiveTranscriptScreenProps) {
  return (
    <div className={styles.screen}>
      <VoiceHeader title="ChatGPT" onClose={onClose} />

      <div className={styles.statusRow}>
        <Waveform size="compact" />
        <span className={styles.statusLabel}>Listening…</span>
      </div>

      <div className={styles.transcriptArea}>
        <LiveTranscript
          segments={segments}
          activeSuggestionGroupId={activeSuggestionGroupId}
          onWordTap={onWordTap}
          onSelectSuggestion={onSelectSuggestion}
          onDismissSuggestion={onDismissSuggestion}
        />
        {segments.length > 0 && (
          <div className={styles.hintRow}>
            <span className={styles.dot} />
            Hinglish detected
          </div>
        )}
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
