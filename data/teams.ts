import { Team } from "./types";

export const teams: Team[] = [
  // ===== GROUP A =====
  { slug: "mexico", name: { es: "México", en: "Mexico" }, flag: "🇲🇽", group: "A", confederation: "CONCACAF", fifaRanking: 15, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "south-africa", name: { es: "Sudáfrica", en: "South Africa" }, flag: "🇿🇦", group: "A", confederation: "CAF", fifaRanking: 59, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "south-korea", name: { es: "Corea del Sur", en: "South Korea" }, flag: "🇰🇷", group: "A", confederation: "AFC", fifaRanking: 22, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "uefa-playoff-d", name: { es: "Playoff UEFA D", en: "UEFA Playoff D" }, flag: "🏳️", group: "A", confederation: "UEFA", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },

  // ===== GROUP B =====
  { slug: "canada", name: { es: "Canadá", en: "Canada" }, flag: "🇨🇦", group: "B", confederation: "CONCACAF", fifaRanking: 41, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "uefa-playoff-a", name: { es: "Playoff UEFA A", en: "UEFA Playoff A" }, flag: "🏳️", group: "B", confederation: "UEFA", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },
  { slug: "qatar", name: { es: "Catar", en: "Qatar" }, flag: "🇶🇦", group: "B", confederation: "AFC", fifaRanking: 35, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "switzerland", name: { es: "Suiza", en: "Switzerland" }, flag: "🇨🇭", group: "B", confederation: "UEFA", fifaRanking: 17, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP C =====
  { slug: "brazil", name: { es: "Brasil", en: "Brazil" }, flag: "🇧🇷", group: "C", confederation: "CONMEBOL", fifaRanking: 5, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "morocco", name: { es: "Marruecos", en: "Morocco" }, flag: "🇲🇦", group: "C", confederation: "CAF", fifaRanking: 14, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "haiti", name: { es: "Haití", en: "Haiti" }, flag: "🇭🇹", group: "C", confederation: "CONCACAF", fifaRanking: 87, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "scotland", name: { es: "Escocia", en: "Scotland" }, flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", confederation: "UEFA", fifaRanking: 39, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP D =====
  { slug: "united-states", name: { es: "Estados Unidos", en: "United States" }, flag: "🇺🇸", group: "D", confederation: "CONCACAF", fifaRanking: 11, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "paraguay", name: { es: "Paraguay", en: "Paraguay" }, flag: "🇵🇾", group: "D", confederation: "CONMEBOL", fifaRanking: 48, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "australia", name: { es: "Australia", en: "Australia" }, flag: "🇦🇺", group: "D", confederation: "AFC", fifaRanking: 24, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "uefa-playoff-c", name: { es: "Playoff UEFA C", en: "UEFA Playoff C" }, flag: "🏳️", group: "D", confederation: "UEFA", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },

  // ===== GROUP E =====
  { slug: "germany", name: { es: "Alemania", en: "Germany" }, flag: "🇩🇪", group: "E", confederation: "UEFA", fifaRanking: 3, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "curacao", name: { es: "Curazao", en: "Curaçao" }, flag: "🇨🇼", group: "E", confederation: "CONCACAF", fifaRanking: 109, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "ivory-coast", name: { es: "Costa de Marfil", en: "Ivory Coast" }, flag: "🇨🇮", group: "E", confederation: "CAF", fifaRanking: 38, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "ecuador", name: { es: "Ecuador", en: "Ecuador" }, flag: "🇪🇨", group: "E", confederation: "CONMEBOL", fifaRanking: 28, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP F =====
  { slug: "netherlands", name: { es: "Países Bajos", en: "Netherlands" }, flag: "🇳🇱", group: "F", confederation: "UEFA", fifaRanking: 7, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "japan", name: { es: "Japón", en: "Japan" }, flag: "🇯🇵", group: "F", confederation: "AFC", fifaRanking: 18, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "uefa-playoff-b", name: { es: "Playoff UEFA B", en: "UEFA Playoff B" }, flag: "🏳️", group: "F", confederation: "UEFA", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },
  { slug: "tunisia", name: { es: "Túnez", en: "Tunisia" }, flag: "🇹🇳", group: "F", confederation: "CAF", fifaRanking: 36, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP G =====
  { slug: "belgium", name: { es: "Bélgica", en: "Belgium" }, flag: "🇧🇪", group: "G", confederation: "UEFA", fifaRanking: 6, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "egypt", name: { es: "Egipto", en: "Egypt" }, flag: "🇪🇬", group: "G", confederation: "CAF", fifaRanking: 33, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "iran", name: { es: "Irán", en: "Iran" }, flag: "🇮🇷", group: "G", confederation: "AFC", fifaRanking: 21, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "new-zealand", name: { es: "Nueva Zelanda", en: "New Zealand" }, flag: "🇳🇿", group: "G", confederation: "OFC", fifaRanking: 95, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP H =====
  { slug: "spain", name: { es: "España", en: "Spain" }, flag: "🇪🇸", group: "H", confederation: "UEFA", fifaRanking: 1, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "cape-verde", name: { es: "Cabo Verde", en: "Cape Verde" }, flag: "🇨🇻", group: "H", confederation: "CAF", fifaRanking: 64, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "saudi-arabia", name: { es: "Arabia Saudita", en: "Saudi Arabia" }, flag: "🇸🇦", group: "H", confederation: "AFC", fifaRanking: 56, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "uruguay", name: { es: "Uruguay", en: "Uruguay" }, flag: "🇺🇾", group: "H", confederation: "CONMEBOL", fifaRanking: 9, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP I =====
  { slug: "france", name: { es: "Francia", en: "France" }, flag: "🇫🇷", group: "I", confederation: "UEFA", fifaRanking: 2, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "senegal", name: { es: "Senegal", en: "Senegal" }, flag: "🇸🇳", group: "I", confederation: "CAF", fifaRanking: 20, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "intercon-playoff-2", name: { es: "Repesca Intercontinental 2", en: "Intercon. Playoff 2" }, flag: "🏳️", group: "I", confederation: "CONMEBOL", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },
  { slug: "norway", name: { es: "Noruega", en: "Norway" }, flag: "🇳🇴", group: "I", confederation: "UEFA", fifaRanking: 25, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP J =====
  {
    slug: "argentina", name: { es: "Argentina", en: "Argentina" }, flag: "🇦🇷", group: "J", confederation: "CONMEBOL", fifaRanking: 1, tier: 1, mode: "national", competition: "mundial-2026", status: "available",
    quickStats: { formation: "4-3-3", qualifyingPosition: "1°", goals: "39 en 18", winRate: "72%" },
  },
  { slug: "algeria", name: { es: "Argelia", en: "Algeria" }, flag: "🇩🇿", group: "J", confederation: "CAF", fifaRanking: 30, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  {
    slug: "austria", name: { es: "Austria", en: "Austria" }, flag: "🇦🇹", group: "J", confederation: "UEFA", fifaRanking: 23, tier: 2, mode: "national", competition: "mundial-2026", status: "available",
    quickStats: { formation: "4-2-3-1", qualifyingPosition: "1°", goals: "22 en 8", winRate: "88%" },
  },
  { slug: "jordan", name: { es: "Jordania", en: "Jordan" }, flag: "🇯🇴", group: "J", confederation: "AFC", fifaRanking: 68, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP K =====
  { slug: "portugal", name: { es: "Portugal", en: "Portugal" }, flag: "🇵🇹", group: "K", confederation: "UEFA", fifaRanking: 4, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "intercon-playoff-1", name: { es: "Repesca Intercontinental 1", en: "Intercon. Playoff 1" }, flag: "🏳️", group: "K", confederation: "CONCACAF", fifaRanking: 0, tier: 3, mode: "national", competition: "mundial-2026", status: "playoff_pending" },
  { slug: "uzbekistan", name: { es: "Uzbekistán", en: "Uzbekistan" }, flag: "🇺🇿", group: "K", confederation: "AFC", fifaRanking: 62, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "colombia", name: { es: "Colombia", en: "Colombia" }, flag: "🇨🇴", group: "K", confederation: "CONMEBOL", fifaRanking: 10, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },

  // ===== GROUP L =====
  { slug: "england", name: { es: "Inglaterra", en: "England" }, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", confederation: "UEFA", fifaRanking: 8, tier: 1, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "croatia", name: { es: "Croacia", en: "Croatia" }, flag: "🇭🇷", group: "L", confederation: "UEFA", fifaRanking: 13, tier: 2, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "ghana", name: { es: "Ghana", en: "Ghana" }, flag: "🇬🇭", group: "L", confederation: "CAF", fifaRanking: 70, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
  { slug: "panama", name: { es: "Panamá", en: "Panama" }, flag: "🇵🇦", group: "L", confederation: "CONCACAF", fifaRanking: 44, tier: 3, mode: "national", competition: "mundial-2026", status: "coming_soon" },
];

// Club teams
export const clubTeams: Team[] = [
  {
    slug: "real-madrid", name: { es: "Real Madrid CF", en: "Real Madrid CF" }, flag: "🇪🇸", group: "", confederation: "UEFA", fifaRanking: 0, tier: 1, mode: "club", competition: "laliga-2025-26", status: "available",
  },
];

// Helper functions
export const getTeamBySlug = (slug: string): Team | undefined =>
  [...teams, ...clubTeams].find((t) => t.slug === slug);

export const getTeamsByGroup = (group: string): Team[] =>
  teams.filter((t) => t.group === group);

export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
