import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../i18n/I18nContext';
import { audioService } from '../services/audioService';
import { fetchFeedback } from '../services/contentService';
import { getChordNotes } from '../services/theoryService';
import type { GameState, SynthPreset } from '../types';
import { LevelType } from '../types';
import { Button } from './Button';

const CHORD_SHORTCUTS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];

// --- Sub Components ---

const ShortcutBadge = ({ k, className = '' }: { k: string; className?: string }) => (
  <span
    className={`pointer-events-none absolute hidden select-none rounded border border-slate-600 bg-slate-900/80 px-1.5 py-0.5 font-bold font-mono text-[10px] text-slate-400 sm:block ${className}`}
  >
    {k.toUpperCase()}
  </span>
);

const TopBar: React.FC<{
  gameState: GameState;
  onBack: () => void;
  currentPreset: SynthPreset;
  togglePreset: () => void;
  getPresetColor: () => string;
  onHelp: () => void;
}> = ({ gameState, onBack, currentPreset, togglePreset, getPresetColor, onHelp }) => {
  const { t } = useTranslation();
  const titleKey = gameState.level
    ? (`levelTitles.${gameState.level.id}` as const)
    : 'levelTitles.1';

  return (
    <div className="mb-8 flex w-full flex-wrap items-center justify-between gap-y-3 rounded-xl border border-slate-700 bg-slate-800/80 p-4 shadow-lg backdrop-blur md:flex-nowrap">
      <div className="relative order-1 flex items-center gap-4">
        <Button
          variant="secondary"
          onClick={onBack}
          className="relative flex items-center gap-2 py-2 pr-4 pl-4 font-bold text-xs uppercase tracking-wider sm:pl-11"
        >
          <ShortcutBadge
            k="Esc"
            className="-translate-y-1/2 !border-none !bg-slate-700/50 !text-slate-400 top-1/2 left-2"
          />
          {t('common.exit')}
        </Button>
        <div className="hidden font-bold text-indigo-400 md:block">
          {gameState.level ? t(titleKey) : ''}
        </div>
      </div>

      <div className="order-2 flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onHelp}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-700 text-slate-300 shadow-lg transition-colors hover:bg-indigo-500 hover:text-white"
          title={t('instructions.title')}
        >
          <span className="font-bold font-mono text-sm">?</span>
        </button>

        <button
          type="button"
          onClick={togglePreset}
          className="group relative flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-1 transition-colors hover:border-indigo-500/50"
          title={t('game.toggleSynth')}
        >
          <span className="inline-block min-w-[60px] text-center font-bold text-slate-400 text-xs uppercase tracking-wider group-hover:text-indigo-300">
            {currentPreset}
          </span>
          <div className={`h-2 w-2 rounded-full ${getPresetColor()}`}></div>
          <ShortcutBadge
            k="T"
            className="-top-3 -right-2 !text-[9px] absolute hidden group-hover:block"
          />
        </button>

        <div className="whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 font-mono text-lg text-white md:px-4 md:text-xl">
          <span className="mr-2 hidden text-slate-500 text-sm sm:inline">{t('common.score')}:</span>
          <span className="text-indigo-400">{gameState.score}</span>
        </div>
      </div>

      <div className="order-3 w-full border-slate-700/50 border-t pt-2 text-center md:hidden">
        <div className="font-bold text-indigo-400">{gameState.level ? t(titleKey) : ''}</div>
      </div>
    </div>
  );
};

const PlaybackControl: React.FC<{
  gameState: GameState;
  onPlay: () => void;
}> = ({ gameState, onPlay }) => {
  const { t } = useTranslation();

  return (
    <div className="relative mb-10 flex w-full flex-col items-center">
      <div className="group relative">
        <div
          className={`absolute inset-0 rounded-full bg-indigo-500 opacity-20 blur-xl transition-opacity group-hover:opacity-40 ${gameState.isPlaying ? 'animate-pulse' : ''}`}
        ></div>
        <Button
          onClick={onPlay}
          disabled={gameState.isPlaying}
          className={`relative flex h-32 w-32 transform flex-col items-center justify-center rounded-full border-4 transition-all hover:scale-105 active:scale-95 ${gameState.isPlaying ? 'border-indigo-400 bg-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.4)]' : 'border-slate-700 bg-slate-800 hover:border-indigo-500'}`}
        >
          <ShortcutBadge k="P" className="!border-indigo-500/30 !bg-slate-900/50 top-6 left-6" />
          <span className="mb-1 text-4xl drop-shadow-lg filter">
            {gameState.isPlaying ? '🔊' : '▶️'}
          </span>
          <span className="font-bold text-[10px] text-slate-300 uppercase tracking-widest">
            {gameState.isPlaying ? t('game.playing') : t('game.playAudio')}
          </span>
        </Button>
      </div>
      <p className="mt-6 text-center font-medium text-slate-400 text-sm tracking-wide">
        {t('game.listenPrompt')}
      </p>
    </div>
  );
};

const Slot: React.FC<{
  slot: string | null;
  index: number;
  playingChordIndex: number;
  gameState: GameState;
  onSlotClick: (index: number) => void;
  onPlayCorrect: (index: number) => void;
}> = ({ slot, index, playingChordIndex, gameState, onSlotClick, onPlayCorrect }) => {
  const { t } = useTranslation();
  const isCorrectGuess =
    gameState.status === 'FEEDBACK' && gameState.currentProgression?.chords[index]?.roman === slot;
  const isWrongGuess =
    gameState.status === 'FEEDBACK' &&
    gameState.currentProgression?.chords[index]?.roman !== slot &&
    slot !== null;

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={() => onSlotClick(index)}
        className={`group relative flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 font-bold text-2xl transition-all duration-300 md:h-32 md:text-3xl ${playingChordIndex === index ? 'z-10 scale-105 border-indigo-400 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'border-slate-700 bg-slate-800/50'}
            ${slot ? 'border-indigo-500/50 bg-slate-800 text-white' : 'text-slate-600'}
            ${isCorrectGuess ? '!border-green-500 !text-green-400 !bg-green-500/10' : ''}
            ${isWrongGuess ? '!border-red-500 !text-red-400 !bg-red-500/10' : ''}hover:bg-slate-700/50`}
      >
        <span className="absolute top-2 left-2 font-mono text-[10px] text-slate-600 transition-colors group-hover:text-slate-400">
          [{index + 1}]
        </span>
        {gameState.status === 'FEEDBACK' && (
          <span
            className="absolute top-2 right-2 text-xs opacity-50 group-hover:opacity-100"
            title={t('game.playAudio')}
          >
            🔊
          </span>
        )}
        {slot || <span className="text-4xl text-slate-700 opacity-20">{index + 1}</span>}
        {gameState.status === 'FEEDBACK' && slot && (
          <ShortcutBadge
            k={`Sh+${index + 1}`}
            className="bottom-2 px-1 py-0 text-[8px] opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </button>

      {gameState.status === 'FEEDBACK' &&
        gameState.currentProgression?.chords[index]?.roman !== slot && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlayCorrect(index);
            }}
            className="-bottom-10 group/correct absolute right-0 left-0 animate-slide-up cursor-pointer transition-transform hover:scale-105"
            title={t('game.playCorrect')}
          >
            <span className="flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-slate-900/90 px-3 py-2 font-bold font-mono text-green-400 text-sm shadow-lg">
              <span>{gameState.currentProgression?.chords[index]?.roman}</span>
              <span className="text-xs opacity-60 group-hover/correct:opacity-100">🔊</span>
            </span>
            <ShortcutBadge
              k={`${index + 1}`}
              className="-top-2 right-0 border-green-700/50 bg-green-900/80 text-green-200 opacity-0 transition-opacity group-hover/correct:opacity-100"
            />
          </button>
        )}
    </div>
  );
};

const ChordButtons: React.FC<{
  availableChords: string[];
  selectedSlots: (string | null)[];
  onSelectChord: (chord: string) => void;
}> = ({ availableChords, selectedSlots, onSelectChord }) => {
  const isFull = (slots: (string | null)[]): slots is string[] => {
    return slots.every((s) => s !== null);
  };

  return (
    <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
      {availableChords.map((chord, idx) => (
        <button
          type="button"
          key={chord || ''}
          onClick={() => onSelectChord(chord)}
          disabled={isFull(selectedSlots)}
          className="group relative transform rounded-xl border border-slate-600 bg-slate-700 p-3 font-bold text-lg text-white shadow-lg shadow-slate-900/20 transition-all hover:border-indigo-400 hover:bg-slate-600 active:scale-95 active:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50 md:p-4"
        >
          <ShortcutBadge
            k={CHORD_SHORTCUTS[idx] || ''}
            className="top-1 right-1 opacity-60 group-hover:opacity-100"
          />
          {chord || ''}
        </button>
      ))}
    </div>
  );
};

const SubmitSection: React.FC<{
  selectedSlots: (string | null)[];
  onSubmit: () => void;
  onUndo: () => void;
}> = ({ selectedSlots, onSubmit, onUndo }) => {
  const { t } = useTranslation();

  const isFull = (slots: (string | null)[]): slots is string[] => {
    return slots.every((s) => s !== null);
  };
  const canUndo = selectedSlots.some((slot) => slot !== null);

  return (
    <div className="relative flex justify-center">
      <Button
        onClick={onSubmit}
        disabled={!isFull(selectedSlots)}
        fullWidth
        className="relative max-w-xs py-4 font-bold text-lg shadow-indigo-500/20 shadow-xl"
      >
        {t('game.submit')}
        {isFull(selectedSlots) && (
          <ShortcutBadge
            k="Enter"
            className="-translate-y-1/2 absolute top-1/2 right-4 border-indigo-400 bg-indigo-700 text-indigo-100"
          />
        )}
      </Button>
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        title={t('game.undo')}
        className="-right-4 -translate-y-1/2 absolute top-1/2 hidden items-center gap-2 font-mono text-slate-500 text-xs transition-opacity disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
      >
        <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5">U</span>{' '}
        {t('game.undo')}
      </button>
    </div>
  );
};

const InstructionsModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="instructions-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      >
        <div className="flex items-center justify-between border-slate-700 border-b p-6">
          <h3 id="instructions-title" className="font-bold text-white text-xl">
            {t('instructions.title')}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>Close instructions</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-6 text-slate-300 text-sm">
            <section>
              <h4 className="mb-2 font-bold text-indigo-400 text-xs uppercase tracking-wider">
                Gameplay
              </h4>
              <ol className="list-inside list-decimal space-y-1 marker:text-slate-500">
                <li>{t('instructions.step1')}</li>
                <li>{t('instructions.step2')}</li>
                <li>{t('instructions.step3')}</li>
              </ol>
            </section>
            <section>
              <h4 className="mb-2 font-bold text-indigo-400 text-xs uppercase tracking-wider">
                {t('instructions.shortcutsTitle')}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between rounded bg-slate-900/50 p-2">
                  <span>{t('game.playAudio')}</span>{' '}
                  <kbd className="rounded bg-slate-700 px-2 py-0.5 font-mono text-white text-xs">
                    P
                  </kbd>
                </div>
                <div className="flex justify-between rounded bg-slate-900/50 p-2">
                  <span>
                    {t('game.submit')} / {t('game.next')}
                  </span>{' '}
                  <kbd className="rounded bg-slate-700 px-2 py-0.5 font-mono text-white text-xs">
                    Enter
                  </kbd>
                </div>
                <div className="flex justify-between rounded bg-slate-900/50 p-2">
                  <span>{t('game.undo')}</span>{' '}
                  <kbd className="rounded bg-slate-700 px-2 py-0.5 font-mono text-white text-xs">
                    U
                  </kbd>
                </div>
                <div className="flex justify-between rounded bg-slate-900/50 p-2">
                  <span>{t('game.synth')}</span>{' '}
                  <kbd className="rounded bg-slate-700 px-2 py-0.5 font-mono text-white text-xs">
                    T
                  </kbd>
                </div>
              </div>
              <p className="mt-2 text-slate-500 text-xs">
                Use{' '}
                <kbd className="rounded border border-slate-700 bg-slate-800 px-1 text-slate-400">
                  1
                </kbd>
                -
                <kbd className="rounded border border-slate-700 bg-slate-800 px-1 text-slate-400">
                  4
                </kbd>{' '}
                to clear slots or play reference chords in review mode.
                <br />
                Use{' '}
                <kbd className="rounded border border-slate-700 bg-slate-800 px-1 text-slate-400">
                  A
                </kbd>
                -
                <kbd className="rounded border border-slate-700 bg-slate-800 px-1 text-slate-400">
                  K
                </kbd>{' '}
                to select chords quickly.
              </p>
            </section>
            <section>
              <h4 className="mb-2 font-bold text-indigo-400 text-xs uppercase tracking-wider">
                {t('instructions.feedbackTitle')}
              </h4>
              <p>{t('instructions.feedbackDesc')}</p>
            </section>
          </div>
        </div>
        <div className="border-slate-700 border-t bg-slate-800/50 p-4 text-center">
          <Button variant="primary" onClick={onClose} fullWidth>
            {t('theory.startQuiz')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeedbackView: React.FC<{
  gameState: GameState;
  loading: boolean;
  onNext: () => void;
}> = ({ gameState, loading, onNext }) => {
  const { t } = useTranslation();

  return (
    <div className="fade-in mt-4 w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-800/50 p-6 shadow-2xl backdrop-blur md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-white text-xl">
          <span>🎓</span> {t('game.analysis')}
        </h3>
        <span className="text-slate-400 text-xs italic">{t('game.clickToCompare')}</span>
      </div>

      <div className="mb-6 min-h-[100px] rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center gap-3 text-indigo-400">
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.1s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.2s]"></div>
            <span>{t('game.analyzing')}</span>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none prose-p:text-slate-300">
            <ReactMarkdown>{gameState.feedbackContent}</ReactMarkdown>
          </div>
        )}
      </div>

      <Button
        onClick={onNext}
        fullWidth
        variant="primary"
        className="relative py-4 font-bold text-lg"
      >
        {t('game.next')}
        <ShortcutBadge
          k="Enter"
          className="-translate-y-1/2 absolute top-1/2 right-4 border-indigo-400 bg-indigo-700 text-indigo-100"
        />
      </Button>
    </div>
  );
};

// --- Main Component ---

interface Props {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onBack: () => void;
  onNextRound: () => void;
}

// Type Guard
const isFull = (slots: (string | null)[]): slots is string[] => {
  return slots.every((s) => s !== null);
};

export const GameArea: React.FC<Props> = ({ gameState, setGameState, onBack, onNextRound }) => {
  const { t, locale } = useTranslation();
  const [selectedSlots, setSelectedSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [playingChordIndex, setPlayingChordIndex] = useState<number>(-1);
  const [currentPreset, setCurrentPreset] = useState<SynthPreset>('PIANO');
  const [showHelp, setShowHelp] = useState(false);

  // Sync audio service
  useEffect(() => {
    audioService.setPreset(currentPreset);
  }, [currentPreset]);

  const togglePreset = useCallback((): void => {
    const presets: SynthPreset[] = ['PIANO', 'VANGELIS', 'JUMP'];
    const currentIndex = presets.indexOf(currentPreset);
    const nextIndex = (currentIndex + 1) % presets.length;
    setCurrentPreset(presets[nextIndex] as SynthPreset);
  }, [currentPreset]);

  const getPresetColor = (): string => {
    switch (currentPreset) {
      case 'JUMP':
        return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]';
      case 'PIANO':
        return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]';
      default:
        return 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]';
    }
  };

  const handlePlay = useCallback(async (): Promise<void> => {
    if (!gameState.currentProgression || gameState.isPlaying) return;

    setGameState((prev) => ({ ...prev, isPlaying: true }));
    setPlayingChordIndex(0);

    const bpm = 100;
    const beatDurationSec = 60 / bpm;
    const chordDurationSec = beatDurationSec * 2;
    const chordDurationMs = chordDurationSec * 1000;

    // Visualizer loop
    for (let i = 0; i < 4; i++) {
      window.setTimeout(() => {
        setPlayingChordIndex(i);
      }, i * chordDurationMs);
    }

    // Cleanup timeout at end
    window.setTimeout(() => {
      setPlayingChordIndex(-1);
      setGameState((prev) => ({ ...prev, isPlaying: false }));
    }, 4 * chordDurationMs);

    // Audio Playback
    const notes = gameState.currentProgression.chords.map((c) => c.notes);
    try {
      await audioService.playProgression(notes, bpm);
    } catch (e) {
      console.error('Playback failed', e);
      setPlayingChordIndex(-1);
      setGameState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, [gameState.currentProgression, gameState.isPlaying, setGameState]);

  const playSingleChord = useCallback(
    async (chordRoman: string): Promise<void> => {
      if (!gameState.level) return;
      const notes = getChordNotes(
        chordRoman,
        gameState.level.type,
        gameState.currentProgression?.key
      );
      await audioService.playNotes(notes, 1.0);
    },
    [gameState.level, gameState.currentProgression]
  );

  const handleSelectChord = useCallback(
    (chord: string): void => {
      const firstEmptyIndex = selectedSlots.indexOf(null);
      if (firstEmptyIndex !== -1) {
        const newSlots = [...selectedSlots];
        newSlots[firstEmptyIndex] = chord;
        setSelectedSlots(newSlots);
      }
    },
    [selectedSlots]
  );

  const handleSlotClick = useCallback(
    (index: number): void => {
      if (gameState.status === 'FEEDBACK') {
        const userChord = selectedSlots[index];
        if (userChord) playSingleChord(userChord);
        return;
      }
      const newSlots = [...selectedSlots];
      newSlots[index] = null;
      setSelectedSlots(newSlots);
    },
    [gameState.status, selectedSlots, playSingleChord]
  );

  const handleClearSlot = useCallback(
    (index: number): void => {
      if (gameState.status === 'FEEDBACK') return;
      const newSlots = [...selectedSlots];
      newSlots[index] = null;
      setSelectedSlots(newSlots);
    },
    [gameState.status, selectedSlots]
  );

  const handleUndo = useCallback((): void => {
    if (gameState.status === 'FEEDBACK') return;
    const lastFilledIndex = selectedSlots.reduce((lastIndex, slot, idx) => {
      return slot !== null ? idx : lastIndex;
    }, -1);

    if (lastFilledIndex !== -1) {
      handleClearSlot(lastFilledIndex);
    }
  }, [gameState.status, selectedSlots, handleClearSlot]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!isFull(selectedSlots)) return;

    // Type guard ensures selectedSlots is string[] here
    const userAnswers = selectedSlots;
    const correctAnswers = gameState.currentProgression?.chords.map((c) => c.roman) ?? [];

    const isCorrect = userAnswers.every((ans, i) => ans === correctAnswers[i]);

    setFeedbackLoading(true);
    setGameState((prev) => ({ ...prev, status: 'FEEDBACK' }));

    let feedback = '';
    if (isCorrect) {
      setGameState((prev) => ({ ...prev, score: prev.score + 10 }));
      feedback = t('feedback.perfect');
    } else {
      feedback = await fetchFeedback(
        correctAnswers,
        userAnswers,
        gameState.level?.type ?? LevelType.MAJOR,
        t,
        locale
      );
    }

    setGameState((prev) => ({
      ...prev,
      feedbackContent: feedback,
      status: 'FEEDBACK',
    }));
    setFeedbackLoading(false);
  }, [selectedSlots, gameState.currentProgression, gameState.level, t, locale, setGameState]);

  const handleInternalNextRound = useCallback((): void => {
    setSelectedSlots([null, null, null, null]);
    setPlayingChordIndex(-1);
    onNextRound();
  }, [onNextRound]);

  // Keyboard shortcut handlers
  const handleHelpKeys = useCallback(
    (e: KeyboardEvent): boolean => {
      if (showHelp) {
        if (e.key === 'Escape') setShowHelp(false);
        return true;
      }
      if (e.key === '?') {
        setShowHelp(true);
        return true;
      }
      return false;
    },
    [showHelp]
  );

  const handleGlobalKeys = useCallback(
    (e: KeyboardEvent): boolean => {
      const key = e.key.toLowerCase();

      if (key === 'escape') {
        onBack();
        return true;
      }

      if (key === 't') {
        togglePreset();
        return true;
      }

      return false;
    },
    [onBack, togglePreset]
  );

  const handleFeedbackKeys = useCallback(
    (e: KeyboardEvent): boolean => {
      if (gameState.status !== 'FEEDBACK') return false;

      const key = e.key.toLowerCase();
      const code = e.code;

      if (key === 'enter' || key === 'n') {
        e.preventDefault();
        handleInternalNextRound();
        return true;
      }

      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(code)) {
        const idx = parseInt(code.replace('Digit', ''), 10) - 1;
        if (e.shiftKey) {
          const userChord = selectedSlots[idx];
          if (userChord) playSingleChord(userChord);
        } else {
          const correctChord = gameState.currentProgression?.chords[idx]?.roman;
          if (correctChord) playSingleChord(correctChord);
        }
        return true;
      }

      if (key === 'p') {
        handlePlay();
        return true;
      }

      return false;
    },
    [
      gameState.status,
      gameState.currentProgression,
      selectedSlots,
      handleInternalNextRound,
      handlePlay,
      playSingleChord,
    ]
  );

  const handleGameKeys = useCallback(
    (e: KeyboardEvent): boolean => {
      const key = e.key.toLowerCase();
      const code = e.code;

      if (key === 'p') {
        handlePlay();
        return true;
      }

      if (key === 'enter') {
        e.preventDefault();
        if (isFull(selectedSlots)) {
          handleSubmit();
        }
        return true;
      }

      if (key === 'u' || key === 'backspace') {
        e.preventDefault();
        handleUndo();
        return true;
      }

      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(code)) {
        handleClearSlot(parseInt(code.replace('Digit', ''), 10) - 1);
        return true;
      }

      const chordIndex = CHORD_SHORTCUTS.indexOf(key);
      if (chordIndex !== -1 && gameState.level?.availableChords[chordIndex]) {
        const chord = gameState.level.availableChords[chordIndex];
        handleSelectChord(chord);
        return true;
      }

      return false;
    },
    [
      selectedSlots,
      gameState.level,
      handlePlay,
      handleSubmit,
      handleClearSlot,
      handleSelectChord,
      handleUndo,
    ]
  );

  // Keyboard Shortcuts Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (handleHelpKeys(e)) return;
      if (handleGlobalKeys(e)) return;
      if (handleFeedbackKeys(e)) return;
      if (handleGameKeys(e)) return;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleHelpKeys, handleGlobalKeys, handleFeedbackKeys, handleGameKeys]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center p-4">
      <TopBar
        gameState={gameState}
        onBack={onBack}
        currentPreset={currentPreset}
        togglePreset={togglePreset}
        getPresetColor={getPresetColor}
        onHelp={() => setShowHelp(true)}
      />

      <PlaybackControl gameState={gameState} onPlay={handlePlay} />

      <div className="mb-10 grid w-full max-w-3xl grid-cols-4 gap-3 px-2 md:gap-6">
        {selectedSlots.map((slot, idx) => (
          <Slot
            key={idx}
            slot={slot}
            index={idx}
            playingChordIndex={playingChordIndex}
            gameState={gameState}
            onSlotClick={handleSlotClick}
            onPlayCorrect={(index) => {
              const correct = gameState.currentProgression?.chords[index]?.roman;
              if (correct) playSingleChord(correct);
            }}
          />
        ))}
      </div>

      {gameState.status !== 'FEEDBACK' ? (
        <div className="w-full max-w-3xl animate-fade-in">
          <ChordButtons
            availableChords={[...(gameState.level?.availableChords || [])]}
            selectedSlots={selectedSlots}
            onSelectChord={handleSelectChord}
          />

          <SubmitSection
            selectedSlots={selectedSlots}
            onSubmit={handleSubmit}
            onUndo={handleUndo}
          />
        </div>
      ) : (
        <FeedbackView
          gameState={gameState}
          loading={feedbackLoading}
          onNext={handleInternalNextRound}
        />
      )}

      <InstructionsModal show={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};
