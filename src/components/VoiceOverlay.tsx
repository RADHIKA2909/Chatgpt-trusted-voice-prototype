import type { VoiceFlow } from "../state/useVoiceFlow";
import { ListeningScreen } from "./ListeningScreen";
import { LiveTranscriptScreen } from "./LiveTranscriptScreen";
import { RecoveryScreen } from "./RecoveryScreen";
import { ReviewScreen } from "./ReviewScreen";
import styles from "./VoiceOverlay.module.css";

interface VoiceOverlayProps {
  flow: VoiceFlow;
}

export function VoiceOverlay({ flow }: VoiceOverlayProps) {
  const { state } = flow;

  if (state.mode === "idle" || state.mode === "sent") return null;

  return (
    <div className={styles.overlay}>
      {state.mode === "listening" && (
        <ListeningScreen
          languageHint={state.languageHint}
          onLanguageChange={flow.setLanguage}
          onStop={flow.stopRecording}
          onSwitchToKeyboard={flow.closeToIdle}
          onClose={flow.closeToIdle}
        />
      )}

      {state.mode === "transcribing" && (
        <LiveTranscriptScreen
          segments={state.segments}
          languageHint={state.languageHint}
          onLanguageChange={flow.setLanguage}
          activeSuggestionGroupId={state.activeSuggestionGroupId}
          onWordTap={flow.openSuggestion}
          onSelectSuggestion={flow.selectSuggestion}
          onDismissSuggestion={flow.closeSuggestion}
          onStop={flow.stopRecording}
          onSwitchToKeyboard={flow.closeToIdle}
          onClose={flow.closeToIdle}
        />
      )}

      {state.mode === "review" && (
        <ReviewScreen
          segments={state.segments}
          isEditing={state.isEditing}
          editDraft={state.editDraft}
          activeSuggestionGroupId={state.activeSuggestionGroupId}
          onWordTap={flow.openSuggestion}
          onSelectSuggestion={flow.selectSuggestion}
          onDismissSuggestion={flow.closeSuggestion}
          onStartEdit={flow.startEdit}
          onChangeDraft={flow.setEditDraft}
          onFinishEdit={flow.finishEdit}
          onReRecord={flow.reRecord}
          onSend={flow.send}
          onClose={flow.closeToIdle}
        />
      )}

      {state.mode === "error" && (
        <RecoveryScreen
          onTryAgain={flow.tryAgain}
          onEditTranscript={flow.editFromError}
          onTypeInstead={flow.closeToIdle}
          onClose={flow.closeToIdle}
        />
      )}
    </div>
  );
}
