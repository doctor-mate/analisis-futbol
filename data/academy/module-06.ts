import type { AcademyModule } from "./types";

const module06: AcademyModule = {
  id: 6,
  title: "Finalización y Transiciones",
  subtitle: "Goles y momentos de cambio",
  icon: "🎯",
  color: "#E56B6F",
  lessons: [
    {
      id: "6-0",
      type: "theory",
      title: "Cómo genera y convierte ocasiones + transiciones",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Finalización: el último acto del ataque",
            body: `La finalización es la tercera y última fase del ataque organizado. Llegaste al último tercio — ahora, ¿cómo generás y convertís ocasiones de gol?\n\n**Calidad de las ocasiones (xG por tiro)** — No todos los tiros son iguales. Un equipo que genera muchos tiros de bajo xG (desde lejos, con ángulo cerrado) puede tener mucha posesión pero pocas ocasiones reales. Lo que importa es el xG por tiro:\n• **xG/tiro > 0.12**: genera ocasiones de alta calidad (tiros dentro del área, mano a mano)\n• **xG/tiro 0.08-0.12**: calidad media\n• **xG/tiro < 0.08**: tiros de baja calidad (muchos desde lejos)\n\n**¿De dónde vienen los goles?** Los goles se dividen en tres fuentes:\n• **Jugada abierta** — Goles de ataques organizados con el balón en movimiento\n• **Transición** — Goles de contraataques (recuperás y vas rápido al gol)\n• **Balón parado (ABP)** — Goles de córners, tiros libres, penales\n\nLa proporción varía mucho entre equipos. Un equipo dominante marca más en jugada abierta. Uno reactivo marca más en transición. Un equipo con buen juego aéreo puede depender mucho del ABP.\n\n**Conversión** — Es el % de tiros que terminan en gol. El promedio está entre 10-12%. Un equipo con conversión > 14% probablemente está sobrerrindiendo (regresión a la media). Uno con < 8% puede estar subrindiendo.`,
          },
          {
            title: "Transiciones: los 5 segundos más importantes",
            body: `Las transiciones son los momentos de cambio de posesión. Son las fases más caóticas y más peligrosas del fútbol porque ambos equipos están desorganizados.\n\n**Transición ofensiva (de defensa a ataque):**\n• Acabás de recuperar el balón. ¿Qué hacés?\n• **Contraataque directo**: pocos pases, velocidad, buscando el gol antes de que el rival se organice. Ideal cuando recuperás alto y tenés jugadores rápidos adelante.\n• **Reconstrucción**: asegurás la posesión, esperás a que el equipo se organice, y empezás el ataque organizado. Más seguro pero pierde la ventaja de la desorganización rival.\n\n**Transición defensiva (de ataque a defensa):**\n• Acabás de perder el balón. ¿Qué hacés?\n• **Gegenpressing**: los jugadores más cercanos van inmediatamente a presionar para recuperar. Ya lo vimos en el módulo de pressing.\n• **Repliegue**: el equipo se retira ordenadamente a posiciones defensivas. Más seguro pero le da tiempo al rival.\n\nLos mejores equipos del mundo son letales en transición. El Liverpool de Klopp marcaba un % enorme de goles en los primeros 10 segundos post-recuperación. El Real Madrid de Ancelotti con Vinícius y Bellingham es devastador en contraataque.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Las secciones 10 y 12 de la metodología cubren esto:\n\n• **Sección 10 (Finalización)**: xG por partido, xG por tiro, mapa de tiros, fuentes de gol (jugada abierta vs transición vs ABP), principales goleadores y creadores\n• **Sección 12 (Transiciones)**: velocidad de transición ofensiva, goles en contraataque, reacción tras pérdida (gegenpressing vs repliegue)\n\nEn un informe, esto se traduce en recomendaciones directas: "Este equipo genera el 40% de su xG en transición, con contraataques liderados por [jugador] que promedia 4.2 conducciones progresivas post-recuperación. Recomendación: tras perder, hacer gegenpressing inmediato para no dejarlos lanzar."`,
          },
        ],
      },
    },
    {
      id: "6-1",
      type: "exercise",
      title: "Clasificá los tiros y transiciones de un partido",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá un partido completo y clasificá cada tiro y cada transición. El objetivo es construir una mini base de datos del partido.",
        checklist: [
          "Por cada tiro, anotá: minuto, equipo, ubicación (dentro/fuera del área), fuente (jugada abierta / transición / ABP), resultado (gol / a puerta / fuera / bloqueado)",
          "Contá las transiciones ofensivas de cada equipo: ¿cuántas veces recuperaron y buscaron contraataque rápido? ¿Cuántas terminaron en tiro?",
          "Contá las transiciones defensivas: ¿cuántas veces perdieron el balón y presionaron inmediatamente (gegenpressing)? ¿Cuántas veces se replegaron?",
          "Identificá la jugada de gol más clara del partido. ¿De qué fuente fue? ¿Qué xG estimarías?",
          "¿Qué equipo generó mejores ocasiones (más tiros dentro del área)? ¿Coincide con quién ganó?",
          "Conclusión: escribí un párrafo de estilo informe sobre la finalización y transiciones de un equipo del partido.",
        ],
      },
    },
    {
      id: "6-2",
      type: "metrics",
      title: "Mapas de tiro y xG por tiro en Understat",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a Understat y explorá los mapas de tiro (shot maps) y la distribución de xG de varios equipos. Compará la calidad de las ocasiones.",
        tasks: [
          "Elegí 3 equipos con estilos distintos. Para cada uno, mirá el mapa de tiro de la temporada. ¿Dónde se concentran los tiros? ¿Dentro del área o fuera?",
          "Calculá el xG promedio por tiro de cada equipo (xG total / tiros totales). ¿Cuál genera las ocasiones de mayor calidad?",
          "Buscá el equipo con mayor diferencia entre goles y xG (sobreperformance). ¿Tienen un goleador de élite o es pura suerte estadística?",
          "Compará los goles en contraataque de un equipo reactivo vs un equipo dominante. ¿Cuál depende más de las transiciones?",
        ],
        tip: "En Understat, el mapa de tiros usa puntos de diferentes tamaños: más grande = más xG. Los puntos rojos son goles, los verdes son tiros a puerta, los grises son tiros fuera. Esto te da una lectura visual inmediata de dónde y cómo tira un equipo.",
      },
    },
    {
      id: "6-3",
      type: "quiz",
      title: "Evaluación: Finalización y Transiciones",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo tiene xG/tiro de 0.06. ¿Qué indica sobre la calidad de sus ocasiones?",
            options: [
              "Genera ocasiones de altísima calidad",
              "Tira mucho desde lejos — la mayoría de sus tiros son de baja probabilidad de gol",
              "Convierte todo lo que tira",
              "No tiene delanteros",
            ],
            correct: 1,
            explanation:
              "Un xG/tiro de 0.06 es bajo — significa que el tiro promedio tiene solo un 6% de probabilidad de gol. Esto indica que el equipo tira mucho desde fuera del área o desde ángulos difíciles. Para mejorar, necesitan crear ocasiones más claras (más tiros dentro del área, más mano a mano).",
          },
          {
            q: "¿Cuál es la diferencia principal entre un contraataque y el ataque organizado?",
            options: [
              "No hay diferencia",
              "El contraataque aprovecha que el rival está desorganizado tras perder la posesión; el ataque organizado se ejecuta cuando ambos equipos están posicionados",
              "El ataque organizado es más rápido",
              "El contraataque solo funciona con equipos grandes",
            ],
            correct: 1,
            explanation:
              "El contraataque (transición ofensiva) explota la desorganización del rival justo después de recuperar el balón. El ataque organizado se ejecuta cuando ambos equipos ya están en sus posiciones. La clave del contraataque es la velocidad — tenés que llegar al gol antes de que el rival se recomponga.",
          },
          {
            q: "Un equipo marca el 35% de sus goles en transición y solo el 30% en jugada abierta. ¿Qué sugiere sobre su estilo?",
            options: [
              "Es un equipo dominante que tiene siempre la posesión",
              "Es un equipo reactivo/contragolpeador que depende de las transiciones para marcar, probablemente cede la posesión al rival",
              "Es un equipo que juega directo",
              "Tiene el mejor portero de la liga",
            ],
            correct: 1,
            explanation:
              "Marcar más goles en transición que en jugada abierta indica un equipo que espera al rival, defiende, y ataca rápido cuando recupera. Es el perfil de equipos contragolpeadores como el Atlético de Simeone o equipos que juegan contra rivales superiores.",
          },
          {
            q: "¿Qué es el gegenpressing en el contexto de la transición defensiva?",
            options: [
              "Replegarse rápidamente a la propia área",
              "Presión inmediata tras la pérdida del balón para intentar recuperar antes de que el rival organice su ataque",
              "Presionar alto durante todo el partido",
              "Hacer cambios de jugadores en el entretiempo",
            ],
            correct: 1,
            explanation:
              "El gegenpressing es la reacción inmediata a la pérdida: los jugadores cercanos al balón presionan en los primeros 5 segundos para recuperar. Es una forma de transición defensiva proactiva — en vez de replegarse, vas a buscar el balón. Klopp lo llama 'el mejor mediocampista del mundo es el gegenpressing'.",
          },
          {
            q: "En la metodología de Soy Analista, ¿qué secciones cubren la finalización y las transiciones?",
            options: [
              "Secciones 8 y 9 (Construcción y Progresión)",
              "Secciones 10 y 12 (Finalización y Transiciones)",
              "Solo la sección 7 (Estadísticas Globales)",
              "Solo la sección 13 (Balón Parado)",
            ],
            correct: 1,
            explanation:
              "La sección 10 cubre la Finalización (xG, mapas de tiro, fuentes de gol, goleadores y creadores) y la sección 12 cubre las Transiciones (ofensiva y defensiva, velocidad de contraataque, gegenpressing). Juntas completan el análisis del ciclo ataque-defensa.",
          },
        ],
      },
    },
  ],
};

export default module06;
