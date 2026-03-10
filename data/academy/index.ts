import module00 from "./module-00";
import module01 from "./module-01";
import module02 from "./module-02";
import module03 from "./module-03";
import module04 from "./module-04";
import module05 from "./module-05";
import module06 from "./module-06";
import module07 from "./module-07";
import module08 from "./module-08";
import module09 from "./module-09";
import module10 from "./module-10";
import module11 from "./module-11";
import module12 from "./module-12";
import module13 from "./module-13";

import type { AcademyModule, AcademyProgress } from "./types";

export type { AcademyModule, AcademyProgress };
export type {
  Lesson,
  LessonType,
  LessonContent,
  TheoryContent,
  ExerciseContent,
  MetricsContent,
  QuizContent,
  QuizQuestion,
  TheorySection,
} from "./types";

export const MODULES: AcademyModule[] = [
  module00,
  module01,
  module02,
  module03,
  module04,
  module05,
  module06,
  module07,
  module08,
  module09,
  module10,
  module11,
  module12,
  module13,
];

export const XP_PER_LEVEL = 200;
export const STREAK_BONUS = 10;
export const FINAL_QUIZ_PASS_RATE = 0.8;
export const NORMAL_QUIZ_PASS_RATE = 0.6;

export const DEFAULT_PROGRESS: AcademyProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  completedQuizzes: [],
  moduleScores: {},
  currentModule: 0,
  currentLesson: 0,
  hearts: 5,
  badges: [],
  journalEntries: [],
  startDate: new Date().toISOString(),
};

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getXPInLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}

export function getLevelTitle(level: number): string {
  if (level <= 2) return "Observador";
  if (level <= 5) return "Aprendiz";
  if (level <= 8) return "Analista Junior";
  if (level <= 12) return "Analista";
  return "Analista Senior";
}

export const BADGES = [
  { id: "first-module", icon: "⚽", label: "Primer módulo", condition: (p: AcademyProgress) => p.completedLessons.length >= 4 },
  { id: "three-modules", icon: "📊", label: "3 módulos", condition: (p: AcademyProgress) => p.completedLessons.length >= 12 },
  { id: "seven-modules", icon: "📈", label: "7 módulos", condition: (p: AcademyProgress) => p.completedLessons.length >= 28 },
  { id: "streak-7", icon: "🔥", label: "Racha de 7", condition: (p: AcademyProgress) => p.streak >= 7 },
  { id: "streak-30", icon: "💎", label: "Racha de 30", condition: (p: AcademyProgress) => p.streak >= 30 },
  { id: "perfect-quizzes", icon: "💯", label: "Quizzes perfectos", condition: (p: AcademyProgress) => {
    const quizIds = MODULES.flatMap(m => m.lessons.filter(l => l.type === "quiz").map(l => l.id));
    return quizIds.length > 0 && quizIds.every(id => (p.moduleScores[id] ?? 0) === 100);
  }},
  { id: "graduated", icon: "🏆", label: "Graduado", condition: (p: AcademyProgress) => p.completedLessons.length >= 56 },
];
