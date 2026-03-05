"use client";

import { useState } from "react";
import { Team } from "@/data/types";
import { Locale } from "@/lib/i18n";
import GroupGrid from "./GroupGrid";
import styles from "./MundialFilters.module.css";

interface FilterDict {
  all: string;
  available: string;
  comingSoon: string;
  tier: string;
  confederation: string;
}

interface MundialFiltersProps {
  groups: { letter: string; teams: Team[] }[];
  locale: Locale;
  groupLabel: string;
  teamDict: Record<string, string>;
  tierLabels: Record<string, string>;
  filterDict: FilterDict;
}

type StatusFilter = "all" | "available" | "coming_soon";
type TierFilter = "all" | "1" | "2" | "3";
type ConfFilter = string;

const CONFEDERATIONS = ["CONMEBOL", "UEFA", "CAF", "AFC", "CONCACAF", "OFC"];

export default function MundialFilters({
  groups,
  locale,
  groupLabel,
  teamDict,
  tierLabels,
  filterDict,
}: MundialFiltersProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [tier, setTier] = useState<TierFilter>("all");
  const [conf, setConf] = useState<ConfFilter>("all");

  const hasFilters = status !== "all" || tier !== "all" || conf !== "all";

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      teams: g.teams.filter((t) => {
        if (status !== "all" && t.status !== status) return false;
        if (tier !== "all" && String(t.tier) !== tier) return false;
        if (conf !== "all" && t.confederation !== conf) return false;
        return true;
      }),
    }))
    .filter((g) => g.teams.length > 0);

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <button
            className={`${styles.chip} ${status === "all" ? styles.active : ""}`}
            onClick={() => setStatus("all")}
          >
            {filterDict.all}
          </button>
          <button
            className={`${styles.chip} ${status === "available" ? styles.active : ""}`}
            onClick={() => setStatus("available")}
          >
            {filterDict.available}
          </button>
          <button
            className={`${styles.chip} ${status === "coming_soon" ? styles.active : ""}`}
            onClick={() => setStatus("coming_soon")}
          >
            {filterDict.comingSoon}
          </button>
        </div>

        <div className={styles.filterGroup}>
          <select
            className={styles.select}
            value={tier}
            onChange={(e) => setTier(e.target.value as TierFilter)}
          >
            <option value="all">{filterDict.tier}: {filterDict.all}</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>

          <select
            className={styles.select}
            value={conf}
            onChange={(e) => setConf(e.target.value)}
          >
            <option value="all">{filterDict.confederation}: {filterDict.all}</option>
            {CONFEDERATIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            className={styles.clear}
            onClick={() => { setStatus("all"); setTier("all"); setConf("all"); }}
          >
            ✕
          </button>
        )}
      </div>

      {filteredGroups.map((g) => (
        <GroupGrid
          key={g.letter}
          letter={g.letter}
          teams={g.teams}
          locale={locale}
          groupLabel={groupLabel}
          dict={teamDict}
          tierLabels={tierLabels}
        />
      ))}
    </>
  );
}
