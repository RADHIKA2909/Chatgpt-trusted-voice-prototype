import { BatteryIcon, SignalIcon, WifiIcon } from "./icons";
import styles from "./StatusBar.module.css";

export function StatusBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.time}>9:41</span>
      <div className={styles.icons}>
        <SignalIcon size={17} />
        <WifiIcon size={17} />
        <BatteryIcon size={25} />
      </div>
    </div>
  );
}
