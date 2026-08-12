import { useMemo } from "react";
import type { CSSProperties } from "react";
import styles from "./Waveform.module.css";

type BarStyle = CSSProperties & { "--base"?: number };

interface WaveformProps {
  size?: "large" | "compact";
  active?: boolean;
}

export function Waveform({ size = "compact", active = true }: WaveformProps) {
  const barCount = size === "large" ? 28 : 22;

  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => {
        const mid = barCount / 2;
        const distance = Math.abs(i - mid) / mid;
        const baseHeight = 0.35 + (1 - distance) * 0.6;
        const duration = 640 + ((i * 37) % 260);
        const delay = (i * 53) % 500;
        return { baseHeight, duration, delay };
      }),
    [barCount],
  );

  return (
    <div className={`${styles.wave} ${size === "large" ? styles.large : styles.compact}`} role="presentation">
      {bars.map((bar, i) => {
        const style: BarStyle = {
          "--base": bar.baseHeight,
          animationDuration: `${bar.duration}ms`,
          animationDelay: `${bar.delay}ms`,
        };
        return <span key={i} className={`${styles.bar} ${active ? styles.animated : ""}`} style={style} />;
      })}
    </div>
  );
}
