import type { Segment } from "../state/types";
import { ConfidenceWord } from "./ConfidenceWord";
import { DidYouMeanPopover } from "./DidYouMeanPopover";
import styles from "./LiveTranscript.module.css";

interface LiveTranscriptProps {
  segments: Segment[];
  activeSuggestionGroupId?: string;
  onWordTap: (groupId: string) => void;
  onSelectSuggestion: (groupId: string, value: string) => void;
  onDismissSuggestion: () => void;
}

export function LiveTranscript({
  segments,
  activeSuggestionGroupId,
  onWordTap,
  onSelectSuggestion,
  onDismissSuggestion,
}: LiveTranscriptProps) {
  const lastIndexOfGroup = (groupId: string) => {
    let idx = -1;
    segments.forEach((s, i) => {
      if (s.groupId === groupId) idx = i;
    });
    return idx;
  };

  return (
    <div className={styles.paragraph}>
      {segments.map((seg, i) => {
        const isGroupActive = !!seg.groupId && seg.groupId === activeSuggestionGroupId;
        const isLastOfActiveGroup = isGroupActive && i === lastIndexOfGroup(seg.groupId!);
        return (
          <span key={seg.id} className={styles.token}>
            <ConfidenceWord
              segment={seg}
              isActive={isGroupActive}
              onTap={seg.confidence === "low" && seg.groupId ? () => onWordTap(seg.groupId!) : undefined}
            />
            {i < segments.length - 1 ? " " : ""}
            {isLastOfActiveGroup && (
              <DidYouMeanPopover
                alternatives={seg.alternatives ?? []}
                onSelect={(value) => onSelectSuggestion(seg.groupId!, value)}
                onDismiss={onDismissSuggestion}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
