import { getDictionary, Locale } from "@/lib/i18n";
import { getTeamsByGroup, groups } from "@/data/teams";
import { daysUntilWorldCup, t } from "@/lib/utils";
import GroupGrid from "@/components/GroupGrid";
import styles from "./page.module.css";

export default async function MundialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const days = daysUntilWorldCup();

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

      {/* Groups Grid */}
      <section className={styles.groups}>
        <div className="container">
          {groups.map((letter) => (
            <GroupGrid
              key={letter}
              letter={letter}
              teams={getTeamsByGroup(letter)}
              locale={loc}
              groupLabel={dict.mundial.group}
              dict={dict.team}
              tierLabels={dict.tiers}
            />
          ))}
        </div>
      </section>
    </>
  );
}
