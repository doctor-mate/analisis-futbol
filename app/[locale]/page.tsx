import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";
import { teams, getTeamsByGroup, groups, clubTeams } from "@/data/teams";
import { getReportsForTeam } from "@/data/reports";
import { localized } from "@/lib/utils";
import HeroSection from "@/components/HeroSection";
import TeamCard from "@/components/TeamCard";
import styles from "./page.module.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  // Featured teams (those with reports available, or top Tier 1 teams)
  const featured = ["argentina", "brazil", "spain"].map(
    (slug) => teams.find((t) => t.slug === slug)!
  );

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
            {featured.map((team) => {
              const teamReports = getReportsForTeam(team.slug);
              return (
                <TeamCard
                  key={team.slug}
                  team={team}
                  locale={loc}
                  tierLabel={dict.tiers[String(team.tier) as keyof typeof dict.tiers]}
                  statusLabel={getStatusLabel(team.status)}
                />
              );
            })}
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
            {groups.map((letter) => {
              const groupTeams = getTeamsByGroup(letter);
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
            })}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href={`/${locale}/mundial-2026`} className={styles.viewAll}>
              {dict.home.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Clubs section */}
      {clubTeams.length > 0 && (
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
                {clubTeams.map((team) => (
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
