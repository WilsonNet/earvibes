
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { GameState, SynthPreset } from '../types';
import { Button } from './Button';
import { audioService } from '../services/audioService';
import { fetchFeedback } from '../services/contentService';
import { getChordNotes } from '../services/theoryService';
import { useTranslation } from '../i18n/I18nContext';

const CHORD_SHORTCUTS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];

// --- Sub Components ---

const ShortcutBadge = ({ k, className = "" }: { k: string, className?: string }) => (
  <span className={`absolute text-[10px] font-mono font-bold bg-slate-900/80 text-slate-400 border border-slate-600 rounded px-1.5 py-0.5 pointer-events-none select-none ${className}`}>
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
  const titleKey = gameState.level ? `levelTitles.${gameState.level.id}` as const : 'levelTitles.1';

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3 mb-8 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-4 relative order-1">
        <Button
          variant="secondary"
          onClick={onBack}
          className="relative pl-11 pr-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <ShortcutBadge k="Esc" className="left-2 top-1/2 -translate-y-1/2 !border-none !bg-slate-700/50 !text-slate-400" />
          {t('common.exit')}
        </Button>
        <div className="hidden md:block text-indigo-400 font-bold">
          {gameState.level ? t(titleKey) : ''}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 order-2">
        <button
          onClick={onHelp}
          className="w-8 h-8 rounded-full bg-slate-700 hover:bg-indigo-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-lg border border-slate-600"
          title={t('instructions.title')}
        >
          <span className="font-bold font-mono text-sm">?</span>
        </button>

        <button
          onClick={togglePreset}
          className="relative group flex items-center gap-2 px-3 py-1 rounded-lg border border-slate-700 bg-slate-900/50 hover:border-indigo-500/50 transition-colors"
          title={t('game.toggleSynth')}
        >
          <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-300 uppercase tracking-wider inline-block min-w-[60px] text-center">
            {currentPreset}
          </span>
          <div className={`w-2 h-2 rounded-full ${getPresetColor()}`}></div>
          <ShortcutBadge k="T" className="hidden group-hover:block absolute -top-3 -right-2 !text-[9px]" />
        </button>

        <div className="font-mono text-lg md:text-xl text-white bg-slate-900 px-3 md:px-4 py-1 rounded-lg border border-slate-700 whitespace-nowrap">
          <span className="text-slate-500 text-sm mr-2 hidden sm:inline">{t('common.score')}:</span>
          <span className="text-indigo-400">{gameState.score}</span>
        </div>
      </div>

      <div className="md:hidden order-3 w-full pt-2 border-t border-slate-700/50 text-center">
        <div className="text-indigo-400 font-bold">{gameState.level ? t(titleKey) : ''}</div>
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
    <div className="mb-10 flex flex-col items-center relative w-full">
      <div className="relative group">
        <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity ${gameState.isPlaying ? 'animate-pulse' : ''}`}></div>
        <Button
          onClick={onPlay}
          disabled={gameState.isPlaying}
          className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 border-4 
            ${gameState.isPlaying ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_40px_rgba(79,70,229,0.4)]' : 'bg-slate-800 border-slate-700 hover:border-indigo-500'}`}
        >
          <ShortcutBadge k="P" className="top-6 left-6 !border-indigo-500/30 !bg-slate-900/50" />
          <span className="text-4xl mb-1 filter drop-shadow-lg">{gameState.isPlaying ? '🔊' : '▶️'}</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">
            {gameState.isPlaying ? t('game.playing') : t('game.playAudio')}
          </span>
        </Button>
      </div>
      <p className="mt-6 text-slate-400 text-sm font-medium tracking-wide text-center">{t('game.listenPrompt')}</p>
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
  const isCorrectGuess = gameState.status === 'FEEDBACK' && gameState.currentProgression?.chords[index]?.roman === slot;
  const isWrongGuess = gameState.status === 'FEEDBACK' && gameState.currentProgression?.chords[index]?.roman !== slot && slot !== null;

  return (
    <div className="flex flex-col items-center relative">
      <div
        onClick={() => onSlotClick(index)}
        className={`
            relative w-full aspect-[3/4] md:h-32 rounded-xl border-2 flex flex-col items-center justify-center text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300 group
            ${playingChordIndex === index ? 'border-indigo-400 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105 z-10' : 'border-slate-700 bg-slate-800/50'}
            ${slot ? 'text-white border-indigo-500/50 bg-slate-800' : 'text-slate-600'}
            ${isCorrectGuess ? '!border-green-500 !text-green-400 !bg-green-500/10' : ''}
            ${isWrongGuess ? '!border-red-500 !text-red-400 !bg-red-500/10' : ''}
            hover:bg-slate-700/50
            `}
      >
        <span className="absolute top-2 left-2 text-[10px] text-slate-600 font-mono group-hover:text-slate-400 transition-colors">
          [{index + 1}]
        </span>
        {gameState.status === 'FEEDBACK' && (
          <span className="absolute top-2 right-2 text-xs opacity-50 group-hover:opacity-100" title={t('game.playAudio')}>🔊</span>
        )}
        {slot || <span className="text-slate-700 text-4xl opacity-20">{index + 1}</span>}
        {gameState.status === 'FEEDBACK' && slot && (
          <ShortcutBadge k={`Sh+${index + 1}`} className="bottom-2 text-[8px] px-1 py-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {gameState.status === 'FEEDBACK' && gameState.currentProgression?.chords[index]?.roman !== slot && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlayCorrect(index);
          }}
          className="absolute -bottom-10 left-0 right-0 animate-slide-up cursor-pointer group/correct hover:scale-105 transition-transform"
          title={t('game.playCorrect')}
        >
          <span className="flex items-center justify-center gap-2 text-green-400 text-sm font-mono font-bold bg-slate-900/90 px-3 py-2 rounded-lg border border-green-500/30 shadow-lg">
            <span>{gameState.currentProgression?.chords[index]?.roman}</span>
            <span className="text-xs opacity-60 group-hover/correct:opacity-100">🔊</span>
          </span>
          <ShortcutBadge k={`${index + 1}`} className="right-0 -top-2 bg-green-900/80 text-green-200 border-green-700/50 opacity-0 group-hover/correct:opacity-100 transition-opacity" />
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
    return slots.every(s => s !== null);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-8">
      {availableChords.map((chord, idx) => (
        <button
          key={chord || ""}
          onClick={() => onSelectChord(chord)}
          disabled={isFull(selectedSlots)}
          className="relative p-3 md:p-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 border border-slate-600 hover:border-indigo-400 group"
        >
          <ShortcutBadge k={CHORD_SHORTCUTS[idx] || ""} className="top-1 right-1 opacity-60 group-hover:opacity-100" />
          {chord || ""}
        </button>
      ))}
    </div>
  );
};

const SubmitSection: React.FC<{
  selectedSlots: (string | null)[];
  onSubmit: () => void;
}> = ({ selectedSlots, onSubmit }) => {
  const { t } = useTranslation();
  
  const isFull = (slots: (string | null)[]): slots is string[] => {
    return slots.every(s => s !== null);
  };

  return (
    <div className="flex justify-center relative">
      <Button
        onClick={onSubmit}
        disabled={!isFull(selectedSlots)}
        fullWidth
        className="max-w-xs py-4 text-lg font-bold shadow-xl shadow-indigo-500/20 relative"
      >
        {t('game.submit')}
        {isFull(selectedSlots) && <ShortcutBadge k="Enter" className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-700 border-indigo-400 text-indigo-100" />}
      </Button>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block text-xs text-slate-500 font-mono">
        <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">U</span> {t('game.undo')}
      </div>
    </div>
  );
};

const InstructionsModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm fade-in" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{t('instructions.title')}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6 text-sm text-slate-300">
            <section>
              <h4 className="text-indigo-400 font-bold mb-2 uppercase tracking-wider text-xs">Gameplay</h4>
              <ol className="list-decimal list-inside space-y-1 marker:text-slate-500">
                <li>{t('instructions.step1')}</li>
                <li>{t('instructions.step2')}</li>
                <li>{t('instructions.step3')}</li>
              </ol>
            </section>
            <section>
              <h4 className="text-indigo-400 font-bold mb-2 uppercase tracking-wider text-xs">{t('instructions.shortcutsTitle')}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between bg-slate-900/50 p-2 rounded"><span>{t('game.playAudio')}</span> <kbd className="bg-slate-700 px-2 rounded text-white font-mono text-xs py-0.5">P</kbd></div>
                <div className="flex justify-between bg-slate-900/50 p-2 rounded"><span>{t('game.submit')} / {t('game.next')}</span> <kbd className="bg-slate-700 px-2 rounded text-white font-mono text-xs py-0.5">Enter</kbd></div>
                <div className="flex justify-between bg-slate-900/50 p-2 rounded"><span>{t('game.undo')}</span> <kbd className="bg-slate-700 px-2 rounded text-white font-mono text-xs py-0.5">U</kbd></div>
                <div className="flex justify-between bg-slate-900/50 p-2 rounded"><span>{t('game.synth')}</span> <kbd className="bg-slate-700 px-2 rounded text-white font-mono text-xs py-0.5">T</kbd></div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Use <kbd className="bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">1</kbd>-<kbd className="bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">4</kbd> to clear slots or play reference chords in review mode.
                <br />Use <kbd className="bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">A</kbd>-<kbd className="bg-slate-800 text-slate-400 px-1 rounded border border-slate-700">K</kbd> to select chords quickly.
              </p>
            </section>
            <section>
              <h4 className="text-indigo-400 font-bold mb-2 uppercase tracking-wider text-xs">{t('instructions.feedbackTitle')}</h4>
              <p>{t('instructions.feedbackDesc')}</p>
            </section>
          </div>
        </div>
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 text-center">
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
  onNext: () => void 
}> = ({ gameState, loading, onNext }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur border border-slate-700 p-6 md:p-8 rounded-2xl fade-in shadow-2xl mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🎓</span> {t('game.analysis')}
        </h3>
        <span className="text-xs text-slate-400 italic">{t('game.clickToCompare')}</span>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-6 mb-6 min-h-[100px] border border-slate-700/50">
        {loading ? (
          <div className="flex items-center justify-center h-full gap-3 text-indigo-400">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <span>{t('game.analyzing')}</span>
          </div>
        ) : (
          <div className="prose prose-invert prose-p:text-slate-300 max-w-none">
            <ReactMarkdown>{gameState.feedbackContent}</ReactMarkdown>
          </div>
        )}
      </div>

      <Button onClick={onNext} fullWidth variant="primary" className="py-4 text-lg font-bold relative">
        {t('game.next')}
        <ShortcutBadge k="Enter" className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-700 border-indigo-400 text-indigo-100" />
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
  return slots.every(s => s !== null);
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

  const togglePreset = (): void => {
    const presets: SynthPreset[] = ['PIANO', 'VANGELIS', 'JUMP'];
    const currentIndex = presets.indexOf(currentPreset);
    const nextIndex = (currentIndex + 1) % presets.length;
    setCurrentPreset(presets[nextIndex] as SynthPreset);
  };

  const getPresetColor = (): string => {
    switch (currentPreset) {
      case 'JUMP': return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]';
      case 'PIANO': return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]';
      default: return 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]';
    }
  };

  const handlePlay = async (): Promise<void> => {
    if (!gameState.currentProgression || gameState.isPlaying) return;

    setGameState(prev => ({ ...prev, isPlaying: true }));
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
      setGameState(prev => ({ ...prev, isPlaying: false }));
    }, 4 * chordDurationMs);

    // Audio Playback
    const notes = gameState.currentProgression.chords.map(c => c.notes);
    try {
      await audioService.playProgression(notes, bpm);
    } catch (e) {
      console.error("Playback failed", e);
      setPlayingChordIndex(-1);
      setGameState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const playSingleChord = async (chordRoman: string): Promise<void> => {
    if (!gameState.level) return;
    const notes = getChordNotes(chordRoman, gameState.level.type);
    await audioService.playNotes(notes, 1.0);
  };

  const handleSelectChord = (chord: string): void => {
    const firstEmptyIndex = selectedSlots.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...selectedSlots];
      newSlots[firstEmptyIndex] = chord;
      setSelectedSlots(newSlots);
    }
  };

  const handleSlotClick = (index: number): void => {
    if (gameState.status === 'FEEDBACK') {
      const userChord = selectedSlots[index];
      if (userChord) playSingleChord(userChord);
      return;
    }
    const newSlots = [...selectedSlots];
    newSlots[index] = null;
    setSelectedSlots(newSlots);
  };

  const handleClearSlot = (index: number): void => {
    if (gameState.status === 'FEEDBACK') return;
    const newSlots = [...selectedSlots];
    newSlots[index] = null;
    setSelectedSlots(newSlots);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isFull(selectedSlots)) return;

    // Type guard ensures selectedSlots is string[] here
    const userAnswers = selectedSlots;
    const correctAnswers = gameState.currentProgression!.chords.map(c => c.roman);

    const isCorrect = userAnswers.every((ans, i) => ans === correctAnswers[i]);

    setFeedbackLoading(true);
    setGameState(prev => ({ ...prev, status: 'FEEDBACK' }));

    let feedback = "";
    if (isCorrect) {
      setGameState(prev => ({ ...prev, score: prev.score + 10 }));
      feedback = t('feedback.perfect');
    } else {
      feedback = await fetchFeedback(correctAnswers, userAnswers, gameState.level!.type, t, locale);
    }

    setGameState(prev => ({
      ...prev,
      feedbackContent: feedback,
      status: 'FEEDBACK'
    }));
    setFeedbackLoading(false);
  };

  const handleInternalNextRound = (): void => {
    setSelectedSlots([null, null, null, null]);
    setPlayingChordIndex(-1);
    onNextRound();
  };

  // Keyboard Shortcuts Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (showHelp) {
        if (e.key === 'Escape') setShowHelp(false);
        return;
      }

      const key = e.key.toLowerCase();
      const code = e.code;

      if (key === 'escape') {
        onBack();
        return;
      }

      if (key === '?') {
        setShowHelp(true);
        return;
      }

      if (key === 't') {
        togglePreset();
        return;
      }

      if (gameState.status === 'FEEDBACK') {
        if (key === 'enter' || key === 'n') {
          e.preventDefault();
          handleInternalNextRound();
          return;
        }
        if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(code)) {
          const idx = parseInt(code.replace('Digit', '')) - 1;
          if (e.shiftKey) {
            const userChord = selectedSlots[idx];
            if (userChord) playSingleChord(userChord);
          } else {
            const correctChord = gameState.currentProgression?.chords[idx]?.roman;
            if (correctChord) playSingleChord(correctChord);
          }
          return;
        }
        if (key === 'p') {
          handlePlay();
          return;
        }
        return;
      }

      if (key === 'p') {
        handlePlay();
        return;
      }

      if (key === 'enter') {
        e.preventDefault();
        if (isFull(selectedSlots)) {
          handleSubmit();
        }
        return;
      }

      if (key === 'u' || key === 'backspace') {
        e.preventDefault();
        const lastFilledIndex = selectedSlots.reduce((lastIndex, slot, idx) => {
          return slot !== null ? idx : lastIndex;
        }, -1);

        if (lastFilledIndex !== -1) {
          handleClearSlot(lastFilledIndex);
        }
        return;
      }

      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(code)) {
        handleClearSlot(parseInt(code.replace('Digit', '')) - 1);
        return;
      }

      const chordIndex = CHORD_SHORTCUTS.indexOf(key);
      if (chordIndex !== -1 && gameState.level?.availableChords[chordIndex]) {
        const chord = gameState.level.availableChords[chordIndex];
        handleSelectChord(chord);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedSlots, currentPreset, t, showHelp]);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full p-4">
      <TopBar
        gameState={gameState}
        onBack={onBack}
        currentPreset={currentPreset}
        togglePreset={togglePreset}
        getPresetColor={getPresetColor}
        onHelp={() => setShowHelp(true)}
      />

      <PlaybackControl
        gameState={gameState}
        onPlay={handlePlay}
      />

      <div className="grid grid-cols-4 gap-3 md:gap-6 mb-10 w-full max-w-3xl px-2">
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
