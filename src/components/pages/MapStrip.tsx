import { Anchor } from "@/components/site/Anchor";
import styles from "./MapStrip.module.css";

/** Index pages sit above the whole map, not one region. */
export function MapStrip() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <Anchor name="k2" landscapeOnly priority />
    </div>
  );
}
