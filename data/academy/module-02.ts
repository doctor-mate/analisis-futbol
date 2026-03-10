import type { AcademyModule } from "./types";

const module02: AcademyModule = {
  id: 2,
  title: "xG, PPDA y Métricas Avanzadas",
  subtitle: "Los números que respaldan tus informes",
  icon: "📊",
  color: "#1B4965",
  lessons: [
    {
      id: "2-0",
      type: "theory",
      title: "Expected Goals: qué es y qué NO es",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "xG: la métrica que cambió el análisis",
            body: `**Expected Goals (xG)** mide la probabilidad de que un tiro termine en gol, basándose en miles de tiros históricos desde posiciones similares.\n\nCada tiro recibe un valor entre 0 y 1:\n• **Un penal** tiene xG ≈ 0.76 (se convierte el 76% de las veces)\n• **Un tiro dentro del área chica sin oposición** tiene xG ≈ 0.40-0.60\n• **Un tiro desde fuera del área** tiene xG ≈ 0.03-0.06\n• **Un cabezazo desde el segundo palo en un córner** tiene xG ≈ 0.08-0.12\n\nSi un equipo acumula un xG de 1.8 en un partido, significa que la calidad de sus ocasiones equivalía a ~1.8 goles esperados. Si metieron 3, sobrerrindieron. Si metieron 0, tuvieron mala suerte (o un portero rival excepcional).\n\n**npxG (non-penalty xG)** es lo mismo pero sin contar los penales. Es más útil para evaluar la creación de juego real, porque un penal es un evento puntual que no dice mucho sobre cómo juega un equipo.\n\n**xGA (Expected Goals Against)** es el xG que generan los rivales contra vos. Un xGA bajo = tu defensa permite pocas ocasiones claras.`,
          },
          {
            title: "PPDA, pases progresivos y más",
            body: `**PPDA (Passes Per Defensive Action)** mide la intensidad del pressing de un equipo. Es el número de pases que el rival completa antes de que tu equipo haga una acción defensiva (quite, intercepción, falta).\n\n• **PPDA < 8**: Pressing muy agresivo (Liverpool de Klopp, Leverkusen de Xabi Alonso)\n• **PPDA 8-12**: Pressing alto moderado (Manchester City, Barcelona)\n• **PPDA 12-16**: Pressing medio, equilibrado\n• **PPDA > 16**: Bloque bajo, deja jugar al rival (equipos que esperan y salen de contra)\n\n**Pases progresivos** — Un pase que avanza el balón al menos 10 metros hacia la portería rival (excluyendo pases desde el propio tercio). Mide quién hace avanzar el juego. Un equipo con muchos pases progresivos es un equipo que busca verticalidad.\n\n**Conducciones progresivas** — Lo mismo pero con conducción (llevar el balón con el pie). Un jugador con muchas conducciones progresivas es un "motor" que lleva el equipo hacia adelante.\n\n**Pases al último tercio / pases al área** — Miden cuánto llega el juego a zonas peligrosas. Más pases al área = más presencia ofensiva directa.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Estas métricas aparecen en CADA informe de Soy Analista:\n\n• La sección 7 (Estadísticas Globales) muestra xG, xGA, PPDA y pases progresivos con percentiles\n• La sección 10 (Finalización) analiza xG por tiro para medir la calidad de las ocasiones\n• La sección 11 (Pressing) usa PPDA como indicador principal de intensidad defensiva\n• Las secciones 14-15 (Análisis Individual) usan pases progresivos y conducciones progresivas para identificar a los jugadores clave en la progresión\n\nCuando hables con un cliente, vas a necesitar explicar: "Este equipo tiene un PPDA de 7.2, lo que significa que presiona agresivamente — solo deja 7 pases antes de disputar el balón. Eso es nivel Liverpool."`,
          },
        ],
      },
    },
    {
      id: "2-1",
      type: "exercise",
      title: "Estimá el xG de cada tiro en un partido",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá un partido completo (o los highlights de un partido con al menos 20 tiros entre ambos equipos). Por cada tiro, estimá si es de xG alto (>0.20), medio (0.05-0.20) o bajo (<0.05). Después chequeá en Understat cómo estuvo tu estimación.",
        checklist: [
          "Anotá cada tiro del partido: minuto, equipo, ubicación (dentro/fuera del área), resultado (gol/parado/fuera/bloqueado)",
          "Para cada tiro, escribí tu estimación de xG: Alto (>0.20), Medio (0.05-0.20), Bajo (<0.05)",
          "Entrá a understat.com, buscá el partido y compará tus estimaciones con el xG real de cada tiro",
          "¿En cuántos acertaste la categoría? Si acertaste más del 70%, vas bien. Si no, revisá qué factores no estabas considerando (ángulo, presión del defensor, tipo de jugada)",
          "Calculá el xG total de cada equipo sumando tus estimaciones. ¿Coincide con el resultado del partido?",
          "Conclusión: ¿El equipo que ganó fue el que tuvo mejor xG, o hubo sobrerendimiento?",
        ],
      },
    },
    {
      id: "2-2",
      type: "metrics",
      title: "xG vs goles reales en Understat",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a understat.com y seleccioná cualquier liga top (LaLiga, Premier League, Serie A, Bundesliga, Ligue 1). Mirá la tabla de la temporada actual y compará xG vs goles reales para 5 equipos.",
        tasks: [
          "Elegí 5 equipos de la liga. Para cada uno, anotá: Goles reales, xG, y la diferencia (Goles - xG). Si la diferencia es positiva, sobrerrinden. Si es negativa, subrinden.",
          "¿Cuál equipo tiene la mayor sobreperformance (más goles que xG)? ¿Y la mayor subperformance? Investigá por qué (¿tienen un goleador excepcional? ¿mala suerte? ¿portero flojo?).",
          "Hacé lo mismo con xGA (Expected Goals Against) vs goles recibidos reales. ¿Hay algún equipo cuya defensa sobrerrinde (recibe menos goles que xGA)?",
          "Buscá el PPDA de al menos 3 equipos. ¿Los equipos con PPDA más bajo (pressing más agresivo) tienen también mejor xGA?",
        ],
        tip: "En Understat, podés hacer click en cada equipo para ver su mapa de tiros. Los puntos grandes representan tiros de alto xG (buenas ocasiones) y los chicos son tiros de bajo xG (tiros difíciles).",
      },
    },
    {
      id: "2-3",
      type: "quiz",
      title: "Evaluación: Métricas Avanzadas",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo tiene xG de 58.3 y ha marcado 65 goles en la temporada. ¿Qué significa esto?",
            options: [
              "Sus delanteros están convirtiendo por debajo de lo esperado",
              "Están sobrerrindiendo ofensivamente — sus delanteros convierten más de lo que el modelo predice",
              "Su defensa es mala",
              "Sus xG están mal calculados",
            ],
            correct: 1,
            explanation:
              "65 goles reales vs 58.3 xG = +6.7 de sobreperformance. Sus delanteros están siendo más clínicos de lo esperado. Estadísticamente, esto tiende a normalizarse a largo plazo (regresión a la media), salvo que tengan un finalizador de élite.",
          },
          {
            q: "¿Qué indica un PPDA de 6.5?",
            options: [
              "El equipo defiende en bloque bajo y deja jugar al rival",
              "El equipo presiona de forma extremadamente agresiva, disputando el balón muy arriba",
              "El equipo tiene mala posesión",
              "El equipo recibe muchos goles",
            ],
            correct: 1,
            explanation:
              "Un PPDA de 6.5 es muy bajo — significa que el rival solo completa 6.5 pases antes de que el equipo realice una acción defensiva. Esto indica un pressing altísimo, al nivel del Liverpool de Klopp o el Leverkusen de Xabi Alonso.",
          },
          {
            q: "¿Cuál es la diferencia entre xG y npxG?",
            options: [
              "npxG incluye los penales, xG no",
              "npxG excluye los penales para medir mejor la creación de juego abierto",
              "Son exactamente lo mismo",
              "npxG mide la defensa y xG el ataque",
            ],
            correct: 1,
            explanation:
              "npxG (non-penalty xG) excluye los penales del cálculo. Es más útil para evaluar la capacidad real de un equipo para crear ocasiones de gol desde el juego abierto, ya que un penal es un evento aislado que distorsiona los números.",
          },
          {
            q: "Un jugador tiene 12 pases progresivos por partido y 8 conducciones progresivas por partido. ¿Qué tipo de jugador es probablemente?",
            options: [
              "Un portero",
              "Un delantero centro clásico",
              "Un mediocampista que hace avanzar el juego (un 'motor' o 'progresor')",
              "Un defensa central que solo despeja",
            ],
            correct: 2,
            explanation:
              "Números altos tanto en pases progresivos como en conducciones progresivas indican un jugador que hace avanzar el equipo de ambas formas: pasando y conduciendo. Es el perfil de un mediocampista progresor como Pedri o De Bruyne.",
          },
          {
            q: "¿Por qué es peligroso evaluar a un equipo SOLO por sus goles marcados sin mirar el xG?",
            options: [
              "Porque los goles no importan",
              "Porque el xG es siempre más preciso que los goles reales",
              "Porque los goles reales pueden incluir sobrerendimiento temporal que probablemente no se sostendrá, dando una imagen falsa del nivel real",
              "Porque el xG mide la defensa",
            ],
            correct: 2,
            explanation:
              "Los goles reales reflejan lo que pasó, pero no necesariamente lo que va a seguir pasando. Un equipo con 40 goles y 30 xG probablemente está sobrerrindiendo — y si no cambia nada, sus goles van a bajar. El xG te da una predicción más estable del nivel real.",
          },
        ],
      },
    },
  ],
};

export default module02;
