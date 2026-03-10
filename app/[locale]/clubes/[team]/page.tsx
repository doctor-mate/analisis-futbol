import { notFound } from "next/navigation";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import {
  getClubTeams,
  getTeamBySlug,
  getReportsForTeam,
  toTeam,
  toReport,
} from "@/lib/queries";
import { localized } from "@/lib/utils";
import TierBadge from "@/components/TierBadge";
import ReportCard from "@/components/ReportCard";
import TeamCard from "@/components/TeamCard";
import teamStyles from "./page.module.css";
import parentStyles from "../page.module.css";

export const revalidate = 3600;

const competitionLabels: Record<string, { es: string; en: string }> = {
  "laliga-2025-26": { es: "LaLiga 2025-26", en: "LaLiga 2025-26" },
  "premier-league-2025-26": { es: "Premier League 2025-26", en: "Premier League 2025-26" },
  "serie-a-2025-26": { es: "Serie A 2025-26", en: "Serie A 2025-26" },
  "bundesliga-2025-26": { es: "Bundesliga 2025-26", en: "Bundesliga 2025-26" },
  "ligue-1-2025-26": { es: "Ligue 1 2025-26", en: "Ligue 1 2025-26" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: slug } = await params;

  // Competition page
  if (competitionLabels[slug]) {
    const label = competitionLabels[slug][locale as Locale];
    return {
      title: locale === "es"
        ? `${label} — Informes de Clubes | Soy Analista`
        : `${label} — Club Reports | Soy Analista`,
    };
  }

  // Team page
  const teamRow = await getTeamBySlug(slug);
  if (!teamRow) return {};

  const name = locale === "es" ? teamRow.name_es : teamRow.name_en;
  const comp = teamRow.competition_slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "";
  return {
    title: locale === "es"
      ? `${name} — Análisis de Oposición | ${comp} | Soy Analista`
      : `${name} — Opposition Analysis | ${comp} | Soy Analista`,
    description: locale === "es"
      ? `Informe táctico de ${name}, ${comp}.`
      : `Tactical analysis of ${name}, ${comp}.`,
  };
}

export async function generateStaticParams() {
  const clubs = await getClubTeams();
  const params: { locale: string; team: string }[] = [];

  // Collect competition slugs
  const competitions = new Set(clubs.map((c) => c.competition_slug).filter(Boolean));

  for (const locale of locales) {
    for (const team of clubs) {
      params.push({ locale, team: team.slug });
    }
    for (const comp of competitions) {
      if (comp) params.push({ locale, team: comp });
    }
  }
  return params;
}

export default async function ClubSlugPage({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: slug } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  // --- Competition page ---
  if (competitionLabels[slug]) {
    const label = competitionLabels[slug];
    const clubRows = await getClubTeams();
    const clubs = clubRows
      .map(toTeam)
      .filter((t) => t.competition === slug);

    if (clubs.length === 0) return notFound();

    return (
      <>
        <section className={parentStyles.header}>
          <div className="container">
            <div className="accent-line" style={{ marginBottom: 24 }} />
            <h1>{label[loc]}</h1>
          </div>
        </section>

        <hr
          className="editorial-rule"
          style={{ margin: "0 auto 40px", maxWidth: 960 }}
        />

        <section className={parentStyles.leagues}>
          <div className="container">
            <div className={parentStyles.grid}>
              {clubs.map((team) => (
                <TeamCard
                  key={team.slug}
                  team={team}
                  locale={loc}
                  tierLabel={dict.tiers[String(team.tier) as keyof typeof dict.tiers]}
                  statusLabel={
                    team.status === "available"
                      ? dict.team.available
                      : dict.team.comingSoon
                  }
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  // --- Team detail page ---
  const teamRow = await getTeamBySlug(slug);
  if (!teamRow || teamRow.mode !== "club") return notFound();

  const team = toTeam(teamRow);
  const reportRows = await getReportsForTeam(team.slug);
  const teamReports = reportRows
    .map(toReport)
    .filter((r) => r.type !== "player-profile" && r.type !== "newsletter");
  const tierLabel = dict.tiers[String(team.tier) as keyof typeof dict.tiers];

  return (
    <>
      <section className={teamStyles.header}>
        <div className="container">
          <div className={teamStyles.titleRow}>
            <span className={teamStyles.flag}>{team.flag}</span>
            <h1>{localized(team.name, loc)}</h1>
          </div>
          <div className={teamStyles.metaRow}>
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

      <section className={teamStyles.reports}>
        <div className="container">
          <h2>{dict.team.reports}</h2>
          {teamReports.length > 0 ? (
            <div className={teamStyles.reportsList}>
              {teamReports.map((report, i) => (
                <ReportCard key={i} report={report} locale={loc} labels={dict.team} />
              ))}
            </div>
          ) : (
            <div className={teamStyles.comingSoon}>
              <p>{dict.team.comingSoon}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
