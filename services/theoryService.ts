import { match } from 'ts-pattern';
import { type Chord, LevelType, type Progression } from '../types';

// All 12 chromatic notes for transposition
const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

// O(1) lookup maps for chromatic notes
const CHROMATIC_NOTES_MAP = new Map<string, number>();
CHROMATIC_NOTES.forEach((note, index) => {
  CHROMATIC_NOTES_MAP.set(note, index);
});

const MAJOR_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
const MINOR_KEYS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'] as const;

// O(1) lookup maps for major and minor keys
const MAJOR_KEYS_MAP = new Map<string, number>();
MAJOR_KEYS.forEach((key, index) => {
  MAJOR_KEYS_MAP.set(key, index);
});

const MINOR_KEYS_MAP = new Map<string, number>();
MINOR_KEYS.forEach((key, index) => {
  MINOR_KEYS_MAP.set(key, index);
});

type Note = (typeof CHROMATIC_NOTES)[number];
type Key = (typeof MAJOR_KEYS)[number] | (typeof MINOR_KEYS)[number];

// Base chord intervals (semitones from root)
const CHORD_INTERVALS = {
  // Triads
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  // Sevenths
  dominant7: [0, 4, 7, 10],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
  // Suspended
  sus4: [0, 5, 7],
  sus2: [0, 2, 7],
} as const;

// Roman numeral to chord type mapping
const ROMAN_TO_CHORD_TYPE: Record<string, keyof typeof CHORD_INTERVALS> = {
  // Major key diatonic
  I: 'major',
  ii: 'minor',
  iii: 'minor',
  IV: 'major',
  V: 'major',
  vi: 'minor',
  'vii°': 'diminished',
  // Minor key diatonic
  i: 'minor',
  'ii°': 'diminished',
  III: 'major',
  iv: 'minor',
  v: 'minor',
  VI: 'major',
  VII: 'major',
  // Extended chords
  V7: 'dominant7',
  IM7: 'major7',
  IVM7: 'major7',
  ii7: 'minor7',
  iii7: 'minor7',
  vi7: 'minor7',
  bII7: 'dominant7',
  II7: 'dominant7',
  III7: 'dominant7',
  VI7: 'dominant7',
  // Modal interchange
  bIII: 'major',
  bVI: 'major',
  bVII: 'major',
  // Special chords
  'I+': 'augmented',
  I7: 'dominant7',
  Gm7: 'minor7',
  'IV/V': 'sus4', // Special case for slash chord
};

// O(1) lookup for Roman numerals (defined once)
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;
const ROMAN_NUMERALS_MAP = new Map<string, number>();
ROMAN_NUMERALS.forEach((numeral, index) => {
  ROMAN_NUMERALS_MAP.set(numeral, index);
});

// Scale degree semitones for major and minor keys
const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11] as const;
const MINOR_SCALE_SEMITONES = [0, 2, 3, 5, 7, 8, 10] as const;

// Scale degree semitones for Roman numerals (for extended chords)
const ROMAN_SEMITONES = [0, 2, 4, 5, 7, 9, 11] as const;

// Transpose a note by semitones
const transposeNote = (note: string, semitones: number): string => {
  const noteName = note.slice(0, -1); // Remove octave
  const octaveStr = note.slice(-1);
  const octave = parseInt(octaveStr, 10);
  const noteIndex = CHROMATIC_NOTES_MAP.get(noteName as Note) ?? -1;

  if (noteIndex === -1 || Number.isNaN(octave)) return note;

  const newIndex = (noteIndex + semitones) % 12;
  const newOctave = octave + Math.floor((noteIndex + semitones) / 12);

  return `${CHROMATIC_NOTES[newIndex]}${newOctave}`;
};

// Generate chord notes for a given root note and chord type
const generateChordNotes = (
  rootNote: string,
  chordType: keyof typeof CHORD_INTERVALS,
  octave: number = 4
): string[] => {
  const intervals = CHORD_INTERVALS[chordType];
  return intervals.map((semitone) => {
    return transposeNote(`${rootNote}${octave}`, semitone);
  });
};

// Generate chord map for a specific key
const generateKeyMap = (key: Key, isMinor: boolean = false): Record<string, string[]> => {
  const keyIndex = isMinor
    ? (MINOR_KEYS_MAP.get(key as (typeof MINOR_KEYS)[number]) ?? -1)
    : (MAJOR_KEYS_MAP.get(key as (typeof MAJOR_KEYS)[number]) ?? -1);

  if (keyIndex === -1) return {};

  const rootNote = isMinor ? MINOR_KEYS[keyIndex] : MAJOR_KEYS[keyIndex];
  const map: Record<string, string[]> = {};

  // Generate diatonic chords based on scale degrees
  const scaleDegrees = isMinor
    ? (['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'] as const)
    : (['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'] as const);

  scaleDegrees.forEach((degree, index) => {
    const chordType = ROMAN_TO_CHORD_TYPE[degree];
    if (chordType) {
      const semitoneOffset = isMinor
        ? (MINOR_SCALE_SEMITONES[index] ?? 0)
        : (MAJOR_SCALE_SEMITONES[index] ?? 0);
      const degreeRoot = transposeNote(`${rootNote}4`, semitoneOffset);
      const rootNoteName = degreeRoot.slice(0, -1);
      const octaveStr = degreeRoot.slice(-1);
      const octave = parseInt(octaveStr, 10);
      if (!Number.isNaN(octave)) {
        map[degree] = generateChordNotes(rootNoteName, chordType, octave);
      }
    }
  });

  // Add extended chords
  const extendedChords = [
    'V7',
    'IM7',
    'IVM7',
    'ii7',
    'iii7',
    'vi7',
    'bII7',
    'II7',
    'III7',
    'VI7',
    'bIII',
    'bVI',
    'bVII',
    'iv',
    'I+',
    'I7',
  ];

  extendedChords.forEach((chordSymbol) => {
    const chordType = ROMAN_TO_CHORD_TYPE[chordSymbol];
    if (chordType) {
      let rootSemitone = 0;

      // Calculate root semitone based on Roman numeral
      if (chordSymbol.startsWith('b')) {
        const roman = chordSymbol.slice(1);
        const romanIndex = ROMAN_NUMERALS_MAP.get(roman);
        if (romanIndex !== undefined) {
          const base = ROMAN_SEMITONES[romanIndex];
          if (base !== undefined) rootSemitone = base - 1;
        }
      } else if (chordSymbol.includes('7') && !chordSymbol.includes('b')) {
        const roman = chordSymbol.replace('7', '');
        const romanIndex = ROMAN_NUMERALS_MAP.get(roman);
        if (romanIndex !== undefined) {
          const base = ROMAN_SEMITONES[romanIndex];
          if (base !== undefined) rootSemitone = base;
        }
      } else if (chordSymbol === 'iv') {
        rootSemitone = 5; // IV in major
      } else if (chordSymbol === 'I+') {
        rootSemitone = 0; // I
      } else if (chordSymbol === 'I7') {
        rootSemitone = 0; // I
      }

      const degreeRoot = transposeNote(`${rootNote}4`, rootSemitone);
      const rootNoteName = degreeRoot.slice(0, -1);
      const octaveStr = degreeRoot.slice(-1);
      const octave = parseInt(octaveStr, 10);
      if (!Number.isNaN(octave)) {
        map[chordSymbol] = generateChordNotes(rootNoteName, chordType, octave);
      }
    }
  });

  // Special case for City Pop chords
  if (key === 'C') {
    map['Gm7'] = ['G3', 'Bb3', 'D4', 'F4']; // Lower octave for warmth
    map['IV/V'] = ['G3', 'F4', 'A4', 'C5']; // F/G slash chord (keeps slash notation)
  }

  return map;
};

// Helper function to select random key
const getRandomKey = (isMinor: boolean = false): Key => {
  const keys = isMinor ? MINOR_KEYS : MAJOR_KEYS;
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  // Fallback to first key if index is somehow out of range (should not happen)
  return key ?? keys[0];
};

// Legacy exports for backward compatibility
const C_MAJOR_TRIADS = generateKeyMap('C', false);
const A_MINOR_TRIADS = generateKeyMap('A', true);

// Extended C Major Map for Rock/Blues/Jazz concepts
const C_EXTENDED_TRIADS: Record<string, string[]> = {
  ...C_MAJOR_TRIADS,
  // Mixolydian / Modal Interchange (Borrowed from C Minor)
  bIII: ['Eb4', 'G4', 'Bb4'], // Eb Major
  bVI: ['Ab3', 'C4', 'Eb4'], // Ab Major
  bVII: ['Bb3', 'D4', 'F4'], // Bb Major
  // Beatles / Romantic / Chromatic
  iv: ['F4', 'Ab4', 'C5'], // Minor IV (F minor)
  'I+': ['C4', 'E4', 'G#4'], // Augmented I (C aug)
  I7: ['C4', 'E4', 'G4', 'Bb4'], // Dominant I (C7) -> pulls to IV
  // Jazz
  bII7: ['C#4', 'F4', 'G#4', 'B4'], // Db7 (Tritone Sub for G7) - Enharmonic spelling for Tone.js
};

const SECONDARY_DOMINANT_7THS: Record<string, string[]> = {
  II7: ['D4', 'F#4', 'A4', 'C5'], // D7 (V7/V)
  III7: ['E4', 'G#4', 'B4', 'D5'], // E7 (V7/vi)
  VI7: ['A4', 'C#5', 'E5', 'G5'], // A7 (V7/ii)
};

const C_TETRADS: Record<string, string[]> = {
  // Diatonic 7ths
  IM7: ['C4', 'E4', 'G4', 'B4'],
  ii7: ['D4', 'F4', 'A4', 'C5'],
  iii7: ['E4', 'G4', 'B4', 'D5'],
  IVM7: ['F4', 'A4', 'C5', 'E5'],
  V7: ['G4', 'B4', 'D5', 'F5'],
  vi7: ['A4', 'C5', 'E5', 'G5'],
  // Specific for Jazz
  bII7: ['C#4', 'F4', 'G#4', 'B4'], // Db7
};

const C_CITY_POP: Record<string, string[]> = {
  IM7: ['C4', 'E4', 'G4', 'B4'],
  IVM7: ['F4', 'A4', 'C5', 'E5'],
  III7: ['E4', 'G#4', 'B4', 'D5'], // V7/vi
  iii7: ['E4', 'G4', 'B4', 'D5'], // Diatonic iii7 (added for safety)
  vi7: ['A4', 'C5', 'E5', 'G5'],
  Gm7: ['G3', 'Bb3', 'D4', 'F4'], // Lower octave for warmth, ii/IV
  'IV/V': ['G3', 'F4', 'A4', 'C5'], // F/G - The "Tatsuro" Dominant (G11 sound)
  C7: ['C4', 'E4', 'G4', 'Bb4'], // V7/IV, typically follows Gm7
};

const getLevelConfig = (
  levelId: number,
  type: LevelType
): { key: string; map: Record<string, string[]>; pool: string[] } => {
  return match(type)
    .with(LevelType.MAJOR, () => {
      const randomKey = getRandomKey(false);
      const keyMap: Record<string, string[]> = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major`,
        map: keyMap,
        pool: levelId === 3 ? ['I', 'IV', 'V', 'V7', 'vi'] : ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
      };
    })
    .with(LevelType.MINOR, () => {
      const randomKey = getRandomKey(true);
      const keyMap = generateKeyMap(randomKey, true);
      return {
        key: `${randomKey} Minor`,
        map: keyMap,
        pool: ['i', 'III', 'iv', 'v', 'VI', 'VII'],
      };
    })
    .with(LevelType.MIXOLYDIAN, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Mixolydian`,
        map: keyMap,
        pool: ['I', 'IV', 'V', 'bVII', 'vi'],
      };
    })
    .with(LevelType.MODAL_INTERCHANGE, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Borrowed)`,
        map: keyMap,
        pool: ['I', 'IV', 'V', 'bIII', 'bVI', 'bVII'],
      };
    })
    .with(LevelType.SECONDARY_DOMINANT, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Sec. Dom)`,
        map: keyMap,
        pool: ['I', 'IV', 'V', 'II7', 'III7', 'VI7'],
      };
    })
    .with(LevelType.MINOR_PLAGAL, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Minor iv)`,
        map: keyMap,
        pool: ['I', 'IV', 'iv', 'V', 'vi'],
      };
    })
    .with(LevelType.CHROMATIC, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Chromatic)`,
        map: keyMap,
        pool: ['I', 'V', 'vi', 'I+', 'I7'],
      };
    })
    .with(LevelType.TRITONE_SUB, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Jazz)`,
        map: keyMap,
        pool: ['IM7', 'ii7', 'V7', 'bII7', 'vi7'],
      };
    })
    .with(LevelType.DORIAN, () => {
      const randomKey = getRandomKey(true);
      const keyMap = generateKeyMap(randomKey, true);
      return {
        key: `${randomKey} Dorian (Coltrane)`,
        map: keyMap,
        pool: ['i', 'IV', 'ii', 'bVII', 'III'],
      };
    })
    .with(LevelType.OUDOU, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      return {
        key: `${randomKey} Major (Royal Road)`,
        map: keyMap,
        pool: ['IVM7', 'V7', 'iii7', 'vi7', 'IM7'],
      };
    })
    .with(LevelType.CITY_POP, () => {
      const randomKey = getRandomKey(false);
      const keyMap = generateKeyMap(randomKey, false);
      // Add special City Pop chords for any key
      const rootNote = randomKey;
      const fourthNote = transposeNote(`${rootNote}4`, 5);
      keyMap['Gm7'] = generateChordNotes('G', 'minor7', 3); // Relative to key
      keyMap['IV/V'] = [
        `${fourthNote.slice(0, -1)}3`,
        `${rootNote}4`,
        transposeNote(`${rootNote}4`, 4),
        transposeNote(`${rootNote}4`, 7),
      ]; // Slash chord
      return {
        key: `${randomKey} Major (Tatsuro)`,
        map: keyMap,
        pool: ['IM7', 'IVM7', 'III7', 'vi7', 'Gm7', 'IV/V'],
      };
    })
    .exhaustive();
};

export const generateProgression = (levelId: number, type: LevelType): Progression => {
  const { key, map, pool } = getLevelConfig(levelId, type);

  // Generate 4 chords total.
  const result: Chord[] = [];

  // Determine tonic based on type
  const firstChordStr = match(type)
    .with(LevelType.MINOR, LevelType.DORIAN, () => 'i')
    .with(LevelType.OUDOU, LevelType.CITY_POP, () => 'IVM7') // City Pop often starts on IVM7 too
    .with(LevelType.TRITONE_SUB, () => 'IM7')
    .otherwise(() => 'I');

  // Special weighted logic for City Pop to create realistic "Just the Two of Us" or "Ride on Time" flows
  if (type === LevelType.CITY_POP) {
    const sequences = [
      ['IVM7', 'III7', 'vi7', 'Gm7'], // The classic JTTU run
      ['IVM7', 'IV/V', 'IM7', 'Gm7'], // Ride on Time / Sparkle vibe
      ['IVM7', 'III7', 'vi7', 'IV/V'], // Variation using Secondary Dominant III7 instead of iii7
      ['IM7', 'Gm7', 'IVM7', 'IV/V'], // Modulation prep
    ];

    // 40% chance to pick a pre-defined stylistic sequence
    if (Math.random() < 0.4) {
      const seq = sequences[Math.floor(Math.random() * sequences.length)] || sequences[0];
      const chords = (seq || []).map((roman) => ({
        roman,
        notes: map[roman] || [],
        displayName: roman,
      }));
      return {
        id: Date.now().toString(),
        key: key,
        chords,
      };
    }
    // Else fall through to random generation but with the City Pop map
  }

  const firstChordNotes = map[firstChordStr];
  if (firstChordNotes) {
    result.push({
      roman: firstChordStr,
      notes: firstChordNotes,
      displayName: `${firstChordStr} (${key})`,
    });
  }

  // Ensure we fill exactly 4 slots
  while (result.length < 4) {
    const rand = pool[Math.floor(Math.random() * pool.length)];

    if (!rand) continue;
    const notes = map[rand];
    if (!notes) continue;

    // Avoid immediate repetition for musicality (optional, but nice)
    if (result.length > 0 && result[result.length - 1]?.roman === rand && Math.random() > 0.3) {
      continue;
    }

    result.push({ roman: rand, notes: notes, displayName: rand });
  }

  return {
    id: Date.now().toString(),
    key: key,
    chords: result,
  };
};

export const getChordNotes = (roman: string, levelType: LevelType, key?: string): string[] => {
  // If key is provided, generate chord notes dynamically
  if (key) {
    const keyName = key.split(' ')[0]; // Extract "C" from "C Major"
    const isMinor = key.includes('Minor') || key.includes('Dorian');
    const keyMap = generateKeyMap(keyName as Key, isMinor);
    return keyMap[roman] || [];
  }

  // Fallback to legacy behavior for backward compatibility
  return match(levelType)
    .with(LevelType.MINOR, LevelType.DORIAN, () => A_MINOR_TRIADS[roman] || [])
    .with(LevelType.CITY_POP, () => C_CITY_POP[roman] || [])
    .with(LevelType.OUDOU, LevelType.TRITONE_SUB, () => C_TETRADS[roman] || [])
    .with(
      LevelType.SECONDARY_DOMINANT,
      () => SECONDARY_DOMINANT_7THS[roman] || C_EXTENDED_TRIADS[roman] || []
    )
    .otherwise(() => C_EXTENDED_TRIADS[roman] || []);
};
