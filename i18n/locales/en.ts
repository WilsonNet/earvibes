export const en = {
  common: {
    appName: 'EarVibes',
    offline: 'Offline Mode',
    exit: 'Exit',
    score: 'Score',
    back: 'Back',
    loading: 'Loading...',
    language: 'Language',
    selectLanguage: 'Select Language',
  },
  seo: {
    title: 'EarVibes - Chord Progression Ear Training',
    description:
      'Master chord progressions with EarVibes. Interactive ear training for musicians. Learn Jazz, Rock, Pop, and City Pop harmony.',
    keywords:
      'ear training, music theory, chord progressions, jazz harmony, city pop, perfect pitch, relative pitch, musician tools',
  },
  home: {
    selectDifficulty: 'Select Difficulty',
    startTraining: 'Start Training',
    levelLabel: 'LEVEL {{id}}',
    realSongsTitle: 'Real World Challenges',
    startChallenge: 'Start Challenge',
  },
  game: {
    playAudio: 'Play Audio',
    playing: 'Playing...',
    listenPrompt: 'Listen to the 4-chord progression',
    submit: 'Submit Progression',
    next: 'Next Progression →',
    analysis: 'Analysis',
    clickToCompare: 'Click chords above to compare sounds',
    analyzing: 'Analyzing...',
    undo: 'Undo',
    exitConfirm: 'Are you sure you want to exit?',
    toggleSynth: 'Toggle Synth Sound (Shortcut: T)',
    playCorrect: 'Click to hear the correct chord',
    synth: 'Synth',
  },
  instructions: {
    title: 'How to Play',
    step1: 'Listen to the chord progression played by the AI.',
    step2: 'Identify the chords by ear and select them in order.',
    step3: 'Submit your answer to see if you were correct.',
    shortcutsTitle: 'Keyboard Shortcuts',
    feedbackTitle: 'Understanding Feedback',
    feedbackDesc:
      'Green indicates correct answers. Red indicates mistakes. In feedback mode, you can click the revealed correct chords (below the slots) to compare them with your guess.',
  },
  theory: {
    title: 'Music Theory Lesson',
    startQuiz: 'Got it, Start Quiz!',
    generating: 'Generating...',
    notFound: 'Lesson Not Found',
    notFoundDesc: 'Select a valid level to continue.',
  },
  feedback: {
    perfect:
      '### Perfect! 🎉\n\nYou correctly identified the progression. Your ear is getting sharper!',
    close: '### Close, but watch out for chord #{{index}}',
    comparison:
      '\nYou chose **{{user}}**, which {{userDesc}}.\n\nHowever, the answer was **{{correct}}**, which {{correctDesc}}.',
    tip: '\n\n*Try listening again to the difference between **{{user}}** and **{{correct}}** in the playback.*',
    defaultCorrect: 'is the correct answer',
    defaultIncorrect: 'is incorrect here',
  },
  // Keys match the Level IDs
  levelTitles: {
    '1': 'Level 1: Major Diatonic',
    '2': 'Level 2: Natural Minor',
    '3': 'Level 3: The Dominant 7th',
    '4': 'Level 4: Rock & Mixolydian',
    '5': 'Level 5: Modal Interchange',
    '6': 'Level 6: Secondary Dominants (7ths)',
    '7': "Level 7: The Beatles' Minor IV",
    '8': 'Level 8: Psychedelic & Chromatic',
    '9': 'Level 9: Jazz Harmony (Tetrads)',
    '10': 'Level 10: The Dorian Mode',
    '11': 'Level 11: J-Pop Royal Road (Tetrads)',
    '12': 'Level 12: City Pop & Slash Chords',
  },
  levelDescs: {
    '1': 'Learn the fundamental building blocks of pop and classical music using the Major scale.',
    '2': 'Explore the darker, more emotional sounds of the Minor scale.',
    '3': 'Introducing tension with the V7 chord.',
    '4': 'Master the classic rock sound with the Flat VII chord.',
    '5': 'Borrowed chords from the minor scale (bIII, bVI) for epic progressions.',
    '6': 'Advanced harmony using 7th chords (II7, III7, VI7) to create strong pulls to other keys.',
    '7': 'The sentimental sound of the Minor Four (iv) found in classic Beatles ballads.',
    '8': 'Unstable augmented and dominant chords (I+, I7) for psychedelic color.',
    '9': 'Sophisticated Jazz harmony using 7th chords and the Tritone Substitution.',
    '10': "The modal sound of John Coltrane's 'My Favorite Things'.",
    '11': "The 'Oudou Shinkou' (IVM7-V7-iii7-vi7), the golden progression of J-Pop using lush 4-note chords.",
    '12': "The sophisticated harmonic style of Tatsuro Yamashita, featuring Slash Chords and the 'Just The Two Of Us' progression.",
  },
  // Keys match LevelType enum
  chordDescriptions: {
    MAJOR: {
      I: "is the 'Home' chord, feeling stable, resolved, and grounded",
      ii: 'is a minor chord that feels melancholic, acting as a bridge to the dominant',
      iii: 'is a minor chord with a bittersweet, transitional sound',
      IV: 'is a major chord that feels bright, open, and lifts the energy away from home',
      V: 'is the Dominant, creating strong tension that demands a return to the tonic',
      V7: 'adds distinct tension to the V chord, urgently pulling towards home',
      vi: "is a minor chord that feels emotional and often acts as a 'deceptive' resolution",
      'vii°': 'is a diminished chord that sounds unstable, dissonant, and pulls strongly to I',
    },
    MINOR: {
      i: "is the 'Home' chord, feeling stable but serious or sad",
      'ii°': 'is a diminished chord adding dark tension, often preparing for the dominant',
      III: 'is the Relative Major, offering a moment of brightness and relief',
      iv: 'is a minor chord that feels sorrowful, heavy, and emotional',
      v: 'is the minor dominant, feeling moody and softer than the major V',
      V: 'is the major dominant, providing a strong harmonic pull back to the minor root',
      VI: "is a major chord that feels epic, heroic, or like a 'deceptive' surprise",
      VII: 'is a major chord that feels bold, often used in rock anthems',
      'vii°': 'is a diminished chord that is very unstable',
    },
    MIXOLYDIAN: {
      I: "is the 'Home' chord",
      IV: 'is the subdominant',
      V: 'is the dominant',
      bVII: "is the 'Rock' chord (Flat 7), feeling rebellious and bluesy, resolving to I via the 'backdoor'",
      vi: 'is the relative minor',
    },
    MODAL_INTERCHANGE: {
      I: 'is home',
      IV: 'is the subdominant',
      V: 'is the dominant',
      bIII: "is a borrowed major chord that sounds 'tough' or 'bluesy'",
      bVI: "is the 'Epic' chord borrowed from minor, sounding grand and magical",
      bVII: 'is the borrowed Flat 7, common in rock',
    },
    SECONDARY_DOMINANT: {
      I: 'is home',
      IV: 'is subdominant',
      V: 'is dominant',
      II7: 'is a Dominant II (V7/V), strongly pushing towards V',
      III7: 'is a Dominant III (V7/vi), creating a powerful pull towards the relative minor',
      VI7: 'is a Dominant VI (V7/ii), creating a bright, bluesy turn towards the ii chord',
    },
    MINOR_PLAGAL: {
      I: 'is home',
      IV: 'is the bright subdominant',
      iv: 'is the Minor Four, creating a sentimental, nostalgic collapse back to home',
      V: 'is dominant',
      vi: 'is relative minor',
    },
    CHROMATIC: {
      I: 'is home',
      V: 'is dominant',
      vi: 'is relative minor',
      'I+': 'is the Augmented I, sounding dreamy, floating, and unstable',
      I7: 'is the Dominant I, adding a bluesy tension that pulls towards IV',
    },
    TRITONE_SUB: {
      IM7: 'is the Major 7th tonic, sounding lush and jazzy',
      ii7: 'is the minor 7th ii, the standard jazz setup',
      V7: 'is the standard dominant',
      bII7: 'is the Tritone Substitution, a spicy chromatic dominant that slides down into I',
      vi7: 'is the relative minor 7th',
    },
    DORIAN: {
      i: 'is the minor tonic',
      IV: "is the Major IV, the signature 'Dorian' sound (brighter than minor iv)",
      ii: 'is the minor ii (unlike the diminished ii° in natural minor)',
      bVII: 'is the subtonic major chord',
      III: 'is relative major',
    },
    OUDOU: {
      IVM7: 'is the Major 7th subdominant, sounding emotional, sophisticated and hopeful',
      V7: 'is the dominant 7th, building tension',
      iii7: 'is the minor 7th mediant, providing deep nostalgia (Setsunai)',
      vi7: 'is the relative minor 7th',
      IM7: 'is the Major 7th tonic',
    },
    CITY_POP: {
      IM7: 'is the stable Major 7th tonic, often used for vamping',
      IVM7: 'is the lush Major 7th subdominant, often the starting chord in City Pop',
      III7: 'is a Dominant 7th that pulls strongly to vi7, creating emotional tension',
      vi7: 'is the minor 7th, often following III7',
      Gm7: 'is the minor v, typically appearing before C7 to create a smooth modulation',
      'IV/V':
        "is the 'Slash Chord' Dominant (F/G), a signature Tatsuro sound that feels urban and floating",
    },
  },
  lessons: {
    '1': `
## Level 1: The Major Scale Foundation

**Concept**
You are listening to chords from the **Major Scale**. In music theory, we use Roman Numerals to name chords based on their position in the scale.
- **Uppercase (I, IV, V)** = Major Chords (Happy, Bright)
- **Lowercase (ii, iii, vi)** = Minor Chords (Sad, Serious)

**The Chords**
*   **I (One)**: The "Home" chord. It feels finished.
*   **IV (Four)**: The "Subdominant". It feels like going on a journey.
*   **V (Five)**: The "Dominant". It feels tense and wants to go back to I.
*   **vi (Six)**: The "Relative Minor". It's sad but compatible with I.

**Listening Tip**
Listen for the **V → I** movement. It sounds like "The End" of a sentence.

**Song Examples**
1. **Let It Be** - The Beatles
2. **Stand By Me** - Ben E. King
3. **I'm Yours** - Jason Mraz
`,
    '2': `
## Level 2: The Natural Minor Scale

**Concept**
Welcome to the **Natural Minor Scale**. Songs here often sound sadder, more serious, or can evoke an "epic" feeling. The "Home" chord is now minor (**i**).

**The Chords**
*   **i (One)**: The new Home. Serious and stable.
*   **III (Three)**: The "Relative Major". A burst of light and hope in the minor landscape.
*   **iv (Four)**: Deeply sad and emotional.
*   **v (Five minor)**: The minor dominant. It has a slightly softer, more introspective pull back to 'i' compared to a major 'V'.
*   **VI (Six)**: A major chord that can feel heroic, grand, or like a "deceptive" surprise.
*   **VII (Seven)**: A strong major chord, often used in rock music due to its bold sound.

**Listening Tip**
Listen for the quality of the 'v' chord (minor) versus what would be a 'V' chord (major). The minor 'v' creates a less urgent, more subtle resolution back to 'i'.

**Song Examples**
1. **Stairway to Heaven** - Led Zeppelin (verse sections often use natural minor harmony)
2. **The Sound of Silence** - Simon & Garfunkel (folk-style minor progressions)
3. **Black Sabbath** - Black Sabbath (early metal often uses natural minor)
`,
    '3': `
## Level 3: The Dominant 7th (V7)

**Concept**
We are back in Major, but adding a specific flavor: the **Dominant 7th (V7)**. This is a 4-note chord.

**The V7 Chord**
The **V7** is the ultimate tension chord. It contains a "tritone" interval that sounds slightly dissonant (clashing) and *begs* to resolve to the **I** chord.

**Comparison**
*   **V (Normal)**: Tense, but clean.
*   **V7 (7th)**: Tense, bluesy, and urgent.

**Listening Tip**
Listen for a "twang" or a "bluesy" rub in the V chord. That's the 7th note!

**Song Examples**
1. **La Bamba** - Ritchie Valens
2. **Twist and Shout** - The Beatles
3. **Brown Eyed Girl** - Van Morrison
`,
    '4': `
## Level 4: Rock & The Mixolydian Mode

**Concept**
In classic rock (think AC/DC, Guns N' Roses, Led Zeppelin), we often don't use the "correct" major scale. Instead, we use the **Mixolydian Mode**. The key difference is the **bVII (Flat Seven)** chord.

**The bVII Chord**
In a standard Major key (C), the 7th chord is a weird diminished chord (vii°). Rock musicians hate that. They replace it with a powerful Major chord built on the flat 7th note (Bb in the key of C).

**Sound Profile**
*   **bVII → I**: This is the "Backdoor Resolution". It sounds rebellious, cool, and definitive, but less "classical" than V → I.

**Listening Tip**
If you hear a major chord that sounds lower than the root but resolves powerfully to it (like the end of "Sweet Home Alabama"), it's the **bVII**.

**Song Examples**
1. **Sympathy for the Devil** - The Rolling Stones
2. **Sweet Home Alabama** - Lynyrd Skynyrd
3. **Royals** - Lorde
`,
    '5': `
## Level 5: Modal Interchange (Borrowed Chords)

**Concept**
Just because you are in a Major key doesn't mean you can't use chords from the Minor key! This is called **Modal Interchange**.

**The Borrowed Chords**
*   **bVI (Flat Six)**: Borrowed from minor. It sounds "magical", "epic", or "dreamy". Used heavily in film scores and 90s rock.
*   **bIII (Flat Three)**: A tough, bluesy major chord.

**Listening Tip**
Listen for chords that sound "surprising" or darker than expected, but are still Major chords. The **bVI** often resolves to **V** or **I** and sounds very dramatic.

**Song Examples**
1. **Lady Madonna** - The Beatles
2. **Crazy Train** - Ozzy Osbourne
3. **Lithium** - Nirvana
`,
    '6': `
## Level 6: Secondary Dominants (7ths)

**Concept**
Sometimes, we take a minor chord (like ii, iii, or vi) and *force* it to be a **Dominant 7th** chord. Why? To make it pull strongly to another chord. This level uses 4-note dominant chords.

**The Chords**
*   **III7 (Dominant Three)**: Usually minor (iii). Making it a Dominant 7th makes it pull strongly to **vi**. (Think Radiohead or the Beatles).
*   **II7 (Dominant Two)**: Usually minor (ii). Making it a Dominant 7th creates a bright, "lifting" sound that pulls to **V**.
*   **VI7 (Dominant Six)**: Usually minor (vi). Making it a Dominant 7th pulls to **ii**.

**Listening Tip**
If you hear a chord that sounds like it "brightened up" unexpectedly and has a bluesy 7th edge, it's likely a Secondary Dominant.

**Song Examples**
1. **Creep** - Radiohead (Uses III7)
2. **Yesterday** - The Beatles (Uses VI7)
3. **Don't Look Back in Anger** - Oasis (Uses III7)
`,
    '7': `
## Level 7: The Beatles & The Minor Four

**Concept**
The Beatles and other romantic pop composers loved to use the **Minor Four (iv)** chord in a Major key. This is a type of "Modal Interchange" that is so specific and sentimental it deserves its own level.

**The Sequence**
The classic move is **IV → iv → I**.
*   **IV**: Bright, happy.
*   **iv**: Suddenly sad, nostalgic, "heartbreaking".
*   **I**: Resolution with a sigh of relief.

**Examples**
*   "In My Life" (The Beatles)
*   "Wake Me Up When September Ends" (Green Day)
*   "Creep" (Radiohead)

**Listening Tip**
Listen for a chord that feels like a "dark cloud" passing over a sunny day, followed immediately by a resolution to home.

**Song Examples**
1. **In My Life** - The Beatles
2. **Wake Me Up When September Ends** - Green Day
3. **Desperado** - Eagles
`,
    '8': `
## Level 8: Psychedelic & Chromatic

**Concept**
In their later years, The Beatles explored stranger sounds using **Augmented** chords and **Dominant 7ths** on the tonic.

**The Chords**
*   **I+ (Augmented)**: A triad with a sharp 5th. It sounds "floating", "dreamy", or "unstable". It often leads to IV or vi. ("All My Loving", "Oh! Darling").
*   **I7 (Dominant Tonic)**: Making the home chord a dominant 7th makes it sound bluesy and restless, demanding a move to **IV**. ("Taxman", "I Saw Her Standing There").

**Listening Tip**
*   **I+**: Sounds like "outer space" or a dream sequence.
*   **I7**: Sounds like blues/rock and roll tension on the home chord.

**Song Examples**
1. **Oh! Darling** - The Beatles (Augmented I)
2. **(Just Like) Starting Over** - John Lennon (Augmented I)
3. **I Saw Her Standing There** - The Beatles (Dominant I)
`,
    '9': `
## Level 9: Jazz Harmony & Tritone Substitution

**Concept**
In Jazz, chords are almost always **7th chords (Tetrads)**. The standard triads (I, ii, vi) become richer 4-note chords (IM7, ii7, vi7).
This level also introduces the **Tritone Substitution**.

**The Substitute**
Instead of playing the standard V7 chord (G7), jazz musicians often play a dominant chord exactly a "tritone" away (Db7). This is called the **bII7** (Flat Two Seven).
Because these two chords share the same critical "tritone" interval, they serve the same harmonic function but with a cool, chromatic bass movement.

**The Sound**
*   **V7 → IM7**: Sounds traditional and perfect.
*   **bII7 → IM7**: Sounds sophisticated, smooth, and "jazzy". The bass slides down one half-step (Db -> C).

**Listening Tip**
Listen for the bass line. If the chords seem to "slide" down chromatically into the home chord, it's likely a Tritone Sub.

**Song Examples**
1. **The Girl from Ipanema** - Antonio Carlos Jobim
2. **Satin Doll** - Duke Ellington
3. **The Simpsons Theme** (Ending Cadence)
`,
    '10': `
## Level 10: The Dorian Mode (Coltrane Style)

**Concept**
Inspired by John Coltrane's version of *"My Favorite Things"*, this level focuses on the **Dorian Mode**.
The Dorian mode is a Minor scale, but with a raised (Major) 6th note. This removes the sadness of the minor scale and replaces it with a brighter, "mystical" or "medieval" sound.

**The Signature Vamp**
The classic Dorian sound comes from oscillating between the **i** (minor) and the **IV** (Major). In a standard minor key, the IV is minor. In Dorian, it is Major.

**The Chords**
*   **i (Minor One)**: The home chord.
*   **IV (Major Four)**: The "Dorian" chord. Brighter than expected in a minor key.
*   **ii (Minor Two)**: Unlike standard minor (where ii is diminished), in Dorian, the ii is a nice, stable minor chord.

**Listening Tip**
If the song is minor, but you hear a bright Major chord that isn't the relative major (III) or the dominant (V), it is likely the **IV** chord of the Dorian mode.

**Song Examples**
1. **My Favorite Things** - John Coltrane
2. **Breathe** - Pink Floyd
3. **Oye Como Va** - Santana
`,
    '11': `
## Level 11: J-Pop Royal Road (Oudou Shinkou)

**Concept**
Welcome to the **Royal Road (王道進行)**, the most popular chord progression in Japanese Pop and Anime music.
In J-Pop, it is standard to use **4-note chords (Tetrads)** for a richer, more emotional sound.
The classic sequence is **IVM7 → V7 → iii7 → vi7** (e.g., Fmaj7 → G7 → Em7 → Am7).

**The Narrative**
This progression tells a specific emotional story:
1.  **IVM7 (Subdominant)**: Starts with hope and sophistication.
2.  **V7 (Dominant)**: Builds tension and drama.
3.  **iii7 (Mediant)**: Lands on the *minor iii*. This creates a feeling of **Nostalgia (Setsunai)** or "bittersweet longing".
4.  **vi7 (Relative Minor)**: Resolves into sadness or seriousness.

**Listening Tip**
Listen for a progression that climbs up but takes a sad, nostalgic turn (iii7) in the middle instead of resolving happily to I.

**Song Examples**
1. **Pretender** - Official Hige Dandism
2. **Robinson** - Spitz
3. **Hanabi** - Mr.Children
`,
    '12': `
## Level 12: City Pop & Slash Chords

**Concept**
Dedicated to the **"King of City Pop"**, Tatsuro Yamashita. This style relies on lush 7th chords and sophisticated harmonic ambiguity.
The signature sound is the **Slash Chord Dominant (IV/V)** (e.g., F/G in the key of C). It creates a floating, "urban" dominant sound that avoids the harshness of a standard V7.

**The "Just The Two Of Us" Progression**
City Pop heavily utilizes variations of this progression: **IVM7 → III7 → vi7 → Gm7 → C7**.
It features a strong secondary dominant (III7) and a "secondary ii-V" (Gm7-C7) that pulls you back to the IV chord.

**The Chords**
*   **IV/V (F/G)**: A Major triad over a V bass. It sounds like a sophisticated 11th chord.
*   **Gm7 (Minor v)**: Used to set up a modulation or circle back to IVM7.
*   **IVM7**: The star of City Pop. Often the starting chord of the song.

**Listening Tip**
Listen for a smooth, glossy sound where the bass note stays on V while the chords above it change, or progressions that loop endlessly without landing on I.

**Song Examples**
1. **Sparkle** - Tatsuro Yamashita
2. **Ride on Time** - Tatsuro Yamashita
3. **Plastic Love** - Mariya Takeuchi (Arr. Tatsuro Yamashita)
`,
  },
} as const;
