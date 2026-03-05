import Link from "next/link";
import { Report, Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import { localized } from "@/lib/utils";
import styles from "./ActivityFeed.module.css";

interface ActivityFeedProps {
  reports: Report[];
  teams: Map<string, Team>;
  locale: Locale;
  title: string;
  emptyMessage: string;
  viewAllLabel: string;
  viewAllHref: string;
}

const iconMap: Record<string, string> = {
  informe: "📄",
  newsletter: "📰",
  "player-profile": "👤",
  head2head: "⚔️",
  "set-pieces": "🚩",
  "post-match": "📊",
  "playing-model": "♟️",
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "short",
  });
}

function isNew(dateStr: string): boolean {
  const published = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default function ActivityFeed({
  reports,
  teams,
  locale,
  title,
  emptyMessage,
  viewAllLabel,
  viewAllHref,
}: ActivityFeedProps) {
  if (reports.length === 0) {
    return null;
  }

  return (
    <div className={styles.feed}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.items}>
        {reports.map((report, i) => {
          const team = teams.get(report.teamSlug);
          const href = report.formats.html || "#";
          const icon = iconMap[report.type] || "📄";

          return (
            <div key={i} className={styles.item}>
              <span className={styles.date}>{formatDate(report.date, locale)}</span>
              <span className={styles.icon}>{icon}</span>
              <div className={styles.content}>
                <div className={styles.itemTitle}>
                  {team && <span className={styles.flag}>{team.flag}</span>}
                  <span>{localized(report.label, locale)}</span>
                  {isNew(report.date) && <span className={styles.newBadge}>New</span>}
                </div>
                {team && (
                  <Link
                    href={`/${locale}/${team.mode === "national" ? "mundial-2026" : "clubes"}/${team.slug}`}
                    className={styles.teamLink}
                  >
                    {localized(team.name, locale)}
                  </Link>
                )}
              </div>
              {report.formats.html && (
                <a href={href} target="_blank" rel="noopener" className={styles.viewBtn}>
                  →
                </a>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.viewAll}>
        <Link href={viewAllHref} className={styles.viewAllLink}>
          {viewAllLabel} →
        </Link>
      </div>
    </div>
  );
}
