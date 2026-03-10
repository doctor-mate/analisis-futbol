import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";
import { getClubTeams, toTeam } from "@/lib/queries";
import styles from "./page.module.css";

export const revalidate = 3600;

const competitionMeta: Record<
  string,
  { label: string; country: string; flag: string }
> = {
  "laliga-2025-26": { label: "LaLiga 2025-26", country: "España", flag: "🇪🇸" },
  "premier-league-2025-26": { label: "Premier League 2025-26", country: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  "serie-a-2025-26": { label: "Serie A 2025-26", country: "Italia", flag: "🇮🇹" },
  "bundesliga-2025-26": { label: "Bundesliga 2025-26", country: "Alemania", flag: "🇩🇪" },
  "ligue-1-2025-26": { label: "Ligue 1 2025-26", country: "Francia", flag: "🇫🇷" },
};

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

  // Only show leagues that have at least one team with a report (status: available)
  const leaguesWithReports = new Map<string, number>();
  for (const team of clubTeams) {
    if (team.status === "available") {
      leaguesWithReports.set(
        team.competition,
        (leaguesWithReports.get(team.competition) ?? 0) + 1
      );
    }
  }

  const leagues = Array.from(leaguesWithReports.entries());

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{dict.clubes.title}</h1>
          <p className={styles.subtitle}>{dict.clubes.subtitle}</p>
        </div>
      </section>

      <hr
        className="editorial-rule"
        style={{ margin: "0 auto 40px", maxWidth: 960 }}
      />

      <section className={styles.leagues}>
        <div className="container">
          {leagues.length > 0 ? (
            <div className={styles.leagueGrid}>
              {leagues.map(([comp, count]) => {
                const meta = competitionMeta[comp];
                return (
                  <Link
                    key={comp}
                    href={`/${locale}/clubes/${comp}`}
                    className={styles.leagueCard}
                  >
                    <span className={styles.leagueFlag}>
                      {meta?.flag ?? "🏳️"}
                    </span>
                    <span className={styles.leagueName}>
                      {meta?.label ?? comp}
                    </span>
                    <span className={styles.leagueCount}>
                      {count} {count === 1
                        ? (loc === "es" ? "informe" : "report")
                        : (loc === "es" ? "informes" : "reports")}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.upcoming}>
              <p>
                {loc === "es"
                  ? "Informes de clubes — Pr\u00f3ximamente"
                  : "Club reports — Coming soon"}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
