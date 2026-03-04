import { notFound } from "next/navigation";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import { clubTeams, getTeamBySlug } from "@/data/teams";
import { getReportsForTeam } from "@/data/reports";
import { localized } from "@/lib/utils";
import TierBadge from "@/components/TierBadge";
import ReportCard from "@/components/ReportCard";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const params: { locale: string; team: string }[] = [];
  for (const locale of locales) {
    for (const team of clubTeams) {
      params.push({ locale, team: team.slug });
    }
  }
  return params;
}

export default async function ClubTeamPage({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: teamSlug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const team = getTeamBySlug(teamSlug);
  if (!team || team.mode !== "club") return notFound();

  const teamReports = getReportsForTeam(team.slug);
  const tierLabel = dict.tiers[String(team.tier) as keyof typeof dict.tiers];

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className={styles.titleRow}>
            <span className={styles.flag}>{team.flag}</span>
            <h1>{localized(team.name, loc)}</h1>
          </div>
          <div className={styles.metaRow}>
            <span>{team.competition.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
          </div>
          <TierBadge tier={team.tier} label={tierLabel} />
        </div>
      </section>

      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      <section className={styles.reports}>
        <div className="container">
          <h2>{dict.team.reports}</h2>
          {teamReports.length > 0 ? (
            <div className={styles.reportsList}>
              {teamReports.map((report, i) => (
                <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
              ))}
            </div>
          ) : (
            <div className={styles.comingSoon}>
              <p>{dict.team.comingSoon}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
