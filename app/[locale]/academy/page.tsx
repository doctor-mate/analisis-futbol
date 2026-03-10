"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MODULES,
  BADGES,
  DEFAULT_PROGRESS,
  XP_PER_LEVEL,
  STREAK_BONUS,
  FINAL_QUIZ_PASS_RATE,
  NORMAL_QUIZ_PASS_RATE,
  getLevelFromXP,
  getXPInLevel,
  getLevelTitle,
} from "@/data/academy";
import type {
  AcademyProgress,
  AcademyModule,
  Lesson,
  TheoryContent,
  ExerciseContent,
  MetricsContent,
  QuizContent,
} from "@/data/academy";
import styles from "./academy.module.css";

// ── Storage ──────────────────────────────────────────────────────
const STORAGE_KEY = "sa-academy-progress";

function loadProgress(): AcademyProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AcademyProgress) : null;
  } catch {
    return null;
  }
}

function saveProgress(data: AcademyProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed:", e);
  }
}

// ── Sub-components ───────────────────────────────────────────────

function ProgressBar({
  value,
  max,
  color = "var(--sa-rojo)",
  height = 8,
}: {
  value: number;
  max: number;
  color?: string;
  height?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={styles.progressTrack} style={{ height }}>
      <div
        className={styles.progressFill}
        style={{ width: `${pct}%`, background: color, height }}
      />
    </div>
  );
}

function AcademyHeader({
  progress,
  onNav,
}: {
  progress: AcademyProgress;
  onNav: (v: string) => void;
}) {
  const level = getLevelFromXP(progress.xp);
  const xpInLevel = getXPInLevel(progress.xp);
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <button className={styles.headerBrand} onClick={() => onNav("home")}>
          <div className={styles.headerTitle}>SA Academy</div>
          <div className={styles.headerSub}>Soy Analista</div>
        </button>
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Racha</div>
            <div className={styles.statValue}>🔥 {progress.streak}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>XP</div>
            <div className={styles.statValueGold}>{progress.xp}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Nivel {level}</div>
            <div className={styles.statTitle}>{getLevelTitle(level)}</div>
            <div className={styles.levelBar}>
              <ProgressBar
                value={xpInLevel}
                max={XP_PER_LEVEL}
                color="#FFB703"
                height={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  index,
  isUnlocked,
  isCompleted,
  progress,
  onClick,
}: {
  module: AcademyModule;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: AcademyProgress;
  onClick: () => void;
}) {
  const lessonsCompleted = module.lessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;
  const totalLessons = module.lessons.length;

  const cardClass = isCompleted
    ? styles.moduleCardCompleted
    : isUnlocked
      ? styles.moduleCard
      : styles.moduleCardLocked;

  return (
    <div
      onClick={isUnlocked ? onClick : undefined}
      className={cardClass}
      style={
        isCompleted ? { borderColor: module.color } : undefined
      }
    >
      {isCompleted && <div className={styles.moduleComplete}>✅</div>}
      <div className={styles.moduleCardInner}>
        <div
          className={styles.moduleIconBox}
          style={{
            background: module.color + "18",
            border: `2px solid ${module.color}40`,
          }}
        >
          {isUnlocked ? module.icon : "🔒"}
        </div>
        <div className={styles.moduleContent}>
          <div className={styles.moduleNumber} style={{ color: module.color }}>
            Módulo {index + 1}
          </div>
          <div className={styles.moduleTitle}>{module.title}</div>
          <div className={styles.moduleSubtitle}>{module.subtitle}</div>
          {isUnlocked && totalLessons > 0 && (
            <div className={styles.moduleProgress}>
              <ProgressBar
                value={lessonsCompleted}
                max={totalLessons}
                color={module.color}
                height={6}
              />
              <div className={styles.moduleProgressText}>
                {lessonsCompleted}/{totalLessons} lecciones
              </div>
            </div>
          )}
          {!isUnlocked && (
            <div className={styles.moduleLocked}>
              Completá el módulo anterior para desbloquear
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TheoryLesson({
  lesson,
  onComplete,
}: {
  lesson: Lesson;
  onComplete: () => void;
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const content = lesson.content as TheoryContent;
  const sections = content.sections;
  const isLast = sectionIndex === sections.length - 1;
  const section = sections[sectionIndex];

  return (
    <div>
      <div className={styles.sectionBar}>
        {sections.map((_, i) => (
          <div
            key={i}
            className={
              i < sectionIndex
                ? styles.sectionDotDone
                : i === sectionIndex
                  ? styles.sectionDotActive
                  : styles.sectionDot
            }
          />
        ))}
      </div>
      <div className={styles.lessonLabel} style={{ color: "var(--sa-rojo)" }}>
        Teoría • {lesson.duration}
      </div>
      <h2 className={styles.sectionTitle}>{section.title}</h2>
      <div className={styles.sectionBody}>
        {section.body.split("\n\n").map((p, i) => (
          <p
            key={i}
            dangerouslySetInnerHTML={{
              __html: p.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        ))}
      </div>
      <div className={styles.btnRow}>
        <button
          onClick={() =>
            isLast ? onComplete() : setSectionIndex((s) => s + 1)
          }
          className={styles.btnPrimary}
        >
          {isLast ? `Completar (+${lesson.xp} XP)` : "Continuar →"}
        </button>
      </div>
    </div>
  );
}

function ExerciseLesson({
  lesson,
  onComplete,
}: {
  lesson: Lesson;
  onComplete: () => void;
}) {
  const [checked, setChecked] = useState<number[]>([]);
  const content = lesson.content as ExerciseContent | MetricsContent;
  const items =
    "checklist" in content
      ? (content as ExerciseContent).checklist
      : (content as MetricsContent).tasks;
  const allChecked = items.length > 0 && checked.length === items.length;

  const toggle = (i: number) => {
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const typeLabel =
    lesson.type === "exercise" ? "Ejercicio práctico" : "Ejercicio de métricas";
  const typeColor =
    lesson.type === "exercise" ? "var(--sa-verde)" : "#6D597A";

  return (
    <div>
      <div className={styles.lessonLabel} style={{ color: typeColor }}>
        {typeLabel} • {lesson.duration}
      </div>
      <h2 className={styles.sectionTitle}>{lesson.title}</h2>
      <p className={styles.sectionBody}>
        {"instruction" in content ? content.instruction : ""}
      </p>
      {"tip" in content && content.tip && (
        <div className={styles.tipBox}>
          💡 <strong>Tip:</strong> {content.tip}
        </div>
      )}
      <div className={styles.checklistWrapper}>
        {items.map((item, i) => (
          <label
            key={i}
            className={
              checked.includes(i) ? styles.checkItemDone : styles.checkItem
            }
          >
            <input
              type="checkbox"
              checked={checked.includes(i)}
              onChange={() => toggle(i)}
              style={{ marginTop: 2, accentColor: "var(--sa-verde)" }}
            />
            <span className={styles.checkItemText}>{item}</span>
          </label>
        ))}
      </div>
      <div className={styles.btnRow}>
        <button
          onClick={onComplete}
          disabled={!allChecked}
          className={allChecked ? styles.btnGreen : styles.btnDisabled}
        >
          {allChecked
            ? `Completar (+${lesson.xp} XP)`
            : `Completá todos los items (${checked.length}/${items.length})`}
        </button>
      </div>
    </div>
  );
}

function QuizLesson({
  lesson,
  onComplete,
  onUpdateHearts,
}: {
  lesson: Lesson;
  onComplete: (score: number) => void;
  onUpdateHearts: (h: number) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [finished, setFinished] = useState(false);

  const content = lesson.content as QuizContent;
  const questions = content.questions;
  const q = questions[currentQ];

  const isFinalExam = lesson.id === "13-3";
  const passRate = isFinalExam ? FINAL_QUIZ_PASS_RATE : NORMAL_QUIZ_PASS_RATE;

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correct) {
      setCorrectCount((c) => c + 1);
    } else {
      const newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      onUpdateHearts(newHearts);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const passed = correctCount >= Math.ceil(questions.length * passRate);
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className={styles.quizResult}>
        <div className={styles.quizResultIcon}>{passed ? "🎉" : "😤"}</div>
        <h2 className={styles.quizResultTitle}>
          {passed ? "¡Aprobado!" : "Seguí practicando"}
        </h2>
        <p className={styles.quizResultScore}>
          {correctCount}/{questions.length} respuestas correctas
          {isFinalExam && !passed && " (necesitás 80% para aprobar)"}
        </p>
        {passed && (
          <p className={styles.quizResultXP}>+{lesson.xp} XP</p>
        )}
        <button
          onClick={() => {
            if (passed) {
              onComplete(score);
            } else {
              setCurrentQ(0);
              setSelected(null);
              setShowResult(false);
              setCorrectCount(0);
              setFinished(false);
              setHearts(5);
            }
          }}
          className={passed ? styles.btnPrimary : styles.btnGray}
          style={{ marginTop: 20 }}
        >
          {passed ? "Continuar" : "Reintentar"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.quizHeader}>
        <div className={styles.quizProgress}>
          {questions.map((_, i) => (
            <div
              key={i}
              className={
                i < currentQ
                  ? styles.quizDotDone
                  : i === currentQ
                    ? styles.quizDotCurrent
                    : styles.quizDot
              }
            />
          ))}
        </div>
        <div className={styles.hearts}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i >= hearts ? styles.heartDim : undefined}>
              ❤️
            </span>
          ))}
        </div>
      </div>
      <div className={styles.quizNumber}>
        Pregunta {currentQ + 1} de {questions.length}
      </div>
      <h3 className={styles.quizQuestion}>{q.q}</h3>
      <div className={styles.quizOptions}>
        {q.options.map((opt, i) => {
          let cls = styles.optionBtn;
          if (showResult) {
            if (i === q.correct) cls = styles.optionCorrect;
            else if (i === selected && i !== q.correct) cls = styles.optionWrong;
            else cls = styles.optionDisabled;
          } else if (i === selected) {
            cls = styles.optionSelected;
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} className={cls}>
              {opt}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div
          className={
            selected === q.correct
              ? styles.explanationCorrect
              : styles.explanationWrong
          }
        >
          {selected === q.correct ? "✅ " : "❌ "}
          <strong>
            {selected === q.correct ? "¡Correcto!" : "Incorrecto."}
          </strong>{" "}
          {q.explanation}
        </div>
      )}
      {showResult && (
        <div className={styles.btnRow}>
          <button onClick={handleNext} className={styles.btnDark}>
            {currentQ < questions.length - 1 ? "Siguiente →" : "Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────

export default function AcademyPage() {
  const [progress, setProgress] = useState<AcademyProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("home");
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [xpPopup, setXpPopup] = useState<{
    xp: number;
    bonus: number;
  } | null>(null);

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      const today = new Date().toDateString();
      const lastActive = saved.lastActiveDate
        ? new Date(saved.lastActiveDate).toDateString()
        : null;
      if (lastActive && lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastActive !== yesterday) saved.streak = 0;
      }
      setProgress(saved);
    }
    setLoaded(true);
  }, []);

  const save = useCallback((newProgress: AcademyProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  }, []);

  const isModuleUnlocked = (idx: number) => {
    if (idx === 0) return true;
    const prevModule = MODULES[idx - 1];
    if (!prevModule.lessons.length) return false;
    return prevModule.lessons.every((l) =>
      progress.completedLessons.includes(l.id)
    );
  };

  const isModuleCompleted = (idx: number) => {
    const mod = MODULES[idx];
    if (!mod.lessons.length) return false;
    return mod.lessons.every((l) =>
      progress.completedLessons.includes(l.id)
    );
  };

  const completeLesson = (lessonId: string, xp: number, quizScore?: number) => {
    if (progress.completedLessons.includes(lessonId)) return;
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate
      ? new Date(progress.lastActiveDate).toDateString()
      : null;
    let newStreak = progress.streak;
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      newStreak = lastActive === yesterday ? progress.streak + 1 : 1;
    }
    const bonusXP = newStreak > 1 ? STREAK_BONUS : 0;
    const totalXP = xp + bonusXP;

    const newScores = { ...progress.moduleScores };
    if (quizScore !== undefined) {
      newScores[lessonId] = quizScore;
    }

    // Check badges
    const newCompletedLessons = [...progress.completedLessons, lessonId];
    const tempProgress: AcademyProgress = {
      ...progress,
      completedLessons: newCompletedLessons,
      streak: newStreak,
      moduleScores: newScores,
    };
    const earnedBadges = BADGES.filter((b) => b.condition(tempProgress)).map(
      (b) => b.id
    );

    const newProgress: AcademyProgress = {
      ...progress,
      xp: progress.xp + totalXP,
      streak: newStreak,
      lastActiveDate: new Date().toISOString(),
      completedLessons: newCompletedLessons,
      level: getLevelFromXP(progress.xp + totalXP),
      hearts: 5, // reset hearts after completing a lesson
      badges: earnedBadges,
      moduleScores: newScores,
    };
    save(newProgress);
    setXpPopup({ xp: totalXP, bonus: bonusXP });
    setTimeout(() => setXpPopup(null), 2000);
  };

  const openModule = (idx: number) => {
    setActiveModule(idx);
    setActiveLesson(0);
    setView("module");
  };

  const openLesson = (lIdx: number) => {
    setActiveLesson(lIdx);
    setView("lesson");
  };

  if (!loaded) {
    return <div className={styles.loading}>Cargando SA Academy...</div>;
  }

  const mod = MODULES[activeModule];
  const lesson = mod?.lessons?.[activeLesson];

  const typeLabels: Record<string, string> = {
    theory: "📘 Teoría",
    exercise: "🏋️ Práctica",
    metrics: "📊 Métricas",
    quiz: "❓ Quiz",
  };
  const typeColors: Record<string, string> = {
    theory: "#1B4965",
    exercise: "var(--sa-verde)",
    metrics: "#6D597A",
    quiz: "var(--sa-rojo)",
  };

  return (
    <div className={styles.page}>
      <AcademyHeader progress={progress} onNav={setView} />

      {xpPopup && (
        <div className={styles.xpPopup}>
          +{xpPopup.xp} XP{" "}
          {xpPopup.bonus > 0 && (
            <span className={styles.xpBonus}>
              (+{xpPopup.bonus} racha 🔥)
            </span>
          )}
        </div>
      )}

      <div className={styles.container}>
        {/* ── HOME ── */}
        {view === "home" && (
          <>
            <div className={styles.homeHeader}>
              <h1 className={styles.homeTitle}>Tu camino como analista</h1>
              <p className={styles.homeSubtitle}>
                14 módulos • 56 lecciones • A tu ritmo
              </p>
              <div className={styles.badgeRow}>
                {BADGES.map((b) => {
                  const earned = progress.badges.includes(b.id);
                  return (
                    <div
                      key={b.id}
                      className={earned ? styles.badge : styles.badgeUnearned}
                    >
                      <div className={styles.badgeIcon}>{b.icon}</div>
                      <div className={styles.badgeLabel}>{b.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.moduleList}>
              {MODULES.map((m, i) => (
                <ModuleCard
                  key={i}
                  module={m}
                  index={i}
                  isUnlocked={isModuleUnlocked(i)}
                  isCompleted={isModuleCompleted(i)}
                  progress={progress}
                  onClick={() => openModule(i)}
                />
              ))}
            </div>
          </>
        )}

        {/* ── MODULE DETAIL ── */}
        {view === "module" && mod && (
          <>
            <button onClick={() => setView("home")} className={styles.backBtn}>
              ← Volver a módulos
            </button>
            <div
              className={styles.moduleDetailHeader}
              style={{
                background: mod.color + "12",
                border: `1px solid ${mod.color}30`,
              }}
            >
              <div className={styles.moduleDetailIcon}>{mod.icon}</div>
              <div
                className={styles.moduleDetailNumber}
                style={{ color: mod.color }}
              >
                Módulo {activeModule + 1}
              </div>
              <h2 className={styles.moduleDetailTitle}>{mod.title}</h2>
              <p className={styles.moduleDetailSubtitle}>{mod.subtitle}</p>
            </div>

            {mod.lessons.length === 0 ? (
              <div className={styles.emptyModule}>
                <div className={styles.emptyModuleIcon}>🔒</div>
                <p>Este módulo todavía no tiene contenido.</p>
                <p style={{ fontSize: 13 }}>
                  Completá los módulos anteriores mientras se desbloquea.
                </p>
              </div>
            ) : (
              <div className={styles.lessonList}>
                {mod.lessons.map((l, i) => {
                  const completed = progress.completedLessons.includes(l.id);
                  const unlocked =
                    i === 0 ||
                    progress.completedLessons.includes(
                      mod.lessons[i - 1].id
                    );

                  const cardClass = completed
                    ? styles.lessonCardCompleted
                    : unlocked
                      ? styles.lessonCard
                      : styles.lessonCardLocked;

                  return (
                    <div
                      key={l.id}
                      onClick={unlocked ? () => openLesson(i) : undefined}
                      className={cardClass}
                    >
                      <div>
                        <div
                          className={styles.lessonType}
                          style={{ color: typeColors[l.type] }}
                        >
                          {typeLabels[l.type]}
                        </div>
                        <div className={styles.lessonTitle}>{l.title}</div>
                        {l.duration && (
                          <div className={styles.lessonDuration}>
                            {l.duration}
                          </div>
                        )}
                      </div>
                      <div className={styles.lessonRight}>
                        <span className={styles.lessonXP}>+{l.xp} XP</span>
                        {completed && (
                          <span className={styles.lessonArrow}>✅</span>
                        )}
                        {!completed && unlocked && (
                          <span className={styles.lessonArrow}>→</span>
                        )}
                        {!unlocked && (
                          <span style={{ fontSize: 14 }}>🔒</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── LESSON ── */}
        {view === "lesson" && lesson && (
          <>
            <button
              onClick={() => setView("module")}
              className={styles.backBtn}
            >
              ← Volver a {mod.title}
            </button>
            <div className={styles.lessonContainer}>
              {lesson.type === "theory" && (
                <TheoryLesson
                  lesson={lesson}
                  onComplete={() => {
                    completeLesson(lesson.id, lesson.xp);
                    setView("module");
                  }}
                />
              )}
              {(lesson.type === "exercise" || lesson.type === "metrics") && (
                <ExerciseLesson
                  lesson={lesson}
                  onComplete={() => {
                    completeLesson(lesson.id, lesson.xp);
                    setView("module");
                  }}
                />
              )}
              {lesson.type === "quiz" && (
                <QuizLesson
                  lesson={lesson}
                  onComplete={(score) => {
                    completeLesson(lesson.id, lesson.xp, score);
                    setView("module");
                  }}
                  onUpdateHearts={(h) =>
                    save({ ...progress, hearts: h })
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
