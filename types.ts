export enum LevelType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  MIXOLYDIAN = 'MIXOLYDIAN',
  MODAL_INTERCHANGE = 'MODAL_INTERCHANGE',
  SECONDARY_DOMINANT = 'SECONDARY_DOMINANT',
  MINOR_PLAGAL = 'MINOR_PLAGAL',
  CHROMATIC = 'CHROMATIC',
  TRITONE_SUB = 'TRITONE_SUB',
  DORIAN = 'DORIAN',
  OUDOU = 'OUDOU',
  CITY_POP = 'CITY_POP',
}

export type SynthPreset = 'VANGELIS' | 'JUMP' | 'PIANO';

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface LevelConfig {
  id: LevelId;
  type: LevelType;
  availableChords: readonly string[]; // e.g. ["I", "ii", "iii", "IV", "V", "vi"]
  // Title and Description are now derived from translation keys using 'id'
}

export interface Chord {
  roman: string;
  notes: string[]; // e.g., ["C4", "E4", "G4"]
  displayName: string;
}

export interface Progression {
  id: string;
  key: string;
  chords: readonly Chord[];
}

export interface RealSong {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  startTime: number;
  endTime: number;
  levelType: LevelType;
  key: string;
  progression: string[]; // e.g. ["I", "V", "vi", "IV"]
}

export type GameStatus = 'IDLE' | 'PLAYING' | 'FEEDBACK' | 'THEORY' | 'REAL_SONG';

export interface GameState {
  level: LevelConfig | null;
  activeRealSong: RealSong | null; // New field for Real Song mode
  isPlaying: boolean;
  currentProgression: Progression | null;
  selectedSlots: (string | null)[];
  status: GameStatus;
  theoryContent: string;
  feedbackContent: string;
  score: number;
  round: number;
  isLoading: boolean;
  isAnswerRevealed: boolean;
  isAnswerCorrect: boolean;
}
