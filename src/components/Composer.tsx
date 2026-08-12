import { useState } from "react";
import type { KeyboardEvent } from "react";
import { GlobeIcon, MicIcon, PlusIcon, SendIcon } from "./icons";
import styles from "./Composer.module.css";

interface ComposerProps {
  onStartVoice: () => void;
  onSendText: (text: string) => void;
  autoFocus?: boolean;
}

export function Composer({ onStartVoice, onSendText, autoFocus }: ComposerProps) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSendText(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.field}>
        <textarea
          className={styles.input}
          placeholder="Message ChatGPT"
          rows={1}
          value={text}
          autoFocus={autoFocus}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Message ChatGPT"
        />
        {text.trim() ? (
          <button type="button" className={styles.sendButton} onClick={submit} aria-label="Send message">
            <SendIcon size={16} />
          </button>
        ) : (
          <button type="button" className={styles.micButton} onClick={onStartVoice} aria-label="Start voice input">
            <MicIcon size={19} />
          </button>
        )}
      </div>
      <div className={styles.toolsRow}>
        <button type="button" className={styles.toolButton} aria-label="Add attachment">
          <PlusIcon size={17} />
        </button>
        <button type="button" className={styles.toolButton} aria-label="Search the web">
          <GlobeIcon size={15} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
