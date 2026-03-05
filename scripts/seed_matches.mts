/**
 * Seed World Cup 2026 group stage matches into Supabase.
 *
 * Generates all 72 group stage matches from the 12 groups,
 * with placeholder dates (June 11-28, 2026).
 *
 * Usage:
 *   npx tsx scripts/seed_matches.mts
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// ---- Load .env.local ----
const envPath = new URL("../.env.local", import.meta.url);
const envFile = readFileSync(envPath, "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Matchday dates (approximate schedule for WC2026)
// Group stage: June 11 - June 28, 2026
// 72 matches across 18 days = ~4 matches per day
const MD1_START = "2026-06-11";
const MD2_START = "2026-06-18";
const MD3_START = "2026-06-24";

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function seed() {
  console.log("\nSeeding World Cup 2026 group stage matches...\n");

  // Fetch all national teams with WC group
  const { data: teams, error } = await supabase
    .from("teams")
    .select("slug, wc_group, name_en, flag")
    .eq("mode", "national")
    .not("wc_group", "is", null)
    .order("wc_group")
    .order("fifa_ranking", { ascending: true });

  if (error || !teams) {
    console.error("Error fetching teams:", error?.message);
    process.exit(1);
  }

  // Group teams by their WC group
  const groupTeams = new Map<string, typeof teams>();
  for (const team of teams) {
    const group = team.wc_group!;
    const existing = groupTeams.get(group) || [];
    existing.push(team);
    groupTeams.set(group, existing);
  }

  const matches: Array<{
    slug: string;
    competition_slug: string;
    stage: string;
    group_letter: string;
    match_number: number;
    match_date: string;
    home_team_slug: string;
    away_team_slug: string;
    status: string;
  }> = [];

  let matchNumber = 1;
  let groupIndex = 0;

  for (const [group, groupMembers] of groupTeams) {
    if (groupMembers.length < 4) {
      console.warn(`  Group ${group} has ${groupMembers.length} teams, skipping...`);
      continue;
    }

    const [t1, t2, t3, t4] = groupMembers;

    // Matchday 1: T1 vs T2, T3 vs T4
    // Matchday 2: T1 vs T3, T2 vs T4
    // Matchday 3: T1 vs T4, T2 vs T3
    const groupMatches = [
      { home: t1, away: t2, md: 1 },
      { home: t3, away: t4, md: 1 },
      { home: t1, away: t3, md: 2 },
      { home: t2, away: t4, md: 2 },
      { home: t1, away: t4, md: 3 },
      { home: t2, away: t3, md: 3 },
    ];

    for (const gm of groupMatches) {
      const dateBase =
        gm.md === 1 ? MD1_START : gm.md === 2 ? MD2_START : MD3_START;
      // Stagger groups across days within each matchday
      const dayOffset = Math.floor(groupIndex / 2);
      const matchDate = addDays(dateBase, dayOffset);

      const slug = `${gm.home.slug}-vs-${gm.away.slug}-group-${group.toLowerCase()}`;

      matches.push({
        slug,
        competition_slug: "mundial-2026",
        stage: "group",
        group_letter: group,
        match_number: matchNumber++,
        match_date: matchDate,
        home_team_slug: gm.home.slug,
        away_team_slug: gm.away.slug,
        status: "scheduled",
      });
    }

    groupIndex++;
  }

  console.log(`  Generated ${matches.length} group stage matches\n`);

  // Insert in batches
  const BATCH_SIZE = 20;
  let inserted = 0;

  for (let i = 0; i < matches.length; i += BATCH_SIZE) {
    const batch = matches.slice(i, i + BATCH_SIZE);
    const { error: insertError } = await supabase
      .from("matches")
      .upsert(batch, { onConflict: "slug" });

    if (insertError) {
      console.error(`  Error inserting batch: ${insertError.message}`);
      // Continue with next batch
    } else {
      inserted += batch.length;
      console.log(`  Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} matches`);
    }
  }

  console.log(`\n  Total inserted: ${inserted} matches`);
  console.log("\nDone!\n");
}

seed().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
