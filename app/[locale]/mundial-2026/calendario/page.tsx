import { getDictionary, Locale } from "@/lib/i18n";
import {
  getMatchesByDate,
  getTeamBySlug,
  toMatch,
  toTeam,
} from "@/lib/queries";
import MatchCard from "@/components/MatchCard";
import styles from "./page.module.css";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "es"
        ? "Calendario — Mundial 2026 | Soy Analista"
        : "Schedule — World Cup 2026 | Soy Analista",
    description:
      locale === "es"
        ? "Calendario completo del Mundial 2026. Partidos, fechas, sedes y análisis tácticos."
        : "Full World Cup 2026 schedule. Matches, dates, venues and tactical analysis.",
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const matchRows = await getMatchesByDate();
  const matches = matchRows.map(toMatch);

  // Group matches by date
  const matchesByDate = new Map<string, typeof matches>();
  for (const match of matches) {
    const existing = matchesByDate.get(match.date) || [];
    existing.push(match);
    matchesByDate.set(match.date, existing);
  }

  // Resolve team data for all unique team slugs
  const teamSlugs = new Set<string>();
  for (const match of matches) {
    if (match.homeTeamSlug) teamSlugs.add(match.homeTeamSlug);
    if (match.awayTeamSlug) teamSlugs.add(match.awayTeamSlug);
  }

  const teamMap = new Map<string, ReturnType<typeof toTeam>>();
  for (const slug of teamSlugs) {
    const row = await getTeamBySlug(slug);
    if (row) teamMap.set(slug, toTeam(row));
  }

  const matchLabels = {
    group: dict.team.group,
    scheduled: dict.matches.scheduled,
    prematchReady: dict.matches.prematchReady,
    completed: dict.matches.completed,
    postmatchReady: dict.matches.postmatchReady,
    viewMatch: dict.matches.viewMatch,
  };

  function formatDateHeader(dateStr: string): string {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString(loc === "es" ? "es-ES" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{dict.matches.calendar}</h1>
          <p className={styles.subtitle}>
            {dict.matches.calendarSubtitle}
          </p>
        </div>
      </section>

      <hr className="editorial-rule" style={{ margin: "0 auto 40px", maxWidth: 960 }} />

      <section className={styles.calendar}>
        <div className="container">
          {matches.length === 0 ? (
            <div className={styles.empty}>
              <p>{dict.matches.noMatches}</p>
            </div>
          ) : (
            <div className={styles.dateGroups}>
              {Array.from(matchesByDate.entries()).map(([date, dayMatches]) => (
                <div key={date} className={styles.dateGroup}>
                  <h2 className={styles.dateHeader}>{formatDateHeader(date)}</h2>
                  <div className={styles.matchList}>
                    {dayMatches.map((match) => (
                      <MatchCard
                        key={match.slug}
                        match={match}
                        homeTeam={match.homeTeamSlug ? teamMap.get(match.homeTeamSlug) : undefined}
                        awayTeam={match.awayTeamSlug ? teamMap.get(match.awayTeamSlug) : undefined}
                        locale={loc}
                        labels={matchLabels}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
