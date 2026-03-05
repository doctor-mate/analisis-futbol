"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.css";

interface SearchItem {
  slug: string;
  name: string;
  flag: string;
  mode: "national" | "club";
  href: string;
}

interface SearchBarProps {
  locale: string;
  teams: SearchItem[];
  placeholder: string;
}

export default function SearchBar({ locale, teams, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? teams.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {!open && (
        <button
          className={styles.trigger}
          onClick={() => setOpen(true)}
          aria-label="Search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}
      {open && (
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          {query.length >= 2 && (
            <div className={styles.dropdown}>
              {results.length === 0 ? (
                <div className={styles.empty}>—</div>
              ) : (
                results.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={styles.result}
                    onClick={() => { setOpen(false); setQuery(""); }}
                  >
                    <span className={styles.resultFlag}>{item.flag}</span>
                    <span className={styles.resultName}>{item.name}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
