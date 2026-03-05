import Link from "next/link";
import { Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import TeamCard from "./TeamCard";
import styles from "./GroupGrid.module.css";

interface GroupGridProps {
  letter: string;
  teams: Team[];
  locale: Locale;
  groupLabel: string;
  dict: Record<string, string>;
  tierLabels: Record<string, string>;
}

function getStatusLabel(status: string, dict: Record<string, string>): string {
  const map: Record<string, string> = {
    available: dict.available || "Disponible",
    coming_soon: dict.comingSoon || "Próximamente",
    playoff_pending: dict.playoffPending || "Por definir",
  };
  return map[status] || status;
}

export default function GroupGrid({
  letter,
  teams,
  locale,
  groupLabel,
  dict,
  tierLabels,
}: GroupGridProps) {
  return (
    <div className={styles.group}>
      <Link
        href={`/${locale}/mundial-2026/grupo/${letter.toLowerCase()}`}
        className={styles.titleLink}
      >
        <h3 className={styles.title}>
          {groupLabel} {letter} →
        </h3>
      </Link>
      <div className={styles.grid}>
        {teams.map((team) => (
          <TeamCard
            key={team.slug}
            team={team}
            locale={locale}
            tierLabel={tierLabels[String(team.tier)]}
            statusLabel={getStatusLabel(team.status, dict)}
          />
        ))}
      </div>
    </div>
  );
}
