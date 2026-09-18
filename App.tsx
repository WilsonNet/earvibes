import type React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { match } from 'ts-pattern';
import { GameArea } from './components/GameArea';
import { LevelSelector } from './components/LevelSelector';
import { RealSongGameArea } from './components/RealSongGameArea';
import { SEOHead } from './components/SEOHead';
import { TheoryModal } from './components/TheoryModal';
import { useTranslation } from './i18n/I18nContext';
import type { Language } from './i18n/types';
import { fetchTheoryLesson } from './services/contentService';
import { gameReducer, initialGameState } from './services/gameReducer';
import { generateProgression } from './services/theoryService';
import type { LevelConfig, RealSong } from './types';

// Type Guard
const isLanguage = (lang: string): lang is Language => {
  return match(lang as Language)
    .with('en', 'es', 'pt', 'ja', () => true)
    .otherwise(() => false);
};

const Header: React.FC<{ onBack: (isRepeatClick?: boolean) => void }> = ({ onBack }) => {
  const { t, language, setLanguage } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-slate-800 border-b bg-slate-900/50 p-6 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80 focus:outline-none"
          onClick={(e) => onBack(e.detail > 1)}
          aria-label={t('common.back')}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-indigo-500/20 shadow-lg">
            <span className="font-bold text-white text-xs">EV</span>
          </div>
          <h1 className="font-bold text-white text-xl tracking-tight">{t('common.appName')}</h1>
        </button>

        <div className="flex items-center gap-4">
          {!isOnline && (
            <div
              className="hidden animate-pulse items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-red-400 md:flex"
              title={t('common.offline')}
            >
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span className="font-bold text-xs uppercase tracking-wider">
                {t('common.offline')}
              </span>
            </div>
          )}

          <a
            href="https://github.com/WilsonNet/EarVibes"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 transition-colors hover:text-white"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <span className="sr-only">GitHub Repository</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <title>GitHub Repository</title>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          <div className="group relative">
            <select
              value={language}
              onChange={(e) => {
                const val = e.target.value;
                if (isLanguage(val)) {
                  setLanguage(val);
                }
              }}
              className="cursor-pointer appearance-none rounded-full border border-slate-700 bg-slate-800/80 py-1.5 pr-8 pl-4 font-bold font-mono text-slate-400 text-xs uppercase tracking-wider transition-all hover:border-indigo-500/50 hover:bg-slate-700 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label={t('common.selectLanguage')}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="ja">日本語</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 transition-colors group-hover:text-indigo-400">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <title>Language selector dropdown</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Offline Banner */}
      {!isOnline && (
        <div className="absolute top-full right-0 left-0 bg-red-600 py-1 text-center font-bold text-[10px] text-white shadow-lg md:hidden">
          {t('common.offline')}
        </div>
      )}
    </header>
  );
};

function App() {
  const { t } = useTranslation();
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // Fetch theory content whenever level or language changes
  useEffect(() => {
    let isMounted = true;

    if (gameState.status === 'THEORY' && gameState.level) {
      fetchTheoryLesson(gameState.level.id, t).then((content) => {
        if (isMounted) {
          dispatch({ type: 'THEORY_LOADED', content });
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [gameState.status, gameState.level, t]);

  const handleSelectLevel = (level: LevelConfig, isRepeatClick = false) => {
    dispatch({ type: 'SELECT_LEVEL', level, isRepeatClick });
  };

  const handleSelectRealSong = (song: RealSong, isRepeatClick = false) => {
    dispatch({ type: 'SELECT_REAL_SONG', song, isRepeatClick });
  };

  const startGame = (isRepeatClick = false) => {
    if (isRepeatClick || !gameState.level) return;

    dispatch({
      type: 'START_GAME',
      progression: generateProgression(gameState.level.id, gameState.level.type),
      isRepeatClick,
    });
  };

  const handleBack = (isRepeatClick = false) => {
    dispatch({ type: 'RESET', isRepeatClick });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 selection:bg-indigo-500/30">
      <SEOHead />
      <Header onBack={handleBack} />

      <main className="relative z-0 flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
        {gameState.status === 'IDLE' && (
          <LevelSelector
            onSelectLevel={handleSelectLevel}
            onSelectRealSong={handleSelectRealSong}
          />
        )}

        {gameState.status === 'THEORY' && (
          <TheoryModal
            content={gameState.theoryContent}
            onStart={startGame}
            onBack={handleBack}
            isLoading={gameState.isLoading}
          />
        )}

        {gameState.status === 'REAL_SONG' && gameState.activeRealSong && (
          <RealSongGameArea
            song={gameState.activeRealSong}
            gameState={gameState}
            dispatch={dispatch}
            onBack={handleBack}
          />
        )}

        {(gameState.status === 'PLAYING' || gameState.status === 'FEEDBACK') && (
          <GameArea gameState={gameState} dispatch={dispatch} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;
