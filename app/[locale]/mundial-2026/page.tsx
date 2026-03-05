import { getDictionary, Locale } from "@/lib/i18n";
import { getTeamsByGroup, groups, toTeam } from "@/lib/queries";
import { daysUntilWorldCup, t } from "@/lib/utils";
import MundialFilters from "@/components/MundialFilters";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function MundialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const days = daysUntilWorldCup();

  const groupsData = await Promise.all(
    groups.map(async (letter) => {
      const rows = await getTeamsByGroup(letter);
      return { letter, teams: rows.map(toTeam) };
    })
  );

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{dict.mundial.title}</h1>
          <p className={styles.subtitle}>{dict.mundial.subtitle}</p>
          {days > 0 && (
            <div className={styles.countdown}>
              ⏱ {t(dict.hero.countdown, { days })}
            </div>
          )}
        </div>
      </section>

      <hr className="editorial-rule" style={{ margin: "0 auto 40px", maxWidth: 960 }} />

      {/* Groups Grid with Filters */}
      <section className={styles.groups}>
        <div className="container">
          <MundialFilters
            groups={groupsData}
            locale={loc}
            groupLabel={dict.mundial.group}
            teamDict={dict.team}
            tierLabels={dict.tiers}
            filterDict={dict.mundial.filters}
          />
        </div>
      </section>
    </>
  );
}
