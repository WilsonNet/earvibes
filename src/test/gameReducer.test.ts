import { describe, expect, it } from 'vitest';
import { LEVELS, REAL_SONGS } from '../../constants';
import { gameReducer, initialGameState } from '../../services/gameReducer';
import type { GameAction } from '../../services/gameReducer';
import { type GameState, LevelType, type Progression, type RealSong } from '../../types';

const progression: Progression = {
  id: 'test',
  key: 'C Major',
  chords: [
    { roman: 'I', notes: ['C4', 'E4', 'G4'], displayName: 'C' },
    { roman: 'IV', notes: ['F4', 'A4', 'C5'], displayName: 'F' },
    { roman: 'vi', notes: ['A4', 'C5', 'E5'], displayName: 'Am' },
    { roman: 'I', notes: ['C4', 'E4', 'G4'], displayName: 'C' },
  ],
};

const level = LEVELS[0];

const getRealSong = (): RealSong => {
  const song = REAL_SONGS[0];
  if (!song) throw new Error('Missing real song fixture');

  return song;
};

const withSelectionForRealSong = (): GameState => {
  const song = getRealSong();
  const state = gameReducer(initialGameState, { type: 'SELECT_REAL_SONG', song });

  return song.progression.reduce(
    (acc, chord) => gameReducer(acc, { type: 'SELECT_CHORD', chord }),
    state
  );
};

const playingState = () =>
  gameReducer(gameReducer(initialGameState, { type: 'SELECT_LEVEL', level }), {
    type: 'START_GAME',
    progression,
  });

const withSelection = (...chords: string[]) =>
  chords.reduce(
    (state, chord) => gameReducer(state, { type: 'SELECT_CHORD', chord }),
    playingState()
  );

describe('gameReducer', () => {
  it('starts idle', () => {
    expect(initialGameState.status).toBe('IDLE');
    expect(initialGameState.selectedSlots).toEqual([null, null, null, null]);
    expect(initialGameState.score).toBe(0);
  });

  it('selects a level and loads theory', () => {
    const state = gameReducer(initialGameState, { type: 'SELECT_LEVEL', level });

    expect(state.status).toBe('THEORY');
    expect(state.level).toBe(level);
    expect(state.isLoading).toBe(true);

    const loaded = gameReducer(state, { type: 'THEORY_LOADED', content: 'lesson' });
    expect(loaded.theoryContent).toBe('lesson');
    expect(loaded.isLoading).toBe(false);
  });

  it('ignores theory content outside THEORY', () => {
    const state = playingState();
    expect(gameReducer(state, { type: 'THEORY_LOADED', content: 'late' })).toBe(state);
  });

  it('starts a game only from THEORY', () => {
    const state = playingState();

    expect(state.status).toBe('PLAYING');
    expect(state.currentProgression).toBe(progression);
    expect(gameReducer(state, { type: 'START_GAME', progression })).toBe(state);
  });

  it('fills slots in order and stays idempotent', () => {
    const state = withSelection('I', 'IV', 'vi', 'I');

    expect(state.selectedSlots).toEqual(['I', 'IV', 'vi', 'I']);
    expect(gameReducer(state, { type: 'SELECT_CHORD', chord: 'V' })).toBe(state);
  });

  it('clears and undoes selections', () => {
    const state = withSelection('I', 'IV', 'vi');

    const cleared = gameReducer(state, { type: 'CLEAR_SLOT', index: 1 });
    expect(cleared.selectedSlots).toEqual(['I', null, 'vi', null]);

    const undone = gameReducer(state, { type: 'UNDO' });
    expect(undone.selectedSlots).toEqual(['I', 'IV', null, null]);
  });

  it('ignores selection and undo while revealed', () => {
    const revealed = gameReducer(withSelectionForRealSong(), {
      type: 'REAL_SONG_REVEAL',
      isCorrect: false,
    });

    expect(gameReducer(revealed, { type: 'SELECT_CHORD', chord: 'I' })).toBe(revealed);
    expect(gameReducer(revealed, { type: 'CLEAR_SLOT', index: 0 })).toBe(revealed);
    expect(gameReducer(revealed, { type: 'UNDO' })).toBe(revealed);
  });

  it('submits only once and scores a correct answer once', () => {
    const state = withSelection('I', 'IV', 'vi', 'I');

    const submitted = gameReducer(state, { type: 'SUBMIT', isCorrect: true });
    expect(submitted.status).toBe('FEEDBACK');
    expect(submitted.isLoading).toBe(true);
    expect(submitted.score).toBe(10);

    expect(gameReducer(submitted, { type: 'SUBMIT', isCorrect: true })).toBe(submitted);
  });

  it('does not submit incomplete or duplicate-invalid states', () => {
    const incomplete = withSelection('I', 'IV');
    expect(gameReducer(incomplete, { type: 'SUBMIT', isCorrect: true })).toBe(incomplete);
    expect(gameReducer(initialGameState, { type: 'SUBMIT', isCorrect: true })).toBe(
      initialGameState
    );
  });

  it('loads feedback content once per submission', () => {
    const submitted = gameReducer(withSelection('I', 'IV', 'vi', 'V'), {
      type: 'SUBMIT',
      isCorrect: false,
    });
    const loaded = gameReducer(submitted, { type: 'FEEDBACK_LOADED', content: 'analysis' });

    expect(loaded.feedbackContent).toBe('analysis');
    expect(loaded.isLoading).toBe(false);
    expect(gameReducer(loaded, { type: 'FEEDBACK_LOADED', content: 'stale' })).toBe(loaded);
  });

  it('advances a round only from feedback', () => {
    const submitted = gameReducer(withSelection('I', 'IV', 'vi', 'I'), {
      type: 'SUBMIT',
      isCorrect: true,
    });
    const next = gameReducer(submitted, { type: 'NEXT_ROUND', progression });

    expect(next.status).toBe('PLAYING');
    expect(next.round).toBe(2);
    expect(next.selectedSlots).toEqual([null, null, null, null]);
    expect(next.feedbackContent).toBe('');
    expect(gameReducer(next, { type: 'NEXT_ROUND', progression })).toBe(next);
  });

  it('reveals a real song answer once and scores it once', () => {
    const state = withSelectionForRealSong();
    const revealed = gameReducer(state, { type: 'REAL_SONG_REVEAL', isCorrect: true });

    expect(revealed.isAnswerRevealed).toBe(true);
    expect(revealed.isAnswerCorrect).toBe(true);
    expect(revealed.score).toBe(50);
    expect(gameReducer(revealed, { type: 'REAL_SONG_REVEAL', isCorrect: true })).toBe(revealed);

    const retried = gameReducer(revealed, { type: 'REAL_SONG_RETRY' });
    expect(retried.selectedSlots).toEqual([null, null, null, null]);
    expect(retried.isAnswerRevealed).toBe(false);
    expect(retried.score).toBe(50);
  });

  it('ignores repeat clicks at the reducer boundary', () => {
    const state = withSelection('I');
    const repeat: GameAction = { type: 'SELECT_CHORD', chord: 'IV', isRepeatClick: true };

    expect(gameReducer(state, repeat)).toBe(state);
    expect(gameReducer(state, { type: 'SUBMIT', isCorrect: true, isRepeatClick: true })).toBe(
      state
    );
    expect(gameReducer(state, { type: 'RESET', isRepeatClick: true })).toBe(state);
  });

  it('resets to the initial state', () => {
    const state = withSelection('I', 'IV');

    expect(gameReducer(state, { type: 'RESET' })).toBe(initialGameState);
  });

  it('exposes the configured level types', () => {
    expect(level.type).toBe(LevelType.MAJOR);
  });
});
