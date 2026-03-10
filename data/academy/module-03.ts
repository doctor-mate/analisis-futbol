import type { AcademyModule } from "./types";

const module03: AcademyModule = {
  id: 3,
  title: "Construcción (Build-up)",
  subtitle: "Cómo sale el balón desde atrás",
  icon: "🏗️",
  color: "#6D597A",
  lessons: [
    {
      id: "3-0",
      type: "theory",
      title: "La salida de balón: el primer acto del ataque",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Construcción: del portero al mediocampo",
            body: `La construcción (build-up) es la primera fase del ataque organizado. Comienza cuando tu equipo tiene la posesión en su propio tercio del campo y busca progresar de forma segura hacia zonas más avanzadas.\n\nLa pregunta central es: **¿cómo sale el balón desde atrás?**\n\nHay dos grandes familias:\n\n**Salida corta (juego posicional)** — El portero distribuye al central, los centrales se abren, un mediocampista baja a recibir entre los centrales o al costado. Se busca superar la primera presión rival con pases cortos y posicionales. Ejemplo clásico: el Manchester City de Guardiola. El portero (Ederson) juega con los pies como un central más, Rodri baja entre los centrales para formar una línea de 3, y los laterales suben.\n\n**Salida larga (juego directo)** — El portero o los centrales envían el balón largo hacia un delantero referencia o a las bandas. Se busca ganar metros rápidamente, saltando la presión rival. Ejemplo: muchos equipos que enfrentan al City optan por pelotear largo porque saben que no pueden salir jugando contra su pressing.\n\n**La mayoría de los equipos usan una combinación**, adaptándose al contexto: salen corto cuando el rival no presiona, y largo cuando los presionan alto.`,
          },
          {
            title: "Los actores clave de la construcción",
            body: `**El portero** — En el fútbol moderno, el portero es el primer constructor. Mirá su % de pases cortos vs largos. Un portero con >70% de distribución corta juega para un equipo que sale jugando. Uno con <40% corta juega directo.\n\n**Los centrales** — ¿Se abren para dar amplitud? ¿Uno de ellos conduce hacia adelante? ¿Son buenos con los dos pies o solo con uno? Un central que solo pasa con derecha es predecible: el rival puede forzarlo a su izquierda.\n\n**El pivote/mediocampista de construcción** — ¿Baja entre los centrales para formar línea de 3? ¿Se ofrece como opción de pase entre líneas? Este jugador es la llave de la construcción.\n\n**Los laterales** — ¿Suben inmediatamente para dar amplitud? ¿Se quedan atrás como centrales extra? ¿Se meten adentro como mediocampistas? Su comportamiento durante la construcción define la forma del equipo.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `La sección 8 de la metodología de Soy Analista ("Modelo de Juego — Construcción") analiza exactamente esto. Cuando escribís un informe, necesitás responder:\n\n• ¿El portero distribuye corto o largo? ¿Con qué frecuencia?\n• ¿Los centrales se abren? ¿Un mediocampista baja?\n• ¿Por dónde sale preferentemente el balón? ¿Banda izquierda, derecha o centro?\n• ¿Qué pasa cuando los presionan alto? ¿Mantienen la salida corta o van largo?\n\nEstos datos están disponibles en FBref: pases del portero (corto/medio/largo), pases progresivos de los centrales, y distribución general del equipo. Con ellos, podés describir la construcción de cualquier equipo del mundo.`,
          },
        ],
      },
    },
    {
      id: "3-1",
      type: "exercise",
      title: "Analizá la salida de balón en los primeros 15 minutos",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá los primeros 15 minutos de un partido enfocándote SOLO en lo que hace un equipo cuando tiene la posesión en su propio tercio. Ignorá todo lo demás — solo te interesa cómo sale el balón.",
        checklist: [
          "¿El portero distribuye corto (a centrales/laterales) o largo (pelotazo hacia adelante)? Contá: _____ distribuciones cortas vs _____ largas",
          "¿Los centrales se abren (separan) cuando tienen la posesión? ¿Uno de ellos conduce con el balón hacia adelante?",
          "¿Algún mediocampista baja entre los centrales para recibir? ¿Quién? ¿Se forma una línea de 3 en la salida?",
          "¿Los laterales suben inmediatamente cuando el equipo tiene la posesión en su tercio, o se quedan abajo?",
          "¿El rival presiona alto la salida de balón? Si sí, ¿cómo reacciona el equipo? ¿Mantiene la salida corta o va largo bajo presión?",
          "Dibujá un esquema simple de la estructura de salida de balón del equipo (posiciones aproximadas de los jugadores involucrados)",
        ],
      },
    },
    {
      id: "3-2",
      type: "metrics",
      title: "Stats del portero y centrales en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a FBref y buscá las estadísticas de un equipo que te interese. Enfocate en los datos de distribución del portero y los pases de los centrales.",
        tasks: [
          "Buscá las stats del portero en la pestaña 'Goalkeeping' > 'Advanced'. Anotá: pases intentados, % completados, distribución larga vs corta. ¿Qué te dice sobre el estilo de salida?",
          "Buscá las stats de pases de los dos centrales titulares. ¿Cuántos pases progresivos tiene cada uno? ¿Cuál es su % de pases completados?",
          "Compará los centrales: ¿uno pasa más que el otro? ¿Uno tiene más pases progresivos? Eso te dice cuál es el central constructor y cuál el central de seguridad.",
          "Buscá al mediocampista con más pases recibidos en el tercio defensivo (si FBref lo muestra). Ese probablemente sea el pivote que baja a construir.",
        ],
        tip: "En FBref, la pestaña 'Passing' tiene columnas 'Short', 'Medium' y 'Long' que muestran la distribución por distancia de pase. Esto es oro puro para analizar la construcción.",
      },
    },
    {
      id: "3-3",
      type: "quiz",
      title: "Evaluación: Construcción",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un portero tiene 85% de distribución corta y solo 15% larga. ¿Qué sugiere esto sobre el estilo del equipo?",
            options: [
              "El equipo juega directo y pelotea largo",
              "El portero no sabe patear largo",
              "El equipo busca salir jugando desde atrás con pases cortos, estilo posicional",
              "El equipo defiende en bloque bajo",
            ],
            correct: 2,
            explanation:
              "Un 85% de distribución corta indica claramente un equipo que busca construir desde atrás con posesión. El portero actúa como primer constructor, similar al rol de Ederson en el Manchester City.",
          },
          {
            q: "¿Qué significa que 'un mediocampista baja entre los centrales para formar línea de 3'?",
            options: [
              "Que el mediocampista es malo y lo ponen de central",
              "Que el pivote desciende a la línea defensiva durante la construcción para crear una línea de 3 jugadores en la salida, dando más opciones de pase",
              "Que el equipo juega con 5 defensores",
              "Que el DT no sabe qué hacer con el mediocampista",
            ],
            correct: 1,
            explanation:
              "Es un mecanismo posicional clásico: el pivote (6) baja entre los dos centrales para formar una línea de salida de 3. Esto obliga al rival a decidir si presiona con 2 o con 3, y libera espacio en el mediocampo. Busquets lo hacía en el Barça, Rodri en el City.",
          },
          {
            q: "Si un equipo cambia de salida corta a salida larga cuando el rival presiona alto, ¿cómo se describe eso en un informe?",
            options: [
              "El equipo no sabe salir jugando",
              "El equipo tiene un plan B: adapta su construcción al contexto, usando salida larga como recurso ante pressing alto",
              "El equipo siempre juega directo",
              "El DT no tiene plan táctico",
            ],
            correct: 1,
            explanation:
              "Tener la capacidad de adaptar la salida al contexto es una fortaleza, no una debilidad. Los mejores equipos salen corto cuando pueden y tienen la opción de ir largo cuando los presionan. En un informe, esto se describe como 'adapta la construcción al nivel de presión rival'.",
          },
          {
            q: "En FBref, un central tiene 8.5 pases progresivos por 90 minutos. ¿Eso es mucho o poco?",
            options: [
              "Es bajo — un central debería tener al menos 15",
              "Es alto para un central — indica que es un central constructor que hace avanzar el juego con sus pases",
              "Es irrelevante porque los centrales no pasan",
              "Depende del equipo, pero no dice nada útil",
            ],
            correct: 1,
            explanation:
              "8.5 pases progresivos por 90 es un número alto para un central. El promedio suele estar entre 4-6. Un central con 8+ pases progresivos es un 'ball-playing center-back' — un central que inicia la jugada y hace avanzar el juego, como Stones o Akanji en el City.",
          },
          {
            q: "¿Qué sección de la metodología de Soy Analista cubre la construcción?",
            options: [
              "Sección 7 — Estadísticas Globales",
              "Sección 8 — Modelo de Juego: Construcción",
              "Sección 10 — Finalización",
              "Sección 11 — Pressing y Defensa",
            ],
            correct: 1,
            explanation:
              "La sección 8 de la metodología está dedicada íntegramente a la construcción (build-up). Cubre la distribución del portero, el rol de los centrales, el pivote en la salida, y la estructura general de cómo el equipo progresa desde su propio tercio.",
          },
        ],
      },
    },
  ],
};

export default module03;
