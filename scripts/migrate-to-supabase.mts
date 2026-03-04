/**
 * Migration script: static TypeScript data → Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-to-supabase.ts
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Load .env.local manually
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---- Data from static files (inlined to avoid TS import issues) ----

const competitions = [
  {
    slug: "mundial-2026",
    name_es: "Copa del Mundo 2026",
    name_en: "2026 FIFA World Cup",
    type: "world-cup",
    season: "2026",
    country: null,
    confederation: null,
    active: true,
  },
  {
    slug: "laliga-2025-26",
    name_es: "LaLiga 2025-26",
    name_en: "LaLiga 2025-26",
    type: "league",
    season: "2025-26",
    country: "Spain",
    confederation: "UEFA",
    active: true,
  },
];

const nationalTeams = [
  // Group A
  { slug: "mexico", name_es: "México", name_en: "Mexico", flag: "🇲🇽", confederation: "CONCACAF", fifa_ranking: 15, tier: 1, status: "coming_soon", wc_group: "A", competition_slug: "mundial-2026", mode: "national" },
  { slug: "south-africa", name_es: "Sudáfrica", name_en: "South Africa", flag: "🇿🇦", confederation: "CAF", fifa_ranking: 59, tier: 3, status: "coming_soon", wc_group: "A", competition_slug: "mundial-2026", mode: "national" },
  { slug: "south-korea", name_es: "Corea del Sur", name_en: "South Korea", flag: "🇰🇷", confederation: "AFC", fifa_ranking: 22, tier: 2, status: "coming_soon", wc_group: "A", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uefa-playoff-d", name_es: "Playoff UEFA D", name_en: "UEFA Playoff D", flag: "🏳️", confederation: "UEFA", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "A", competition_slug: "mundial-2026", mode: "national" },
  // Group B
  { slug: "canada", name_es: "Canadá", name_en: "Canada", flag: "🇨🇦", confederation: "CONCACAF", fifa_ranking: 41, tier: 3, status: "coming_soon", wc_group: "B", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uefa-playoff-a", name_es: "Playoff UEFA A", name_en: "UEFA Playoff A", flag: "🏳️", confederation: "UEFA", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "B", competition_slug: "mundial-2026", mode: "national" },
  { slug: "qatar", name_es: "Catar", name_en: "Qatar", flag: "🇶🇦", confederation: "AFC", fifa_ranking: 35, tier: 3, status: "coming_soon", wc_group: "B", competition_slug: "mundial-2026", mode: "national" },
  { slug: "switzerland", name_es: "Suiza", name_en: "Switzerland", flag: "🇨🇭", confederation: "UEFA", fifa_ranking: 17, tier: 2, status: "coming_soon", wc_group: "B", competition_slug: "mundial-2026", mode: "national" },
  // Group C
  { slug: "brazil", name_es: "Brasil", name_en: "Brazil", flag: "🇧🇷", confederation: "CONMEBOL", fifa_ranking: 5, tier: 1, status: "coming_soon", wc_group: "C", competition_slug: "mundial-2026", mode: "national" },
  { slug: "morocco", name_es: "Marruecos", name_en: "Morocco", flag: "🇲🇦", confederation: "CAF", fifa_ranking: 14, tier: 2, status: "coming_soon", wc_group: "C", competition_slug: "mundial-2026", mode: "national" },
  { slug: "haiti", name_es: "Haití", name_en: "Haiti", flag: "🇭🇹", confederation: "CONCACAF", fifa_ranking: 87, tier: 3, status: "coming_soon", wc_group: "C", competition_slug: "mundial-2026", mode: "national" },
  { slug: "scotland", name_es: "Escocia", name_en: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA", fifa_ranking: 39, tier: 2, status: "coming_soon", wc_group: "C", competition_slug: "mundial-2026", mode: "national" },
  // Group D
  { slug: "united-states", name_es: "Estados Unidos", name_en: "United States", flag: "🇺🇸", confederation: "CONCACAF", fifa_ranking: 11, tier: 1, status: "coming_soon", wc_group: "D", competition_slug: "mundial-2026", mode: "national" },
  { slug: "paraguay", name_es: "Paraguay", name_en: "Paraguay", flag: "🇵🇾", confederation: "CONMEBOL", fifa_ranking: 48, tier: 2, status: "coming_soon", wc_group: "D", competition_slug: "mundial-2026", mode: "national" },
  { slug: "australia", name_es: "Australia", name_en: "Australia", flag: "🇦🇺", confederation: "AFC", fifa_ranking: 24, tier: 3, status: "coming_soon", wc_group: "D", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uefa-playoff-c", name_es: "Playoff UEFA C", name_en: "UEFA Playoff C", flag: "🏳️", confederation: "UEFA", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "D", competition_slug: "mundial-2026", mode: "national" },
  // Group E
  { slug: "germany", name_es: "Alemania", name_en: "Germany", flag: "🇩🇪", confederation: "UEFA", fifa_ranking: 3, tier: 1, status: "coming_soon", wc_group: "E", competition_slug: "mundial-2026", mode: "national" },
  { slug: "curacao", name_es: "Curazao", name_en: "Curaçao", flag: "🇨🇼", confederation: "CONCACAF", fifa_ranking: 109, tier: 3, status: "coming_soon", wc_group: "E", competition_slug: "mundial-2026", mode: "national" },
  { slug: "ivory-coast", name_es: "Costa de Marfil", name_en: "Ivory Coast", flag: "🇨🇮", confederation: "CAF", fifa_ranking: 38, tier: 2, status: "coming_soon", wc_group: "E", competition_slug: "mundial-2026", mode: "national" },
  { slug: "ecuador", name_es: "Ecuador", name_en: "Ecuador", flag: "🇪🇨", confederation: "CONMEBOL", fifa_ranking: 28, tier: 2, status: "coming_soon", wc_group: "E", competition_slug: "mundial-2026", mode: "national" },
  // Group F
  { slug: "netherlands", name_es: "Países Bajos", name_en: "Netherlands", flag: "🇳🇱", confederation: "UEFA", fifa_ranking: 7, tier: 1, status: "coming_soon", wc_group: "F", competition_slug: "mundial-2026", mode: "national" },
  { slug: "japan", name_es: "Japón", name_en: "Japan", flag: "🇯🇵", confederation: "AFC", fifa_ranking: 18, tier: 2, status: "coming_soon", wc_group: "F", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uefa-playoff-b", name_es: "Playoff UEFA B", name_en: "UEFA Playoff B", flag: "🏳️", confederation: "UEFA", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "F", competition_slug: "mundial-2026", mode: "national" },
  { slug: "tunisia", name_es: "Túnez", name_en: "Tunisia", flag: "🇹🇳", confederation: "CAF", fifa_ranking: 36, tier: 3, status: "coming_soon", wc_group: "F", competition_slug: "mundial-2026", mode: "national" },
  // Group G
  { slug: "belgium", name_es: "Bélgica", name_en: "Belgium", flag: "🇧🇪", confederation: "UEFA", fifa_ranking: 6, tier: 2, status: "coming_soon", wc_group: "G", competition_slug: "mundial-2026", mode: "national" },
  { slug: "egypt", name_es: "Egipto", name_en: "Egypt", flag: "🇪🇬", confederation: "CAF", fifa_ranking: 33, tier: 3, status: "coming_soon", wc_group: "G", competition_slug: "mundial-2026", mode: "national" },
  { slug: "iran", name_es: "Irán", name_en: "Iran", flag: "🇮🇷", confederation: "AFC", fifa_ranking: 21, tier: 3, status: "coming_soon", wc_group: "G", competition_slug: "mundial-2026", mode: "national" },
  { slug: "new-zealand", name_es: "Nueva Zelanda", name_en: "New Zealand", flag: "🇳🇿", confederation: "OFC", fifa_ranking: 95, tier: 3, status: "coming_soon", wc_group: "G", competition_slug: "mundial-2026", mode: "national" },
  // Group H
  { slug: "spain", name_es: "España", name_en: "Spain", flag: "🇪🇸", confederation: "UEFA", fifa_ranking: 1, tier: 1, status: "coming_soon", wc_group: "H", competition_slug: "mundial-2026", mode: "national" },
  { slug: "cape-verde", name_es: "Cabo Verde", name_en: "Cape Verde", flag: "🇨🇻", confederation: "CAF", fifa_ranking: 64, tier: 3, status: "coming_soon", wc_group: "H", competition_slug: "mundial-2026", mode: "national" },
  { slug: "saudi-arabia", name_es: "Arabia Saudita", name_en: "Saudi Arabia", flag: "🇸🇦", confederation: "AFC", fifa_ranking: 56, tier: 3, status: "coming_soon", wc_group: "H", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uruguay", name_es: "Uruguay", name_en: "Uruguay", flag: "🇺🇾", confederation: "CONMEBOL", fifa_ranking: 9, tier: 1, status: "coming_soon", wc_group: "H", competition_slug: "mundial-2026", mode: "national" },
  // Group I
  { slug: "france", name_es: "Francia", name_en: "France", flag: "🇫🇷", confederation: "UEFA", fifa_ranking: 2, tier: 1, status: "coming_soon", wc_group: "I", competition_slug: "mundial-2026", mode: "national" },
  { slug: "senegal", name_es: "Senegal", name_en: "Senegal", flag: "🇸🇳", confederation: "CAF", fifa_ranking: 20, tier: 2, status: "coming_soon", wc_group: "I", competition_slug: "mundial-2026", mode: "national" },
  { slug: "intercon-playoff-2", name_es: "Repesca Intercontinental 2", name_en: "Intercon. Playoff 2", flag: "🏳️", confederation: "CONMEBOL", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "I", competition_slug: "mundial-2026", mode: "national" },
  { slug: "norway", name_es: "Noruega", name_en: "Norway", flag: "🇳🇴", confederation: "UEFA", fifa_ranking: 25, tier: 2, status: "coming_soon", wc_group: "I", competition_slug: "mundial-2026", mode: "national" },
  // Group J
  { slug: "argentina", name_es: "Argentina", name_en: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL", fifa_ranking: 1, tier: 1, status: "available", wc_group: "J", competition_slug: "mundial-2026", mode: "national", quick_stats: { formation: "4-3-3", qualifyingPosition: "1°", goals: "39 en 18", winRate: "72%" } },
  { slug: "algeria", name_es: "Argelia", name_en: "Algeria", flag: "🇩🇿", confederation: "CAF", fifa_ranking: 30, tier: 2, status: "coming_soon", wc_group: "J", competition_slug: "mundial-2026", mode: "national" },
  { slug: "austria", name_es: "Austria", name_en: "Austria", flag: "🇦🇹", confederation: "UEFA", fifa_ranking: 23, tier: 2, status: "coming_soon", wc_group: "J", competition_slug: "mundial-2026", mode: "national" },
  { slug: "jordan", name_es: "Jordania", name_en: "Jordan", flag: "🇯🇴", confederation: "AFC", fifa_ranking: 68, tier: 3, status: "coming_soon", wc_group: "J", competition_slug: "mundial-2026", mode: "national" },
  // Group K
  { slug: "portugal", name_es: "Portugal", name_en: "Portugal", flag: "🇵🇹", confederation: "UEFA", fifa_ranking: 4, tier: 1, status: "coming_soon", wc_group: "K", competition_slug: "mundial-2026", mode: "national" },
  { slug: "intercon-playoff-1", name_es: "Repesca Intercontinental 1", name_en: "Intercon. Playoff 1", flag: "🏳️", confederation: "CONCACAF", fifa_ranking: 0, tier: 3, status: "playoff_pending", wc_group: "K", competition_slug: "mundial-2026", mode: "national" },
  { slug: "uzbekistan", name_es: "Uzbekistán", name_en: "Uzbekistan", flag: "🇺🇿", confederation: "AFC", fifa_ranking: 62, tier: 3, status: "coming_soon", wc_group: "K", competition_slug: "mundial-2026", mode: "national" },
  { slug: "colombia", name_es: "Colombia", name_en: "Colombia", flag: "🇨🇴", confederation: "CONMEBOL", fifa_ranking: 10, tier: 1, status: "coming_soon", wc_group: "K", competition_slug: "mundial-2026", mode: "national" },
  // Group L
  { slug: "england", name_es: "Inglaterra", name_en: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA", fifa_ranking: 8, tier: 1, status: "coming_soon", wc_group: "L", competition_slug: "mundial-2026", mode: "national" },
  { slug: "croatia", name_es: "Croacia", name_en: "Croatia", flag: "🇭🇷", confederation: "UEFA", fifa_ranking: 13, tier: 2, status: "coming_soon", wc_group: "L", competition_slug: "mundial-2026", mode: "national" },
  { slug: "ghana", name_es: "Ghana", name_en: "Ghana", flag: "🇬🇭", confederation: "CAF", fifa_ranking: 70, tier: 3, status: "coming_soon", wc_group: "L", competition_slug: "mundial-2026", mode: "national" },
  { slug: "panama", name_es: "Panamá", name_en: "Panama", flag: "🇵🇦", confederation: "CONCACAF", fifa_ranking: 44, tier: 3, status: "coming_soon", wc_group: "L", competition_slug: "mundial-2026", mode: "national" },
];

const clubTeams = [
  { slug: "real-madrid", name_es: "Real Madrid CF", name_en: "Real Madrid CF", flag: "🇪🇸", confederation: "UEFA", fifa_ranking: 0, tier: 1, status: "available", wc_group: null, competition_slug: "laliga-2025-26", mode: "club" },
];

const reports = [
  {
    team_slug: "argentina",
    competition_slug: "mundial-2026",
    type: "informe",
    label_es: "Informe de Oposición Completo",
    label_en: "Full Opposition Report",
    description_es: "Análisis táctico de 17 secciones con dashboard estadístico, modelo de juego, jugadores clave y XI probable.",
    description_en: "17-section tactical analysis with statistical dashboard, playing model, key players and predicted XI.",
    sections: 17,
    pages: "35+",
    published_date: "2026-03-04",
    status: "published",
    file_html: "/reports/argentina-mundial-2026/informe.html",
    file_pdf: "/reports/argentina-mundial-2026/informe.pdf",
  },
  {
    team_slug: "argentina",
    competition_slug: "mundial-2026",
    type: "newsletter",
    label_es: "Newsletter — Edición #001",
    label_en: "Newsletter — Edition #001",
    description_es: "Resumen ejecutivo + claves tácticas + dashboard + XI probable para Substack.",
    description_en: "Executive summary + tactical keys + dashboard + predicted XI for Substack.",
    published_date: "2026-03-04",
    status: "published",
    file_html: "/reports/argentina-mundial-2026/newsletter.html",
    file_docx: "/reports/argentina-mundial-2026/newsletter.docx",
  },
  {
    team_slug: "real-madrid",
    competition_slug: "laliga-2025-26",
    type: "informe",
    label_es: "Informe de Oposición Completo",
    label_en: "Full Opposition Report",
    description_es: "Análisis táctico de 17 secciones — LaLiga 2025-26.",
    description_en: "17-section tactical analysis — LaLiga 2025-26.",
    sections: 17,
    pages: "30+",
    published_date: "2026-02-15",
    status: "published",
    file_html: "/reports/realmadrid-laliga-2025-26/informe.html",
  },
];

// ---- Migration ----

async function migrate() {
  console.log("Starting migration to Supabase...\n");

  // 1. Competitions
  console.log("1. Inserting competitions...");
  const { error: compError } = await supabase
    .from("competitions")
    .upsert(competitions, { onConflict: "slug" });
  if (compError) {
    console.error("  Error:", compError.message);
  } else {
    console.log(`  ✓ ${competitions.length} competitions inserted`);
  }

  // 2. Teams (national)
  console.log("\n2. Inserting national teams...");
  const { error: natError } = await supabase
    .from("teams")
    .upsert(nationalTeams, { onConflict: "slug" });
  if (natError) {
    console.error("  Error:", natError.message);
  } else {
    console.log(`  ✓ ${nationalTeams.length} national teams inserted`);
  }

  // 3. Teams (club)
  console.log("\n3. Inserting club teams...");
  const { error: clubError } = await supabase
    .from("teams")
    .upsert(clubTeams, { onConflict: "slug" });
  if (clubError) {
    console.error("  Error:", clubError.message);
  } else {
    console.log(`  ✓ ${clubTeams.length} club teams inserted`);
  }

  // 4. Reports
  console.log("\n4. Inserting reports...");
  const { error: repError } = await supabase
    .from("reports")
    .insert(reports);
  if (repError) {
    console.error("  Error:", repError.message);
  } else {
    console.log(`  ✓ ${reports.length} reports inserted`);
  }

  // 5. Verify
  console.log("\n--- Verification ---");
  const { count: teamCount } = await supabase.from("teams").select("*", { count: "exact", head: true });
  const { count: reportCount } = await supabase.from("reports").select("*", { count: "exact", head: true });
  console.log(`Teams in DB: ${teamCount}`);
  console.log(`Reports in DB: ${reportCount}`);

  console.log("\nMigration complete!");
}

migrate().catch(console.error);
