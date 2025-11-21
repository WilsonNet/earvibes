
import { LevelType, RealSong } from './types';

export const LEVELS = [
  {
    id: 1,
    type: LevelType.MAJOR,
    availableChords: ["I", "ii", "iii", "IV", "V", "vi"]
  },
  {
    id: 2,
    type: LevelType.MINOR,
    availableChords: ["i", "III", "iv", "v", "VI", "VII"]
  },
  {
    id: 3,
    type: LevelType.MAJOR, // Advanced Major
    availableChords: ["I", "IV", "V", "V7", "vi"]
  },
  {
    id: 4,
    type: LevelType.MIXOLYDIAN, // Classic Rock
    availableChords: ["I", "IV", "V", "bVII", "vi"]
  },
  {
    id: 5,
    type: LevelType.MODAL_INTERCHANGE, // Borrowed Chords
    availableChords: ["I", "IV", "V", "bIII", "bVI", "bVII"]
  },
  {
    id: 6,
    type: LevelType.SECONDARY_DOMINANT, // Beatles/Jazz
    availableChords: ["I", "IV", "V", "II7", "III7", "VI7"]
  },
  {
    id: 7,
    type: LevelType.MINOR_PLAGAL, // The Beatles "Minor 4"
    availableChords: ["I", "IV", "iv", "V", "vi"]
  },
  {
    id: 8,
    type: LevelType.CHROMATIC, // Psychedelic/Augmented
    availableChords: ["I", "V", "vi", "I+", "I7"]
  },
  {
    id: 9,
    type: LevelType.TRITONE_SUB, // Jazz
    availableChords: ["IM7", "ii7", "V7", "bII7", "vi7"]
  },
  {
    id: 10,
    type: LevelType.DORIAN, // Coltrane / Modal
    availableChords: ["i", "IV", "ii", "bVII", "III"]
  },
  {
    id: 11,
    type: LevelType.OUDOU, // J-Pop Royal Road
    availableChords: ["IVM7", "V7", "iii7", "vi7", "IM7"]
  },
  {
    id: 12,
    type: LevelType.CITY_POP, // Tatsuro Yamashita / City Pop
    availableChords: ["IM7", "IVM7", "III7", "vi7", "Gm7", "IV/V"]
  }
] as const;

export const REAL_SONGS: RealSong[] = [
  {
    id: "stand_by_me",
    title: "Stand By Me",
    artist: "Ben E. King",
    youtubeId: "hwZNL7QVJjE", // Official Ben E. King video
    startTime: 0,
    endTime: 18,
    levelType: LevelType.MAJOR,
    key: "A Major",
    progression: ["I", "vi", "IV", "V"] // A, F#m, D, E
  },
  {
    id: "hello_adele",
    title: "Hello",
    artist: "Adele",
    youtubeId: "YQHsXMglC9A", // Official Adele video
    startTime: 83, // Chorus start
    endTime: 96,
    levelType: LevelType.MINOR,
    key: "F Minor",
    progression: ["i", "III", "VII", "VI"] // Fm, Ab, Eb, Db
  }
];
