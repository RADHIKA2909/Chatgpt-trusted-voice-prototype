import { currentStep, demoSnapshot } from "../state/mockData";
import type { VoiceFlow } from "../state/useVoiceFlow";
import styles from "./WalkthroughNav.module.css";

const STEPS = [
  { n: 1, label: "Discover", hint: "Default composer" },
  { n: 2, label: "Speak", hint: "Listening" },
  { n: 3, label: "See", hint: "Live transcript" },
  { n: 4, label: "Correct", hint: "Did you mean?" },
  { n: 5, label: "Review", hint: "Edit before send" },
  { n: 6, label: "Send", hint: "Normal response" },
  { n: 7, label: "Recover", hint: "Low-confidence fallback" },
];

interface WalkthroughNavProps {
  flow: VoiceFlow;
}

export function WalkthroughNav({ flow }: WalkthroughNavProps) {
  const active = currentStep(flow.state);

  return (
    <nav className={styles.nav} aria-label="Prototype walkthrough">
      <p className={styles.label}>Jump to any state</p>
      <ol className={styles.list}>
        {STEPS.map((step) => {
          const isActive = step.n === active;
          return (
            <li key={step.n}>
              <button
                type="button"
                className={`${styles.step} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => flow.demoSet(demoSnapshot(step.n))}
              >
                <span className={styles.number}>{String(step.n).padStart(2, "0")}</span>
                <span className={styles.text}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepHint}>{step.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
