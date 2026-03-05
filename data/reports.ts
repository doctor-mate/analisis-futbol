import { Report } from "./types";

export const reports: Report[] = [
  // Argentina — Mundial 2026
  {
    teamSlug: "argentina",
    competition: "mundial-2026",
    type: "informe",
    label: {
      es: "Informe de Oposición Completo",
      en: "Full Opposition Report",
    },
    description: {
      es: "Análisis táctico de 17 secciones con dashboard estadístico, modelo de juego, jugadores clave y XI probable.",
      en: "17-section tactical analysis with statistical dashboard, playing model, key players and predicted XI.",
    },
    sections: 17,
    pages: "35+",
    date: "2026-03-04",
    formats: {
      html: "/reports/argentina-mundial-2026/informe.html",
      pdf: "/reports/argentina-mundial-2026/informe.pdf",
    },
  },
  {
    teamSlug: "argentina",
    competition: "mundial-2026",
    type: "playing-model",
    label: {
      es: "Modelo de Juego",
      en: "Playing Model",
    },
    description: {
      es: "Análisis descriptivo de 10 secciones: identidad táctica, formación, construcción, progresión, ataque, pressing, transiciones, balón parado, evolución y comparación CONMEBOL.",
      en: "10-section descriptive analysis: tactical identity, formation, build-up, progression, attacking, pressing, transitions, set pieces, evolution and CONMEBOL comparison.",
    },
    sections: 10,
    pages: "12",
    date: "2026-03-04",
    formats: {
      html: "/reports/argentina-mundial-2026/modelo-de-juego.html",
    },
  },
  {
    teamSlug: "argentina",
    competition: "mundial-2026",
    type: "newsletter",
    label: {
      es: "Newsletter — Edición #001",
      en: "Newsletter — Edition #001",
    },
    description: {
      es: "Resumen ejecutivo + claves tácticas + dashboard + XI probable para Substack.",
      en: "Executive summary + tactical keys + dashboard + predicted XI for Substack.",
    },
    date: "2026-03-04",
    formats: {
      html: "/reports/argentina-mundial-2026/newsletter.html",
      docx: "/reports/argentina-mundial-2026/newsletter.docx",
    },
  },

  // Real Madrid — LaLiga 2025-26
  {
    teamSlug: "real-madrid",
    competition: "laliga-2025-26",
    type: "informe",
    label: {
      es: "Informe de Oposición Completo",
      en: "Full Opposition Report",
    },
    description: {
      es: "Análisis táctico de 17 secciones — LaLiga 2025-26.",
      en: "17-section tactical analysis — LaLiga 2025-26.",
    },
    sections: 17,
    pages: "30+",
    date: "2026-02-15",
    formats: {
      html: "/reports/realmadrid-laliga-2025-26/informe.html",
    },
  },
];

// Helper functions
export const getReportsForTeam = (slug: string): Report[] =>
  reports.filter((r) => r.teamSlug === slug);

export const getReportsByCompetition = (competition: string): Report[] =>
  reports.filter((r) => r.competition === competition);

export const getReportsForPlayer = (playerSlug: string): Report[] =>
  reports.filter((r) => r.playerSlug === playerSlug);
