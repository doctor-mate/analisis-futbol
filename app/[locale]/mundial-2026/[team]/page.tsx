import { notFound } from "next/navigation";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import {
  getNationalTeams,
  getTeamBySlug,
  getTeamsByGroup,
  getReportsForTeam,
  toTeam,
  toReport,
} from "@/lib/queries";
import { localized } from "@/lib/utils";
import TierBadge from "@/components/TierBadge";
import ReportCard from "@/components/ReportCard";
import TeamCard from "@/components/TeamCard";
import styles from "./page.module.css";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: teamSlug } = await params;
  const teamRow = await getTeamBySlug(teamSlug);
  if (!teamRow) return {};

  const name = locale === "es" ? teamRow.name_es : teamRow.name_en;
  return {
    title: locale === "es"
      ? `${name} — Análisis de Oposición | Mundial 2026 | Soy Analista`
      : `${name} — Opposition Analysis | World Cup 2026 | Soy Analista`,
    description: locale === "es"
      ? `Informe táctico de ${name} para el Mundial 2026. Grupo ${teamRow.wc_group}, ${teamRow.confederation}.`
      : `Tactical analysis of ${name} for the 2026 World Cup. Group ${teamRow.wc_group}, ${teamRow.confederation}.`,
  };
}

export async function generateStaticParams() {
  const teams = await getNationalTeams();
  const params: { locale: string; team: string }[] = [];
  for (const locale of locales) {
    for (const t of teams) {
      if (t.status !== "playoff_pending") {
        params.push({ locale, team: t.slug });
      }
    }
  }
  return params;
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: teamSlug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const teamRow = await getTeamBySlug(teamSlug);
  if (!teamRow || teamRow.mode !== "national") return notFound();

  const team = toTeam(teamRow);
  const reportRows = await getReportsForTeam(team.slug);
  const teamReports = reportRows
    .map(toReport)
    .filter((r) => r.type !== "player-profile" && r.type !== "newsletter");

  const rivalRows = await getTeamsByGroup(team.group);
  const groupRivals = rivalRows.map(toTeam).filter((t) => t.slug !== team.slug);

  const tierLabel = dict.tiers[String(team.tier) as keyof typeof dict.tiers];
  const tierDesc =
    team.tier === 1
      ? dict.team.tier1
      : team.tier === 2
      ? dict.team.tier2
      : dict.team.tier3;

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <div className={styles.titleRow}>
            <span className={styles.flag}>{team.flag}</span>
            <h1>{localized(team.name, loc)}</h1>
          </div>
          <div className={styles.metaRow}>
            <span>
              {dict.team.group} {team.group}
            </span>
            <span>·</span>
            <span>{dict.team.fifaRanking.replace("{rank}", String(team.fifaRanking))}</span>
            <span>·</span>
            <span>{team.confederation}</span>
          </div>
          <div className={styles.tierRow}>
            <TierBadge tier={team.tier} label={tierLabel} />
            <span className={styles.tierDesc}>{tierDesc}</span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      {team.quickStats && (
        <section className={styles.quickStats}>
          <div className="container">
            <div className={styles.statsGrid}>
              {team.quickStats.formation && (
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{team.quickStats.formation}</div>
                  <div className={styles.statLabel}>
                    {loc === "es" ? "Formación" : "Formation"}
                  </div>
                </div>
              )}
              {team.quickStats.qualifyingPosition && (
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{team.quickStats.qualifyingPosition}</div>
                  <div className={styles.statLabel}>
                    {loc === "es" ? "Pos. Eliminatorias" : "Qual. Position"}
                  </div>
                </div>
              )}
              {team.quickStats.goals && (
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{team.quickStats.goals}</div>
                  <div className={styles.statLabel}>
                    {loc === "es" ? "Goles" : "Goals"}
                  </div>
                </div>
              )}
              {team.quickStats.winRate && (
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{team.quickStats.winRate}</div>
                  <div className={styles.statLabel}>
                    {loc === "es" ? "% Victoria" : "Win Rate"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Reports */}
      <section className={styles.reports}>
        <div className="container">
          <h2>{dict.team.reports}</h2>

          {teamReports.length > 0 ? (
            <div className={styles.reportsList}>
              {Object.entries(
                teamReports.reduce<Record<string, typeof teamReports>>((acc, r) => {
                  const key = r.type;
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(r);
                  return acc;
                }, {})
              ).map(([type, reports]) => (
                <div key={type} className={styles.reportGroup}>
                  <h3 className={styles.reportGroupTitle}>
                    {dict.reportTypes[type as keyof typeof dict.reportTypes] || type}
                  </h3>
                  {reports.map((report, i) => (
                    <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.comingSoon}>
              <p>{dict.team.comingSoon}</p>
            </div>
          )}
        </div>
      </section>

      {/* Group Context */}
      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      <section className={styles.groupContext}>
        <div className="container">
          <h2>
            {dict.team.groupContext} — {dict.team.group} {team.group}
          </h2>
          <div className={styles.rivalsGrid}>
            {groupRivals.map((rival) => (
              <TeamCard
                key={rival.slug}
                team={rival}
                locale={loc}
                tierLabel={dict.tiers[String(rival.tier) as keyof typeof dict.tiers]}
                statusLabel={
                  rival.status === "available"
                    ? dict.team.available
                    : rival.status === "coming_soon"
                    ? dict.team.comingSoon
                    : dict.team.playoffPending
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
