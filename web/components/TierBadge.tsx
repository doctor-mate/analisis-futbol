import styles from "./TierBadge.module.css";
import { Tier } from "@/data/types";

interface TierBadgeProps {
  tier: Tier;
  label: string;
}

export default function TierBadge({ tier, label }: TierBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[`tier${tier}`]}`}>
      {label}
    </span>
  );
}
