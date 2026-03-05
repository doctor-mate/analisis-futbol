import { Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import { localized } from "@/lib/utils";
import Link from "next/link";
import styles from "./ProgressGrid.module.css";

interface ProgressGridProps {
  teams: Team[];
  locale: Locale;
  title: string;
  total: number;
}

export default function ProgressGrid({ teams, locale, title, total }: ProgressGridProps) {
  const available = teams.filter((t) => t.status === "available").length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.counter}>
          <span className={styles.counterNum}>{available}</span>
          <span className={styles.counterSep}>/</span>
          <span className={styles.counterTotal}>{total}</span>
        </div>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{ width: `${(available / total) * 100}%` }}
        />
      </div>
      <div className={styles.grid}>
        {teams.map((team) => (
          <Link
            key={team.slug}
            href={`/${locale}/${team.mode === "national" ? "mundial-2026" : "clubes"}/${team.slug}`}
            className={`${styles.cell} ${team.status === "available" ? styles.ready : ""}`}
            title={localized(team.name, locale)}
          >
            {team.flag}
          </Link>
        ))}
      </div>
    </div>
  );
}
