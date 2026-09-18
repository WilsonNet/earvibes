import type React from 'react';
import { useRef, useState } from 'react';
import { LEVELS } from '../constants';
import { useTranslation } from '../i18n/I18nContext';
import { isRepeatClick } from '../lib/utils';
import type { GameState, RealSong } from '../types';
import { Button } from './Button';

interface Props {
  song: RealSong;
  onBack: () => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const _ShortcutBadge = ({ k, className = '' }: { k: string; className?: string }) => (
  <span
    className={`pointer-events-none absolute select-none rounded border border-slate-600 bg-slate-900/80 px-1.5 py-0.5 font-bold font-mono text-[10px] text-slate-400 ${className}`}
  >
    {k.toUpperCase()}
  </span>
);

export const RealSongGameArea: React.FC<Props> = ({ song, onBack, setGameState }) => {
  const { t } = useTranslation();
  const [selectedSlots, setSelectedSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Determine available chords based on level type (Major vs Minor)
  const levelConfig = LEVELS.find((l) => l.type === song.levelType);
  const availableChords = levelConfig ? levelConfig.availableChords : [];

  // Helper to construct robust YouTube Embed URL
  const getYoutubeSrc = (id: string, start: number, end: number, autoplay: boolean) => {
    const params = new URLSearchParams();
    params.append('start', Math.floor(start).toString());
    params.append('end', Math.floor(end).toString());
    params.append('autoplay', autoplay ? '1' : '0');
    params.append('controls', '1'); // Enable controls so user can interact if autoplay fails
    params.append('playsinline', '1'); // Better for mobile
    params.append('rel', '0'); // No related videos
    params.append('modestbranding', '1');

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Re-trigger iframe reload to start from specific time with autoplay
    if (iframeRef.current) {
      iframeRef.current.src = getYoutubeSrc(song.youtubeId, song.startTime, song.endTime, true);
    }
  };

  const handleSelectChord = (chord: string) => {
    if (showFeedback) return;
    const firstEmptyIndex = selectedSlots.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...selectedSlots];
      newSlots[firstEmptyIndex] = chord;
      setSelectedSlots(newSlots);
    }
  };

  const handleClearSlot = (index: number) => {
    if (showFeedback) return;
    const newSlots = [...selectedSlots];
    newSlots[index] = null;
    setSelectedSlots(newSlots);
  };

  const isFull = (slots: (string | null)[]): slots is string[] => {
    return slots.every((s) => s !== null);
  };

  const handleSubmit = () => {
    if (showFeedback || !isFull(selectedSlots)) return;

    const correct = selectedSlots.every((slot, idx) => slot === song.progression[idx]);
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setGameState((prev) => ({ ...prev, score: prev.score + 50 }));
    }
  };

  const handleRetry = () => {
    setSelectedSlots([null, null, null, null]);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsPlaying(false);
    // Reset player state
    if (iframeRef.current) {
      iframeRef.current.src = getYoutubeSrc(song.youtubeId, song.startTime, song.endTime, false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center p-4">
      {/* Header */}
      <div className="mb-6 flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-4 shadow-lg backdrop-blur">
        <Button
          variant="secondary"
          onClick={onBack}
          className="py-2 pr-4 pl-4 font-bold text-xs uppercase tracking-wider"
        >
          {t('common.back')}
        </Button>
        <div className="text-center">
          <h2 className="font-bold text-lg text-white">{song.title}</h2>
          <p className="text-indigo-400 text-sm">{song.artist}</p>
        </div>
        <div className="rounded border border-slate-700 bg-slate-900 px-3 py-1 font-mono text-slate-400 text-sm">
          {song.key}
        </div>
      </div>

      {/* YouTube Player */}
      <div className="group relative mb-8 aspect-video w-full max-w-2xl overflow-hidden rounded-xl border-2 border-slate-700 bg-black shadow-2xl">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={getYoutubeSrc(song.youtubeId, song.startTime, song.endTime, false)}
          title={song.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="relative z-0"
        ></iframe>

        {!isPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <button
              type="button"
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                handlePlay();
              }}
              className="z-20 flex h-20 w-20 transform items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 pl-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Play song</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        {isPlaying && (
          <div className="pointer-events-none absolute right-4 bottom-4 z-10">
            <Button
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                handlePlay();
              }}
              variant="secondary"
              className="pointer-events-auto bg-slate-900/80 text-xs backdrop-blur"
            >
              Replay Loop ↻
            </Button>
          </div>
        )}
      </div>

      {/* Slots */}
      <div className="mb-10 grid w-full max-w-3xl grid-cols-4 gap-3 px-2 md:gap-6">
        {selectedSlots.map((slot, idx) => {
          const correctChord = song.progression[idx];
          const isSlotCorrect = showFeedback && slot === correctChord;
          const isSlotWrong = showFeedback && slot !== correctChord;

          return (
            <button
              type="button"
              key={idx}
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                handleClearSlot(idx);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClearSlot(idx);
                }
              }}
              className={`relative flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 font-bold text-2xl transition-all duration-300 md:h-32 md:text-3xl ${slot ? 'bg-slate-800 text-white' : 'border-slate-700 bg-slate-800/50 text-slate-600'}
                        ${isSlotCorrect ? '!border-green-500 !bg-green-500/10 !text-green-400' : ''}
                        ${isSlotWrong ? '!border-red-500 !bg-red-500/10 !text-red-400' : ''}
                    `}
            >
              <span className="absolute top-2 left-2 font-mono text-[10px] text-slate-600">
                [{idx + 1}]
              </span>
              {slot || '?'}

              {/* Reveal Correct Answer if Wrong */}
              {isSlotWrong && (
                <div className="-bottom-8 absolute rounded border border-green-500/30 bg-slate-900 px-2 py-1 font-bold font-mono text-green-400 text-sm">
                  {correctChord}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      {showFeedback ? (
        <div className="animate-fade-in text-center">
          <h3
            className={`mb-4 font-bold text-2xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
          >
            {isCorrect ? t('feedback.perfect') : t('feedback.defaultIncorrect')}
          </h3>
          {isCorrect ? (
            <Button
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                onBack();
              }}
              variant="primary"
              className="min-w-[150px]"
            >
              {t('common.back')}
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                handleRetry();
              }}
              variant="secondary"
              className="min-w-[150px]"
            >
              Retry
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full max-w-3xl animate-fade-in">
          <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {availableChords.map((chord, _idx) => (
              <button
                type="button"
                key={chord}
                onClick={(e) => {
                  if (isRepeatClick(e)) return;
                  handleSelectChord(chord);
                }}
                disabled={isFull(selectedSlots)}
                className="relative rounded-xl border border-slate-600 bg-slate-700 p-3 font-bold text-lg text-white shadow-lg hover:border-indigo-400 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-50 md:p-4"
              >
                {chord}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={(e) => {
                if (isRepeatClick(e)) return;
                handleSubmit();
              }}
              disabled={!isFull(selectedSlots)}
              fullWidth
              className="max-w-xs py-3 font-bold text-lg"
            >
              {t('game.submit')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
