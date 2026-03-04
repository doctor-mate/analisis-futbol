"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  locale: string;
  dict: {
    nav: { mundial: string; clubes: string; metodologia: string };
  };
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "es" ? "en" : "es";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}/mundial-2026`, label: dict.nav.mundial },
    { href: `/${locale}/clubes`, label: dict.nav.clubes },
    { href: `/${locale}/metodologia`, label: dict.nav.metodologia },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.brand}>
          <span className={styles.monogram}>A</span>
          <span className={styles.brandName}>Soy Analista</span>
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                pathname.startsWith(link.href) ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href={switchPath} className={styles.langSwitch}>
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
