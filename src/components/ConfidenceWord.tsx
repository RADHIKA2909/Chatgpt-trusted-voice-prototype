import type { KeyboardEvent } from "react";
import type { Segment } from "../state/types";
import styles from "./ConfidenceWord.module.css";

interface ConfidenceWordProps {
  segment: Segment;
  isActive?: boolean;
  onTap?: () => void;
}

export function ConfidenceWord({ segment, isActive, onTap }: ConfidenceWordProps) {
  const interactive = segment.confidence === "low" && !!onTap;

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!interactive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTap?.();
    }
  };

  const classes = [
    styles.word,
    segment.confidence === "low" ? styles.low : "",
    segment.corrected ? styles.corrected : "",
    isActive ? styles.active : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      onClick={interactive ? onTap : undefined}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${segment.text}, uncertain word, tap for suggestions` : undefined}
    >
      {segment.text}
    </span>
  );
}
