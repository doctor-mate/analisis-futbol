import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";
import {
  getNationalTeams,
  getClubTeams,
  getTeamsByGroup,
  toTeam,
  groups,
} from "@/lib/queries";
import { localized } from "@/lib/utils";
import HeroSection from "@/components/HeroSection";
import TeamCard from "@/components/TeamCard";
import ProgressGrid from "@/components/ProgressGrid";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  // All national teams
  const allTeams = await getNationalTeams();
  const nationalTeams = allTeams.filter((t) => t.status !== "playoff_pending").map(toTeam);

  // Featured teams
  const featured = ["argentina", "brazil", "spain"]
    .map((slug) => allTeams.find((t) => t.slug === slug))
    .filter(Boolean)
    .map((row) => toTeam(row!));

  // Club teams
  const clubRows = await getClubTeams();
  const clubs = clubRows.map(toTeam);

  function getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      available: dict.team.available,
      coming_soon: dict.team.comingSoon,
      playoff_pending: dict.team.playoffPending,
    };
    return map[status] || status;
  }

  return (
    <>
      <HeroSection locale={locale} dict={dict} />

      {/* Diamond separator */}
      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Featured Reports */}
      <section className={styles.section}>
        <div className="container">
          <h2>{dict.home.featured}</h2>
          <div className={styles.featuredGrid}>
            {featured.map((team) => (
              <TeamCard
                key={team.slug}
                team={team}
                locale={loc}
                tierLabel={dict.tiers[String(team.tier) as keyof typeof dict.tiers]}
                statusLabel={getStatusLabel(team.status)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Diamond separator */}
      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Progress Dashboard */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.progressRow}>
            <ProgressGrid
              teams={nationalTeams}
              locale={loc}
              title={dict.home.progress}
              total={48}
            />
            {clubs.length > 0 && (
              <ProgressGrid
                teams={clubs}
                locale={loc}
                title={dict.home.progressClubs}
                total={clubs.length}
              />
            )}
          </div>
        </div>
      </section>

      {/* Diamond separator */}
      <div className="container">
        <div className="diamond-separator">
          <div className="diamond" />
        </div>
      </div>

      {/* Quick View: Mundial 2026 Groups */}
      <section className={styles.section}>
        <div className="container">
          <h2>{dict.home.quickView}</h2>
          <div className={styles.groupsMini}>
            {await Promise.all(
              groups.map(async (letter) => {
                const groupRows = await getTeamsByGroup(letter);
                const groupTeams = groupRows.map(toTeam);
                return (
                  <div key={letter} className={styles.groupMini}>
                    <div className={styles.groupLetter}>{letter}</div>
                    <div className={styles.groupFlags}>
                      {groupTeams.map((t) => (
                        <span key={t.slug} title={localized(t.name, loc)}>
                          {t.flag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href={`/${locale}/mundial-2026`} className={styles.viewAll}>
              {dict.home.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Clubs section */}
      {clubs.length > 0 && (
        <>
          <div className="container">
            <div className="diamond-separator">
              <div className="diamond" />
            </div>
          </div>
          <section className={styles.section}>
            <div className="container">
              <h2>{dict.home.clubes}</h2>
              <div className={styles.featuredGrid}>
                {clubs.map((team) => (
                  <TeamCard
                    key={team.slug}
                    team={team}
                    locale={loc}
                    tierLabel={dict.tiers[String(team.tier) as keyof typeof dict.tiers]}
                    statusLabel={getStatusLabel(team.status)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
