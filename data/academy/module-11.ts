import type { AcademyModule } from "./types";

const module11: AcademyModule = {
  id: 11,
  title: "Vocabulario Profesional",
  subtitle: "Hablar como analista",
  icon: "💬",
  color: "#C9ADA7",
  lessons: [
    {
      id: "11-0",
      type: "theory",
      title: "30 términos clave + lenguaje de acción futbolística",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Terminología esencial del análisis táctico",
            body: `Un analista profesional usa un vocabulario preciso. Estos son los 30 términos que más vas a usar en informes y conversaciones:\n\n**Fases y estructura:**\n1. **Build-up / Construcción** — Cómo el equipo saca el balón desde atrás\n2. **Progresión** — Cómo avanza el balón hacia el último tercio\n3. **Finalización** — Cómo genera y convierte ocasiones\n4. **Pressing** — Presión colectiva sobre el portador del balón\n5. **Gegenpressing / Contrapress** — Presión inmediata tras la pérdida\n6. **Transición** — Momento de cambio de posesión\n7. **Bloque (bajo/medio/alto)** — Altura a la que defiende el equipo\n\n**Posicional:**\n8. **Pivote (6)** — Mediocampista por delante de la defensa\n9. **Interior (8)** — Mediocampista de llegada\n10. **Mediapunta (10)** — Creador entre líneas\n11. **Extremo invertido** — Juega en banda contraria a su pierna\n12. **Lateral inverso** — Lateral que se mete al centro como mediocampista\n13. **Falso 9** — Delantero que baja al mediocampo\n14. **Carrilero** — Lateral/extremo en sistema de 3 centrales\n15. **Línea de salida** — Los jugadores que participan en la construcción`,
          },
          {
            title: "Más términos + lenguaje de acción",
            body: `**Métricas y análisis:**\n16. **xG (Expected Goals)** — Probabilidad de gol según la posición del tiro\n17. **xA (Expected Assists)** — Probabilidad de asistencia según el pase\n18. **PPDA** — Pases del rival antes de acción defensiva (mide pressing)\n19. **Pases progresivos** — Pases que avanzan al menos 10m hacia el arco rival\n20. **Conducciones progresivas** — Llevar el balón avanzando hacia el arco rival\n21. **Per 90 / p90** — Métricas ajustadas por cada 90 minutos jugados\n22. **Percentil (P)** — Ranking comparativo contra jugadores de la misma posición\n23. **Regresión a la media** — Tendencia estadística a normalizarse\n\n**Táctico:**\n24. **Superioridad numérica** — Tener más jugadores en una zona que el rival\n25. **Entre líneas** — El espacio entre la defensa y el mediocampo rival\n26. **Trigger de presión** — Señal que activa el pressing colectivo\n27. **Cambio de orientación** — Pase largo de banda a banda\n28. **Repliegue** — Retroceso ordenado tras perder la posesión\n29. **ABP (Acciones a Balón Parado)** — Córners, tiros libres, penales\n30. **Bloque compacto** — Líneas defensivas juntas, poco espacio entre ellas\n\n**LENGUAJE DE ACCIÓN FUTBOLÍSTICA:**\nUn informe profesional NO dice: "Es un buen jugador" o "Juega bien".\nUN INFORME PROFESIONAL DICE:\n• "Perfila hacia adentro buscando el disparo con su pierna derecha"\n• "Conduce con cambios de ritmo desde la banda hacia el centro del campo"\n• "Presiona al portero forzando la distribución larga"\n• "Se desmarca al espacio entre central y lateral para recibir de frente al arco"\n\nEl lenguaje de acción describe MOVIMIENTOS, no juicios de valor.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `El vocabulario es tu credibilidad. Cuando hablás con un DT, un director deportivo o un agente, ellos usan estos términos constantemente. Si decís "el delantero es bueno" en vez de "el delantero perfila hacia adentro desde la banda izquierda buscando el disparo con su derecha — tiene un xG/tiro de 0.14, calidad de ocasión alta", perdés credibilidad inmediata.\n\nTodos los informes de Soy Analista usan lenguaje de acción futbolística. La diferencia entre un informe amateur y uno profesional no es la cantidad de datos — es cómo se describen las acciones.\n\nPracticá: la próxima vez que veas un gol, describilo con lenguaje de acción. No "golazo". Sino: "Recibe entre líneas, gira sobre su perfil izquierdo, conduce 5 metros hacia el área y remata cruzado al palo largo. Tiro desde 14 metros, sin oposición directa, xG estimado ~0.20."`,
          },
        ],
      },
    },
    {
      id: "11-1",
      type: "exercise",
      title: "Describí 5 jugadas con lenguaje de acción",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá los highlights de un partido (o un partido completo) y elegí 5 jugadas relevantes (goles, ocasiones claras, recuperaciones importantes). Para cada una, escribí una descripción usando lenguaje de acción futbolística — sin juicios de valor, solo movimientos.",
        checklist: [
          "Jugada 1: Describila usando verbos de acción (recibe, conduce, perfila, dispara, presiona, intercepta, se desmarca). Evitá 'bueno', 'malo', 'increíble'.",
          "Jugada 2: Incluí datos contextuales: zona del campo, distancia al arco, presencia de defensores, resultado de la acción.",
          "Jugada 3: Describí no solo la acción principal sino el movimiento previo que la habilitó (el pase clave, el desmarque, el pressing que generó la pérdida rival).",
          "Jugada 4: Usá al menos 3 de los 30 términos del vocabulario profesional en la descripción.",
          "Jugada 5: Escribí la descripción completa como si fuera un párrafo de un informe de Soy Analista — con dato + interpretación + implicación.",
        ],
      },
    },
    {
      id: "11-2",
      type: "metrics",
      title: "Investigá 3 métricas que no dominás",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "De la lista de 30 términos, elegí 3 métricas o conceptos que todavía no dominás completamente. Para cada uno, investigá en FBref o Understat y escribí una interpretación práctica.",
        tasks: [
          "Término 1: Buscalo en FBref. ¿Dónde aparece? ¿Qué columna es? Anotá un ejemplo concreto: 'El equipo X tiene [métrica] de [valor], lo que significa...'",
          "Término 2: Mismo ejercicio. ¿Hay algún equipo o jugador donde este dato sea especialmente alto o bajo? ¿Qué conclusión podés sacar?",
          "Término 3: Mismo ejercicio. Ahora conectá el término con una sección específica del informe de Soy Analista: '¿En qué sección del informe usaría este dato?'",
          "Para cada término, escribí una oración de ejemplo como la usarías en un informe profesional.",
        ],
        tip: "Si un término no lo encontrás directamente en FBref, buscalo en Google con 'FBref [término]' o 'football analytics [término]'. La comunidad de analytics tiene buenos recursos explicativos.",
      },
    },
    {
      id: "11-3",
      type: "quiz",
      title: "Evaluación: Vocabulario Profesional",
      xp: 50,
      content: {
        questions: [
          {
            q: "¿Cuál de estas frases usa correctamente el lenguaje de acción futbolística?",
            options: [
              "Es un jugador muy bueno y talentoso",
              "Perfila hacia adentro desde la banda derecha buscando el disparo con su pierna izquierda",
              "Hace cosas increíbles con la pelota",
              "Es el mejor de la liga",
            ],
            correct: 1,
            explanation:
              "El lenguaje de acción futbolística describe movimientos concretos, no emite juicios de valor. 'Perfila hacia adentro desde la banda derecha buscando el disparo con su pierna izquierda' describe exactamente qué hace el jugador, desde dónde, y con qué intención. Las otras opciones son juicios vagos.",
          },
          {
            q: "¿Qué significa 'superioridad numérica' en contexto táctico?",
            options: [
              "Que un equipo tiene más jugadores en el plantel",
              "Tener más jugadores que el rival en una zona específica del campo para crear ventaja",
              "Ganar por muchos goles",
              "Que el equipo tiene más posesión",
            ],
            correct: 1,
            explanation:
              "La superioridad numérica es tener más jugadores que el rival en una zona específica. Por ejemplo, si en la zona de construcción tenés 3 jugadores y el rival solo presiona con 2, tenés superioridad numérica en esa zona, lo que te permite salir jugando con un hombre libre.",
          },
          {
            q: "¿Qué significa 'entre líneas' cuando se usa en un informe?",
            options: [
              "Jugar en el borde del fuera de juego",
              "El espacio que existe entre la línea defensiva y la línea de mediocampo del rival — una zona peligrosa para recibir",
              "Jugar por las bandas",
              "Estar en posición de offside",
            ],
            correct: 1,
            explanation:
              "El espacio 'entre líneas' es la zona entre el mediocampo y la defensa del rival. Es una zona peligrosísima porque un jugador que recibe ahí está de frente al arco y tiene a los defensores detrás. Jugadores como Messi, Müller o Griezmann son especialistas en encontrar ese espacio.",
          },
          {
            q: "¿Cuál es la forma correcta de describir un gol en un informe profesional?",
            options: [
              "Golazo espectacular del 9",
              "Recibe pase filtrado entre central y lateral, controla orientado hacia la portería, y remata cruzado al segundo palo desde 12 metros — sin oposición directa en el momento del disparo",
              "Metió un gol increíble",
              "El delantero hizo lo suyo",
            ],
            correct: 1,
            explanation:
              "Un informe profesional describe el movimiento completo: cómo recibió (pase filtrado), dónde recibió (entre central y lateral), qué hizo con el balón (control orientado), y cómo finalizó (remate cruzado al segundo palo desde 12m, sin oposición). Esto permite al DT entender el patrón y prepararse contra él.",
          },
          {
            q: "¿Qué es un 'trigger de presión'?",
            options: [
              "El silbato del árbitro que inicia la presión",
              "La instrucción del DT desde la banda",
              "Una señal o situación del juego que activa el pressing colectivo del equipo (pase hacia atrás, mal control, pase lateral del rival)",
              "El momento en que un jugador recibe tarjeta",
            ],
            correct: 2,
            explanation:
              "Un trigger de presión es una situación del juego (no una instrucción verbal) que le indica a todo el equipo que debe activar la presión. Los más comunes: pase hacia atrás del rival, pase lateral sin profundidad, recepción de espaldas, mal control. Los equipos bien entrenados reconocen estos triggers y reaccionan colectivamente.",
          },
        ],
      },
    },
  ],
};

export default module11;
