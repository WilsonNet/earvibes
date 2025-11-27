import type { TranslationSource } from '../types';

export const pt: TranslationSource = {
  common: {
    appName: 'EarVibes',
    offline: 'Modo Offline',
    exit: 'Sair',
    score: 'Pontuação',
    back: 'Voltar',
    loading: 'Carregando...',
    language: 'Idioma',
    selectLanguage: 'Selecionar Idioma',
  },
  seo: {
    title: 'EarVibes - Treinamento Auditivo de Acordes',
    description:
      'Domine progressões de acordes com EarVibes. Treinamento auditivo interativo para músicos. Aprenda harmonia Jazz, Rock, Pop e City Pop.',
    keywords:
      'treinamento auditivo, teoria musical, progressões de acordes, harmonia jazz, city pop, ouvido absoluto, ferramentas para músicos',
  },
  home: {
    selectDifficulty: 'Selecione a Dificuldade',
    startTraining: 'Iniciar Treino',
    levelLabel: 'NÍVEL {{id}}',
    realSongsTitle: 'Desafios Reais',
    startChallenge: 'Iniciar Desafio',
  },
  game: {
    playAudio: 'Tocar Áudio',
    playing: 'Tocando...',
    listenPrompt: 'Ouça a progressão de 4 acordes',
    submit: 'Enviar Progressão',
    next: 'Próxima Progressão →',
    analysis: 'Análise',
    clickToCompare: 'Clique nos acordes acima para comparar sons',
    analyzing: 'Analisando...',
    undo: 'Desfazer',
    exitConfirm: 'Tem certeza que deseja sair?',
    toggleSynth: 'Alternar Sintetizador (Atalho: T)',
    playCorrect: 'Clique para ouvir o acorde correto',
    synth: 'Sintetizador',
  },
  instructions: {
    title: 'Como Jogar',
    step1: 'Ouça a progressão de acordes tocada pela IA.',
    step2: 'Identifique os acordes de ouvido e selecione-os na ordem.',
    step3: 'Envie sua resposta para ver se estava correta.',
    shortcutsTitle: 'Atalhos de Teclado',
    feedbackTitle: 'Entendiendo o Feedback',
    feedbackDesc:
      'Verde indica respostas corretas. Vermelho indica erros. No modo de feedback, você pode clicar nos acordes corretos revelados (abaixo dos slots) para compará-los com sua resposta.',
  },
  theory: {
    title: 'Aula de Teoria Musical',
    startQuiz: 'Entendi, Iniciar Quiz!',
    generating: 'Gerando...',
    notFound: 'Aula Não Encontrada',
    notFoundDesc: 'Selecione um nível válido para continuar.',
  },
  feedback: {
    perfect:
      '### Perfeito! 🎉\n\nVocê identificou a progressão corretamente. Seu ouvido está ficando mais afiado!',
    close: '### Quase, mas cuidado com o acorde #{{index}}',
    comparison:
      '\nVocê escolheu **{{user}}**, que {{userDesc}}.\n\nNo entanto, a resposta foi **{{correct}}**, que {{correctDesc}}.',
    tip: '\n\n*Tente ouvir novamente a diferença entre **{{user}}** e **{{correct}}** na reprodução.*',
    defaultCorrect: 'é a resposta correta',
    defaultIncorrect: 'está incorreto aqui',
  },
  levelTitles: {
    '1': 'Nível 1: Maior Diatônico',
    '2': 'Nível 2: Menor Natural',
    '3': 'Nível 3: A Dominante 7',
    '4': 'Nível 4: Rock & Mixolídio',
    '5': 'Nível 5: Empréstimo Modal',
    '6': 'Nível 6: Dominantes Secundários (7ths)',
    '7': 'Nível 7: Os Beatles e o Quatro Menor',
    '8': 'Nível 8: Psicodelia e Cromatismo',
    '9': 'Nível 9: Jazz e Substituição de Trítono (Tétrades)',
    '10': 'Nível 10: O Modo Dórico (Coltrane)',
    '11': 'Nível 11: Royal Road (Tétrades J-Pop)',
    '12': 'Nível 12: City Pop e Slash Chords',
  },
  levelDescs: {
    '1': 'Aprenda os blocos fundamentais da música pop e clássica usando a escala Maior.',
    '2': 'Explore os sons mais sombrios e emocionais da escala Menor.',
    '3': 'Introduzindo tensão com o acorde V7.',
    '4': 'Domine o som clássico do rock com o acorde bVII (Bemol 7).',
    '5': 'Acordes emprestados da escala menor (bIII, bVI) para progressões épicas.',
    '6': 'Harmonia avançada usando acordes de 7ª (II7, III7, VI7) para criar fortes atrações para outras tonalidades.',
    '7': 'O som sentimental do Quatro Menor (iv) encontrado em baladas clássicas.',
    '8': 'Acordes aumentados e dominantes instáveis (I+, I7) para cores psicodélicas.',
    '9': 'Harmonia de Jazz sofisticada usando acordes de 7ª (tétrades) e a Substituição de Trítono.',
    '10': "O som modal de 'My Favorite Things' de John Coltrane.",
    '11': "A 'Oudou Shinkou' (IVM7-V7-iii7-vi7), a progressão dourada do J-Pop usando ricas tétrades.",
    '12': "O estilo harmônico sofisticado de Tatsuro Yamashita, com Slash Chords e a progressão 'Just The Two Of Us'.",
  },
  chordDescriptions: {
    MAJOR: {
      I: "é o acorde 'Casa', sentindo-se estável, resolvido e fundamentado",
      ii: 'é um acorde menor que parece melancólico, agindo como uma ponte para a dominante',
      iii: 'é um acorde menor com um som agridoce e de transição',
      IV: 'é um acorde maior que parece brilhante, aberto e eleva a energia para longe de casa',
      V: 'é a Dominante, criando forte tensão que exige um retorno à tônica',
      V7: 'adiciona tensão distinta ao acorde V, puxando urgentemente para casa',
      vi: "é um acorde menor que parece emocional e muitas vezes atua como uma resolução 'enganosa'",
      'vii°': 'é um acorde diminuto que soa instável, dissonante e puxa fortemente para I',
    },
    MINOR: {
      i: "é o acorde 'Casa', sentindo-se estável, mas sério ou triste",
      'ii°':
        'é um acorde diminuto adicionando tensão sombria, muitas vezes preparando para a dominante',
      III: 'é o Relativo Maior, oferecendo um momento de brilho e alívio',
      iv: 'é um acorde menor que parece triste, pesado e emocional',
      v: 'é a dominante menor, parecendo temperamental e mais suave que o V maior',
      V: 'é a dominante maior, proporcionando um forte puxão harmônico de volta à raiz menor',
      VI: "é um acorde maior que parece épico, heróico ou como uma surpresa 'enganosa'",
      VII: 'é um acorde maior que parece ousado, muitas vezes usado em hinos de rock',
      'vii°': 'é um acorde diminuto que é muito instável',
    },
    MIXOLYDIAN: {
      I: "é o acorde 'Casa'",
      IV: 'é a subdominante',
      V: 'é a dominante',
      bVII: "é o acorde 'Rock' (Bemol 7), parecendo rebelde e bluesy, resolvendo em I",
      vi: 'é o relativo menor',
    },
    MODAL_INTERCHANGE: {
      I: 'é o início',
      IV: 'é a subdominante',
      V: 'é a dominante',
      bIII: "é um acorde maior emprestado que soa 'durão' ou 'bluesy'",
      bVI: "é o acorde 'Épico' emprestado do menor, soando grandioso e mágico",
      bVII: 'é o Bemol 7 emprestado, comum no rock',
    },
    SECONDARY_DOMINANT: {
      I: 'é o início',
      IV: 'é subdominante',
      V: 'é dominante',
      II7: 'é um II Dominante (V7/V), puxando fortemente para V',
      III7: 'é um III Dominante (V7/vi), criando um forte puxão para o relativo menor',
      VI7: 'é um VI Dominante (V7/ii), criando uma virada brilhante para o acorde ii',
    },
    MINOR_PLAGAL: {
      I: 'é o início',
      IV: 'é a subdominante brilhante',
      iv: 'é o Quatro Menor, criando um colapso sentimental e nostálgico de volta para casa',
      V: 'é a dominante',
      vi: 'é o relativo menor',
    },
    CHROMATIC: {
      I: 'é o início',
      V: 'é a dominante',
      vi: 'é o relativo menor',
      'I+': 'é o I Aumentado, soando onírico, flutuante e instável',
      I7: 'é o I Dominante, adicionando uma tensão bluesy que puxa para IV',
    },
    TRITONE_SUB: {
      IM7: 'é a tônica Maior 7, soando exuberante e jazzy',
      ii7: 'é o ii menor 7, a preparação padrão do jazz',
      V7: 'é a dominante padrão',
      bII7: 'é a Substituição de Trítono, uma dominante cromática picante que desliza para I',
      vi7: 'é o relativo menor 7',
    },
    DORIAN: {
      i: 'é a tônica menor',
      IV: "é o IV Maior, o som 'Dórico' característico (mais brilhante que o iv menor)",
      ii: 'é o ii menor (diferente do ii° diminuto no menor natural)',
      bVII: 'é o acorde maior subtônico',
      III: 'é o relativo maior',
    },
    OUDOU: {
      IVM7: 'é a subdominante Maior 7, soando emocional e sofisticada',
      V7: 'é a dominante 7, construindo tensão',
      iii7: 'é a mediante menor 7, proporcionando profunda nostalgia (Setsunai)',
      vi7: 'é o relativo menor 7',
      IM7: 'é a tônica Maior 7',
    },
    CITY_POP: {
      IM7: "é a tônica Maior 7 estável, frequentemente usada para 'vamping'",
      IVM7: 'é a subdominante Maior 7 exuberante, muitas vezes o acorde inicial no City Pop',
      III7: 'é uma Dominante 7 que puxa fortemente para vi7, criando tensão emocional',
      vi7: 'é a menor 7, muitas vezes seguindo III7',
      Gm7: 'é o v menor, normalmente aparecendo antes de C7 para criar uma modulação suave',
      'IV/V':
        "é a Dominante 'Slash Chord' (F/G), um som característico de Tatsuro que parece urbano e flutuante",
    },
  },
  lessons: {
    '1': `
## Nível 1: A Base da Escala Maior

**Conceito**
Você está ouvindo acordes da **Escala Maior**. Na teoria musical, usamos algarismos romanos para nomear acordes com base em sua posição.
- **Maiúsculas (I, IV, V)** = Acordes Maiores (Feliz, Brilhante)
- **Minúsculas (ii, iii, vi)** = Acordes Menores (Triste, Sério)

**Os Acordes**
*   **I (Um)**: O acorde "Casa". Parece finalizado.
*   **IV (Quatro)**: A "Subdominante". Parece uma jornada.
*   **V (Cinco)**: A "Dominante". Parece tenso e quer voltar para I.
*   **vi (Seis)**: O "Relativo Menor". É triste, mas compatível com I.

**Dica de Audição**
Ouça o movimento **V → I**. Soa como "O Fim" de uma frase.

**Exemplos de Músicas**
1. **Let It Be** - The Beatles
2. **Stand By Me** - Ben E. King
3. **I'm Yours** - Jason Mraz
`,
    '2': `
## Nível 2: A Escala Menor Natural

**Conceito**
Bem-vindo à **Escala Menor Natural**. As músicas aqui muitas vezes soam mais tristes, mais sérias, ou podem evocar um sentimento "épico". O acorde "Casa" agora é menor (**i**).

**Os Acordes**
*   **i (Um)**: A nova Casa. Sério e estável.
*   **III (Três)**: O "Relativo Maior". Uma explosão de luz e esperança na paisagem menor.
*   **iv (Quatro)**: Profundamente triste e emocional.
*   **v (Cinco menor)**: A dominante menor. Tem uma atração ligeiramente mais suave e introspectiva de volta para 'i' em comparação com um 'V' maior.
*   **VI (Seis)**: Um acorde maior que pode parecer heroico, grandioso, ou como uma surpresa "enganosa".
*   **VII (Sete)**: Um acorde maior forte, frequentemente usado na música rock devido ao seu som audacioso.

**Dica de Audição**
Ouça a qualidade do acorde 'v' (menor) em comparação com o que seria um acorde 'V' (maior). O 'v' menor cria uma resolução menos urgente e mais sutil de volta para 'i'.

**Exemplos de Músicas**
1. **Stairway to Heaven** - Led Zeppelin (as seções do verso frequentemente usam harmonia menor natural)
2. **The Sound of Silence** - Simon & Garfunkel (progressões menores de estilo folk)
3. **Black Sabbath** - Black Sabbath (o metal antigo frequentemente usa menor natural)
`,
    '3': `
## Nível 3: A Dominante 7 (V7)

**Conceito**
Estamos de volta em Maior, mas adicionando um sabor específico: a **Dominante 7 (V7)**.

**O Acorde V7**
O **V7** é o acorde de tensão definitiva. Contém um intervalo de "trítono" que soa ligeiramente dissonante e *implora* para resolver no acorde **I**.

**Comparação**
*   **V (Normal)**: Tenso, mas limpo.
*   **V7 (7th)**: Tenso, com um toque de blues, e urgente.

**Dica de Audição**
Ouça um "twang" ou um som "bluesy" no acorde V. Essa é a 7ª nota!

**Exemplos de Músicas**
1. **La Bamba** - Ritchie Valens
2. **Twist and Shout** - The Beatles
3. **Brown Eyed Girl** - Van Morrison
`,
    '4': `
## Nível 4: Rock & O Modo Mixolídio

**Conceito**
No rock clássico (pense em AC/DC, Guns N' Roses), muitas vezes não usamos a escala maior "correta". Usamos o **Modo Mixolídio**. A diferença chave é o acorde **bVII (Bemol Sete)**.

**O Acorde bVII**
Em uma tonalidade Maior padrão (Dó), o 7º acorde é um acorde diminuto estranho. Músicos de rock odeiam isso. Eles o substituem por um poderoso acorde Maior (Si bemol na tonalidade de Dó).

**Perfil Sonoro**
*   **bVII → I**: Esta é a "Resolução Backdoor". Soa rebelde, legal e definitiva.

**Dica de Audição**
Se você ouvir um acorde maior que soa mais grave que a raiz, mas resolve poderosamente para ela, é o **bVII**.

**Exemplos de Músicas**
1. **Sympathy for the Devil** - The Rolling Stones
2. **Sweet Home Alabama** - Lynyrd Skynyrd
3. **Royals** - Lorde
`,
    '5': `
## Nível 5: Empréstimo Modal (Acordes Emprestados)

**Conceito**
Só porque você está em uma tonalidade Maior não significa que não pode usar acordes da tonalidade Menor! Isso é chamado de **Empréstimo Modal**.

**Os Acordes Emprestados**
*   **bVI (Bemol Seis)**: Emprestado do menor. Soa "mágico", "épico" ou "onírico". Usado muito em trilhas sonoras e rock dos anos 90.
*   **bIII (Bemol Três)**: Um acorde maior durão e bluesy.

**Dica de Audição**
Ouça acordes que soam "surpreendentes" ou mais sombrios do que o esperado, mas que ainda são acordes Maiores. O **bVI** muitas vezes resolve para **V** ou **I**.

**Exemplos de Músicas**
1. **Lady Madonna** - The Beatles
2. **Crazy Train** - Ozzy Osbourne
3. **Lithium** - Nirvana
`,
    '6': `
## Nível 6: Dominantes Secundários (7ths)

**Conceito**
Às vezes, pegamos um acorde menor (como ii, iii ou vi) e o *forçamos* a ser um **Dominante 7**. Por quê? Para fazê-lo puxar fortemente para outro acorde. Este nível usa acordes de 4 notas.

**Os Acordes**
*   **III7 (Três Dominante)**: Normalmente menor (iii). Torná-lo Dominante faz com que ele puxe para **vi**. (Pense em Radiohead ou Beatles).
*   **II7 (Dois Dominante)**: Normalmente menor (ii). Torná-lo Dominante cria um som brilhante que puxa para **V**.
*   **VI7 (Seis Dominante)**: Normalmente menor (vi). Torná-lo Dominante puxa para **ii**.

**Dica de Audição**
Se você ouvir um acorde que soa como se "iluminasse" inesperadamente e tem uma ponta bluesy de 7ª, provavelmente é um Dominante Secundário.

**Exemplos de Músicas**
1. **Creep** - Radiohead (Usa III7)
2. **Yesterday** - The Beatles (Usa VI7)
3. **Don't Look Back in Anger** - Oasis (Usa III7)
`,
    '7': `
## Nível 7: Os Beatles e o Quatro Menor

**Conceito**
Os Beatles e outros compositores pop românticos adoravam usar o acorde **Quatro Menor (iv)** em uma tonalidade maior. Este é um tipo de "Empréstimo Modal" que é tão específico e sentimental que merece seu próprio nível.

**A Sequência**
O movimento clássico é **IV → iv → I**.
*   **IV**: Brilhante, feliz.
*   **iv**: De repente triste, nostálgico, "de partir o coração".
*   **I**: Resolução com um suspiro de alívio.

**Exemplos**
*   "In My Life" (Os Beatles)
*   "Creep" (Radiohead)

**Dica de Audição**
Ouça um acorde que parece uma "nuvem escura" passando sobre um dia ensolarado, seguido imediatamente por uma resolução para casa.

**Exemplos de Músicas**
1. **In My Life** - The Beatles
2. **Wake Me Up When September Ends** - Green Day
3. **Desperado** - Eagles
`,
    '8': `
## Nível 8: Psicodelia e Cromatismo

**Conceito**
Em seus últimos anos, os Beatles exploraram sons mais estranhos usando acordes **Aumentados** e **Dominantes** na tônica.

**Os Acordes**
*   **I+ (Aumentado)**: Uma tríada com uma 5ª sustenida. Soa "flutuante", "onírico" ou "instável". Muitas vezes leva a IV ou vi. ("All My Loving").
*   **I7 (Tônica Dominante)**: Fazer o acorde de casa um dominante 7 faz com que soe bluesy e inquieto, exigiendo um movimento para **IV**. ("Taxman").

**Dica de Audição**
*   **I+**: Soa como "espaço sideral" ou uma sequência de sonhos.
*   **I7**: Soa como tensão de blues/rock and roll no acorde de casa.

**Exemplos de Músicas**
1. **Oh! Darling** - The Beatles (I Aumentado)
2. **(Just Like) Starting Over** - John Lennon (I Aumentado)
3. **I Saw Her Standing There** - The Beatles (I Dominante)
`,
    '9': `
## Nível 9: Harmonia de Jazz e Substituição de Trítono

**Conceito**
No Jazz, os acordes são quase sempre **Acordes de 7ª (Tétrades)**. As tríades padrão (I, ii, vi) tornam-se acordes mais ricos de 4 notas (IM7, ii7, vi7).
Este nível também apresenta a **Substituição de Trítono**.

**O Substituto**
Em vez de tocar o acorde V7 padrão (G7), músicos de jazz frequentemente tocam um acorde dominante exatamente a um "trítono" de distância (Db7). Isso é chamado de **bII7** (Bemol Dois Sete).
Porque esses dois acordes compartilham o mesmo intervalo "trítono" crítico, eles servem a mesma função harmônica, mas com um movimento de baixo cromático mais descolado.

**O Som**
*   **V7 → IM7**: Soa tradicional e perfeito.
*   **bII7 → IM7**: Soa sofisticado, suave e "jazzy". O baixo desliza um semitom para baixo (Db -> C).

**Dica de Audição**
Ouça a linha de baixo. Se os acordes parecem "deslizar" cromaticamente para o acorde de casa, é provável que seja um Substituto de Trítono.

**Exemplos de Músicas**
1. **The Girl from Ipanema** - Antonio Carlos Jobim
2. **Satin Doll** - Duke Ellington
3. **The Simpsons Theme** (Cadência Final)
`,
    '10': `
## Nível 10: O Modo Dórico (Estilo Coltrane)

**Conceito**
Inspirado na versão de John Coltrane de *"My Favorite Things"*, este nível foca no **Modo Dórico**.
O modo Dórico é uma escala menor, mas com uma 6ª nota elevada (Maior). Isso remove a tristeza da escala menor e a substitui por um som mais brilhante, "místico" ou "medieval".

**O Vamp Característico**
O som Dórico clássico vem da oscilação entre o **i** (menor) e o **IV** (Maior). Em uma tonalidade menor padrão, o IV é menor. No Dórico, é Maior.

**Os Acordes**
*   **i (Um Menor)**: O acorde de casa.
*   **IV (Quatro Maior)**: O acorde "Dórico". Mais brilhante do que o esperado em uma tonalidade menor.
*   **ii (Dois Menor)**: Diferente do menor padrão (onde ii é diminuto), no Dórico, o ii é um acorde menor agradável e estável.

**Dica de Audição**
Se a música é menor, mas você ouve um acorde Maior brilhante que não é o relativo maior (III) ou a dominante (V), é provável que seja o acorde **IV** do modo Dórico.

**Exemplos de Músicas**
1. **My Favorite Things** - John Coltrane
2. **Breathe** - Pink Floyd
3. **Oye Como Va** - Santana
`,
    '11': `
## Nível 11: Royal Road (J-Pop Oudou Shinkou)

**Conceito**
Bem-vindo ao **Royal Road (王道進行)**, a progressão de acordes mais popular no J-Pop e música de Anime.
No J-Pop, é padrão usar **acordes de 4 notas (Tétrades)** para um som mais rico e emocional.
A sequência clássica é **IVM7 → V7 → iii7 → vi7** (ex., Fmaj7 → G7 → Em7 → Am7).

**A Narrativa**
Esta progressão conta uma história emocional específica:
1.  **IVM7 (Subdominante)**: Começa com esperança e sofisticação.
2.  **V7 (Dominante)**: Constrói tensão e drama.
3.  **iii7 (Mediante)**: Pousa no *iii menor*. Isso cria um sentimento de **Nostalgia (Setsunai)** ou "saudade agridoce".
4.  **vi7 (Relativo Menor)**: Resolve em tristeza ou seriedade.

**Dica de Audição**
Ouça uma progressão que sobe, mas depois toma um rumo triste e nostálgico (iii7) no meio em vez de resolver felizmente em I.

**Exemplos de Músicas**
1. **Pretender** - Official Hige Dandism
2. **Robinson** - Spitz
3. **Hanabi** - Mr.Children
`,
    '12': `
## Nível 12: City Pop e Slash Chords

**Conceito**
Dedicado ao **"Rei do City Pop"**, Tatsuro Yamashita. Este estilo baseia-se em acordes de 7ª exuberantes e ambiguidade harmônica sofisticada.
O som característico é o **Slash Chord Dominante (IV/V)** (por exemplo, F/G na tonalidade de Dó). Ele cria um som dominante flutuante e "urbano" que evita a dureza de um V7 padrão.

**A Progressão "Just The Two Of Us"**
O City Pop utiliza fortemente variações desta progressão: **IVM7 → III7 → vi7 → Gm7 → C7**.
Apresenta um dominante secundário forte (III7) e um "ii-V secundário" (Gm7-C7) que te puxa de volta ao acorde IV.

**Os Acordes**
*   **IV/V (F/G)**: Uma tríada Maior sobre um baixo V. Soa como um acorde sofisticado de 11ª.
*   **Gm7 (v menor)**: Usado para preparar uma modulação ou voltar em círculo para IVM7.
*   **IVM7**: A estrela do City Pop. Muitas vezes o acorde inicial da música.

**Dica de Audição**
Ouça um som suave e brilhante onde a nota do baixo permanece em V enquanto os acordes acima mudam, ou progressões que fazem loops sem pousar em I.

**Exemplos de Músicas**
1. **Sparkle** - Tatsuro Yamashita
2. **Ride on Time** - Tatsuro Yamashita
3. **Plastic Love** - Mariya Takeuchi (Arr. Tatsuro Yamashita)
`,
  },
};
