import type { AcademyModule } from "./types";

const module01: AcademyModule = {
  id: 1,
  title: "Sistemas y Posiciones",
  subtitle: "4-3-3, 4-4-2, 3-5-2 y qué significan",
  icon: "📋",
  color: "#2D6A4F",
  lessons: [
    {
      id: "1-0",
      type: "theory",
      title: "Los sistemas más comunes y sus variantes",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "¿Qué es un sistema de juego?",
            body: `Un sistema de juego (o formación) es la disposición numérica de los jugadores en el campo. Se lee de atrás hacia adelante: un 4-3-3 significa 4 defensores, 3 mediocampistas y 3 delanteros (el portero no se cuenta).\n\nPero ojo: el número no te dice todo. Un 4-3-3 puede ser ultra-ofensivo (el del Barcelona de Guardiola) o más equilibrado (el del Chelsea de Conte). Lo que importa es cómo se interpretan los roles dentro del sistema.\n\n**Los sistemas más usados en el fútbol actual:**\n\n**4-3-3** — El más popular en Europa. Tres líneas claras. Permite amplitud con dos extremos y un mediocampo de tres que controla el centro. Lo usan Barcelona, Manchester City, Liverpool.\n\n**4-4-2** — El clásico. Dos líneas de cuatro dan solidez defensiva. Puede ser plano (dos mediocampistas centrales) o en diamante (con un mediapunta). El Atlético de Simeone lo popularizó como sistema defensivo de élite.\n\n**3-5-2 / 3-4-3** — Tres centrales con dos carrileros que suben y bajan. Da superioridad en el centro pero exige mucho a los carrileros. Lo usó el Inter de Conte y la selección de Italia en la Euro 2020.\n\n**4-2-3-1** — Variante del 4-3-3 con doble pivote (dos mediocampistas defensivos) y un mediapunta por detrás del delantero. Muy equilibrado, da seguridad en transición defensiva.`,
          },
          {
            title: "Los roles dentro del sistema",
            body: `Más allá de los números, lo que importa son los roles. Estos son los más comunes:\n\n**Pivote (6)** — El mediocampista que se sitúa por delante de la defensa. Recibe de los centrales, distribuye, protege. Ejemplo: Rodri en el City, Busquets en el Barcelona.\n\n**Interior (8)** — Mediocampista que conecta defensa con ataque. Puede llegar al área, puede bajar a ayudar. Ejemplo: Pedri, De Bruyne.\n\n**Mediapunta (10)** — El creador entre líneas. Recibe entre la defensa y el mediocampo rival. Ejemplo: Özil, Messi en su etapa de falso 9.\n\n**Extremo** — Juega pegado a la banda. Puede ser un extremo natural (encarar por fuera, centrar) o un extremo invertido (perfila hacia adentro para disparar). Ejemplo: Salah es un extremo invertido por derecha.\n\n**Lateral** — El defensa de banda. En el fútbol moderno puede ser un lateral ofensivo (sube constantemente) o un lateral inverso (se mete al centro como mediocampista extra). Ejemplo: los laterales inversos de Guardiola.\n\n**Delantero centro (9)** — Puede ser un 9 clásico (referencia de área, juego aéreo), un falso 9 (baja a recibir, deja espacio) o un 9 de movilidad (como Haaland, que ataca el espacio).`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Cuando tu informe de Soy Analista dice "juega en 4-2-3-1 con doble pivote", vos tenés que saber exactamente qué significa eso — y poder explicárselo a un agente o director deportivo.\n\nEl sistema no es un dibujo estático. Cambia según la fase del juego: un 4-3-3 en ataque puede transformarse en un 4-4-2 en defensa (el extremo baja). Identificar estas transformaciones es parte fundamental del análisis táctico.\n\nEn la sección 8 de la metodología (Construcción), describimos cómo se forma la primera línea de salida — y eso depende directamente del sistema. Un equipo con 3 centrales sale diferente que uno con 4-3-3.`,
          },
        ],
      },
    },
    {
      id: "1-1",
      type: "exercise",
      title: "Identificá formaciones en un partido",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá los primeros 30 minutos de un partido de cualquier liga top. Tu objetivo es identificar el sistema de cada equipo. Prestá atención a las transformaciones: muchos equipos usan una formación en ataque y otra en defensa.",
        checklist: [
          "¿Cuántos defensores tiene cada equipo cuando tiene la posesión? ¿Y sin ella?",
          "¿El equipo juega con un pivote solo (4-3-3) o doble pivote (4-2-3-1)?",
          "¿Los extremos son naturales (encaran por fuera) o invertidos (perfilados hacia adentro)?",
          "¿Los laterales suben como extremos o se quedan atrás? ¿Alguno se mete al centro?",
          "¿El sistema cambia cuando el equipo defiende? Por ejemplo, ¿un 4-3-3 se convierte en 4-4-2?",
          "Anotá: Equipo A juega en [sistema] en ataque y [sistema] en defensa. Equipo B igual.",
        ],
      },
    },
    {
      id: "1-2",
      type: "metrics",
      title: "Pases cortos vs largos en FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Entrá a FBref y buscá las estadísticas de pases de dos equipos con estilos opuestos (por ejemplo, Manchester City vs un equipo que juega directo como el Burnley o Alavés). Compará estas métricas:",
        tasks: [
          "Buscá el porcentaje de pases largos de cada equipo. Un % alto (>20%) sugiere juego directo. Un % bajo (<12%) sugiere juego posicional corto.",
          "Mirá los pases completados por partido. Un equipo posicional tendrá 500+ pases/partido, uno directo quizás 300-350.",
          "Compará los pases progresivos de ambos equipos. ¿Quién progresa más con pase? ¿Eso se relaciona con su sistema?",
          "Conclusión: ¿Podés adivinar el sistema de cada equipo solo mirando sus stats de pases? Anotá tu hipótesis.",
        ],
        tip: "En FBref, las estadísticas de pases están en la pestaña 'Passing'. Los pases largos están en 'Long' y los progresivos en 'PrgP'.",
      },
    },
    {
      id: "1-3",
      type: "quiz",
      title: "Evaluación: Sistemas y Posiciones",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo juega con 3 centrales, 2 carrileros que suben hasta la línea de ataque, 2 mediocampistas centrales y 3 delanteros. ¿Qué sistema es?",
            options: ["4-3-3", "3-5-2", "3-4-3", "4-4-2 diamante"],
            correct: 2,
            explanation:
              "Con 3 centrales, 2 carrileros (que actúan como laterales ofensivos), 2 mediocampistas y 3 delanteros, el sistema es un 3-4-3. Si fueran 2 delanteros sería un 3-5-2.",
          },
          {
            q: "¿Qué es un 'extremo invertido'?",
            options: [
              "Un extremo que juega de lateral",
              "Un extremo que perfila hacia adentro del campo en vez de hacia la banda",
              "Un extremo que juega de mediocampista",
              "Un extremo que solo defiende",
            ],
            correct: 1,
            explanation:
              "Un extremo invertido juega en la banda contraria a su pierna hábil (zurdo por derecha, diestro por izquierda) para poder perfilar hacia adentro y buscar el disparo o el pase interior. Salah (zurdo por derecha) es el ejemplo clásico.",
          },
          {
            q: "¿Cuál es la principal diferencia táctica entre un 4-3-3 y un 4-2-3-1?",
            options: [
              "El 4-2-3-1 tiene un delantero más",
              "El 4-3-3 no usa extremos",
              "El 4-2-3-1 usa doble pivote, dando más seguridad en la zona central",
              "No hay ninguna diferencia real",
            ],
            correct: 2,
            explanation:
              "La gran diferencia es el mediocampo: el 4-3-3 suele tener un pivote solo con dos interiores, mientras que el 4-2-3-1 usa doble pivote (dos mediocampistas defensivos). Esto da más protección central pero sacrifica presencia ofensiva en el medio.",
          },
          {
            q: "Un lateral del Manchester City recibe el balón y, en vez de subir por la banda, se mete al centro del campo como un mediocampista extra. ¿Cómo se llama este rol?",
            options: [
              "Lateral ofensivo",
              "Carrilero",
              "Lateral inverso",
              "Libero",
            ],
            correct: 2,
            explanation:
              "Es el lateral inverso, un concepto popularizado por Guardiola. En vez de subir por la banda, el lateral se incorpora al centro del campo para crear superioridad numérica en el mediocampo. Cancelo y Walker lo hicieron en el City.",
          },
          {
            q: "Cuando un informe de Soy Analista dice que un equipo 'transforma su 4-3-3 en un 4-4-2 sin balón', ¿qué significa?",
            options: [
              "Que cambian de formación en el entretiempo",
              "Que uno de los extremos baja a la línea de mediocampo cuando defienden, formando dos líneas de 4",
              "Que el DT hace una sustitución táctica",
              "Que juegan con 12 jugadores",
            ],
            correct: 1,
            explanation:
              "Es una transformación defensiva muy común: en un 4-3-3, cuando el equipo pierde la posesión, uno de los extremos (generalmente el de la banda del balón) baja a la línea de mediocampo, formando un 4-4-2 defensivo con dos líneas compactas de 4.",
          },
        ],
      },
    },
  ],
};

export default module01;
