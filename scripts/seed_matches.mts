/**
 * Seed World Cup 2026 group stage matches into Supabase.
 *
 * Uses the official FIFA match schedule (72 group stage matches).
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

// Official FIFA World Cup 2026 group stage schedule
// Source: https://sports.yahoo.com/soccer/live/2026-world-cup-schedule
// Team slugs must match the 'slug' column in the teams table.
// Playoff teams use their placeholder slugs.

interface MatchDef {
  home: string;
  away: string;
  date: string;
  time: string; // ET
  venue: string;
  city: string;
  group: string;
}

const schedule: MatchDef[] = [
  // === GROUP A ===
  { home: "mexico", away: "south-africa", date: "2026-06-11", time: "15:00", venue: "Estadio Azteca", city: "Ciudad de México", group: "A" },
  { home: "south-korea", away: "uefa-playoff-d", date: "2026-06-11", time: "22:00", venue: "Estadio Akron", city: "Guadalajara", group: "A" },
  { home: "uefa-playoff-d", away: "south-africa", date: "2026-06-18", time: "12:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "A" },
  { home: "mexico", away: "south-korea", date: "2026-06-18", time: "21:00", venue: "Estadio Akron", city: "Guadalajara", group: "A" },
  { home: "uefa-playoff-d", away: "mexico", date: "2026-06-24", time: "21:00", venue: "Estadio Azteca", city: "Ciudad de México", group: "A" },
  { home: "south-africa", away: "south-korea", date: "2026-06-24", time: "21:00", venue: "Estadio BBVA", city: "Monterrey", group: "A" },

  // === GROUP B ===
  { home: "canada", away: "uefa-playoff-a", date: "2026-06-12", time: "15:00", venue: "BMO Field", city: "Toronto", group: "B" },
  { home: "qatar", away: "switzerland", date: "2026-06-13", time: "15:00", venue: "Levi's Stadium", city: "Santa Clara", group: "B" },
  { home: "switzerland", away: "uefa-playoff-a", date: "2026-06-18", time: "15:00", venue: "SoFi Stadium", city: "Inglewood", group: "B" },
  { home: "canada", away: "qatar", date: "2026-06-18", time: "18:00", venue: "BC Place", city: "Vancouver", group: "B" },
  { home: "switzerland", away: "canada", date: "2026-06-24", time: "15:00", venue: "BC Place", city: "Vancouver", group: "B" },
  { home: "uefa-playoff-a", away: "qatar", date: "2026-06-24", time: "15:00", venue: "Lumen Field", city: "Seattle", group: "B" },

  // === GROUP C ===
  { home: "brazil", away: "morocco", date: "2026-06-13", time: "18:00", venue: "MetLife Stadium", city: "East Rutherford", group: "C" },
  { home: "haiti", away: "scotland", date: "2026-06-13", time: "21:00", venue: "Gillette Stadium", city: "Foxboro", group: "C" },
  { home: "scotland", away: "morocco", date: "2026-06-19", time: "18:00", venue: "Gillette Stadium", city: "Foxboro", group: "C" },
  { home: "brazil", away: "haiti", date: "2026-06-19", time: "21:00", venue: "Lincoln Financial Field", city: "Philadelphia", group: "C" },
  { home: "scotland", away: "brazil", date: "2026-06-24", time: "18:00", venue: "Hard Rock Stadium", city: "Miami", group: "C" },
  { home: "morocco", away: "haiti", date: "2026-06-24", time: "18:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "C" },

  // === GROUP D ===
  { home: "united-states", away: "paraguay", date: "2026-06-12", time: "21:00", venue: "SoFi Stadium", city: "Inglewood", group: "D" },
  { home: "australia", away: "uefa-playoff-c", date: "2026-06-13", time: "00:00", venue: "BC Place", city: "Vancouver", group: "D" },
  { home: "uefa-playoff-c", away: "paraguay", date: "2026-06-19", time: "00:00", venue: "Levi's Stadium", city: "Santa Clara", group: "D" },
  { home: "united-states", away: "australia", date: "2026-06-19", time: "15:00", venue: "Lumen Field", city: "Seattle", group: "D" },
  { home: "uefa-playoff-c", away: "united-states", date: "2026-06-25", time: "22:00", venue: "SoFi Stadium", city: "Inglewood", group: "D" },
  { home: "paraguay", away: "australia", date: "2026-06-25", time: "22:00", venue: "Levi's Stadium", city: "Santa Clara", group: "D" },

  // === GROUP E ===
  { home: "germany", away: "curacao", date: "2026-06-14", time: "13:00", venue: "NRG Stadium", city: "Houston", group: "E" },
  { home: "ivory-coast", away: "ecuador", date: "2026-06-14", time: "19:00", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E" },
  { home: "germany", away: "ivory-coast", date: "2026-06-20", time: "16:00", venue: "BMO Field", city: "Toronto", group: "E" },
  { home: "ecuador", away: "curacao", date: "2026-06-20", time: "20:00", venue: "Arrowhead Stadium", city: "Kansas City", group: "E" },
  { home: "curacao", away: "ivory-coast", date: "2026-06-25", time: "16:00", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E" },
  { home: "ecuador", away: "germany", date: "2026-06-25", time: "16:00", venue: "MetLife Stadium", city: "East Rutherford", group: "E" },

  // === GROUP F ===
  { home: "netherlands", away: "japan", date: "2026-06-14", time: "16:00", venue: "AT&T Stadium", city: "Arlington", group: "F" },
  { home: "uefa-playoff-b", away: "tunisia", date: "2026-06-14", time: "22:00", venue: "Estadio BBVA", city: "Monterrey", group: "F" },
  { home: "netherlands", away: "uefa-playoff-b", date: "2026-06-20", time: "13:00", venue: "NRG Stadium", city: "Houston", group: "F" },
  { home: "tunisia", away: "japan", date: "2026-06-20", time: "00:00", venue: "Estadio BBVA", city: "Monterrey", group: "F" },
  { home: "japan", away: "uefa-playoff-b", date: "2026-06-25", time: "19:00", venue: "AT&T Stadium", city: "Arlington", group: "F" },
  { home: "tunisia", away: "netherlands", date: "2026-06-25", time: "19:00", venue: "Arrowhead Stadium", city: "Kansas City", group: "F" },

  // === GROUP G ===
  { home: "belgium", away: "egypt", date: "2026-06-15", time: "15:00", venue: "Lumen Field", city: "Seattle", group: "G" },
  { home: "iran", away: "new-zealand", date: "2026-06-15", time: "21:00", venue: "SoFi Stadium", city: "Inglewood", group: "G" },
  { home: "belgium", away: "iran", date: "2026-06-21", time: "15:00", venue: "SoFi Stadium", city: "Inglewood", group: "G" },
  { home: "new-zealand", away: "egypt", date: "2026-06-21", time: "21:00", venue: "BC Place", city: "Vancouver", group: "G" },
  { home: "egypt", away: "iran", date: "2026-06-26", time: "23:00", venue: "Lumen Field", city: "Seattle", group: "G" },
  { home: "new-zealand", away: "belgium", date: "2026-06-26", time: "23:00", venue: "BC Place", city: "Vancouver", group: "G" },

  // === GROUP H ===
  { home: "spain", away: "cape-verde", date: "2026-06-15", time: "12:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H" },
  { home: "saudi-arabia", away: "uruguay", date: "2026-06-15", time: "18:00", venue: "Hard Rock Stadium", city: "Miami", group: "H" },
  { home: "spain", away: "saudi-arabia", date: "2026-06-21", time: "12:00", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H" },
  { home: "uruguay", away: "cape-verde", date: "2026-06-21", time: "18:00", venue: "Hard Rock Stadium", city: "Miami", group: "H" },
  { home: "cape-verde", away: "saudi-arabia", date: "2026-06-26", time: "20:00", venue: "NRG Stadium", city: "Houston", group: "H" },
  { home: "uruguay", away: "spain", date: "2026-06-26", time: "20:00", venue: "Estadio Akron", city: "Guadalajara", group: "H" },

  // === GROUP I ===
  { home: "france", away: "senegal", date: "2026-06-16", time: "15:00", venue: "MetLife Stadium", city: "East Rutherford", group: "I" },
  { home: "intercon-playoff-2", away: "norway", date: "2026-06-16", time: "18:00", venue: "Gillette Stadium", city: "Foxborough", group: "I" },
  { home: "france", away: "intercon-playoff-2", date: "2026-06-22", time: "17:00", venue: "Lincoln Financial Field", city: "Philadelphia", group: "I" },
  { home: "norway", away: "senegal", date: "2026-06-22", time: "20:00", venue: "MetLife Stadium", city: "East Rutherford", group: "I" },
  { home: "norway", away: "france", date: "2026-06-26", time: "15:00", venue: "Gillette Stadium", city: "Foxborough", group: "I" },
  { home: "senegal", away: "intercon-playoff-2", date: "2026-06-26", time: "15:00", venue: "BMO Field", city: "Toronto", group: "I" },

  // === GROUP J ===
  { home: "argentina", away: "algeria", date: "2026-06-16", time: "21:00", venue: "Arrowhead Stadium", city: "Kansas City", group: "J" },
  { home: "austria", away: "jordan", date: "2026-06-16", time: "00:00", venue: "Levi's Stadium", city: "Santa Clara", group: "J" },
  { home: "argentina", away: "austria", date: "2026-06-22", time: "13:00", venue: "AT&T Stadium", city: "Arlington", group: "J" },
  { home: "jordan", away: "algeria", date: "2026-06-22", time: "23:00", venue: "Levi's Stadium", city: "Santa Clara", group: "J" },
  { home: "jordan", away: "argentina", date: "2026-06-27", time: "22:00", venue: "AT&T Stadium", city: "Arlington", group: "J" },
  { home: "algeria", away: "austria", date: "2026-06-27", time: "22:00", venue: "Arrowhead Stadium", city: "Kansas City", group: "J" },

  // === GROUP K ===
  { home: "portugal", away: "intercon-playoff-1", date: "2026-06-17", time: "13:00", venue: "NRG Stadium", city: "Houston", group: "K" },
  { home: "uzbekistan", away: "colombia", date: "2026-06-17", time: "22:00", venue: "Estadio Azteca", city: "Ciudad de México", group: "K" },
  { home: "portugal", away: "uzbekistan", date: "2026-06-23", time: "13:00", venue: "NRG Stadium", city: "Houston", group: "K" },
  { home: "colombia", away: "intercon-playoff-1", date: "2026-06-23", time: "22:00", venue: "Estadio Akron", city: "Guadalajara", group: "K" },
  { home: "colombia", away: "portugal", date: "2026-06-27", time: "19:30", venue: "Hard Rock Stadium", city: "Miami", group: "K" },
  { home: "intercon-playoff-1", away: "uzbekistan", date: "2026-06-27", time: "19:30", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "K" },

  // === GROUP L ===
  { home: "england", away: "croatia", date: "2026-06-17", time: "16:00", venue: "AT&T Stadium", city: "Arlington", group: "L" },
  { home: "ghana", away: "panama", date: "2026-06-17", time: "19:00", venue: "BMO Field", city: "Toronto", group: "L" },
  { home: "england", away: "ghana", date: "2026-06-23", time: "16:00", venue: "Gillette Stadium", city: "Foxborough", group: "L" },
  { home: "panama", away: "croatia", date: "2026-06-23", time: "19:00", venue: "BMO Field", city: "Toronto", group: "L" },
  { home: "panama", away: "england", date: "2026-06-27", time: "17:00", venue: "MetLife Stadium", city: "East Rutherford", group: "L" },
  { home: "croatia", away: "ghana", date: "2026-06-27", time: "17:00", venue: "Lincoln Financial Field", city: "Philadelphia", group: "L" },
];

async function seed() {
  console.log("\nSeeding World Cup 2026 group stage matches (official schedule)...\n");

  // First, delete existing matches to avoid conflicts
  const { error: deleteError } = await supabase
    .from("matches")
    .delete()
    .eq("competition_slug", "mundial-2026");

  if (deleteError) {
    console.error("Error clearing existing matches:", deleteError.message);
  } else {
    console.log("  Cleared existing matches\n");
  }

  const matches = schedule.map((m, i) => ({
    slug: `${m.home}-vs-${m.away}-group-${m.group.toLowerCase()}`,
    competition_slug: "mundial-2026",
    stage: "group",
    group_letter: m.group,
    match_number: i + 1,
    match_date: m.date,
    match_time: m.time,
    venue: m.venue,
    city: m.city,
    home_team_slug: m.home,
    away_team_slug: m.away,
    status: "scheduled",
  }));

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
