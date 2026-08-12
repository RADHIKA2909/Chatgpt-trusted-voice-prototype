import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";
import styles from "./PhoneFrame.module.css";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className={styles.frame}>
      <StatusBar />
      <div className={styles.screen}>{children}</div>
      <div className={styles.homeIndicator} aria-hidden="true" />
    </div>
  );
}
