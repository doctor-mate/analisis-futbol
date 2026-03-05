import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";
import {
  getMatchBySlug,
  getTeamBySlug,
  getReportsForMatch,
  toMatch,
  toTeam,
  toReport,
} from "@/lib/queries";
import { localized } from "@/lib/utils";
import ReportCard from "@/components/ReportCard";
import TierBadge from "@/components/TierBadge";
import styles from "./page.module.css";

export const revalidate = 3600;

const stageLabels: Record<string, Record<string, string>> = {
  group: { es: "Fase de grupos", en: "Group stage" },
  "round-of-32": { es: "Dieciseisavos", en: "Round of 32" },
  "round-of-16": { es: "Octavos", en: "Round of 16" },
  "quarter-final": { es: "Cuartos de final", en: "Quarter-final" },
  "semi-final": { es: "Semifinal", en: "Semi-final" },
  "third-place": { es: "Tercer puesto", en: "Third place" },
  final: { es: "Final", en: "Final" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; "match-slug": string }>;
}) {
  const { locale, "match-slug": matchSlug } = await params;
  const matchRow = await getMatchBySlug(matchSlug);
  if (!matchRow) return {};

  const homeTeam = matchRow.home_team_slug ? await getTeamBySlug(matchRow.home_team_slug) : null;
  const awayTeam = matchRow.away_team_slug ? await getTeamBySlug(matchRow.away_team_slug) : null;

  const homeName = homeTeam ? (locale === "es" ? homeTeam.name_es : homeTeam.name_en) : "TBD";
  const awayName = awayTeam ? (locale === "es" ? awayTeam.name_es : awayTeam.name_en) : "TBD";

  return {
    title:
      locale === "es"
        ? `${homeName} vs ${awayName} — Mundial 2026 | Soy Analista`
        : `${homeName} vs ${awayName} — World Cup 2026 | Soy Analista`,
    description:
      locale === "es"
        ? `Análisis táctico de ${homeName} vs ${awayName}. Mundial 2026.`
        : `Tactical analysis of ${homeName} vs ${awayName}. World Cup 2026.`,
  };
}

function formatMatchDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ locale: string; "match-slug": string }>;
}) {
  const { locale, "match-slug": matchSlug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const matchRow = await getMatchBySlug(matchSlug);
  if (!matchRow) return notFound();

  const match = toMatch(matchRow);

  const homeTeamRow = match.homeTeamSlug ? await getTeamBySlug(match.homeTeamSlug) : null;
  const awayTeamRow = match.awayTeamSlug ? await getTeamBySlug(match.awayTeamSlug) : null;
  const homeTeam = homeTeamRow ? toTeam(homeTeamRow) : null;
  const awayTeam = awayTeamRow ? toTeam(awayTeamRow) : null;

  const reportRows = await getReportsForMatch(matchSlug);
  const reports = reportRows.map(toReport);

  const prematchReports = reports.filter((r) => r.type === "head2head");
  const postmatchReports = reports.filter((r) => r.type === "post-match");
  const otherReports = reports.filter((r) => r.type !== "head2head" && r.type !== "post-match");

  const isCompleted = match.status === "completed" || match.status === "postmatch_ready";

  return (
    <>
      {/* Match Header */}
      <section className={styles.header}>
        <div className="container">
          <div className={styles.matchMeta}>
            <span className={styles.stage}>
              {match.stage === "group" && match.groupLetter
                ? `${dict.team.group} ${match.groupLetter}`
                : stageLabels[match.stage]?.[locale] || match.stage}
            </span>
            <span className={styles.dateLine}>
              {formatMatchDate(match.date, locale)}
              {match.time && ` · ${match.time}`}
            </span>
          </div>

          <div className={styles.matchup}>
            <div className={styles.side}>
              <span className={styles.bigFlag}>{homeTeam?.flag || "🏳️"}</span>
              <h2 className={styles.sideName}>
                {homeTeam ? localized(homeTeam.name, loc) : "TBD"}
              </h2>
              {homeTeam && (
                <span className={styles.sideInfo}>
                  FIFA #{homeTeam.fifaRanking} · {homeTeam.confederation}
                </span>
              )}
            </div>

            <div className={styles.center}>
              {isCompleted ? (
                <div className={styles.finalScore}>
                  <span>{match.homeScore ?? 0}</span>
                  <span className={styles.scoreDash}>–</span>
                  <span>{match.awayScore ?? 0}</span>
                </div>
              ) : (
                <span className={styles.vsLabel}>VS</span>
              )}
            </div>

            <div className={`${styles.side} ${styles.sideAway}`}>
              <span className={styles.bigFlag}>{awayTeam?.flag || "🏳️"}</span>
              <h2 className={styles.sideName}>
                {awayTeam ? localized(awayTeam.name, loc) : "TBD"}
              </h2>
              {awayTeam && (
                <span className={styles.sideInfo}>
                  FIFA #{awayTeam.fifaRanking} · {awayTeam.confederation}
                </span>
              )}
            </div>
          </div>

          {match.venue && (
            <div className={styles.venueLine}>
              📍 {match.venue}{match.city ? `, ${match.city}` : ""}
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Pre-match Analysis */}
      <section className={styles.section}>
        <div className="container">
          <h2>{dict.matches.prematch}</h2>
          {prematchReports.length > 0 ? (
            <div className={styles.reportsList}>
              {prematchReports.map((report, i) => (
                <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
              ))}
            </div>
          ) : (
            <div className={styles.emptySection}>
              <p>{dict.matches.prematchEmpty}</p>
            </div>
          )}
        </div>
      </section>

      {/* Post-match Analysis (only if completed) */}
      {isCompleted && (
        <>
          <div className="container">
            <div className="diamond-separator">
              <div className="diamond" />
            </div>
          </div>

          <section className={styles.section}>
            <div className="container">
              <h2>{dict.matches.postmatch}</h2>
              {postmatchReports.length > 0 ? (
                <div className={styles.reportsList}>
                  {postmatchReports.map((report, i) => (
                    <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptySection}>
                  <p>{dict.matches.postmatchEmpty}</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Other linked reports */}
      {otherReports.length > 0 && (
        <>
          <div className="container">
            <div className="diamond-separator">
              <div className="diamond" />
            </div>
          </div>

          <section className={styles.section}>
            <div className="container">
              <h2>{dict.matches.relatedReports}</h2>
              <div className={styles.reportsList}>
                {otherReports.map((report, i) => (
                  <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Team Links */}
      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.teamLinks}>
            {homeTeam && (
              <Link
                href={`/${locale}/mundial-2026/${homeTeam.slug}`}
                className={styles.teamLink}
              >
                <span className={styles.teamLinkFlag}>{homeTeam.flag}</span>
                <span>{localized(homeTeam.name, loc)}</span>
                <TierBadge
                  tier={homeTeam.tier}
                  label={dict.tiers[String(homeTeam.tier) as keyof typeof dict.tiers]}
                />
              </Link>
            )}
            {awayTeam && (
              <Link
                href={`/${locale}/mundial-2026/${awayTeam.slug}`}
                className={styles.teamLink}
              >
                <span className={styles.teamLinkFlag}>{awayTeam.flag}</span>
                <span>{localized(awayTeam.name, loc)}</span>
                <TierBadge
                  tier={awayTeam.tier}
                  label={dict.tiers[String(awayTeam.tier) as keyof typeof dict.tiers]}
                />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
