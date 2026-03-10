import type { AcademyModule } from "./types";

const module12: AcademyModule = {
  id: 12,
  title: "Simulacro B2B",
  subtitle: "Tu primera conversación con un cliente",
  icon: "🤝",
  color: "#2B2D42",
  lessons: [
    {
      id: "12-0",
      type: "theory",
      title: "El pitch, las objeciones y cómo vender Soy Analista",
      xp: 25,
      duration: "8 min",
      content: {
        sections: [
          {
            title: "El Elevator Pitch de 2 minutos",
            body: `Tenés 2 minutos para explicar qué es Soy Analista y por qué le sirve a la persona que tenés en frente. Estos son los elementos clave del pitch:\n\n**Estructura del pitch:**\n\n1. **Problema** (15 segundos): "Los cuerpos técnicos necesitan información táctica del rival antes de cada partido, pero armar un informe completo lleva días de trabajo manual."\n\n2. **Solución** (30 segundos): "Soy Analista produce informes de oposición profesionales usando datos de FBref, Understat y Transfermarkt, procesados con una metodología de 17 secciones que cubre las 5 fases del juego. Cada informe va del resumen ejecutivo al XI probable con recomendaciones tácticas."\n\n3. **Diferencial** (30 segundos): "No somos un dashboard de datos — somos análisis interpretado. Cada dato viene con su contexto, percentil y recomendación accionable. El DT recibe una herramienta lista para usar en su charla técnica, no un Excel para interpretar."\n\n4. **Prueba** (30 segundos): "Tenemos cobertura de las 48 selecciones del Mundial 2026 y de las 5 grandes ligas europeas. Informes de equipos como [ejemplo relevante para el interlocutor]. Puedo mostrarte uno ahora mismo."\n\n5. **Call to action** (15 segundos): "¿Te gustaría ver un informe de un equipo que te interese? Puedo generarlo y mostrártelo."`,
          },
          {
            title: "Objeciones comunes y cómo responderlas",
            body: `**"¿Trabajaste en algún club?"**\nRespuesta honesta: "El producto nace de la intersección entre análisis de datos y metodología táctica profesional. Los informes se construyen con los mismos datos que usan los departamentos de análisis de los clubes top — FBref, Understat, Transfermarkt — procesados con una metodología rigurosa de 17 secciones. Te invito a ver un informe y juzgar por la calidad del producto."\n\n**"¿Cómo generan los informes?"**\nRespuesta: "Combinamos scraping de datos de las mejores fuentes públicas (FBref, Understat), procesamiento con modelos propios (como nuestro Índice de Contribución Individual), y análisis táctico basado en una metodología de 17 secciones. El resultado es un informe que un DT puede usar directamente en su preparación de partido."\n\n**"¿No es lo mismo que StatsBomb o Wyscout?"**\nRespuesta: "StatsBomb y Wyscout son plataformas de datos — te dan los números y vos los interpretás. Soy Analista te da el análisis interpretado: no solo los datos sino qué significan, dónde está vulnerable el rival, y qué recomendamos tácticamente. Es la diferencia entre tener los ingredientes y tener el plato cocinado."\n\n**"¿Por qué debería pagar por esto?"**\nRespuesta: "El costo de NO tener información táctica es perder puntos que podrías haber ganado. Un informe de oposición bien hecho puede ser la diferencia entre neutralizar la fortaleza del rival o sufrirla. El retorno de inversión es inmediato."`,
          },
          {
            title: "¿Por qué te importa?",
            body: `Todo lo que aprendiste en los 12 módulos anteriores converge aquí. Saber de xG, PPDA, construcción, pressing — todo eso es tu base de conocimiento. Pero el negocio solo funciona si podés **comunicar ese conocimiento de forma clara y convincente**.\n\nNo necesitás ser un ex-jugador ni un ex-analista de club. Necesitás:\n• Entender los conceptos (ya los entendés)\n• Manejar la terminología (módulo anterior)\n• Mostrar el producto con confianza\n• Responder preguntas sin titubear\n\nEl pitch no es para vender humo — es para transmitir el valor real de un producto que funciona. Cuando mostrás un informe de 17 secciones con radares, percentiles y recomendaciones accionables, el producto se vende solo. Tu trabajo es abrir la puerta.`,
          },
        ],
      },
    },
    {
      id: "12-1",
      type: "exercise",
      title: "Preparate y grábate dando el pitch",
      xp: 30,
      duration: "45 min",
      content: {
        instruction:
          "Este ejercicio tiene dos partes: preparar el pitch y practicarlo en voz alta. La práctica oral es fundamental — no alcanza con saber la teoría, hay que saber decirla con fluidez.",
        checklist: [
          "Escribí tu versión personalizada del elevator pitch de 2 minutos. No copies textual — adaptá a tu estilo. Tiene que sonar natural, no robotizado.",
          "Grabate (audio o video) dando el pitch completo. Escuchalo/miralo. ¿Suena convincente? ¿Fluido? ¿Confiado?",
          "Prepará 3 bullets de un informe específico como si se los estuvieras explicando a un DT. Ejemplo: 'Este equipo presiona con PPDA 7.8 — eso significa que...'",
          "Practicá las respuestas a las 4 objeciones comunes. Grabate respondiendo cada una. ¿Suena preparado o improvisado?",
          "Hacé un role-play con alguien (amigo, familiar, o grabate simulando la conversación): presentá Soy Analista, mostrá un informe, respondé preguntas.",
        ],
      },
    },
    {
      id: "12-2",
      type: "metrics",
      title: "Generá un perfil de jugador para una agencia",
      xp: 30,
      duration: "20 min",
      content: {
        instruction:
          "Simulá un escenario real: una agencia de representación de jugadores te pide información sobre uno de sus jugadores. Elegí un jugador real de cualquier liga y preparate para explicar sus fortalezas con datos.",
        tasks: [
          "Elegí un jugador. Buscá sus stats en FBref: goles, asistencias, xG, xA, pases progresivos, conducciones, tackles, intercepciones — todo per 90.",
          "Construí mentalmente su perfil de rol (las 4 dimensiones). ¿Cuál es su dimensión más fuerte? ¿Cuál la más débil?",
          "Escribí 3 bullets que le dirías al agente: una fortaleza principal con dato, una segunda fortaleza, y una nota sobre un área de mejora (con tacto — no destruyas al jugador del agente).",
          "Practicá decir los 3 bullets en voz alta como si estuvieras en una reunión. ¿Suena profesional? ¿Usás lenguaje de acción futbolística?",
        ],
        tip: "Cuando hablás con un agente, recordá que quieren escuchar cosas positivas sobre su jugador. Empezá siempre con las fortalezas. Las debilidades se presentan como 'áreas de desarrollo' o 'oportunidades de mejora'. Nunca digas 'es malo en X' — decí 'tiene potencial de mejora en X, actualmente en P35'.",
      },
    },
    {
      id: "12-3",
      type: "quiz",
      title: "Evaluación: Simulacro B2B",
      xp: 50,
      content: {
        questions: [
          {
            q: "Un DT te pregunta: '¿Por qué debería confiar en un informe generado con datos y no en un scout que fue a ver el partido?' ¿Cuál es la mejor respuesta?",
            options: [
              "Los scouts son obsoletos, los datos son mejores",
              "No son excluyentes — los datos complementan la observación. Un scout puede ver cosas que los datos no captan, pero los datos eliminan sesgos y cubren todos los partidos, no solo uno. Lo ideal es combinar ambos.",
              "Los datos siempre tienen razón",
              "No sé, nunca pensé en eso",
            ],
            correct: 1,
            explanation:
              "La respuesta inteligente nunca ataca al scout — los posiciona como complementarios. Los datos te dan objetividad, cobertura total (todos los partidos, no uno), y eliminan sesgos. El scout aporta contexto que los datos no captan (lenguaje corporal, liderazgo, reacción a la presión). Juntos son más poderosos que por separado.",
          },
          {
            q: "Un agente te pregunta sobre un jugador suyo. El jugador tiene P22 en trabajo defensivo. ¿Cómo lo presentás?",
            options: [
              "Es malísimo defendiendo, está en P22",
              "Su contribución defensiva es un área con potencial de desarrollo — actualmente está en P22 para su posición. Su perfil es claramente ofensivo, donde destaca con P85 en creación.",
              "No le menciono el dato defensivo",
              "Le digo que cambie de posición",
            ],
            correct: 1,
            explanation:
              "Con un agente, siempre enmarcá las debilidades como 'áreas de desarrollo' y redirigí rápidamente a las fortalezas. 'Potencial de desarrollo + el dato honesto + redirigir a la fortaleza' es la fórmula. Nunca mientas (perdés credibilidad) pero tampoco destruyas al jugador del cliente.",
          },
          {
            q: "¿Cuál es el diferencial clave de Soy Analista frente a plataformas de datos como StatsBomb o Wyscout?",
            options: [
              "Tenemos más datos que ellos",
              "Somos más baratos",
              "Entregamos análisis interpretado con recomendaciones accionables, no solo datos crudos para que el cliente interprete",
              "No tenemos competencia",
            ],
            correct: 2,
            explanation:
              "El diferencial es la interpretación. StatsBomb y Wyscout te dan los datos — vos los interpretás. Soy Analista te da los datos YA interpretados: percentiles con colores, insights accionables, y recomendaciones tácticas. Es la diferencia entre recibir ingredientes y recibir el plato servido.",
          },
          {
            q: "Un director deportivo te dice: 'Mandame un informe de prueba gratis y después vemos.' ¿Qué hacés?",
            options: [
              "Le mandás 10 informes gratis esperando que pague después",
              "Le decís que no hacés nada gratis",
              "Le ofrecés un informe demo o un resumen ejecutivo para que vea la calidad, pero con la expectativa clara de que el producto completo tiene un costo",
              "Le mandás el informe pero con marcas de agua en cada página",
            ],
            correct: 2,
            explanation:
              "Un demo o resumen ejecutivo muestra la calidad sin regalar todo el trabajo. Establecé claramente: 'Te muestro el resumen ejecutivo y el dashboard de un informe para que veas el formato y la calidad. El informe completo de 17 secciones es nuestro producto premium.' Esto demuestra confianza en tu producto.",
          },
          {
            q: "¿Cuáles son los 5 elementos del elevator pitch de Soy Analista?",
            options: [
              "Precio, descuento, urgencia, cierre, repetición",
              "Problema, solución, diferencial, prueba, call to action",
              "Historia personal, estudios, experiencia, contacto, website",
              "Nombre, logo, slogan, colores, tipografía",
            ],
            correct: 1,
            explanation:
              "El pitch de 2 minutos tiene 5 partes: (1) Problema que resolvemos, (2) Solución que ofrecemos, (3) Diferencial vs alternativas, (4) Prueba de que funciona, (5) Call to action (invitar a ver un informe). Cada parte tiene un tiempo asignado para que el pitch fluya naturalmente en 2 minutos.",
          },
        ],
      },
    },
  ],
};

export default module12;
