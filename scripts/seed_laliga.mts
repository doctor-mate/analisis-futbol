/**
 * Seed LaLiga 2025-26 teams into Supabase
 *
 * Usage:
 *   npx tsx scripts/seed_laliga.mts
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Load .env.local
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// LaLiga 2025-26 — 20 teams
// Real Madrid already exists in DB; included here for upsert consistency
const laligaTeams = [
  { slug: "real-madrid", name_es: "Real Madrid CF", name_en: "Real Madrid CF", flag: "🇪🇸", confederation: "UEFA" as const, tier: 1 as const, status: "available" as const },
  { slug: "barcelona", name_es: "FC Barcelona", name_en: "FC Barcelona", flag: "🇪🇸", confederation: "UEFA" as const, tier: 1 as const, status: "coming_soon" as const },
  { slug: "atletico-madrid", name_es: "Atlético de Madrid", name_en: "Atlético de Madrid", flag: "🇪🇸", confederation: "UEFA" as const, tier: 1 as const, status: "coming_soon" as const },
  { slug: "athletic-club", name_es: "Athletic Club", name_en: "Athletic Club", flag: "🇪🇸", confederation: "UEFA" as const, tier: 2 as const, status: "coming_soon" as const },
  { slug: "real-sociedad", name_es: "Real Sociedad", name_en: "Real Sociedad", flag: "🇪🇸", confederation: "UEFA" as const, tier: 2 as const, status: "coming_soon" as const },
  { slug: "real-betis", name_es: "Real Betis", name_en: "Real Betis", flag: "🇪🇸", confederation: "UEFA" as const, tier: 2 as const, status: "coming_soon" as const },
  { slug: "villarreal", name_es: "Villarreal CF", name_en: "Villarreal CF", flag: "🇪🇸", confederation: "UEFA" as const, tier: 2 as const, status: "coming_soon" as const },
  { slug: "sevilla", name_es: "Sevilla FC", name_en: "Sevilla FC", flag: "🇪🇸", confederation: "UEFA" as const, tier: 2 as const, status: "coming_soon" as const },
  { slug: "girona", name_es: "Girona FC", name_en: "Girona FC", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "celta-vigo", name_es: "RC Celta de Vigo", name_en: "RC Celta de Vigo", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "valencia", name_es: "Valencia CF", name_en: "Valencia CF", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "osasuna", name_es: "CA Osasuna", name_en: "CA Osasuna", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "rayo-vallecano", name_es: "Rayo Vallecano", name_en: "Rayo Vallecano", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "mallorca", name_es: "RCD Mallorca", name_en: "RCD Mallorca", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "getafe", name_es: "Getafe CF", name_en: "Getafe CF", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "alaves", name_es: "Deportivo Alavés", name_en: "Deportivo Alavés", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "las-palmas", name_es: "UD Las Palmas", name_en: "UD Las Palmas", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "espanyol", name_es: "RCD Espanyol", name_en: "RCD Espanyol", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "leganes", name_es: "CD Leganés", name_en: "CD Leganés", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
  { slug: "valladolid", name_es: "Real Valladolid", name_en: "Real Valladolid", flag: "🇪🇸", confederation: "UEFA" as const, tier: 3 as const, status: "coming_soon" as const },
];

async function seed() {
  console.log("Seeding LaLiga 2025-26...\n");

  // 1. Ensure competition exists
  console.log("1. Upserting competition...");
  const { error: compError } = await supabase
    .from("competitions")
    .upsert({
      slug: "laliga-2025-26",
      name_es: "LaLiga 2025-26",
      name_en: "LaLiga 2025-26",
      type: "league",
      season: "2025-26",
      country: "Spain",
      confederation: "UEFA",
      active: true,
    }, { onConflict: "slug" });

  if (compError) {
    console.error("  Error:", compError.message);
    return;
  }
  console.log("  ✓ Competition ready");

  // 2. Insert teams
  console.log("\n2. Upserting 20 LaLiga teams...");
  const rows = laligaTeams.map((t) => ({
    ...t,
    mode: "club",
    fifa_ranking: 0,
    wc_group: null,
    competition_slug: "laliga-2025-26",
  }));

  const { error: teamError } = await supabase
    .from("teams")
    .upsert(rows, { onConflict: "slug" });

  if (teamError) {
    console.error("  Error:", teamError.message);
    return;
  }
  console.log(`  ✓ ${laligaTeams.length} teams upserted`);

  // 3. Verify
  console.log("\n--- Verification ---");
  const { data: clubs, count } = await supabase
    .from("teams")
    .select("slug, name_es, tier, status", { count: "exact" })
    .eq("competition_slug", "laliga-2025-26")
    .order("tier", { ascending: true });

  console.log(`LaLiga teams in DB: ${count}`);
  if (clubs) {
    for (const c of clubs) {
      const marker = c.status === "available" ? "✓" : "○";
      console.log(`  ${marker} [T${c.tier}] ${c.name_es}`);
    }
  }

  console.log("\nDone!");
}

seed().catch(console.error);
