import type { AcademyModule } from "./types";

const module07: AcademyModule = {
  id: 7,
  title: "Perfiles de Jugador y Radares",
  subtitle: "Radares, percentiles y roles",
  icon: "👤",
  color: "#577590",
  lessons: [
    {
      id: "7-0",
      type: "theory",
      title: "Cómo leer un radar de jugador",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "El radar: la huella dactilar de un jugador",
            body: `Un radar de jugador (o gráfico de araña) muestra múltiples métricas en un solo gráfico circular. Cada eje representa una métrica diferente, y el valor se extiende desde el centro (bajo) hacia el exterior (alto).\n\nEn Soy Analista usamos radares de 12 métricas adaptadas a cada posición. Para un mediocampista, por ejemplo, los ejes podrían ser:\n\n**Ofensivos**: goles p90, xG p90, tiros a puerta p90\n**Creativos**: asistencias p90, xA p90, pases clave p90\n**Progresión**: pases progresivos p90, conducciones progresivas p90, pases al último tercio p90\n**Defensivos**: tackles p90, intercepciones p90, presiones p90\n\nLo más importante del radar: **no dice si un jugador es "bueno" o "malo"**. Dice en qué es fuerte y en qué es débil. Un mediocampista defensivo va a tener ejes altos en tackles e intercepciones pero bajos en goles y asistencias — y eso está bien, es su rol.\n\nEl radar te ayuda a responder: ¿qué perfil tiene este jugador? ¿Qué aporta? ¿Qué no aporta?`,
          },
          {
            title: "Percentiles: el contexto que lo cambia todo",
            body: `Los valores absolutos no dicen mucho. "3.2 tackles p90" suena bien, pero ¿es mucho o poco para un lateral? Ahí entran los **percentiles**.\n\nUn percentil compara al jugador contra todos los de su misma posición en la liga:\n\n• **P90+**: élite, top 10% de la posición\n• **P75-P89**: muy bueno, cuarto superior\n• **P50-P74**: promedio-bueno\n• **P25-P49**: por debajo del promedio\n• **P0-P24**: bajo, cuarto inferior\n\nEjemplo: Un lateral con 3.2 tackles p90 está en P72 — es decir, supera al 72% de los laterales de la liga en tackles. Es bueno pero no excepcional.\n\nEn los informes de Soy Analista, los percentiles se muestran con colores:\n• **Verde** (P75+): fortaleza clara\n• **Amarillo-verde** (P50-P74): aceptable\n• **Naranja** (P25-P49): debilidad relativa\n• **Rojo** (P0-P24): debilidad importante\n\nEsto permite una lectura instantánea: mirás el radar con colores y en 3 segundos sabés dónde es fuerte y dónde es débil.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Los perfiles de jugador son el corazón de las secciones 14 y 15 de la metodología:\n\n• **Sección 14 (Análisis Individual)**: rankings de todos los jugadores del plantel por categoría (goles, creación, progresión, defensa, duelos)\n• **Sección 15 (Fichas de Jugadores Clave)**: perfil detallado de los 11 titulares + 2-3 suplentes con radar, bio, estadísticas y narrativa de scouting\n\nCuando un agente de representación te pregunta sobre un jugador, vos deberías poder decir: "Está en P82 para pases progresivos y P78 para conducciones progresivas — es uno de los mejores progresores de la liga en su posición. Pero está en P28 defensivamente — no aporta en el repliegue. Perfecto para un equipo que quiere dominar la posesión, complicado para uno que necesita equilibrio."`,
          },
        ],
      },
    },
    {
      id: "7-1",
      type: "exercise",
      title: "Seguí un jugador 45 minutos y compará con sus stats",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Elegí un jugador específico de un partido que vayas a ver (o que ya tengas grabado). Seguilo durante un tiempo completo (45 min), anotando todo lo que hace. Después, compará tus observaciones con sus estadísticas en FBref.",
        checklist: [
          "Elegí un jugador y anotá: posición, equipo, rival. Durante 45 min, registrá cada acción relevante: pases clave, tiros, regates, recuperaciones, pérdidas, posicionamiento.",
          "¿Cuántos pases clave (que generen ocasión) dio? ¿Cuántos tiros hizo? ¿Desde dónde?",
          "¿Cuántas veces recuperó el balón (tackles, intercepciones)? ¿En qué zona del campo?",
          "¿Cuántas veces perdió el balón? ¿En situaciones de riesgo o en zonas seguras?",
          "Ahora andá a FBref y buscá las estadísticas del jugador en la temporada. ¿Tus observaciones del partido coinciden con su perfil estadístico general?",
          "Escribí 3 frases describiendo al jugador usando lenguaje de informe: qué aporta, dónde es fuerte, dónde es débil.",
        ],
      },
    },
    {
      id: "7-2",
      type: "metrics",
      title: "Interpretá un perfil individual en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a FBref, buscá un jugador que te interese y explorá su página individual. El objetivo es construir mentalmente su radar con los datos disponibles.",
        tasks: [
          "Anotá las métricas per-90 del jugador en 4 categorías: Ofensivo (goles, xG, tiros), Creativo (asistencias, xA, pases clave), Progresión (pases progresivos, conducciones progresivas), Defensivo (tackles, intercepciones, presiones).",
          "¿Cuál categoría es la más alta? ¿Cuál la más baja? ¿Coincide con lo que sabés del jugador por verlo jugar?",
          "Compará al jugador con otro de su misma posición en otro equipo. ¿En qué métricas es superior? ¿En cuáles inferior?",
          "Si FBref muestra percentiles (los gráficos de barras horizontales en la página del jugador), usá esos. Si no, estimá: ¿en qué métricas creés que está en P75+ y en cuáles en P25-?",
        ],
        tip: "FBref tiene una sección 'Scout Report' en la página de cada jugador que muestra un radar con percentiles. Es exactamente lo que usamos en Soy Analista para los perfiles de jugador.",
      },
    },
    {
      id: "7-3",
      type: "quiz",
      title: "Evaluación: Perfiles de Jugador",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un jugador está en P92 para pases clave pero en P15 para tackles. ¿Qué tipo de jugador es probablemente?",
            options: [
              "Un defensa central sólido",
              "Un jugador creativo/ofensivo que no aporta defensivamente",
              "Un jugador promedio en todo",
              "Un portero",
            ],
            correct: 1,
            explanation:
              "P92 en pases clave (top 8% de la posición) pero P15 en tackles (bottom 15%) indica un perfil claramente ofensivo/creativo. Probablemente un mediapunta, extremo o mediocampista ofensivo cuyo valor está en la creación, no en la defensa.",
          },
          {
            q: "¿Qué mide un percentil P75?",
            options: [
              "Que el jugador está en el 75% más bajo",
              "Que el jugador supera al 75% de los jugadores de su posición en esa métrica",
              "Que el jugador juega 75 minutos por partido",
              "Que el jugador tiene 75 pases por partido",
            ],
            correct: 1,
            explanation:
              "P75 significa que el jugador supera al 75% de los jugadores de su misma posición en esa métrica — está en el cuarto superior (top 25%). Es una fortaleza clara. En los informes de Soy Analista, P75+ se marca en verde.",
          },
          {
            q: "¿Por qué es importante comparar percentiles por POSICIÓN y no contra todos los jugadores?",
            options: [
              "No es importante, se puede comparar contra todos",
              "Porque un central con 2 goles p90 sería élite, pero un delantero con 2 goles p90 sería promedio — las expectativas dependen de la posición",
              "Porque solo hay datos por posición",
              "Porque las posiciones no importan en el fútbol moderno",
            ],
            correct: 1,
            explanation:
              "Un central con 1 asistencia p90 sería extraordinario (P99), pero un mediapunta con 1 asistencia p90 es normal. Los percentiles por posición dan contexto real: comparan al jugador contra los que hacen su mismo trabajo, no contra todos los del plantel.",
          },
          {
            q: "Un radar de jugador muestra valores altos en tackles, intercepciones y presiones, pero bajos en goles, xG y pases clave. ¿Cuál sería el perfil de rol correcto?",
            options: [
              "Finalizador / goleador",
              "Mediocampista defensivo / destructor (fuerte en trabajo defensivo, limitado en contribución ofensiva)",
              "Extremo invertido",
              "Mediapunta creativo",
            ],
            correct: 1,
            explanation:
              "Valores altos en métricas defensivas (tackles, intercepciones, presiones) y bajos en ofensivas (goles, xG, pases clave) definen un perfil de mediocampista defensivo o 'destructor'. Es el tipo de jugador que gana balones y protege la defensa, como Kanté o Casemiro.",
          },
          {
            q: "En los informes de Soy Analista, ¿qué color se usa para marcar una métrica en P25 o inferior?",
            options: [
              "Verde",
              "Amarillo",
              "Rojo — indica una debilidad importante",
              "Azul",
            ],
            correct: 2,
            explanation:
              "Rojo (#C13628, el color acento de Soy Analista) se usa para percentiles P0-P24, indicando una debilidad significativa. Verde es P75+ (fortaleza), amarillo-verde es P50-P74 (aceptable), naranja es P25-P49 (debilidad relativa).",
          },
        ],
      },
    },
  ],
};

export default module07;
