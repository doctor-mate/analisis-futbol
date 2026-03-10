import type { AcademyModule } from "./types";

const module05: AcademyModule = {
  id: 5,
  title: "Pressing y Defensa",
  subtitle: "Cómo defiende y presiona",
  icon: "🛡️",
  color: "#355070",
  lessons: [
    {
      id: "5-0",
      type: "theory",
      title: "Pressing alto, medio, bajo: la defensa empieza sin balón",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "Tres modelos de defensa",
            body: `Cuando tu equipo no tiene el balón, ¿dónde empieza a defender? Esta decisión define el estilo defensivo más que cualquier otra cosa.\n\n**Pressing alto** — El equipo sube a presionar al rival en su propio campo. Los delanteros persiguen al portero y los centrales rivales, los mediocampistas cortan líneas de pase. El objetivo es recuperar el balón lo más arriba posible, cerca del área rival.\n• PPDA < 10\n• Ventaja: si recuperás arriba, estás cerca del gol\n• Riesgo: si te superan la presión, quedás abierto atrás\n• Ejemplo: Liverpool de Klopp, Leverkusen de Xabi Alonso, Barcelona de Xavi\n\n**Bloque medio** — El equipo se posiciona a la altura del centro del campo. No sube a presionar al portero rival, pero tampoco se encierra atrás. Espera a que el rival entre en su zona para presionar.\n• PPDA 10-14\n• Ventaja: equilibrio entre defensa y ataque\n• Riesgo: ni presiona fuerte ni protege el área al máximo\n• Ejemplo: muchos equipos "normales" de las ligas top\n\n**Bloque bajo** — El equipo se repliega cerca de su propia área. Dos líneas compactas de 4 jugadores, poco espacio entre líneas. Deja jugar al rival en su campo pero cierra los espacios peligrosos.\n• PPDA > 16\n• Ventaja: muy difícil de penetrar, ideal para contraataque\n• Riesgo: sufrís mucho, dependés de transiciones para atacar\n• Ejemplo: Atlético de Simeone, Getafe, muchos equipos chicos contra grandes`,
          },
          {
            title: "Triggers de presión y gegenpressing",
            body: `El pressing no es "correr como loco". Los equipos bien entrenados tienen **triggers** (gatillos) que activan la presión:\n\n• **Pase hacia atrás del rival** — Si el rival juega hacia atrás, el equipo sube a presionar porque el rival está alejándose de tu portería\n• **Pase lateral** — Un pase sin profundidad es señal para apretar\n• **Recepción de espaldas** — Si un rival recibe de espaldas al juego, es momento de presionarlo\n• **Mal control** — Si el rival controla mal, todos van a buscar la recuperación\n\n**Gegenpressing (contrapress)** es un concepto diferente: es la reacción inmediata a la pérdida del balón. En vez de replegarse, los jugadores más cercanos al balón van inmediatamente a presionar para recuperar en los primeros 5 segundos.\n\n• **Gegenpressing orientado al balón**: todos van directo al portador\n• **Gegenpressing orientado al pase**: cubren las opciones de pase del portador\n\nEl gegenpressing lo popularizó Klopp en el Dortmund y el Liverpool. Guardiola también lo usa, pero de forma más posicional (cubre pases en vez de ir directo al balón).`,
          },
          {
            title: "¿Por qué te importa?",
            body: `La sección 11 de la metodología ("Pressing y Defensa") es donde todo esto aterriza en tus informes. Necesitás poder describir:\n\n• ¿Qué tipo de pressing usa el rival? Alto, medio o bajo (con dato de PPDA)\n• ¿Cuáles son sus triggers de presión?\n• ¿Hacen gegenpressing tras la pérdida o repliegue?\n• ¿Cómo es su bloque defensivo? ¿Compacto? ¿Amplio?\n• ¿Dónde son vulnerables? ¿Se pueden superar por las bandas? ¿Por el centro?\n\nCuando le explicás a un DT: "Este equipo presiona agresivamente con un PPDA de 7.8, pero cuando los superás por las bandas, la distancia entre líneas se amplía a más de 40 metros — ahí es donde son vulnerables." Eso es análisis accionable.`,
          },
        ],
      },
    },
    {
      id: "5-1",
      type: "exercise",
      title: "Observá qué hace un equipo SIN pelota",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Mirá un partido enfocándote exclusivamente en lo que hace un equipo cuando NO tiene la posesión. Ignorá completamente al equipo con balón — tu mirada va a los jugadores sin pelota.",
        checklist: [
          "¿Dónde está la primera línea de presión? ¿Los delanteros presionan al portero rival (pressing alto) o esperan en el medio del campo?",
          "¿Cuántas líneas defensivas ves? ¿Cuánto espacio hay entre ellas? Si están juntas = bloque compacto. Si están separadas = bloque abierto.",
          "Identificá un trigger de presión: ¿cuándo se activa la presión? ¿En pase hacia atrás? ¿Pase lateral? ¿Mal control?",
          "Cuando pierden el balón: ¿van inmediatamente a presionar (gegenpressing) o se repliegan ordenadamente?",
          "¿Qué jugador lidera la presión? ¿El delantero? ¿Un mediocampista? Anotá quién hace más esfuerzo defensivo.",
          "¿Hay algún momento donde la defensa se desorganice? ¿Qué lo causó? (cambio de orientación, conducción individual, jugada rápida del rival)",
        ],
      },
    },
    {
      id: "5-2",
      type: "metrics",
      title: "PPDA y acciones defensivas en FBref y Understat",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Buscá el PPDA de al menos 3 equipos diferentes en Understat, y complementá con las acciones defensivas individuales en FBref.",
        tasks: [
          "En Understat, buscá el PPDA de 3 equipos con estilos distintos (uno que presione alto, uno equilibrado, uno defensivo). Anotá sus PPDA y clasificalos.",
          "Para el equipo con PPDA más bajo (más agresivo), andá a FBref y buscá sus jugadores con más tackles (quites) e intercepciones por 90 min. ¿Son mediocampistas o defensores?",
          "Compará las acciones defensivas del equipo que presiona alto vs el que defiende atrás. ¿Quién tiene más intercepciones? ¿Quién tiene más despejes (clearances)?",
          "Buscá el % de duelos ganados del equipo defensivo. ¿Es alto (>55%)? Si sí, confirma que aunque dejan jugar al rival, son fuertes cuando disputan el balón.",
        ],
        tip: "En Understat, el PPDA está en la página principal de cada equipo. En FBref, las acciones defensivas están en la pestaña 'Defensive Actions' e incluyen Tackles, Interceptions, Blocks y Clearances.",
      },
    },
    {
      id: "5-3",
      type: "quiz",
      title: "Evaluación: Pressing y Defensa",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un equipo tiene PPDA de 18.2. ¿Qué tipo de defensa sugiere esto?",
            options: [
              "Pressing ultra agresivo",
              "Pressing alto moderado",
              "Bloque bajo — deja jugar al rival y se repliega cerca de su área",
              "No tiene relación con el pressing",
            ],
            correct: 2,
            explanation:
              "Un PPDA de 18.2 es alto — significa que el rival completa 18 pases antes de que el equipo realice una acción defensiva. Esto indica un equipo que no presiona arriba y se repliega en bloque bajo, dejando jugar al rival en su campo.",
          },
          {
            q: "¿Cuál es un 'trigger de presión'?",
            options: [
              "El momento en que el DT grita desde la banda",
              "Una señal o situación que activa la presión colectiva (como un pase hacia atrás del rival o un mal control)",
              "Cuando un jugador recibe tarjeta amarilla",
              "El inicio del segundo tiempo",
            ],
            correct: 1,
            explanation:
              "Un trigger de presión es una situación específica que le indica al equipo que es momento de subir a presionar colectivamente. Los más comunes: pase hacia atrás, pase lateral, recepción de espaldas, mal control del rival. Los equipos bien entrenados reaccionan todos juntos al trigger.",
          },
          {
            q: "¿Cuál es la diferencia entre gegenpressing y pressing alto?",
            options: [
              "Son exactamente lo mismo",
              "El pressing alto es la posición defensiva general; el gegenpressing es la reacción inmediata tras perder el balón",
              "El gegenpressing es más defensivo",
              "El pressing alto solo lo hacen los delanteros",
            ],
            correct: 1,
            explanation:
              "El pressing alto describe dónde defiende el equipo (arriba, en campo rival). El gegenpressing es un comportamiento específico: la reacción inmediata tras la pérdida de balón, donde los jugadores cercanos van a presionar para recuperar en 5 segundos. Un equipo puede hacer pressing alto sin gegenpressing (espera organizado arriba) o gegenpressing sin pressing alto (presiona tras perder pero luego se repliega).",
          },
          {
            q: "Un equipo concede muchas ocasiones por las bandas pero muy pocas por el centro. ¿Qué dice sobre su bloque defensivo?",
            options: [
              "No tiene bloque defensivo",
              "Su bloque es compacto horizontalmente (cierra bien el centro) pero vulnerable por los costados, probablemente porque los laterales no defienden bien o los extremos no bajan a ayudar",
              "Juega con 3 centrales",
              "Presiona alto todo el partido",
            ],
            correct: 1,
            explanation:
              "Un equipo que cierra bien el centro pero concede por las bandas probablemente tiene un bloque central compacto pero no cubre bien los pasillos laterales. Esto puede deberse a laterales ofensivos que no llegan a defender, o extremos que no bajan. Es una debilidad explotable en un informe.",
          },
          {
            q: "En un informe de Soy Analista, ¿cómo describirías un equipo con PPDA de 7.5 que pierde muchos duelos aéreos?",
            options: [
              "Equipo perfecto sin debilidades",
              "Presiona agresivamente (PPDA 7.5 = pressing muy alto) pero es vulnerable en juego aéreo — se puede explotar con balones largos y centros al área",
              "Equipo que defiende atrás",
              "Equipo que no tiene datos",
            ],
            correct: 1,
            explanation:
              "El PPDA de 7.5 confirma un pressing muy agresivo, pero la debilidad aérea es explotable. Un informe accionable diría: 'Presiona altísimo (PPDA 7.5), pero cuando se supera su pressing con balones largos, su fragilidad aérea (48% duelos ganados) se convierte en una vía de ataque clara.' Eso le da al DT rival una herramienta concreta.",
          },
        ],
      },
    },
  ],
};

export default module05;
