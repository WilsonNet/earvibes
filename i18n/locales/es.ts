import type { TranslationSource } from '../types';

// TypeScript will complain if 'es' does not match the structure of 'en' exactly
export const es: TranslationSource = {
  common: {
    appName: 'EarVibes',
    offline: 'Modo Offline',
    exit: 'Salir',
    score: 'Puntaje',
    back: 'Atrás',
    loading: 'Cargando...',
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
  },
  seo: {
    title: 'EarVibes - Entrenamiento Auditivo de Acordes',
    description:
      'Domina las progresiones de acordes con EarVibes. Entrenamiento auditivo interactivo para músicos. Aprende armonía Jazz, Rock, Pop y City Pop.',
    keywords:
      'entrenamiento auditivo, teoría musical, progresiones de acordes, armonía jazz, city pop, oído absoluto, herramientas para músicos',
  },
  home: {
    selectDifficulty: 'Selecciona Dificultad',
    startTraining: 'Comenzar Entrenamiento',
    levelLabel: 'NIVEL {{id}}',
    realSongsTitle: 'Desafíos Reales',
    startChallenge: 'Iniciar Desafío',
  },
  game: {
    playAudio: 'Reproducir Audio',
    playing: 'Reproduciendo...',
    listenPrompt: 'Escucha la progresión de 4 acordes',
    submit: 'Enviar Progresión',
    next: 'Siguiente Progresión →',
    analysis: 'Análisis',
    clickToCompare: 'Haz clic arriba para comparar sonidos',
    analyzing: 'Analizando...',
    undo: 'Deshacer',
    exitConfirm: '¿Estás seguro de que quieres salir?',
    toggleSynth: 'Cambiar Sonido (Atajo: T)',
    playCorrect: 'Clic para escuchar el acorde correcto',
    synth: 'Sintetizador',
  },
  instructions: {
    title: 'Cómo Jugar',
    step1: 'Escucha la progresión de acordes tocada por la IA.',
    step2: 'Identifica los acordes de oído y selecciónalos en orden.',
    step3: 'Envía tu respuesta para ver si fue correcta.',
    shortcutsTitle: 'Atajos de Teclado',
    feedbackTitle: 'Entendiendo el Feedback',
    feedbackDesc:
      'El verde indica respuestas correctas. El rojo indica errores. En modo feedback, puedes hacer clic en los acordes correctos revelados (debajo de las ranuras) para compararlos con tu respuesta.',
  },
  theory: {
    title: 'Lección de Teoría Musical',
    startQuiz: '¡Entendido, Iniciar Quiz!',
    generating: 'Generando...',
    notFound: 'Lección no encontrada',
    notFoundDesc: 'Selecciona un nivel válido para continuar.',
  },
  feedback: {
    perfect:
      '### ¡Perfecto! 🎉\n\nIdentificaste correctamente la progresión. ¡Tu oído está mejorando!',
    close: '### Cerca, pero cuidado con el acorde #{{index}}',
    comparison:
      '\nElegiste **{{user}}**, que {{userDesc}}.\n\nSin embargo, la respuesta era **{{correct}}**, que {{correctDesc}}.',
    tip: '\n\n*Intenta escuchar de nuevo la diferencia entre **{{user}}** y **{{correct}}** en la reproducción.*',
    defaultCorrect: 'es la respuesta correcta',
    defaultIncorrect: 'es incorrecto aquí',
  },
  levelTitles: {
    '1': 'Nivel 1: Mayor Diatónico',
    '2': 'Nivel 2: Menor Natural',
    '3': 'Nivel 3: El Dominante 7',
    '4': 'Nivel 4: Rock & Mixolidio',
    '5': 'Nivel 5: Intercambio Modal',
    '6': 'Nivel 6: Dominantes Secundarios (7ths)',
    '7': 'Nivel 7: Los Beatles y el Cuatro Menor',
    '8': 'Nivel 8: Psicodelia y Cromatismo',
    '9': 'Nivel 9: Jazz y Sustitución de Tritono (Tétradas)',
    '10': 'Nivel 10: El Modo Dórico (Coltrane)',
    '11': 'Nivel 11: Royal Road (Tétradas J-Pop)',
    '12': 'Nivel 12: City Pop y Slash Chords',
  },
  levelDescs: {
    '1': 'Aprende los bloques fundamentales de la música pop y clásica usando la escala Mayor.',
    '2': 'Explora los sonidos más oscuros y emocionales de la escala Menor.',
    '3': 'Introduciendo tensión con el acorde V7.',
    '4': 'Domina el sonido clásico del rock con el acorde bVII (Bemol 7).',
    '5': 'Acordes prestados de la escala menor (bIII, bVI) para progresiones épicas.',
    '6': 'Armonía avanzada usando acordes de 7ª (II7, III7, VI7) para crear fuertes tirones a otras tonalidades.',
    '7': 'El sonido sentimental del Cuatro Menor (iv) encontrado en baladas clásicas.',
    '8': 'Acordes aumentados y dominantes inestables (I+, I7) para color psicodélico.',
    '9': 'Armonía de Jazz sofisticada usando acordes de 7ª (tétradas) y la Sustitución de Tritono.',
    '10': "El sonido modal de 'My Favorite Things' de John Coltrane.",
    '11': "La 'Oudou Shinkou' (IVM7-V7-iii7-vi7), la progresión dorada del J-Pop usando ricas tétradas.",
    '12': "El sofisticado estilo armónico de Tatsuro Yamashita, con Slash Chords y la progresión 'Just The Two Of Us'.",
  },
  chordDescriptions: {
    MAJOR: {
      I: "es el acorde de 'Inicio', sintiéndose estable, resuelto y fundamentado",
      ii: 'es un acorde menor que se siente melancólico, actuando como puente hacia la dominante',
      iii: 'es un acorde menor con un sonido agridulce y transicional',
      IV: 'es un acorde mayor que se siente brillante, abierto y levanta la energía lejos del inicio',
      V: 'es la Dominante, creando una fuerte tensión que exige un retorno a la tónica',
      V7: 'añade una tensión distinta al acorde V, tirando urgentemente hacia el inicio',
      vi: "es un acorde menor que se siente emocional y a menudo actúa como una resolución 'engañosa'",
      'vii°': 'es un acorde disminuido que suena inestable, disonante y tira fuertemente hacia I',
    },
    MINOR: {
      i: "es el acorde de 'Inicio', sintiéndose estable pero serio o triste",
      'ii°':
        'es un acorde disminuido añadiendo tensión oscura, a menudo preparando para la dominante',
      III: 'es el Relativo Mayor, ofreciendo un momento de brillo y alivio',
      iv: 'es un acorde menor que se siente triste, pesado y emocional',
      v: 'es la dominante menor, sintiéndose taciturna y más suave que la V mayor',
      V: 'es la dominante mayor, proporcionando un fuerte tirón armónico de vuelta a la raíz menor',
      VI: "es un acorde mayor que se siente épico, heroico o como una sorpresa 'engañosa'",
      VII: 'es un acorde mayor que se siente audaz, a menudo usado en himnos de rock',
      'vii°': 'es un acorde disminuido que es muy inestable',
    },
    MIXOLYDIAN: {
      I: "es el acorde de 'Inicio'",
      IV: 'es la subdominante',
      V: 'es la dominante',
      bVII: "es el acorde 'Rock' (Bemol 7), sintiéndose rebelde y bluesy, resolviendo a I",
      vi: 'es el relativo menor',
    },
    MODAL_INTERCHANGE: {
      I: 'es el inicio',
      IV: 'es la subdominante',
      V: 'es la dominante',
      bIII: "es un acorde mayor prestado que suena 'duro' o 'bluesy'",
      bVI: "es el acorde 'Épico' prestado del menor, sonando grandioso y mágico",
      bVII: 'es el Bemol 7 prestado, común en el rock',
    },
    SECONDARY_DOMINANT: {
      I: 'es el inicio',
      IV: 'es subdominante',
      V: 'es dominante',
      II7: 'es un II Dominante (V7/V), tirando fuertemente hacia V',
      III7: 'es un III Dominante (V7/vi), creando un fuerte tirón hacia el relativo menor',
      VI7: 'es un VI Dominante (V7/ii), creando un giro brillante hacia el acorde ii',
    },
    MINOR_PLAGAL: {
      I: 'es el inicio',
      IV: 'es la subdominante brillante',
      iv: 'es el Cuatro Menor, creando un colapso sentimental y nostálgico hacia el inicio',
      V: 'es dominante',
      vi: 'es el relativo menor',
    },
    CHROMATIC: {
      I: 'es el inicio',
      V: 'es dominante',
      vi: 'es el relativo menor',
      'I+': 'es el I Aumentado, sonando onírico, flotante e inestable',
      I7: 'es el I Dominante, añadiendo una tensión bluesy que tira hacia IV',
    },
    TRITONE_SUB: {
      IM7: 'es la tónica Mayor 7, sonando exuberante y jazzy',
      ii7: 'es el ii menor 7, la preparación estándar de jazz',
      V7: 'es la dominante estándar',
      bII7: 'es la Sustitución de Tritono, una dominante cromática picante que se desliza hacia I',
      vi7: 'es el relativo menor 7',
    },
    DORIAN: {
      i: 'es la tónica menor',
      IV: "es el IV Mayor, el sonido 'Dórico' característico (más brillante que el iv menor)",
      ii: 'es el ii menor (a diferencia del ii° disminuido en menor natural)',
      bVII: 'es el acorde mayor subtónico',
      III: 'es el relativo mayor',
    },
    OUDOU: {
      IVM7: 'es la subdominante Mayor 7, sonando emocional y sofisticada',
      V7: 'es la dominante 7, construyendo tensión',
      iii7: 'es el mediante menor 7, proporcionando profunda nostalgia (Setsunai)',
      vi7: 'es el relativo menor 7',
      IM7: 'es la tónica Mayor 7',
    },
    CITY_POP: {
      IM7: "es la tónica Mayor 7 estable, a menudo usada para 'vamping'",
      IVM7: 'es la subdominante Mayor 7 exuberante, a menudo el acorde inicial en City Pop',
      III7: 'es un Dominante 7 que tira fuertemente hacia vi7, creando tensión emocional',
      vi7: 'es el menor 7, que a menudo sigue a III7',
      Gm7: 'es el v menor, apareciendo típicamente antes de C7 para crear una modulación suave',
      'IV/V':
        "es el Dominante 'Slash Chord' (F/G), un sonido característico de Tatsuro que se siente urbano y flotante",
    },
  },
  lessons: {
    '1': `
## Nivel 1: La Base de la Escala Mayor

**Concepto**
Estás escuchando acordes de la **Escala Mayor**. En teoría musical, usamos números romanos para nombrar acordes basados en su posición.
- **Mayúsculas (I, IV, V)** = Acordes Mayores (Feliz, Brillante)
- **Minúsculas (ii, iii, vi)** = Acordes Menores (Triste, Serio)

**Los Acordes**
*   **I (Uno)**: El acorde de "Inicio". Se siente terminado.
*   **IV (Cuatro)**: La "Subdominante". Se siente como ir de viaje.
*   **V (Cinco)**: La "Dominante". Se siente tenso y quiere volver al I.
*   **vi (Seis)**: El "Relativo Menor". Es triste pero compatible con I.

**Listening Tip**
Escucha el movimiento **V → I**. Suena como "El Fin" de una oración.

**Ejemplos de Canciones**
1. **Let It Be** - The Beatles
2. **Stand By Me** - Ben E. King
3. **I'm Yours** - Jason Mraz
`,
    '2': `
## Nivel 2: La Escala Menor Natural

**Concepto**
Bienvenido a la **Escala Menor Natural**. Las canciones aquí a menudo suenan más tristes, más serias o pueden evocar un sentimiento "épico". El acorde "Hogar" ahora es menor (**i**).

**Los Acordes**
*   **i (Uno)**: El nuevo Hogar. Serio y estable.
*   **III (Tres)**: El "Relativo Mayor". Un estallido de luz y esperanza en el paisaje menor.
*   **iv (Cuatro)**: Profundamente triste y emocional.
*   **v (Cinco menor)**: El dominante menor. Tiene una atracción ligeramente más suave e introspectiva de regreso a 'i' en comparación con un 'V' mayor.
*   **VI (Seis)**: Un acorde mayor que puede sentirse heroico, grandioso o como una sorpresa "engañosa".
*   **VII (Siete)**: Un acorde mayor fuerte, a menudo utilizado en la música rock por su sonido audaz.

**Consejo de Escucha**
Escucha la cualidad del acorde 'v' (menor) en comparación con lo que sería un acorde 'V' (mayor). El 'v' menor crea una resolución menos urgente y más sutil de regreso a 'i'.

**Ejemplos de Canciones**
1. **Stairway to Heaven** - Led Zeppelin (las secciones del verso a menudo usan armonía menor natural)
2. **The Sound of Silence** - Simon & Garfunkel (progresiones menores de estilo folk)
3. **Black Sabbath** - Black Sabbath (el metal temprano a menudo usa menor natural)
`,
    '3': `
## Nivel 3: El Dominante 7 (V7)

**Concepto**
Estamos de vuelta en Mayor, pero añadiendo un sabor específico: el **Dominante 7 (V7)**.

**El Acorde V7**
El **V7** es el acorde de tensión definitiva. Contiene un intervalo de "tritono" que suena ligeramente disonante y *ruega* resolver al acorde **I**.

**Comparación**
*   **V (Normal)**: Tenso, pero limpio.
*   **V7 (7th)**: Tenso, con un toque de blues, y urgente.

**Listening Tip**
Escucha un "twang" o un roce "bluesy" en el acorde V. ¡Esa es la 7ª nota!

**Ejemplos de Canciones**
1. **La Bamba** - Ritchie Valens
2. **Twist and Shout** - The Beatles
3. **Brown Eyed Girl** - Van Morrison
`,
    '4': `
## Nivel 4: Rock & El Modo Mixolidio

**Concepto**
En el rock clásico (piensa en AC/DC, Guns N' Roses), a menudo no usamos la escala mayor "correcta". Usamos el **Modo Mixolidio**. La diferencia clave es el acorde **bVII (Bemol Siete)**.

**El Acorde bVII**
En una tonalidad Mayor estándar (Do), el 7º acorde es un acorde disminuido extraño. Los músicos de rock odian eso. Lo reemplazan con un poderoso acorde Mayor (Sib en la tonalidad de Do).

**Perfil Sonoro**
*   **bVII → I**: Esta es la "Resolución Backdoor". Suena rebelde y definitiva.

**Listening Tip**
Si escuchas un acorde mayor que suena más grave que la raíz pero resuelve poderosamente hacia ella, es el **bVII**.

**Ejemplos de Canciones**
1. **Sympathy for the Devil** - The Rolling Stones
2. **Sweet Home Alabama** - Lynyrd Skynyrd
3. **Royals** - Lorde
`,
    '5': `
## Nivel 5: Intercambio Modal (Acordes Prestados)

**Concepto**
¡Solo porque estés en una tonalidad Mayor no significa que no puedas usar acordes de la tonalidad Menor! Esto se llama **Intercambio Modal**.

**Los Acordes Prestados**
*   **bVI (Bemol Seis)**: Prestado del menor. Suena "mágico", "épico" o "onírico". Usado mucho en bandas sonoras y rock de los 90.
*   **bIII (Bemol Tres)**: Un acorde mayor duro y bluesy.

**Listening Tip**
Busca acordes que suenen "sorprendentes" o más oscuros de lo esperado, pero que sigan siendo acordes Mayores. El **bVI** a menudo resuelve a **V** o **I**.

**Ejemplos de Canciones**
1. **Lady Madonna** - The Beatles
2. **Crazy Train** - Ozzy Osbourne
3. **Lithium** - Nirvana
`,
    '6': `
## Nivel 6: Dominantes Secundarios (7ths)

**Concepto**
A veces, tomamos un acorde menor (como ii, iii o vi) y lo *forzamos* a ser un **Dominante 7**. ¿Por qué? Para que tire fuertemente hacia otro acorde. Este nivel usa acordes de 4 notas.

**Los Acordes**
*   **III7 (Tres Dominante)**: Usualmente menor (iii). Hacerlo Dominante hace que tire hacia **vi**. (Piensa en Radiohead o los Beatles).
*   **II7 (Dos Dominante)**: Usualmente menor (ii). Hacerlo Dominante crea un sonido brillante que tira hacia **V**.
*   **VI7 (Seis Dominante)**: Usualmente menor (vi). Hacerlo Dominante tira hacia **ii**.

**Listening Tip**
Si escuchas un acorde que suena como si se "iluminara" inesperadamente y tiene un borde bluesy de 7ª, probablemente sea un Dominante Secundario.

**Ejemplos de Canciones**
1. **Creep** - Radiohead (Usa III7)
2. **Yesterday** - The Beatles (Usa VI7)
3. **Don't Look Back in Anger** - Oasis (Usa III7)
`,
    '7': `
## Nivel 7: Los Beatles y el Cuatro Menor

**Concepto**
Los Beatles y otros compositores de pop romántico amaban usar el acorde **Cuatro Menor (iv)** en una tonalidad Mayor. Este es un tipo de "Intercambio Modal" que es tan específico y sentimental que merece su propio nivel.

**La Secuencia**
El movimiento clásico es **IV → iv → I**.
*   **IV**: Brillante, feliz.
*   **iv**: Repentinamente triste, nostálgico, "desgarrador".
*   **I**: Resolución con un suspiro de alivio.

**Ejemplos**
*   "In My Life" (The Beatles)
*   "Creep" (Radiohead)

**Listening Tip**
Escucha un acorde que se siente como una "nube oscura" pasando sobre un día soleado, seguido inmediatamente por una resolución a casa.

**Ejemplos de Canciones**
1. **In My Life** - The Beatles
2. **Wake Me Up When September Ends** - Green Day
3. **Desperado** - Eagles
`,
    '8': `
## Nivel 8: Psicodelia y Cromatismo

**Concepto**
En sus años posteriores, los Beatles exploraram sonidos más extraños usando acordes **Aumentados** y **Dominantes** sobre la tónica.

**Los Acordes**
*   **I+ (Aumentado)**: Una tríada con una 5ª sostenida. Suena "flotante", "onírico" o "inestable". A menudo conduce a IV o vi. ("All My Loving").
*   **I7 (Tónica Dominante)**: Hacer que el acorde de inicio sea un dominante 7 lo hace sonar bluesy e inquieto, exigiendo un movimiento hacia **IV**. ("Taxman").

**Listening Tip**
*   **I+**: Suena como "el espacio exterior" o una secuencia de sueño.
*   **I7**: Suena a tensión de blues/rock and roll en el acorde de inicio.

**Ejemplos de Canciones**
1. **Oh! Darling** - The Beatles (I Aumentado)
2. **(Just Like) Starting Over** - John Lennon (I Aumentado)
3. **I Saw Her Standing There** - The Beatles (I Dominante)
`,
    '9': `
## Nivel 9: Armonía de Jazz y Sustitución de Tritono

**Concepto**
En Jazz, los acordes son casi siempre **Acordes de 7ª (Tétradas)**. Las tríadas estándar (I, ii, vi) se convierten en acordes más ricos de 4 notas (IM7, ii7, vi7).
Este nivel también presenta la **Sustitución de Tritono**.

**El Sustituto**
En lugar de tocar el acorde V7 estándar (G7), los músicos de jazz a menudo tocam un acorde dominante a un "tritono" de distancia (Db7). Este se llama el **bII7** (Bemol Dos Siete).
Debido a que estos dos acordes comparten el mismo intervalo crítico de "tritono", cumplen la misma función armónica pero con un movimiento de bajo cromático más genial.

**El Sonido**
*   **V7 → IM7**: Suena tradicional y perfecto.
*   **bII7 → IM7**: Suena sofisticado, suave y "jazzy". El bajo se desliza un semitono hacia abajo (Db -> C).

**Listening Tip**
Escucha la línea de bajo. Si los acordes parecen "deslizarse" cromáticamente hacia el acorde de inicio, probablemente sea una Sustitución de Tritono.

**Ejemplos de Canciones**
1. **The Girl from Ipanema** - Antonio Carlos Jobim
2. **Satin Doll** - Duke Ellington
3. **The Simpsons Theme** (Cadencia Final)
`,
    '10': `
## Nivel 10: El Modo Dórico (Estilo Coltrane)

**Concepto**
Inspirado en la versión de John Coltrane de *"My Favorite Things"*, este nivel se centra en el **Modo Dórico**.
El modo Dórico es una escala menor, pero con una 6ª nota elevada (Mayor). Esto elimina la tristeza de la escala menor y la reemplaza con un sonido más brillante, "místico" o "medieval".

**El Vamp Característico**
El sonido Dórico clásico proviene de oscilar entre o **i** (menor) e el **IV** (Mayor). En una tonalidad menor estándar, el IV es menor. En Dórico, es Mayor.

**Los Acordes**
*   **i (Uno Menor)**: El acorde de inicio.
*   **IV (Cuatro Mayor)**: El acorde "Dórico". Más brillante de lo esperado en una tonalidad menor.
*   **ii (Dos Menor)**: A diferencia del menor estándar (donde ii es disminuido), en Dórico, el ii es un acorde menor agradable y estable.

**Listening Tip**
Si la canción es menor, pero escuchas un acorde Mayor brillante que no es el relativo mayor (III) ni la dominante (V), probablemente sea el acorde **IV** del modo Dórico.

**Ejemplos de Canciones**
1. **My Favorite Things** - John Coltrane
2. **Breathe** - Pink Floyd
3. **Oye Como Va** - Santana
`,
    '11': `
## Nivel 11: Royal Road (J-Pop Oudou Shinkou)

**Concepto**
Bienvenido al **Royal Road (王道進行)**, la progresión de acordes más popular en el J-Pop y la música Anime.
En J-Pop, es estándar usar **acordes de 4 notas (Tétradas)** para un sonido más rico y emocional.
La secuencia clásica es **IVM7 → V7 → iii7 → vi7** (ej., Fmaj7 → G7 → Em7 → Am7).

**La Narrativa**
Esta progresión cuenta una historia emocional específica:
1.  **IVM7 (Subdominante)**: Comienza con esperanza y sofisticación.
2.  **V7 (Dominante)**: Construye tensión y drama.
3.  **iii7 (Mediante)**: Aterriza en el *iii menor*. Esto crea un sentimiento de **Nostalgia (Setsunai)** o "anhelo agridulce".
4.  **vi7 (Relativo Menor)**: Resuelve en tristeza o seriedad.

**Listening Tip**
Escucha una progresión que sube pero toma un giro triste y nostálgico (iii7) en el medio en lugar de resolver felizmente en I.

**Ejemplos de Canciones**
1. **Pretender** - Official Hige Dandism
2. **Robinson** - Spitz
3. **Hanabi** - Mr.Children
`,
    '12': `
## Nivel 12: City Pop y Slash Chords

**Concepto**
Dedicado al **"Rey del City Pop"**, Tatsuro Yamashita. Este estilo se basa en exuberantes acordes de 7ª y una sofisticada ambigüedad armónica.
El sonido característico es el **Dominante Slash Chord (IV/V)** (por ejemplo, F/G en la tonalidad de Do). Crea un sonido dominante flotante y "urbano" que evita la dureza de un V7 estándar.

**La Progresión "Just The Two Of Us"**
El City Pop utiliza mucho variaciones de esta progresión: **IVM7 → III7 → vi7 → Gm7 → C7**.
Presenta un dominante secundario fuerte (III7) y un "ii-V secundario" (Gm7-C7) que te devuelve al acorde IV.

**Los Acordes**
*   **IV/V (F/G)**: Una tríada Mayor sobre un bajo V. Suena como un sofisticado acorde de 11ª.
*   **Gm7 (v menor)**: Usado para preparar una modulación o volver en círculo a IVM7.
*   **IVM7**: La estrella del City Pop. A menudo el acorde inicial de la canción.

**Listening Tip**
Escucha un sonido suave y brillante donde la nota del bajo se mantiene en V mientras los acordes de arriba cambian, o progresiones que hacen bucles sin aterrizar en I.

**Ejemplos de Canciones**
1. **Sparkle** - Tatsuro Yamashita
2. **Ride on Time** - Tatsuro Yamashita
3. **Plastic Love** - Mariya Takeuchi (Arr. Tatsuro Yamashita)
`,
  },
};
