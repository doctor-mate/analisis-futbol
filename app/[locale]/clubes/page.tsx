import { getDictionary, Locale } from "@/lib/i18n";
import { getClubTeams, toTeam } from "@/lib/queries";
import TeamCard from "@/components/TeamCard";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function ClubesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const clubRows = await getClubTeams();
  const clubTeams = clubRows.map(toTeam);

  // Group clubs by competition
  const competitions = new Map<string, typeof clubTeams>();
  for (const team of clubTeams) {
    const key = team.competition;
    if (!competitions.has(key)) competitions.set(key, []);
    competitions.get(key)!.push(team);
  }

  const competitionLabels: Record<string, { es: string; en: string }> = {
    "laliga-2025-26": { es: "LaLiga 2025-26", en: "LaLiga 2025-26" },
    "premier-league-2025-26": { es: "Premier League 2025-26", en: "Premier League 2025-26" },
    "serie-a-2025-26": { es: "Serie A 2025-26", en: "Serie A 2025-26" },
    "bundesliga-2025-26": { es: "Bundesliga 2025-26", en: "Bundesliga 2025-26" },
    "ligue-1-2025-26": { es: "Ligue 1 2025-26", en: "Ligue 1 2025-26" },
  };

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{dict.clubes.title}</h1>
          <p className={styles.subtitle}>{dict.clubes.subtitle}</p>
        </div>
      </section>

      <hr className="editorial-rule" style={{ margin: "0 auto 40px", maxWidth: 960 }} />

      <section className={styles.leagues}>
        <div className="container">
          {Array.from(competitions.entries()).map(([comp, compTeams]) => (
            <div key={comp} className={styles.leagueBlock}>
              <h2>{competitionLabels[comp]?.[loc] || comp}</h2>
              <div className={styles.grid}>
                {compTeams.map((team) => (
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
          ))}

          {competitions.size === 0 && (
            <div className={styles.upcoming}>
              <p>
                {loc === "es"
                  ? "Informes de clubes — Próximamente"
                  : "Club reports — Coming soon"}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
