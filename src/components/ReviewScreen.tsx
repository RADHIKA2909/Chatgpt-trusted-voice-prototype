import type { Segment } from "../state/types";
import { LiveTranscript } from "./LiveTranscript";
import { VoiceHeader } from "./VoiceHeader";
import { RefreshIcon, SendIcon } from "./icons";
import styles from "./ReviewScreen.module.css";

interface ReviewScreenProps {
  segments: Segment[];
  isEditing: boolean;
  editDraft: string;
  activeSuggestionGroupId?: string;
  onWordTap: (groupId: string) => void;
  onSelectSuggestion: (groupId: string, value: string) => void;
  onDismissSuggestion: () => void;
  onStartEdit: () => void;
  onChangeDraft: (value: string) => void;
  onFinishEdit: () => void;
  onReRecord: () => void;
  onSend: () => void;
  onClose: () => void;
}

export function ReviewScreen({
  segments,
  isEditing,
  editDraft,
  activeSuggestionGroupId,
  onWordTap,
  onSelectSuggestion,
  onDismissSuggestion,
  onStartEdit,
  onChangeDraft,
  onFinishEdit,
  onReRecord,
  onSend,
  onClose,
}: ReviewScreenProps) {
  const canSend = segments.length > 0 && segments.some((s) => s.text.trim().length > 0);

  return (
    <div className={styles.screen}>
      <VoiceHeader title="Review" onBack={onClose} onClose={onClose} />

      <div className={styles.card}>
        {isEditing ? (
          <textarea
            className={styles.textarea}
            value={editDraft}
            onChange={(e) => onChangeDraft(e.target.value)}
            autoFocus
            placeholder="Type your message…"
            aria-label="Edit transcript"
          />
        ) : segments.length > 0 ? (
          <LiveTranscript
            segments={segments}
            activeSuggestionGroupId={activeSuggestionGroupId}
            onWordTap={onWordTap}
            onSelectSuggestion={onSelectSuggestion}
            onDismissSuggestion={onDismissSuggestion}
          />
        ) : (
          <p className={styles.emptyState}>Nothing here yet — try Re-record or Edit to add your message.</p>
        )}
      </div>

      <div className={styles.footer}>
        {isEditing ? (
          <button type="button" className={styles.primaryButton} onClick={onFinishEdit}>
            Done
          </button>
        ) : (
          <>
            <div className={styles.secondaryRow}>
              <button type="button" className={styles.secondaryButton} onClick={onReRecord}>
                <RefreshIcon size={16} />
                Re-record
              </button>
              <button type="button" className={styles.secondaryButton} onClick={onStartEdit}>
                Edit
              </button>
            </div>
            <button type="button" className={styles.primaryButton} onClick={onSend} disabled={!canSend}>
              Send
              <SendIcon size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
