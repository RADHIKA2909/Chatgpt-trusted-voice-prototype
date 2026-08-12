import type { ChatMessage } from "../state/types";
import { FileIcon } from "./icons";
import { Logo } from "./Logo";
import styles from "./ChatMessageBubble.module.css";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  showAvatar: boolean;
}

export function ChatMessageBubble({ message, showAvatar }: ChatMessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className={styles.userRow}>
        <div className={styles.userBubble}>{message.text}</div>
      </div>
    );
  }

  return (
    <div className={styles.assistantRow}>
      <div className={styles.avatarSlot}>{showAvatar && <Logo size={24} />}</div>
      <div className={styles.assistantContent}>
        {message.text && <p className={styles.assistantText}>{message.text}</p>}
        {message.attachment && (
          <div className={styles.fileCard}>
            <div className={styles.fileIcon}>
              <FileIcon size={19} />
            </div>
            <div className={styles.fileText}>
              <div className={styles.fileName}>{message.attachment.name}</div>
              <div className={styles.fileMeta}>{message.attachment.meta}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator({ showAvatar }: { showAvatar: boolean }) {
  return (
    <div className={styles.assistantRow}>
      <div className={styles.avatarSlot}>{showAvatar && <Logo size={24} />}</div>
      <div className={styles.typingDots} aria-label="ChatGPT is responding">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
