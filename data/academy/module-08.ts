import type { AcademyModule } from "./types";

const module08: AcademyModule = {
  id: 8,
  title: "ICI y Perfiles de Rol",
  subtitle: "Tu métrica propia",
  icon: "🧮",
  color: "#4A4E69",
  lessons: [
    {
      id: "8-0",
      type: "theory",
      title: "El Índice de Contribución Individual (ICI)",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "¿Qué mide el ICI?",
            body: `El ICI (Índice de Contribución Individual) es la métrica compuesta propia de Soy Analista. Intenta responder una pregunta difícil: **¿cuánto contribuye un jugador al equipo, considerando todas las facetas del juego?**\n\nA diferencia de métricas simples (goles, asistencias), el ICI combina tres dimensiones:\n\n**1. Contribución Ofensiva** — Pondera xG, xA, pases clave, regates exitosos, tiros a puerta. Mide cuánto aporta en la fase de finalización.\n\n**2. Contribución en Construcción** — Pondera pases progresivos, conducciones progresivas, pases al último tercio, precisión de pase, toques. Mide cuánto aporta en mover el balón hacia adelante.\n\n**3. Contribución Defensiva** — Pondera tackles ganados, intercepciones, bloqueos, despejes, duelos aéreos ganados. Mide cuánto aporta en la recuperación del balón.\n\nLa clave del ICI es que **las ponderaciones cambian según la posición**:\n• Un delantero pesa más en ofensiva (60%) que en defensa (20%)\n• Un central pesa más en defensa (55%) que en ofensiva (10%)\n• Un mediocampista tiene un balance más equilibrado (30/40/30)\n\nEsto significa que no penalizás a un central por no marcar goles, ni a un delantero por no interceptar.`,
          },
          {
            title: "Las 4 dimensiones del perfil de rol",
            body: `Además del ICI numérico, cada jugador tiene un **perfil de rol** con 4 dimensiones que describen QUÉ TIPO de jugador es:\n\n**Dimensión 1: Trabajo Defensivo**\n• Total Defender (P80+): el jugador es una máquina defensiva\n• Defensive Contributor (P40-P80): aporta defensivamente de forma regular\n• Occasional Defender (P15-P40): defiende poco\n• Minimal (P0-P15): casi no participa en defensa\n\n**Dimensión 2: Capacidad Creativa**\n• Pure Playmaker (P80+): creador de élite\n• Connector/Creator (P40-P80): conecta juego, crea ocasiones\n• Support in Build-up (P15-P40): participa poco en la creación\n• Minimal (P0-P15): no aporta creativamente\n\n**Dimensión 3: Progresión**\n• Explosive/Very Vertical (P80+): rompe líneas constantemente\n• Motor/Vertical (P40-P80): hace avanzar el juego con regularidad\n• Support Progression (P15-P40): progresa poco\n• Static (P0-P15): no hace avanzar el juego\n\n**Dimensión 4: Finalización**\n• Elite Finisher (P80+): goleador top\n• Goal Threat (P40-P80): llega al gol con regularidad\n• Occasional (P15-P40): marca esporádicamente\n• Rarely Finishes (P0-P15): casi no marca\n\nEjemplo: Un mediocampista box-to-box como Bellingham podría ser: Defensive Contributor / Connector / Motor / Goal Threat.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `El ICI y los perfiles de rol aparecen en las secciones 14 y 15 de cada informe:\n\n• **Sección 14**: ranking de jugadores por ICI (quién contribuye más al equipo) + rankings por categoría\n• **Sección 15**: perfil de rol de cada titular con las 4 dimensiones + etiquetas\n\nCuando hablás con un agente de jugadores, poder decir: "Tu jugador tiene un ICI de 2.8 — contribución alta. Su perfil es Connector / Motor / Goal Threat / Occasional Defender. Eso lo hace ideal para un equipo que necesita un mediocampista ofensivo que llegue al gol, pero necesitaría un pivote defensivo al lado." Eso es hablar con datos.\n\nEl ICI te da un número para comparar jugadores de distintas posiciones ajustando por rol. No es perfecto — ninguna métrica compuesta lo es — pero es una herramienta poderosa cuando se usa junto con el ojo táctico.`,
          },
        ],
      },
    },
    {
      id: "8-1",
      type: "exercise",
      title: "Estimá las dimensiones de rol de 3 jugadores",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Elegí un partido y seleccioná 3 jugadores de posiciones diferentes (por ejemplo: un central, un mediocampista y un extremo). Observalos durante el partido y estimá cuál de las 4 dimensiones de rol es la más alta para cada uno.",
        checklist: [
          "Jugador 1 (anotá nombre y posición): Observá durante el partido. ¿Qué dimensión es la más evidente? ¿Trabaja mucho defensivamente? ¿Crea? ¿Progresa? ¿Finaliza?",
          "Jugador 2 (anotá nombre y posición): Mismo ejercicio. ¿Ves diferencias claras respecto al jugador 1 en cuanto a sus dimensiones dominantes?",
          "Jugador 3 (anotá nombre y posición): Mismo ejercicio. Ahora compará los tres: ¿quién lidera en cada dimensión?",
          "Para cada jugador, asigná una etiqueta de las 4 dimensiones (ejemplo: 'Motor / Connector / Goal Threat / Occasional Defender'). Usá tu intuición del partido.",
          "Después del partido, buscá las stats de los 3 jugadores en FBref. ¿Tu percepción coincide con los datos? ¿En qué te equivocaste?",
        ],
      },
    },
    {
      id: "8-2",
      type: "metrics",
      title: "Calculá un ICI simplificado con datos de FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Vamos a calcular una versión simplificada del ICI para un jugador usando datos reales de FBref. Elegí un mediocampista de cualquier equipo y seguí estos pasos.",
        tasks: [
          "Buscá en FBref y anotá estas métricas per 90 del jugador: xG, xA, pases clave, regates exitosos (Ofensivo). Pases progresivos, conducciones progresivas, pases al último tercio, precisión de pase (Construcción). Tackles ganados, intercepciones, bloqueos (Defensivo).",
          "Para cada grupo, sumá los valores normalizados (dividí cada métrica por el valor máximo de la liga para esa métrica, para obtener un valor entre 0 y 1). Multiplicá por las ponderaciones de mediocampista: Ofensivo × 0.30, Construcción × 0.40, Defensivo × 0.30.",
          "Sumá los tres componentes para obtener el ICI simplificado. ¿Te parece un número razonable? Comparalo con tu percepción del jugador.",
          "Hacé el mismo cálculo para otro mediocampista rival. ¿Quién tiene mayor ICI? ¿El resultado tiene sentido comparando lo que sabés de ambos jugadores?",
        ],
        tip: "No te preocupes si los números no salen perfectos — este es un ejercicio para entender la lógica detrás del ICI. La versión real usa fórmulas más complejas con normalización estadística y ajustes por posesión del equipo.",
      },
    },
    {
      id: "8-3",
      type: "quiz",
      title: "Evaluación: ICI y Perfiles de Rol",
      xp: 50,
      content: {
        questions: [
          {
            q: "¿Por qué las ponderaciones del ICI cambian según la posición del jugador?",
            options: [
              "No cambian, son iguales para todos",
              "Para no penalizar a un jugador por no hacer cosas que no son su rol — un central no debería ser evaluado igual que un delantero en goles",
              "Porque los centrales son más importantes que los delanteros",
              "Para hacer los cálculos más difíciles",
            ],
            correct: 1,
            explanation:
              "Las ponderaciones ajustadas por posición son fundamentales para que el ICI sea justo. Un central contribuye principalmente en defensa (55%) y construcción (35%), así que su ICI pesa más esas dimensiones. Un delantero contribuye en ofensiva (60%), así que pesa más goles y xG. Sin esto, todos los centrales tendrían ICI bajo y todos los delanteros alto.",
          },
          {
            q: "Un jugador tiene ICI de 3.6. ¿En qué nivel lo ubica la escala de Soy Analista?",
            options: [
              "Bajo — contribución mínima",
              "Promedio — contribución estándar",
              "Elite — contribuidor excepcional, top del plantel",
              "No existe esa escala",
            ],
            correct: 2,
            explanation:
              "Un ICI > 3.50 se clasifica como 'Elite contributor' en la escala de Soy Analista. La escala va: <0.50 (Low), 0.50-1.50 (Below average), 1.50-2.50 (Average), 2.50-3.50 (High), >3.50 (Elite).",
          },
          {
            q: "Un extremo tiene el perfil de rol: 'Minimal Defensive Work / Creator / Explosive / Goal Threat'. ¿Qué tipo de jugador es?",
            options: [
              "Un mediocampista defensivo",
              "Un extremo ofensivo puro que crea, progresa con velocidad y llega al gol, pero no aporta defensivamente",
              "Un central que sale jugando",
              "Un portero moderno",
            ],
            correct: 1,
            explanation:
              "Este perfil describe un extremo puramente ofensivo: crea (Creator), progresa con velocidad (Explosive), llega al gol (Goal Threat), pero no defiende (Minimal). Es el perfil de jugadores tipo Salah, Vinícius Jr. o Mbappé — talento ofensivo puro que necesita compañeros que cubran su falta de trabajo defensivo.",
          },
          {
            q: "¿Cuáles son las 4 dimensiones del perfil de rol en Soy Analista?",
            options: [
              "Velocidad, fuerza, técnica, inteligencia",
              "Trabajo defensivo, capacidad creativa, progresión, finalización",
              "Ataque, defensa, pases, tiros",
              "Goles, asistencias, tackles, pases",
            ],
            correct: 1,
            explanation:
              "Las 4 dimensiones del perfil de rol son: (1) Trabajo defensivo — cuánto aporta sin balón, (2) Capacidad creativa — cuánto genera para otros, (3) Progresión — cuánto hace avanzar el juego, (4) Finalización — cuánto llega al gol. Cada dimensión tiene 4 etiquetas (de élite a mínimo) basadas en percentiles.",
          },
          {
            q: "¿En qué secciones de la metodología aparecen el ICI y los perfiles de rol?",
            options: [
              "Solo en la sección 2 (Resumen Ejecutivo)",
              "Secciones 14 (Análisis Individual y Rankings) y 15 (Fichas de Jugadores Clave)",
              "Solo en la sección 7 (Estadísticas Globales)",
              "No aparecen en la metodología",
            ],
            correct: 1,
            explanation:
              "La sección 14 presenta el ranking de jugadores por ICI y por categorías individuales. La sección 15 presenta la ficha completa de cada titular con su perfil de rol (4 dimensiones con etiquetas), estadísticas, radar y narrativa de scouting.",
          },
        ],
      },
    },
  ],
};

export default module08;
