import Link from "next/link";
import { Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import { localized } from "@/lib/utils";
import TierBadge from "./TierBadge";
import styles from "./TeamCard.module.css";

interface TeamCardProps {
  team: Team;
  locale: Locale;
  tierLabel: string;
  statusLabel: string;
  compact?: boolean;
}

export default function TeamCard({ team, locale, tierLabel, statusLabel, compact }: TeamCardProps) {
  const isClickable = team.status !== "playoff_pending";
  const basePath = team.mode === "national" ? "mundial-2026" : "clubes";
  const href = `/${locale}/${basePath}/${team.slug}`;

  const content = (
    <div
      className={`${styles.card} ${styles[team.status]} ${compact ? styles.compact : ""}`}
    >
      <div className={styles.flag}>{team.flag}</div>
      <div className={styles.name}>{localized(team.name, locale)}</div>
      {!compact && (
        <div className={styles.meta}>
          <span className={`${styles.status} ${styles[`status_${team.status}`]}`}>
            {statusLabel}
          </span>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return <Link href={href} className={styles.link}>{content}</Link>;
  }

  return content;
}
