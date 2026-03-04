import Link from "next/link";
import { daysUntilWorldCup, t } from "@/lib/utils";
import styles from "./HeroSection.module.css";

interface HeroProps {
  locale: string;
  dict: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      countdown: string;
    };
  };
}

export default function HeroSection({ locale, dict }: HeroProps) {
  const days = daysUntilWorldCup();

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.accentLine} />
        <h1 className={styles.title}>{dict.hero.title}</h1>
        <p className={styles.subtitle}>{dict.hero.subtitle}</p>

        {days > 0 && (
          <div className={styles.countdown}>
            <span className={styles.countdownIcon}>⏱</span>
            {t(dict.hero.countdown, { days })}
          </div>
        )}

        <Link href={`/${locale}/mundial-2026`} className={styles.cta}>
          {dict.hero.cta} →
        </Link>
      </div>
    </section>
  );
}
