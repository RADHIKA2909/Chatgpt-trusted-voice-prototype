import type { ChatMessage, LanguageHint as LanguageHintValue } from "../state/types";
import { ChatMessageBubble, TypingIndicator } from "./ChatMessageBubble";
import { Composer } from "./Composer";
import { LanguageHint } from "./LanguageHint";
import { Logo } from "./Logo";
import { EditIcon, MenuIcon } from "./icons";
import styles from "./ChatShell.module.css";

const SUGGESTIONS = [
  "Explain photosynthesis in simple terms",
  "Help me plan a study schedule",
  "Write a cover letter for an internship",
  "Summarize this article",
];

interface ChatShellProps {
  messages: ChatMessage[];
  isAssistantTyping: boolean;
  languageHint: LanguageHintValue;
  onLanguageChange: (value: LanguageHintValue) => void;
  onStartVoice: () => void;
  onSendText: (text: string) => void;
  onNewChat: () => void;
}

export function ChatShell({
  messages,
  isAssistantTyping,
  languageHint,
  onLanguageChange,
  onStartVoice,
  onSendText,
  onNewChat,
}: ChatShellProps) {
  const hasMessages = messages.length > 0;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <button type="button" className={styles.iconButton} aria-label="Menu">
          <MenuIcon size={20} />
        </button>
        <span className={styles.title}>ChatGPT</span>
        <button type="button" className={styles.iconButton} aria-label="New chat" onClick={onNewChat}>
          <EditIcon size={19} />
        </button>
      </header>

      {hasMessages ? (
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <ChatMessageBubble key={m.id} message={m} showAvatar={m.role === "assistant" && messages[i - 1]?.role !== "assistant"} />
          ))}
          {isAssistantTyping && <TypingIndicator showAvatar={messages[messages.length - 1]?.role !== "assistant"} />}
          <div className={styles.bottomSpacer} />
        </div>
      ) : (
        <div className={styles.empty}>
          <Logo size={48} />
          <h1 className={styles.emptyTitle}>How can I help you today?</h1>
          <div className={styles.suggestions}>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className={styles.suggestionChip} onClick={() => onSendText(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <LanguageHint value={languageHint} onChange={onLanguageChange} />
        <Composer onStartVoice={onStartVoice} onSendText={onSendText} />
      </div>
    </div>
  );
}
