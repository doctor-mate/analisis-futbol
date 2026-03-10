// SA Academy — Type definitions

export interface TheorySection {
  title: string;
  body: string;
}

export interface TheoryContent {
  sections: TheorySection[];
}

export interface ExerciseContent {
  instruction: string;
  checklist: string[];
  tip?: string;
}

export interface MetricsContent {
  instruction: string;
  tasks: string[];
  tip?: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizContent {
  questions: QuizQuestion[];
}

export type LessonType = "theory" | "exercise" | "metrics" | "quiz";
export type LessonContent = TheoryContent | ExerciseContent | MetricsContent | QuizContent;

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  xp: number;
  duration?: string;
  content: LessonContent;
}

export interface AcademyModule {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export interface AcademyProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  completedQuizzes: string[];
  moduleScores: Record<string, number>;
  currentModule: number;
  currentLesson: number;
  hearts: number;
  badges: string[];
  journalEntries: string[];
  startDate: string;
}
