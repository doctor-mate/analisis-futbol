import type { AcademyModule } from "./types";

const module00: AcademyModule = {
  id: 0,
  title: "Las 4 Fases del Juego",
  subtitle: "El ABC de todo análisis táctico",
  icon: "⚽",
  color: "#C13628",
  lessons: [
    {
      id: "0-0",
      type: "theory",
      title: "Ataque organizado, defensa organizada, transiciones",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "El fútbol tiene solo 4 momentos",
            body: `Todo lo que pasa en un partido de fútbol se puede clasificar en 4 fases. Esta no es una simplificación — es literalmente cómo los cuerpos técnicos profesionales estructuran su análisis.\n\n**1. Ataque organizado** — Tu equipo tiene el balón y ambos equipos están posicionados. Es el momento de construir, progresar y crear ocasiones. Ejemplo: el Barcelona moviendo el balón entre los centrales, buscando al mediocampo.\n\n**2. Defensa organizada** — El rival tiene el balón y ambos equipos están posicionados. ¿Presionás alto? ¿Esperás en bloque medio? ¿Te replegás al área? Ejemplo: el Atlético de Simeone esperando en su campo con líneas juntas.\n\n**3. Transición ofensiva** — Acabás de recuperar el balón. Los primeros 5 segundos son cruciales: ¿contraataque rápido o asegurar y reconstruir? Ejemplo: el Liverpool de Klopp recuperando y lanzando a Salah en 3 pases.\n\n**4. Transición defensiva** — Acabás de perder el balón. ¿Contrapress inmediato (ir a recuperar ya) o repliegue ordenado? Ejemplo: el gegenpressing del Dortmund de Klopp.`,
          },
          {
            title: "¿Por qué te importa esto?",
            body: `Tus informes de Soy Analista cubren las 6 "fases del juego" (secciones 8-12 de tu metodología). Esas 6 secciones son expansiones de estas 4 fases fundamentales:\n\n• Construcción + Progresión + Finalización = Ataque organizado\n• Pressing y defensa = Defensa organizada\n• Transiciones = Transiciones ofensiva y defensiva\n\nCuando un agente de KAN37 te pregunte "¿cómo analizás a un equipo?", tu respuesta empieza así: "Analizamos las 4 fases del juego y las desglosamos en 6 sub-fases con datos específicos para cada una."`,
          },
        ],
      },
    },
    {
      id: "0-1",
      type: "exercise",
      title: "Mirá un partido: identificá las 4 fases",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "La próxima vez que veas un partido (o ahora mismo si tenés uno disponible), completá esta checklist durante los primeros 30 minutos. Solo necesitás prestar atención a UN equipo.",
        checklist: [
          "¿Cuántas veces cambió la posesión en los primeros 10 minutos? (estimá)",
          "Cuando tu equipo tiene el balón: ¿construyen desde atrás o pelotean largo?",
          "Cuando el rival tiene el balón: ¿tu equipo presiona arriba o espera atrás?",
          "Después de recuperar: ¿buscan contraataque rápido o paran y arman?",
          "Después de perder: ¿van a buscar la pelota inmediatamente o se repliegan?",
          "¿Podés identificar un momento claro de cada fase? Anotalo.",
        ],
      },
    },
    {
      id: "0-2",
      type: "metrics",
      title: "Tu primer análisis en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a fbref.com y buscá las stats de cualquier equipo de La Liga o la Premier League. Sin mirar ningún análisis externo, intentá responder estas preguntas solo con los números:",
        tasks: [
          "Buscá la posesión promedio del equipo. ¿Es >55% (dominante), 45-55% (equilibrado), o <45% (reactivo)?",
          "Mirá los goles a favor vs goles en contra. ¿Es un equipo que ataca más de lo que defiende, o al revés?",
          "Buscá xG y xGA. ¿Tienen más o menos goles de los que 'deberían' según los expected goals? Si tienen más goles que xG, están sobrerrindiendo. Si tienen menos, están subrindiendo.",
          "Anotá tus 3 conclusiones principales sobre este equipo.",
        ],
        tip: "No te preocupes si no sabés qué significan todas las columnas todavía. El objetivo es que te familiarices con dónde están los datos y empieces a formar intuiciones.",
      },
    },
    {
      id: "0-3",
      type: "quiz",
      title: "Evaluación: Las 4 fases",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo recupera el balón en su propio campo y lanza un pase largo al delantero que arranca solo. ¿Qué fase del juego es esta?",
            options: [
              "Ataque organizado",
              "Transición ofensiva",
              "Defensa organizada",
              "Transición defensiva",
            ],
            correct: 1,
            explanation:
              "Es transición ofensiva porque el equipo acaba de recuperar la posesión y busca atacar rápidamente, antes de que ambos equipos estén organizados.",
          },
          {
            q: "El Atlético de Madrid defiende con dos líneas de 4 jugadores muy juntas cerca de su área. ¿Qué fase es?",
            options: [
              "Transición defensiva",
              "Pressing alto",
              "Defensa organizada (bloque bajo)",
              "Ataque organizado",
            ],
            correct: 2,
            explanation:
              "Es defensa organizada en bloque bajo. Ambos equipos están posicionados, el Atlético elige defender con líneas bajas y compactas.",
          },
          {
            q: "Un equipo pierde el balón y los 3 jugadores más cercanos van inmediatamente a presionar al rival que la recuperó. ¿Cómo se llama esto?",
            options: [
              "Pressing alto",
              "Gegenpressing / contrapress",
              "Repliegue",
              "Bloque medio",
            ],
            correct: 1,
            explanation:
              "Es gegenpressing o contrapress — presión inmediata tras la pérdida para intentar recuperar el balón en los primeros segundos.",
          },
          {
            q: "Si un equipo tiene más goles que xG al final de la temporada, ¿qué significa?",
            options: [
              "Juegan muy bien en defensa",
              "Sus delanteros están convirtiendo más de lo esperado (probablemente regresarán a la media)",
              "Siempre van a mantener ese nivel",
              "Tienen el mejor portero de la liga",
            ],
            correct: 1,
            explanation:
              "Un exceso de goles sobre xG indica sobrerendimiento ofensivo. Estadísticamente, estos equipos tienden a 'regresar a la media' — es decir, van a convertir menos en el futuro a menos que algo estructural cambie.",
          },
          {
            q: "En tus informes de Soy Analista, ¿qué secciones de la metodología cubren el 'ataque organizado'?",
            options: [
              "Solo la sección 10 (Finalización)",
              "Secciones 8, 9 y 10 (Construcción, Progresión, Finalización)",
              "Solo la sección 12 (Transiciones)",
              "Secciones 11 y 12 (Pressing y Transiciones)",
            ],
            correct: 1,
            explanation:
              "El ataque organizado se desglosa en tres sub-fases: cómo sale el balón (Construcción, §8), cómo llega al último tercio (Progresión, §9), y cómo genera gol (Finalización, §10).",
          },
        ],
      },
    },
  ],
};

export default module00;
