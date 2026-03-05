import { notFound } from "next/navigation";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import {
  getTeamsByGroup,
  getReportsForTeam,
  groups,
  toTeam,
  toReport,
} from "@/lib/queries";
import { localized } from "@/lib/utils";
import TeamCard from "@/components/TeamCard";
import ReportCard from "@/components/ReportCard";
import TierBadge from "@/components/TierBadge";
import styles from "./page.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { locale: string; letter: string }[] = [];
  for (const locale of locales) {
    for (const letter of groups) {
      params.push({ locale, letter: letter.toLowerCase() });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}) {
  const { locale, letter } = await params;
  const group = letter.toUpperCase();
  if (!groups.includes(group)) return {};

  const rows = await getTeamsByGroup(group);
  const teamNames = rows
    .map((r) => (locale === "es" ? r.name_es : r.name_en))
    .join(", ");

  return {
    title:
      locale === "es"
        ? `Grupo ${group} — Mundial 2026 | Soy Analista`
        : `Group ${group} — World Cup 2026 | Soy Analista`,
    description:
      locale === "es"
        ? `Análisis del Grupo ${group} del Mundial 2026: ${teamNames}`
        : `Analysis of Group ${group} at the 2026 World Cup: ${teamNames}`,
  };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}) {
  const { locale, letter } = await params;
  const group = letter.toUpperCase();
  const loc = locale as Locale;

  if (!groups.includes(group)) return notFound();

  const dict = await getDictionary(loc);
  const rows = await getTeamsByGroup(group);
  const teams = rows.map(toTeam);

  // Get reports for all teams in the group
  const teamReportsMap = new Map<string, ReturnType<typeof toReport>[]>();
  for (const team of teams) {
    const reportRows = await getReportsForTeam(team.slug);
    if (reportRows.length > 0) {
      teamReportsMap.set(team.slug, reportRows.map(toReport));
    }
  }

  const availableCount = teams.filter((t) => t.status === "available").length;
  const tier1Teams = teams.filter((t) => t.tier === 1);

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>
            {dict.mundial.group} {group}
          </h1>
          <p className={styles.subtitle}>
            {loc === "es" ? "Mundial 2026" : "World Cup 2026"}
          </p>
        </div>
      </section>

      <hr
        className="editorial-rule"
        style={{ margin: "0 auto 40px", maxWidth: 960 }}
      />

      {/* Teams in this group */}
      <section className={styles.teams}>
        <div className="container">
          <h2>
            {loc === "es" ? "Selecciones" : "Teams"}
          </h2>
          <div className={styles.teamsGrid}>
            {teams.map((team) => (
              <div key={team.slug} className={styles.teamBlock}>
                <div className={styles.teamHeader}>
                  <span className={styles.flag}>{team.flag}</span>
                  <div className={styles.teamInfo}>
                    <a
                      href={`/${locale}/mundial-2026/${team.slug}`}
                      className={styles.teamName}
                    >
                      {localized(team.name, loc)}
                    </a>
                    <div className={styles.teamMeta}>
                      <TierBadge
                        tier={team.tier}
                        label={
                          dict.tiers[
                            String(team.tier) as keyof typeof dict.tiers
                          ]
                        }
                      />
                      <span className={styles.ranking}>
                        FIFA #{team.fifaRanking || "—"}
                      </span>
                      <span className={styles.confederation}>
                        {team.confederation}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`${styles.status} ${
                      team.status === "available"
                        ? styles.statusAvailable
                        : ""
                    }`}
                  >
                    {team.status === "available"
                      ? dict.team.available
                      : team.status === "coming_soon"
                      ? dict.team.comingSoon
                      : dict.team.playoffPending}
                  </span>
                </div>

                {/* Reports for this team */}
                {teamReportsMap.has(team.slug) && (
                  <div className={styles.teamReports}>
                    {teamReportsMap.get(team.slug)!.map((report, i) => (
                      <ReportCard
                        key={i}
                        report={report}
                        locale={loc}
                        labels={dict.team}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Group Stats Summary */}
      <section className={styles.summary}>
        <div className="container">
          <h2>{loc === "es" ? "Resumen del grupo" : "Group summary"}</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryValue}>{availableCount}/4</div>
              <div className={styles.summaryLabel}>
                {loc === "es" ? "Informes listos" : "Reports ready"}
              </div>
            </div>
            <div className={styles.summaryBox}>
              <div className={styles.summaryValue}>
                {tier1Teams.length > 0
                  ? tier1Teams.map((t) => t.flag).join(" ")
                  : "—"}
              </div>
              <div className={styles.summaryLabel}>Tier 1</div>
            </div>
            <div className={styles.summaryBox}>
              <div className={styles.summaryValue}>
                {teams.map((t) => t.flag).join(" ")}
              </div>
              <div className={styles.summaryLabel}>
                {loc === "es" ? "Selecciones" : "Teams"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
