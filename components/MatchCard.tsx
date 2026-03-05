import Link from "next/link";
import { Match, Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import { localized } from "@/lib/utils";
import styles from "./MatchCard.module.css";

interface MatchCardProps {
  match: Match;
  homeTeam?: Team;
  awayTeam?: Team;
  locale: Locale;
  labels: {
    group: string;
    scheduled: string;
    prematchReady: string;
    completed: string;
    postmatchReady: string;
    viewMatch: string;
  };
}

const stageLabels: Record<string, Record<string, string>> = {
  group: { es: "Fase de grupos", en: "Group stage" },
  "round-of-32": { es: "Dieciseisavos", en: "Round of 32" },
  "round-of-16": { es: "Octavos", en: "Round of 16" },
  "quarter-final": { es: "Cuartos", en: "Quarter-final" },
  "semi-final": { es: "Semifinal", en: "Semi-final" },
  "third-place": { es: "Tercer puesto", en: "Third place" },
  final: { es: "Final", en: "Final" },
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function MatchCard({
  match,
  homeTeam,
  awayTeam,
  locale,
  labels,
}: MatchCardProps) {
  const isCompleted = match.status === "completed" || match.status === "postmatch_ready";
  const hasContent = match.status === "prematch_ready" || match.status === "postmatch_ready";

  const statusLabel =
    match.status === "scheduled" ? labels.scheduled
    : match.status === "prematch_ready" ? labels.prematchReady
    : match.status === "completed" ? labels.completed
    : match.status === "postmatch_ready" ? labels.postmatchReady
    : labels.scheduled;

  const statusClass =
    match.status === "prematch_ready" ? styles.statusPrematch
    : match.status === "postmatch_ready" ? styles.statusPostmatch
    : isCompleted ? styles.statusCompleted
    : "";

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.date}>{formatDate(match.date, locale)}</span>
        {match.time && <span className={styles.time}>{match.time}</span>}
        <span className={styles.stage}>
          {match.stage === "group" && match.groupLetter
            ? `${labels.group} ${match.groupLetter}`
            : stageLabels[match.stage]?.[locale] || match.stage}
        </span>
      </div>

      <div className={styles.teams}>
        <div className={styles.teamSide}>
          <span className={styles.flag}>{homeTeam?.flag || "🏳️"}</span>
          <span className={styles.teamName}>
            {homeTeam ? localized(homeTeam.name, locale) : "TBD"}
          </span>
        </div>

        <div className={styles.score}>
          {isCompleted ? (
            <span className={styles.scoreValue}>
              {match.homeScore ?? 0} – {match.awayScore ?? 0}
            </span>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={`${styles.teamSide} ${styles.teamAway}`}>
          <span className={styles.flag}>{awayTeam?.flag || "🏳️"}</span>
          <span className={styles.teamName}>
            {awayTeam ? localized(awayTeam.name, locale) : "TBD"}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        {match.venue && (
          <span className={styles.venue}>
            {match.venue}{match.city ? `, ${match.city}` : ""}
          </span>
        )}
        <div className={styles.footerRight}>
          <span className={`${styles.status} ${statusClass}`}>
            {statusLabel}
          </span>
          {hasContent && (
            <Link
              href={`/${locale}/mundial-2026/partidos/${match.slug}`}
              className={styles.viewLink}
            >
              {labels.viewMatch} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
