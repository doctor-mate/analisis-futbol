"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";
import styles from "./Navbar.module.css";

interface SearchTeam {
  slug: string;
  name: string;
  flag: string;
  mode: "national" | "club";
  href: string;
}

interface NavbarProps {
  locale: string;
  dict: {
    nav: { mundial: string; clubes: string; calendario: string; about: string };
    search?: { placeholder: string };
  };
  searchTeams?: SearchTeam[];
}

export default function Navbar({ locale, dict, searchTeams }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "es" ? "en" : "es";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}/mundial-2026`, label: dict.nav.mundial },
    { href: `/${locale}/mundial-2026/calendario`, label: dict.nav.calendario },
    { href: `/${locale}/clubes`, label: dict.nav.clubes },
    { href: `/${locale}/sobre`, label: dict.nav.about },
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
          {searchTeams && (
            <SearchBar
              locale={locale}
              teams={searchTeams}
              placeholder={dict.search?.placeholder ?? "Search..."}
            />
          )}
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
