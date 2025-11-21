
import React, { useState, useEffect } from 'react';
import { LevelSelector } from './components/LevelSelector';
import { TheoryModal } from './components/TheoryModal';
import { GameArea } from './components/GameArea';
import { RealSongGameArea } from './components/RealSongGameArea';
import { SEOHead } from './components/SEOHead';
import { GameState, LevelConfig, RealSong } from './types';
import { generateProgression } from './services/theoryService';
import { fetchTheoryLesson } from './services/contentService';
import { useTranslation } from './i18n/I18nContext';
import { Language } from './i18n/types';

// Type Guard
const isLanguage = (lang: string): lang is Language => {
  return ['en', 'es', 'pt', 'ja'].includes(lang);
};

const Header: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
    <header className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none" 
          onClick={onBack}
          aria-label={t('common.back')}
        >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <span className="text-white font-bold text-xs">EV</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">{t('common.appName')}</h1>
        </button>
        
        <div className="flex items-center gap-4">
          {!isOnline && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse" title={t('common.offline')}>
               <span className="w-2 h-2 rounded-full bg-red-500"></span>
               <span className="text-xs font-bold uppercase tracking-wider">{t('common.offline')}</span>
            </div>
          )}

          <a 
            href="https://github.com/WilsonNet/EarVibes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2"
            aria-label="GitHub Repository"
            title="GitHub Repository"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          <div className="relative group">
            <select
              value={language}
              onChange={(e) => {
                const val = e.target.value;
                if (isLanguage(val)) {
                  setLanguage(val);
                }
              }}
              className="appearance-none bg-slate-800/80 text-xs font-mono font-bold text-slate-400 border border-slate-700 rounded-full py-1.5 pl-4 pr-8 hover:bg-slate-700 hover:text-slate-200 hover:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer uppercase tracking-wider transition-all"
              aria-label={t('common.selectLanguage')}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="ja">日本語</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 group-hover:text-indigo-400 transition-colors">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Offline Banner */}
      {!isOnline && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-red-600 text-white text-[10px] font-bold text-center py-1 shadow-lg">
            {t('common.offline')}
        </div>
      )}
    </header>
  );
};

function App() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>({
    level: null,
    activeRealSong: null,
    isPlaying: false,
    currentProgression: null,
    userAnswers: [],
    status: 'IDLE',
    theoryContent: '',
    feedbackContent: '',
    score: 0,
    round: 1,
    isLoading: false,
  });

  // Fetch theory content whenever level or language changes
  useEffect(() => {
    let isMounted = true;

    if (gameState.status === 'THEORY' && gameState.level) {
      setGameState(prev => ({ ...prev, isLoading: true }));
      
      fetchTheoryLesson(gameState.level.id, t).then(content => {
        if (isMounted) {
          setGameState(prev => ({ 
            ...prev, 
            theoryContent: content,
            isLoading: false 
          }));
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [gameState.status, gameState.level, t]);

  const handleSelectLevel = (level: LevelConfig) => {
    setGameState(prev => ({ 
      ...prev, 
      level, 
      status: 'THEORY',
      isLoading: true 
    }));
  };

  const handleSelectRealSong = (song: RealSong) => {
    setGameState(prev => ({
        ...prev,
        activeRealSong: song,
        status: 'REAL_SONG'
    }));
  };

  const generateNewRound = (level: LevelConfig) => {
    const newProgression = generateProgression(level.id, level.type);
    
    setGameState(prev => ({
      ...prev,
      status: 'PLAYING',
      currentProgression: newProgression,
      userAnswers: [],
      feedbackContent: ''
    }));
  };

  const startGame = () => {
    if (!gameState.level) return;
    generateNewRound(gameState.level);
  };

  const handleNextRound = () => {
    if (!gameState.level) return;
    setGameState(prev => ({ ...prev, round: prev.round + 1 }));
    generateNewRound(gameState.level);
  };
  
  const handleBack = () => {
    setGameState({
        level: null,
        activeRealSong: null,
        isPlaying: false,
        currentProgression: null,
        userAnswers: [],
        status: 'IDLE',
        theoryContent: '',
        feedbackContent: '',
        score: 0,
        round: 1,
        isLoading: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500/30">
      <SEOHead />
      <Header onBack={handleBack} />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full relative z-0">
        
        {gameState.status === 'IDLE' && (
          <LevelSelector onSelectLevel={handleSelectLevel} onSelectRealSong={handleSelectRealSong} />
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
                onBack={handleBack} 
                setGameState={setGameState}
            />
        )}

        {(gameState.status === 'PLAYING' || gameState.status === 'FEEDBACK' || gameState.status === 'GUESSING') && (
          <GameArea 
            gameState={gameState} 
            setGameState={setGameState} 
            onBack={handleBack}
            onNextRound={handleNextRound}
          />
        )}

      </main>
    </div>
  );
}

export default App;
