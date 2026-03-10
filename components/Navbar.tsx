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
    nav: {
      mundial: string;
      equipos: string;
      clubes: string;
      calendario: string;
      jugadores: string;
      about: string;
    };
    search?: { placeholder: string };
  };
  searchTeams?: SearchTeam[];
}

export default function Navbar({ locale, dict, searchTeams }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const otherLocale = locale === "es" ? "en" : "es";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const mundialHref = `/${locale}/mundial-2026`;
  const isMundialActive = pathname.startsWith(mundialHref);

  const navLinks = [
    { href: `/${locale}/clubes`, label: dict.nav.clubes },
    { href: `/${locale}/jugadores`, label: dict.nav.jugadores },
    { href: `/${locale}/sobre`, label: dict.nav.about },
  ];

  const mundialSubLinks = [
    { href: mundialHref, label: dict.nav.equipos, exact: true },
    { href: `${mundialHref}/calendario`, label: dict.nav.calendario },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.brand}>
          <span className={styles.monogram}>A</span>
          <span className={styles.brandName}>Soy Analista</span>
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {/* Mundial 2026 dropdown */}
          <div
            className={styles.dropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href={mundialHref}
              className={`${styles.link} ${isMundialActive ? styles.active : ""}`}
              onClick={() => {
                setDropdownOpen(false);
                setMenuOpen(false);
              }}
            >
              {dict.nav.mundial}
              <span className={styles.caret}>▾</span>
            </Link>
            {/* Desktop dropdown */}
            <div
              className={`${styles.dropdownMenu} ${dropdownOpen ? styles.dropdownOpen : ""}`}
            >
              {mundialSubLinks.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`${styles.dropdownItem} ${
                    sub.exact
                      ? pathname === sub.href
                        ? styles.active
                        : ""
                      : pathname.startsWith(sub.href)
                        ? styles.active
                        : ""
                  }`}
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
            {/* Mobile sub-links (inline) */}
            <div className={styles.mobileSubLinks}>
              {mundialSubLinks.slice(1).map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`${styles.link} ${styles.subLink} ${
                    pathname.startsWith(sub.href) ? styles.active : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Regular nav links */}
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
