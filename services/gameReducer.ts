import { match } from 'ts-pattern';
import type { GameState, LevelConfig, Progression, RealSong } from '../types';

export type GameAction = (
  | { type: 'SELECT_LEVEL'; level: LevelConfig }
  | { type: 'THEORY_LOADED'; content: string }
  | { type: 'START_GAME'; progression: Progression }
  | { type: 'SELECT_REAL_SONG'; song: RealSong }
  | { type: 'SELECT_CHORD'; chord: string }
  | { type: 'CLEAR_SLOT'; index: number }
  | { type: 'UNDO' }
  | { type: 'SET_PLAYING'; isPlaying: boolean }
  | { type: 'SUBMIT'; isCorrect: boolean }
  | { type: 'FEEDBACK_LOADED'; content: string }
  | { type: 'NEXT_ROUND'; progression: Progression }
  | { type: 'REAL_SONG_REVEAL'; isCorrect: boolean }
  | { type: 'REAL_SONG_RETRY' }
  | { type: 'RESET' }
) & { isRepeatClick?: boolean };

export const EMPTY_SELECTION: (string | null)[] = [null, null, null, null];

export const initialGameState: GameState = {
  level: null,
  activeRealSong: null,
  isPlaying: false,
  currentProgression: null,
  selectedSlots: EMPTY_SELECTION,
  status: 'IDLE',
  theoryContent: '',
  feedbackContent: '',
  score: 0,
  round: 1,
  isLoading: false,
  isAnswerRevealed: false,
  isAnswerCorrect: false,
};

export const isSelectionComplete = (slots: (string | null)[]): slots is string[] =>
  slots.every((slot) => slot !== null);

const isAnswering = (state: GameState): boolean =>
  state.status === 'PLAYING' || (state.status === 'REAL_SONG' && !state.isAnswerRevealed);

const selectChord = (state: GameState, chord: string): GameState => {
  const index = state.selectedSlots.indexOf(null);
  if (index === -1) return state;

  const selectedSlots = [...state.selectedSlots];
  selectedSlots[index] = chord;
  return { ...state, selectedSlots };
};

const clearSlot = (state: GameState, index: number): GameState => {
  if (state.selectedSlots[index] === null) return state;

  const selectedSlots = [...state.selectedSlots];
  selectedSlots[index] = null;
  return { ...state, selectedSlots };
};

const undoSelection = (state: GameState): GameState => {
  const lastFilledIndex = state.selectedSlots.reduce(
    (lastIndex, slot, index) => (slot !== null ? index : lastIndex),
    -1
  );
  if (lastFilledIndex === -1) return state;

  return clearSlot(state, lastFilledIndex);
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.isRepeatClick) return state;

  return match(action)
    .with(
      { type: 'SELECT_LEVEL' },
      ({ level }): GameState => ({
        ...initialGameState,
        level,
        status: 'THEORY',
        isLoading: true,
      })
    )
    .with({ type: 'THEORY_LOADED' }, ({ content }) =>
      state.status === 'THEORY' ? { ...state, theoryContent: content, isLoading: false } : state
    )
    .with(
      { type: 'START_GAME' },
      ({ progression }): GameState =>
        state.status === 'THEORY'
          ? {
              ...state,
              status: 'PLAYING',
              currentProgression: progression,
              selectedSlots: EMPTY_SELECTION,
              feedbackContent: '',
              isLoading: false,
            }
          : state
    )
    .with(
      { type: 'SELECT_REAL_SONG' },
      ({ song }): GameState => ({
        ...initialGameState,
        activeRealSong: song,
        status: 'REAL_SONG',
      })
    )
    .with({ type: 'SELECT_CHORD' }, ({ chord }) =>
      isAnswering(state) ? selectChord(state, chord) : state
    )
    .with({ type: 'CLEAR_SLOT' }, ({ index }) =>
      isAnswering(state) ? clearSlot(state, index) : state
    )
    .with({ type: 'UNDO' }, () => (isAnswering(state) ? undoSelection(state) : state))
    .with({ type: 'SET_PLAYING' }, ({ isPlaying }) => ({ ...state, isPlaying }))
    .with(
      { type: 'SUBMIT' },
      ({ isCorrect }): GameState =>
        state.status === 'PLAYING' && isSelectionComplete(state.selectedSlots)
          ? {
              ...state,
              status: 'FEEDBACK',
              isLoading: true,
              feedbackContent: '',
              score: isCorrect ? state.score + 10 : state.score,
            }
          : state
    )
    .with({ type: 'FEEDBACK_LOADED' }, ({ content }) =>
      state.status === 'FEEDBACK' && state.isLoading
        ? { ...state, feedbackContent: content, isLoading: false }
        : state
    )
    .with(
      { type: 'NEXT_ROUND' },
      ({ progression }): GameState =>
        state.status === 'FEEDBACK'
          ? {
              ...state,
              status: 'PLAYING',
              currentProgression: progression,
              selectedSlots: EMPTY_SELECTION,
              feedbackContent: '',
              round: state.round + 1,
              isLoading: false,
            }
          : state
    )
    .with({ type: 'REAL_SONG_REVEAL' }, ({ isCorrect }) =>
      state.status === 'REAL_SONG' &&
      !state.isAnswerRevealed &&
      isSelectionComplete(state.selectedSlots)
        ? {
            ...state,
            isAnswerRevealed: true,
            isAnswerCorrect: isCorrect,
            score: isCorrect ? state.score + 50 : state.score,
          }
        : state
    )
    .with({ type: 'REAL_SONG_RETRY' }, () =>
      state.status === 'REAL_SONG' && state.isAnswerRevealed
        ? {
            ...state,
            selectedSlots: EMPTY_SELECTION,
            isAnswerRevealed: false,
            isAnswerCorrect: false,
          }
        : state
    )
    .with({ type: 'RESET' }, () => initialGameState)
    .exhaustive();
}
