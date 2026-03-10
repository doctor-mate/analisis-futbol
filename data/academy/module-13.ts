import type { AcademyModule } from "./types";

const module13: AcademyModule = {
  id: 13,
  title: "Evaluación Final",
  subtitle: "¿Estás listo?",
  icon: "🏆",
  color: "#D4A373",
  lessons: [
    {
      id: "13-0",
      type: "theory",
      title: "Resumen: todo lo que aprendiste en 14 módulos",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Tu recorrido como analista",
            body: `En 14 módulos cubriste los fundamentos del análisis táctico de fútbol profesional. Repasemos:\n\n**Módulo 1: Las 4 Fases del Juego** — Aprendiste que todo el fútbol se divide en ataque organizado, defensa organizada, transición ofensiva y transición defensiva. Es la estructura base de todo análisis.\n\n**Módulo 2: Sistemas y Posiciones** — Dominás los sistemas más usados (4-3-3, 4-4-2, 3-5-2, 4-2-3-1) y los roles dentro de cada uno (pivote, interior, extremo invertido, lateral inverso, falso 9).\n\n**Módulo 3: xG, PPDA y Métricas Avanzadas** — Sabés interpretar xG, npxG, xGA, PPDA, pases progresivos y conducciones progresivas. Podés leer una tabla de FBref y extraer conclusiones.\n\n**Módulos 4-5: Construcción y Progresión** — Entendés cómo sale el balón desde atrás (salida corta vs larga, rol del portero y centrales) y cómo llega al último tercio (por pase vs conducción, lateralidad).\n\n**Módulo 6: Pressing y Defensa** — Diferenciás pressing alto, bloque medio y bloque bajo. Sabés qué es PPDA, triggers de presión y gegenpressing.`,
          },
          {
            title: "Checklist de competencias",
            body: `**Módulo 7: Finalización y Transiciones** — Analizás calidad de ocasiones (xG/tiro), fuentes de gol (jugada abierta vs transición vs ABP), y los dos tipos de transición.\n\n**Módulo 8: Perfiles de Jugador** — Leés radares de 12 métricas, interpretás percentiles con colores, y describís jugadores con su perfil posicional.\n\n**Módulo 9: ICI y Perfiles de Rol** — Entendés el Índice de Contribución Individual, las 4 dimensiones del perfil de rol, y las ponderaciones por posición.\n\n**Módulo 10: Balón Parado** — Conocés las estrategias de córner (primer palo, segundo, corto), los sistemas defensivos (zonal, hombre, mixto), y el peso real del ABP (25-35% de los goles).\n\n**Módulo 11: Leer un Informe** — Sabés navegar las 17 secciones, extraer claves tácticas, y traducir datos en insights accionables.\n\n**Módulo 12: Vocabulario Profesional** — Manejás 30 términos clave y usás lenguaje de acción futbolística en vez de juicios vagos.\n\n**Módulo 13: Simulacro B2B** — Tenés el pitch de 2 minutos, sabés responder objeciones, y podés presentar un informe con confianza.\n\n**Si completaste todos los módulos anteriores, estás listo para la evaluación final.**`,
          },
        ],
      },
    },
    {
      id: "13-1",
      type: "exercise",
      title: "Escribí un mini-informe SIN Claude",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Este es tu examen práctico. Elegí un equipo de cualquier liga top y escribí un mini-informe de 1 página SOLO con datos de FBref y tu propio análisis. No uses Claude ni ninguna IA. Solo vos y los datos.",
        checklist: [
          "Elegí un equipo. Entrá a FBref y recopilá: posesión, xG, xGA, goles F/C, pases progresivos del equipo, PPDA (si disponible en Understat). Anotá todo.",
          "Escribí un párrafo de IDENTIDAD: ¿qué sistema usa? ¿Es dominante o reactivo? ¿Posesión alta o baja? ¿Presiona o espera? Usá datos para respaldar.",
          "Escribí un párrafo de ATAQUE: ¿cómo construye? ¿Cómo progresa? ¿Cómo finaliza? ¿Quiénes son los jugadores clave ofensivos? Usá pases progresivos, xG, goles.",
          "Escribí un párrafo de DEFENSA: ¿cómo defiende? ¿Pressing alto o bloque bajo? ¿Cuáles son las debilidades? Usá xGA, acciones defensivas.",
          "Escribí 3 CLAVES DEL PARTIDO como bullets accionables: una fortaleza a respetar, una debilidad a explotar, una recomendación.",
        ],
      },
    },
    {
      id: "13-2",
      type: "metrics",
      title: "Compará tu mini-informe con lo que genera Claude",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Ahora usá Claude para generar un informe del mismo equipo que analizaste en el ejercicio anterior. Compará tu versión con la de Claude usando esta rúbrica.",
        tasks: [
          "Generá un informe del mismo equipo con Claude (o buscá si ya existe uno de Soy Analista). Compará la identidad que describiste con la del informe completo. ¿Acertaste el estilo general?",
          "Compará tus datos con los del informe. ¿Usaste las mismas métricas? ¿Llegaste a conclusiones similares? ¿El informe tiene datos que vos no encontraste?",
          "Evaluá tu lenguaje: ¿usaste lenguaje de acción futbolística o caíste en juicios vagos? ¿Tu informe suena profesional comparado con el de Soy Analista?",
          "Calificá tu mini-informe del 1 al 5 en: precisión de datos (¿los números son correctos?), calidad del análisis (¿los insights son accionables?), lenguaje profesional (¿suena como un analista?). ¿En qué área necesitás más práctica?",
        ],
        tip: "No te desanimes si el informe de Claude es más completo — tiene acceso a más datos y procesa más rápido. Lo que importa es que tu análisis sea correcto en dirección, que los insights sean accionables, y que el lenguaje sea profesional. Con práctica, vas a llegar al mismo nivel.",
      },
    },
    {
      id: "13-3",
      type: "quiz",
      title: "Examen Final: 10 preguntas de todos los módulos",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo recupera el balón en su propio campo y en 4 pases llega al arco rival. ¿Qué fase del juego es?",
            options: [
              "Ataque organizado",
              "Transición ofensiva (contraataque)",
              "Construcción",
              "Defensa organizada",
            ],
            correct: 1,
            explanation:
              "Es transición ofensiva — el equipo acaba de recuperar y busca el gol rápidamente con pocos pases, antes de que el rival se organice. Es un contraataque clásico.",
          },
          {
            q: "¿Qué indica un PPDA de 7.2 combinado con una posesión del 62%?",
            options: [
              "Equipo defensivo que espera atrás",
              "Equipo que domina la posesión Y presiona agresivamente cuando la pierde — estilo Manchester City o Barcelona",
              "Equipo en crisis de resultados",
              "Equipo que juega con 3 centrales",
            ],
            correct: 1,
            explanation:
              "PPDA bajo (7.2 = pressing muy agresivo) + posesión alta (62%) es la combinación clásica de un equipo dominante que quiere tener el balón y, cuando lo pierde, va inmediatamente a buscarlo. Es el perfil del City de Guardiola o el Barcelona.",
          },
          {
            q: "Un jugador tiene 11.2 pases progresivos p90, 6.8 conducciones progresivas p90, pero solo 0.3 xG p90. ¿Qué perfil de rol tiene?",
            options: [
              "Goleador / finalizador",
              "Mediocampista progresor — motor del equipo que hace avanzar el juego pero no llega al gol",
              "Defensa central puro",
              "Portero",
            ],
            correct: 1,
            explanation:
              "Altísimos números de progresión (pases Y conducciones progresivas) pero xG muy bajo indica un jugador cuyo rol es hacer avanzar el equipo, no finalizar. Es un mediocampista motor/progresor — tipo Pedri, Modric o Kroos. Su valor está en la construcción y progresión, no en la finalización.",
          },
          {
            q: "¿Qué porcentaje aproximado de goles en las ligas top proviene de acciones a balón parado?",
            options: ["5-10%", "25-35%", "50-60%", "70-80%"],
            correct: 1,
            explanation:
              "Entre 25% y 35%. Un tercio de los goles viene de córners, tiros libres y penales. Ignorar el ABP en un informe es ignorar un tercio del juego.",
          },
          {
            q: "Un radar de jugador muestra P92 en tackles, P88 en intercepciones, P15 en pases clave y P8 en xG. ¿Cómo lo describirías?",
            options: [
              "Mediapunta creativo",
              "Mediocampista defensivo élite con contribución ofensiva mínima — perfil destructor",
              "Delantero centro",
              "Jugador promedio en todo",
            ],
            correct: 1,
            explanation:
              "Percentiles altísimos en métricas defensivas (P92 tackles, P88 intercepciones) y bajísimos en ofensivas (P15 pases clave, P8 xG) = mediocampista defensivo puro. Es un 'destructor' cuyo valor está en ganar balones y proteger la defensa. Perfil tipo Kanté o Casemiro.",
          },
          {
            q: "¿Cuáles son las 4 dimensiones del perfil de rol en Soy Analista?",
            options: [
              "Velocidad, técnica, fuerza, inteligencia",
              "Trabajo defensivo, capacidad creativa, progresión, finalización",
              "Ataque, defensa, transición, ABP",
              "xG, xA, PPDA, pases progresivos",
            ],
            correct: 1,
            explanation:
              "Las 4 dimensiones son: (1) Trabajo defensivo, (2) Capacidad creativa, (3) Progresión, (4) Finalización. Cada dimensión tiene 4 niveles (de élite a mínimo) basados en percentiles por posición.",
          },
          {
            q: "Un DT te pide las 3 claves para enfrentar a un equipo con PPDA de 7.5 pero vulnerable aéreamente. ¿Qué le decís?",
            options: [
              "Que resigne el partido",
              "1) Salir largo cuando presionen (evitar la presión alta). 2) Buscar centros al área y balones aéreos para explotar su debilidad. 3) Tener cuidado con sus transiciones rápidas post-recuperación.",
              "Que juegue igual que siempre",
              "Que cambie todos los jugadores",
            ],
            correct: 1,
            explanation:
              "Las 3 claves son accionables: (1) contra su pressing alto, salir largo para evitarlo. (2) Su debilidad aérea es explotable con centros y ABP. (3) Si presionan tan alto y recuperan arriba, sus transiciones ofensivas son peligrosas — hay que tener precaución. Esto es análisis táctico aplicado.",
          },
          {
            q: "¿Cuál de estas frases usa lenguaje de acción futbolística correctamente?",
            options: [
              "Es un jugadorazo, tiene mucha calidad",
              "Se desmarca al espacio entre central y lateral, recibe perfilado de cara al arco, y conduce hacia adentro buscando el pase filtrado al delantero",
              "Juega re bien en la posición que le toca",
              "Tiene buena pegada y buen físico",
            ],
            correct: 1,
            explanation:
              "El lenguaje de acción describe movimientos concretos: desmarcarse, recibir perfilado, conducir hacia adentro, buscar el pase filtrado. Las otras opciones son juicios vagos o genéricos que no le dicen nada nuevo a un DT.",
          },
          {
            q: "¿Cuántas secciones tiene la metodología completa de Soy Analista y cuál es la más importante para una lectura rápida?",
            options: [
              "10 secciones, la más importante es la portada",
              "17 secciones, la más importante es el Resumen Ejecutivo (Sección 2)",
              "5 secciones, la más importante es la de goles",
              "20 secciones, la más importante es la de ABP",
            ],
            correct: 1,
            explanation:
              "La metodología tiene 17 secciones. El Resumen Ejecutivo (Sección 2) es la más importante para lectura rápida: en 250-400 palabras cubre la identidad del equipo, cómo ataca, cómo defiende, y las 4 claves del partido. Un DT con 2 minutos solo necesita esta página.",
          },
          {
            q: "¿Cuál es el diferencial de Soy Analista frente a plataformas de datos como StatsBomb o Wyscout?",
            options: [
              "Tenemos datos exclusivos que nadie más tiene",
              "Somos más baratos",
              "Entregamos análisis interpretado con insights accionables y recomendaciones tácticas, no solo datos crudos",
              "Usamos inteligencia artificial y ellos no",
            ],
            correct: 2,
            explanation:
              "El diferencial es la interpretación y la acción. StatsBomb y Wyscout te dan datos para que los interpretes. Soy Analista te da los datos YA interpretados: con percentiles, colores, narrativa de acción futbolística, y recomendaciones tácticas listas para usar. Es pasar de los ingredientes al plato servido.",
          },
        ],
      },
    },
  ],
};

export default module13;
