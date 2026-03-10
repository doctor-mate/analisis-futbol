import type { AcademyModule } from "./types";

const module09: AcademyModule = {
  id: 9,
  title: "Balón Parado (ABP)",
  subtitle: "El 30% invisible de los goles",
  icon: "🎌",
  color: "#9A8C98",
  lessons: [
    {
      id: "9-0",
      type: "theory",
      title: "Córners, tiros libres, penales: el arma silenciosa",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "El peso real del balón parado",
            body: `Las acciones a balón parado (ABP) son el aspecto más subestimado del fútbol. Los datos son contundentes: **entre el 25% y el 35% de los goles en las ligas top vienen de situaciones de balón parado** (córners, tiros libres directos e indirectos, penales, saques de banda largos).\n\nPara un equipo chico jugando contra uno grande, el ABP puede ser su principal vía de gol. Para un equipo grande, descuidar el ABP defensivo puede ser letal.\n\n**Córners ofensivos** — Hay varias estrategias:\n• **Primer palo**: el lanzamiento va al primer palo buscando un remate o un desvío. Rápido, difícil de defender si hay un jugador con buen timing.\n• **Segundo palo**: va al palo lejano, buscando un cabezazo o una segunda jugada. Más espacio pero más tiempo para que la defensa se organice.\n• **Córner corto**: se juega corto a un compañero cercano para cambiar el ángulo del centro. Útil contra defensas zonales.\n• **Al punto penal**: va al centro del área, buscando la densidad de jugadores. Alto riesgo, alta recompensa.\n\n**Tiros libres** — Directos (disparo al arco) e indirectos (centro al área). Los especialistas importan: un buen lanzador de tiros libres es un diferencial enorme.\n\n**Penales** — xG de ~0.76. El lanzador designado y su % de conversión son datos clave.`,
          },
          {
            title: "ABP defensivo: zonal vs al hombre vs mixto",
            body: `Tan importante como el ABP ofensivo es cómo defiende un equipo las jugadas a balón parado:\n\n**Defensa zonal** — Los jugadores marcan zonas del área, no a jugadores rivales específicos. Ventaja: posiciones predecibles, buena para despejar primeros balones. Desventaja: vulnerable a carreras diagonales y a jugadores que atacan zonas vacías.\n\n**Defensa al hombre** — Cada defensor marca a un atacante específico. Ventaja: responsabilidad individual clara. Desventaja: si un defensor pierde su marca, hay peligro inmediato. Los bloqueos (screens) del equipo atacante pueden desmarcar a un rematador.\n\n**Defensa mixta** — Combinación: algunos jugadores defienden en zona (generalmente en la zona del primer palo y el punto penal) y otros marcan al hombre a los rematadores más peligrosos. Es el sistema más usado en el fútbol de élite actual.\n\nIdentificar el sistema defensivo del rival te permite encontrar debilidades: si defienden zonal, buscá carreras que ataquen las zonas débiles. Si defienden al hombre, usá bloqueos para liberar al rematador.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `La sección 13 de la metodología ("Acciones a Balón Parado") cubre todo esto. En cada informe analizás:\n\n**Ofensivo:**\n• ¿Quién lanza los córners? ¿Con qué pie? ¿Abierto o cerrado?\n• ¿A qué zona van la mayoría? (primer palo, segundo, corto, punto penal)\n• ¿Quién es la amenaza aérea principal? (altura, duelos aéreos p90, % aéreo)\n• % de tiros y goles que vienen de ABP\n\n**Defensivo:**\n• ¿Defienden zonal, al hombre o mixto?\n• ¿Hay alguna vulnerabilidad clara? (por ejemplo: pierden duelos aéreos, no cierran el primer palo)\n• Goles recibidos de ABP vs jugada abierta\n\nCuando el 30% de los goles viene de ABP, ignorar esta sección es perder un tercio del análisis.`,
          },
        ],
      },
    },
    {
      id: "9-1",
      type: "exercise",
      title: "Analizá los córners de un partido",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá un partido completo (o los highlights de uno con muchos córners) y analizá cada córner de ambos equipos. Necesitás prestar atención a: quién lanza, a dónde va, quién remata, cómo defiende el rival.",
        checklist: [
          "Contá todos los córners del partido. Para cada uno anotá: equipo, minuto, lanzador, zona (primer palo / segundo palo / corto / punto penal)",
          "¿Quién remata? ¿Conecta? ¿Es el jugador más alto del equipo?",
          "¿Cómo defiende el rival los córners? Identificá si usan defensa zonal (jugadores mirando al balón en zonas), al hombre (cada uno marca a uno) o mixto",
          "¿Algún córner generó un tiro a puerta o un gol? ¿De qué tipo fue?",
          "Identificá si hay un patrón: ¿el equipo repite la misma rutina de córner? ¿Varía según el lado?",
          "Conclusión: ¿qué equipo fue más peligroso en córners? ¿Alguna vulnerabilidad defensiva clara?",
        ],
      },
    },
    {
      id: "9-2",
      type: "metrics",
      title: "Goles de ABP vs jugada abierta en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a FBref y buscá las estadísticas de gol de varios equipos, distinguiendo entre goles de jugada abierta y goles de ABP (set pieces).",
        tasks: [
          "Para 3 equipos, buscá: goles totales, goles de jugada abierta, goles de ABP (córners, tiros libres, penales). Calculá el % de goles que viene de ABP para cada uno.",
          "¿Hay algún equipo donde más del 35% de sus goles venga de ABP? Si sí, ¿qué dice sobre su estilo? Probablemente tiene buenos cabeceadores o buen lanzador de balón parado.",
          "Buscá los jugadores con más goles de cabeza en los equipos analizados. ¿Coinciden con los que más duelos aéreos ganan?",
          "Mirá los goles RECIBIDOS de ABP. ¿Hay algún equipo que conceda mucho de ABP? Esa es una debilidad que un DT rival querría explotar.",
        ],
        tip: "En FBref, en la tabla de equipo bajo 'Standard Stats', podés ver los goles divididos por tipo. Los 'Set Piece Goals' incluyen córners, tiros libres y penales.",
      },
    },
    {
      id: "9-3",
      type: "quiz",
      title: "Evaluación: Balón Parado",
      xp: 50,
      content: {
        questions: [
          {
            q: "¿Qué porcentaje aproximado de los goles en las ligas top viene de acciones a balón parado?",
            options: [
              "5-10%",
              "10-15%",
              "25-35%",
              "50-60%",
            ],
            correct: 2,
            explanation:
              "Entre el 25% y el 35% de los goles en las principales ligas europeas provienen de ABP (córners, tiros libres, penales). Es un tercio de todos los goles — una proporción enorme que muchos subestiman.",
          },
          {
            q: "¿Cuál es la diferencia principal entre defensa zonal y defensa al hombre en córners?",
            options: [
              "No hay diferencia práctica",
              "En zonal los defensores marcan zonas del área; en al hombre cada defensor sigue a un atacante específico",
              "La zonal es más ofensiva",
              "La defensa al hombre solo se usa en penales",
            ],
            correct: 1,
            explanation:
              "En defensa zonal, los jugadores se posicionan en zonas predeterminadas del área y atacan el balón cuando llega a su zona. En defensa al hombre, cada defensor es responsable de seguir a un atacante rival específico por toda el área. La mixta combina ambas: algunos en zona, otros marcando al hombre.",
          },
          {
            q: "Un equipo lanza el 60% de sus córners al primer palo. ¿Qué debería hacer el rival para defenderse?",
            options: [
              "No hacer nada especial",
              "Poner un jugador fuerte en la zona del primer palo y asegurar que nadie pierda esa zona ante carreras rivales",
              "Sacar al portero a cortar todos los centros",
              "Defender solo al hombre sin importar la zona",
            ],
            correct: 1,
            explanation:
              "Si el rival tiene tendencia al primer palo (60% de los córners), la clave defensiva es reforzar esa zona: un defensor alto y fuerte en el primer palo que ataque el balón, y otro que cubra cualquier desvío. Es exactamente el tipo de dato accionable que va en un informe de Soy Analista.",
          },
          {
            q: "¿Qué es un 'screen' o 'bloqueo' en un córner ofensivo?",
            options: [
              "Cuando el portero bloquea el tiro",
              "Cuando un atacante se interpone en el camino de un defensor para liberar a un compañero de su marca",
              "Cuando todos los jugadores se agrupan en una zona",
              "Un tipo de córner corto",
            ],
            correct: 1,
            explanation:
              "Un screen o bloqueo es una jugada diseñada donde un atacante se posiciona deliberadamente en el camino de un defensor rival, impidiendo que siga a su marca. Esto libera al rematador para atacar el balón sin oposición. Es legal siempre que el bloqueo no sea agresivo, y es especialmente efectivo contra defensas al hombre.",
          },
          {
            q: "¿Qué sección de la metodología de Soy Analista cubre el balón parado?",
            options: [
              "Sección 10 — Finalización",
              "Sección 11 — Pressing y Defensa",
              "Sección 13 — Acciones a Balón Parado (ABP)",
              "Sección 7 — Estadísticas Globales",
            ],
            correct: 2,
            explanation:
              "La sección 13 está íntegramente dedicada a las Acciones a Balón Parado (ABP). Cubre córners ofensivos y defensivos, tiros libres, penales, amenazas aéreas, y las tendencias del equipo en situaciones de balón parado.",
          },
        ],
      },
    },
  ],
};

export default module09;
