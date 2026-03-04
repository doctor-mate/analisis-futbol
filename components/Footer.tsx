import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  locale: string;
  dict: {
    footer: {
      brand: string;
      tagline: string;
      rights: string;
      methodology: string;
    };
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.monogram}>A</span>
          <div>
            <div className={styles.brandName}>{dict.footer.brand}</div>
            <div className={styles.tagline}>{dict.footer.tagline}</div>
          </div>
        </div>

        <div className={styles.links}>
          <Link href={`/${locale}/mundial-2026`}>Mundial 2026</Link>
          <Link href={`/${locale}/clubes`}>{locale === "es" ? "Clubes" : "Clubs"}</Link>
          <Link href={`/${locale}/metodologia`}>{dict.footer.methodology}</Link>
        </div>

        <div className={styles.copy}>{dict.footer.rights}</div>
      </div>
    </footer>
  );
}
