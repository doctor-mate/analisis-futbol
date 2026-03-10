import type { AcademyModule } from "./types";

const module10: AcademyModule = {
  id: 10,
  title: "Leer un Informe de Oposición",
  subtitle: "Del dato a la decisión",
  icon: "📖",
  color: "#22223B",
  lessons: [
    {
      id: "10-0",
      type: "theory",
      title: "El informe no es un paper — es una herramienta para un DT",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "¿Para qué sirve un informe de oposición?",
            body: `Un informe de oposición no es un trabajo académico ni un artículo periodístico. Es una **herramienta de trabajo para un cuerpo técnico**. Cada dato que incluís tiene que responder una de estas tres preguntas:\n\n1. **¿Cómo juega este equipo?** — Su identidad, su sistema, sus patrones\n2. **¿Dónde es vulnerable?** — Las debilidades que podemos explotar\n3. **¿Qué tenemos que respetar?** — Las fortalezas que debemos neutralizar\n\nSi un dato no responde ninguna de estas tres preguntas, no va en el informe. No se trata de acumular números — se trata de que cada número lleve a una acción.\n\nUn DT tiene 2 minutos antes de la charla técnica. Si tu informe necesita 60 minutos para entenderse, falló. La estructura de 17 secciones de Soy Analista está diseñada con un flujo: **general a específico**.\n\n• **2 minutos**: leen el resumen ejecutivo (sección 2) y saben lo esencial\n• **10 minutos**: leen las secciones tácticas (8-12) y entienden el modelo de juego\n• **60 minutos**: leen todo el informe con fichas de jugadores, ABP y recomendaciones`,
          },
          {
            title: "Cómo leer cada parte del informe",
            body: `**Resumen Ejecutivo (Sección 2)** — La página más importante. 4 párrafos: identidad del equipo, cómo ataca, cómo defiende, 4 claves del partido. Si solo podés leer una página, es esta.\n\n**Estadísticas Globales (Sección 7)** — El dashboard numérico. Métricas con percentiles y colores. Verde = fortaleza rival que hay que respetar. Rojo = debilidad que hay que explotar. Lectura rápida: mirá los colores antes que los números.\n\n**Modelo de juego (Secciones 8-12)** — El corazón táctico. Cada sección cubre una fase: construcción, progresión, finalización, pressing/defensa, transiciones. Cada una tiene un párrafo narrativo + datos clave + implicaciones tácticas.\n\n**ABP (Sección 13)** — Córners y tiros libres. Ofensivos: quién lanza, a dónde, quién remata. Defensivos: zonal, hombre o mixto, vulnerabilidades.\n\n**Jugadores clave (Secciones 14-15)** — Rankings por ICI + fichas individuales. Radar + perfil de rol + narrativa. Aquí identificás al jugador a neutralizar y al jugador vulnerable.\n\n**Claves y recomendaciones (Secciones 16-17)** — El cierre accionable. Fortalezas (qué respetar), debilidades (qué explotar), jugadores peligrosos (quién neutralizar), XI probable.`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Esto es lo que vendés. Cuando te sentás con un DT, un director deportivo o un agente, necesitás poder:\n\n• **Explicar la estructura**: "El informe tiene 17 secciones organizadas de general a específico. Podés leer solo el resumen ejecutivo en 2 minutos o profundizar en cada fase del juego."\n• **Navegar rápido**: Si te preguntan "¿cómo presiona este equipo?", sabés que está en la sección 11. Si preguntan "¿quién es el jugador más peligroso?", vas a la sección 15.\n• **Extraer insights accionables**: No repetir datos — interpretar. "Su PPDA es 7.8" no es un insight. "Presionan agresivamente, pero si los superás por las bandas, la distancia entre líneas se amplía y son vulnerables" SÍ es un insight.\n\nTu diferencial como Soy Analista es que cada informe tiene esta estructura profesional que un DT puede usar directamente en su preparación de partido.`,
          },
        ],
      },
    },
    {
      id: "10-1",
      type: "exercise",
      title: "Leé un informe y extraé las 3 claves tácticas",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Tomá un informe de Soy Analista (si tenés uno generado, usá ese; si no, usá los datos de un equipo que hayas investigado en los módulos anteriores). Tu objetivo es extraer las 3 claves tácticas principales del partido.",
        checklist: [
          "Leé el resumen ejecutivo (o escribí uno basado en tus análisis previos). Identificá: ¿cuál es la identidad del equipo en una oración?",
          "De las fortalezas del rival: ¿cuál es la MÁS importante que tu equipo debe respetar? Escribí una frase accionable (ejemplo: 'Su pressing alto con PPDA 7.8 obliga a salir largo si nos presionan arriba').",
          "De las debilidades: ¿cuál es la MÁS explotable? Escribí una frase accionable (ejemplo: 'Vulnerables por la banda izquierda donde su lateral tiene 38% de duelos ganados').",
          "Identificá al jugador más peligroso del rival. ¿Cómo lo neutralizarías? (marca individual, doble marca, cortarle la provisión de balón).",
          "Escribí las 3 claves del partido como bullets, estilo informe: una fortaleza a respetar, una debilidad a explotar, una recomendación táctica.",
        ],
      },
    },
    {
      id: "10-2",
      type: "metrics",
      title: "Escribí 3 claves tácticas solo con datos de FBref",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Elegí un equipo de cualquier liga top. SIN usar Claude ni ningún análisis externo, solo con datos de FBref, escribí 3 claves tácticas como si estuvieras preparando un partido contra ese equipo.",
        tasks: [
          "Mirá las estadísticas generales del equipo (posesión, xG, xGA, goles). Identificá: ¿es un equipo ofensivo o defensivo? ¿Sobrerrinde o subrinde?",
          "Mirá las estadísticas de pases (progresivos, largos, al último tercio) y posesión. Identificá: ¿cómo progresa? ¿Por las bandas o el centro?",
          "Mirá las estadísticas defensivas (PPDA si lo encontrás, tackles, intercepciones por zona). Identificá: ¿presiona alto o bajo? ¿Dónde recupera el balón?",
          "Con esos datos, escribí 3 bullets accionables para un DT que va a enfrentar a este equipo. Cada bullet debe tener: observación + dato + recomendación.",
        ],
        tip: "Este es el ejercicio más importante del curso. Si podés hacer esto con soltura, ya sabés hacer análisis táctico básico. La diferencia con un informe completo de Soy Analista es la profundidad y la automatización — pero la lógica es la misma.",
      },
    },
    {
      id: "10-3",
      type: "quiz",
      title: "Evaluación: Leer un Informe",
      xp: 50,
      content: {
        questions: [
          {
            q: "¿Cuáles son las 3 preguntas que todo dato de un informe debe responder?",
            options: [
              "¿Cuántos goles marca? ¿Cuántos recibe? ¿Cuántos puntos tiene?",
              "¿Cómo juega? ¿Dónde es vulnerable? ¿Qué debemos respetar?",
              "¿Quién es el DT? ¿Cuánto costó el plantel? ¿Cuántos títulos tiene?",
              "¿Juegan de local? ¿Llueve? ¿Está la cancha mojada?",
            ],
            correct: 1,
            explanation:
              "Las tres preguntas fundamentales de todo informe de oposición son: ¿Cómo juega este equipo? (identidad), ¿Dónde es vulnerable? (debilidades a explotar), ¿Qué tenemos que respetar? (fortalezas a neutralizar). Todo dato que no responda una de estas tres preguntas sobra.",
          },
          {
            q: "Un DT tiene 2 minutos antes de la charla técnica. ¿Qué sección del informe debería leer?",
            options: [
              "La sección de ABP (balón parado)",
              "Las fichas individuales de todos los jugadores",
              "El Resumen Ejecutivo (Sección 2) — una página con identidad, ataque, defensa y 4 claves del partido",
              "Las estadísticas globales",
            ],
            correct: 2,
            explanation:
              "El Resumen Ejecutivo (Sección 2) está diseñado exactamente para esto: en una página (250-400 palabras), el DT obtiene la identidad del equipo rival, cómo ataca, cómo defiende, y las 4 claves del partido. Es la sección más importante de todo el informe.",
          },
          {
            q: "En el dashboard de estadísticas globales, ¿qué significa una métrica marcada en rojo?",
            options: [
              "Es la métrica más importante",
              "Es una fortaleza del rival",
              "Es una debilidad del rival (P0-P24) — una oportunidad para explotar",
              "Es un error de cálculo",
            ],
            correct: 2,
            explanation:
              "Rojo (P0-P24) indica que el rival está en el cuarto inferior de la liga en esa métrica — es una debilidad clara. Un DT inteligente mira primero los rojos (debilidades a explotar) y después los verdes (fortalezas a respetar). Los colores permiten una lectura instantánea sin leer todos los números.",
          },
          {
            q: "¿Cuál es la diferencia entre 'repetir un dato' y 'dar un insight accionable'?",
            options: [
              "No hay diferencia",
              "'Su PPDA es 7.8' repite un dato; 'Presionan agresivamente — si los superamos por las bandas, quedan abiertos atrás' es un insight accionable",
              "Los insights son más largos",
              "Los datos son más importantes que los insights",
            ],
            correct: 1,
            explanation:
              "Repetir un dato es decir 'PPDA de 7.8'. Un insight accionable toma ese dato y lo traduce en acción: 'Presionan agresivamente (PPDA 7.8), pero si los superamos por las bandas, la distancia entre líneas se amplía — ahí es donde podemos atacar.' El DT no necesita saber qué es PPDA, necesita saber qué hacer con ese dato.",
          },
          {
            q: "¿Cuántas secciones tiene la metodología completa de Soy Analista?",
            options: [
              "5 secciones",
              "10 secciones",
              "17 secciones",
              "25 secciones",
            ],
            correct: 2,
            explanation:
              "La metodología tiene 17 secciones que cubren desde la portada (sección 1) hasta el XI probable y recomendaciones (sección 17), pasando por el resumen ejecutivo, estadísticas, las 5 fases del juego, ABP, análisis individual y fichas de jugadores clave.",
          },
        ],
      },
    },
  ],
};

export default module10;
