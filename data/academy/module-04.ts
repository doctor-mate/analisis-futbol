import type { AcademyModule } from "./types";

const module04: AcademyModule = {
  id: 4,
  title: "Progresión",
  subtitle: "Cómo llega al último tercio",
  icon: "⚡",
  color: "#B56576",
  lessons: [
    {
      id: "4-0",
      type: "theory",
      title: "Del mediocampo al último tercio: pases vs conducciones",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Progresión: el puente entre construcción y finalización",
            body: `La progresión es la segunda fase del ataque organizado. Una vez que el equipo superó la primera presión rival (construcción), ¿cómo hace llegar el balón a zonas peligrosas cerca del área?\n\nHay dos formas principales de progresar:\n\n**Por pase** — Pases progresivos que avanzan el balón hacia la portería. Puede ser un pase vertical entre líneas, un cambio de orientación largo, o un pase al espacio por detrás de la defensa. Un equipo que progresa por pase suele ser más paciente y posicional.\n\n**Por conducción** — Un jugador lleva el balón con el pie, ganando metros hacia adelante. Las conducciones progresivas rompen líneas cuando el pase no está disponible. Un jugador que conduce bien genera superioridad porque obliga al rival a salir a presionarlo, abriendo espacios para compañeros.\n\nLa proporción entre pases y conducciones progresivas define mucho del estilo de un equipo:\n• **Alto en pases, bajo en conducciones**: equipo colectivo, mueve el balón con el pase (City, Barcelona)\n• **Alto en conducciones, medio en pases**: equipo con individualidades que rompen líneas (equipos con jugadores tipo Dembélé, Vinícius)\n• **Bajo en ambos**: equipo que progresa poco — probablemente juega directo o depende de balones largos`,
          },
          {
            title: "¿Por dónde progresa? Las bandas vs el centro",
            body: `Tan importante como el CÓMO es el POR DÓNDE. Los equipos tienen carriles preferidos de progresión:\n\n**Progresión por la banda izquierda** — Si un equipo tiene un lateral ofensivo + extremo potente por izquierda, va a sobrecargar esa banda. Ejemplo: el Barcelona con Alba + un extremo.\n\n**Progresión por la banda derecha** — Similar pero por el otro lado. Mirá si el equipo tiene un extremo invertido por derecha (zurdo que perfila hacia adentro).\n\n**Progresión por el centro** — Más difícil porque hay más jugadores rivales, pero más peligrosa porque llega más directa al área. Equipos con mediocampistas creativos (De Bruyne, Pedri) buscan progresar por el centro.\n\n**Cambios de orientación** — Algunos equipos progresan desplazando el balón de una banda a otra con pases largos laterales, buscando el lado débil de la defensa. Esto es "cambio de juego" o "cambio de orientación".\n\nEn FBref podés ver la lateralidad de los ataques (% por izquierda, centro, derecha) y los pases al último tercio por jugador para identificar a los progresores principales.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `La sección 9 de la metodología de Soy Analista ("Modelo de Juego — Progresión") cubre exactamente esto. Es una de las secciones más ricas en datos porque FBref tiene estadísticas excelentes para la progresión.\n\nCuando analizás un equipo para un informe, necesitás responder:\n\n• ¿Progresa más por pase o por conducción?\n• ¿Quiénes son los principales progresores? (top 3 en pases progresivos + top 3 en conducciones progresivas)\n• ¿Por dónde llega al último tercio? ¿Banda izquierda, derecha o centro?\n• ¿A qué velocidad progresa? ¿Es paciente (muchos pases laterales) o vertical (busca profundidad rápido)?\n\nEstos datos te permiten escribir algo como: "El equipo progresa mayoritariamente por pase a través de la banda izquierda, donde [jugador X] acumula 9.3 pases progresivos p90 — el mayor del equipo. La conducción progresiva está concentrada en [jugador Y] con 6.1 p90."`,
          },
        ],
      },
    },
    {
      id: "4-1",
      type: "exercise",
      title: "Rastreá la progresión de un equipo durante un partido",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá un tiempo (45 min) de un partido prestando atención solo a cómo un equipo lleva el balón desde el mediocampo hasta el último tercio del campo. Cada vez que el balón llegue al último tercio, anotá cómo llegó.",
        checklist: [
          "Cada vez que el balón entre al último tercio, anotá: ¿llegó por pase, por conducción o por pelota larga?",
          "¿Por qué banda llegó? Usá categorías: izquierda, centro, derecha. Contá cuántas veces por cada carril.",
          "Identificá al jugador que más veces hizo progresar el juego. ¿Es un mediocampista? ¿Un lateral? ¿Un extremo?",
          "¿Hay algún cambio de orientación (pase lateral largo de una banda a otra)? ¿Cuántos contaste?",
          "¿El equipo progresa de forma paciente (muchos pases antes de llegar) o vertical (pocos pases, rápido hacia adelante)?",
          "Conclusión: escribí una frase tipo informe describiendo la progresión del equipo. Ejemplo: 'Progresa mayoritariamente por la banda izquierda con pases al espacio del lateral ofensivo.'",
        ],
      },
    },
    {
      id: "4-2",
      type: "metrics",
      title: "Pases progresivos vs conducciones progresivas en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a FBref y buscá las stats individuales de los jugadores de un equipo que te interese. Compará pases progresivos (PrgP) y conducciones progresivas (PrgC) de cada jugador.",
        tasks: [
          "Identificá los 3 jugadores con más pases progresivos p90 del equipo. ¿En qué posición juegan? ¿Son centrales, mediocampistas o defensores?",
          "Identificá los 3 jugadores con más conducciones progresivas p90. ¿Son los mismos o diferentes? Si son diferentes, ¿qué dice sobre el estilo del equipo?",
          "Buscá los pases al último tercio (passes into final third) por jugador. ¿Coincide el top 3 con los de pases progresivos? Si no, ¿por qué podría ser diferente?",
          "Compará un mediocampista del equipo con un referente de la liga (por ejemplo, Pedri, Rodri o Bellingham). ¿Cómo se comparan en progresión?",
        ],
        tip: "En FBref, la pestaña 'Possession' tiene las conducciones progresivas (PrgC) y la pestaña 'Passing' tiene los pases progresivos (PrgP). 'Carries into Final 1/3' mide las conducciones que entran al último tercio.",
      },
    },
    {
      id: "4-3",
      type: "quiz",
      title: "Evaluación: Progresión",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo tiene un promedio de 65 pases progresivos por partido pero solo 30 conducciones progresivas. ¿Qué sugiere sobre su estilo?",
            options: [
              "No saben progresar",
              "Es un equipo que progresa mayoritariamente con el pase, de forma colectiva y posicional",
              "Dependen de un solo jugador",
              "Juegan directo",
            ],
            correct: 1,
            explanation:
              "Una proporción 2:1 de pases progresivos vs conducciones sugiere un equipo que mueve el balón de forma colectiva, buscando espacios con el pase en vez de depender de conducciones individuales. Es el perfil de equipos posicionales como el Manchester City o el Barcelona.",
          },
          {
            q: "¿Qué es un 'cambio de orientación' en la progresión?",
            options: [
              "Cuando un equipo cambia de sistema táctico",
              "Un pase largo lateral que desplaza el juego de una banda a la otra, buscando el lado débil de la defensa",
              "Cuando el DT cambia de estrategia en el entretiempo",
              "Un pase hacia atrás al portero",
            ],
            correct: 1,
            explanation:
              "El cambio de orientación es un pase largo lateral (de banda a banda) que busca explotar el lado de la cancha donde la defensa rival tiene menos jugadores. Es una herramienta clave para romper defensas compactas que cierran bien un lado.",
          },
          {
            q: "Un extremo derecho tiene 7.2 conducciones progresivas p90 pero solo 3.1 pases progresivos p90. ¿Qué tipo de jugador es?",
            options: [
              "Un organizador de juego",
              "Un extremo directo que prefiere encarar y conducir antes que pasar",
              "Un defensa disfrazado de extremo",
              "Un mediocampista creativo",
            ],
            correct: 1,
            explanation:
              "Muchas más conducciones que pases progresivos indica un extremo que progresa llevando el balón él mismo — encarando al rival, buscando el 1 contra 1. Es el perfil de un jugador tipo Dembélé, Vinícius o Adama Traoré.",
          },
          {
            q: "¿Qué métrica de FBref mide específicamente cuántas veces un jugador lleva el balón al último tercio con conducción?",
            options: [
              "PrgP (Progressive Passes)",
              "Carries into Final 1/3",
              "Key Passes",
              "xA (Expected Assists)",
            ],
            correct: 1,
            explanation:
              "Carries into Final 1/3 mide las conducciones que entran al último tercio del campo. Es diferente de las conducciones progresivas generales (PrgC), que miden cualquier conducción que avance al menos 5 metros hacia la portería rival, sin importar la zona.",
          },
          {
            q: "¿Qué sección de la metodología de Soy Analista analiza la progresión?",
            options: [
              "Sección 7 — Estadísticas Globales",
              "Sección 8 — Construcción",
              "Sección 9 — Progresión",
              "Sección 12 — Transiciones",
            ],
            correct: 2,
            explanation:
              "La sección 9 de la metodología está dedicada a la Progresión. Analiza cómo el equipo lleva el balón desde el mediocampo hasta el último tercio, incluyendo la proporción pase/conducción, la lateralidad (por dónde ataca), y los principales progresores.",
          },
        ],
      },
    },
  ],
};

export default module04;
