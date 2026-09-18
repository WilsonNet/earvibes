import type React from 'react';
import { LEVELS, REAL_SONGS } from '../constants';
import { useTranslation } from '../i18n/I18nContext';
import type { LevelConfig, RealSong } from '../types';
import { Button } from './Button';

interface Props {
  onSelectLevel: (level: LevelConfig, isRepeatClick?: boolean) => void;
  onSelectRealSong: (song: RealSong, isRepeatClick?: boolean) => void;
}

export const LevelSelector: React.FC<Props> = ({ onSelectLevel, onSelectRealSong }) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      {/* Synthetic Levels */}
      <div className="mb-16">
        <h2 className="mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-center font-bold text-3xl text-transparent">
          {t('home.selectDifficulty')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((level) => {
            const titleKey = `levelTitles.${level.id}` as const;
            const descKey = `levelDescs.${level.id}` as const;

            return (
              <div
                key={level.id}
                className="group flex h-full flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-bold font-mono text-indigo-400 text-sm tracking-wider">
                    {t('home.levelLabel', { id: level.id })}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-white text-xl transition-colors group-hover:text-indigo-300">
                  {t(titleKey)}
                </h3>
                <p className="mb-6 flex-grow text-slate-400 text-sm">{t(descKey)}</p>
                <Button
                  onClick={(e) => onSelectLevel(level, e.detail > 1)}
                  fullWidth
                  className="mt-auto"
                >
                  {t('home.startTraining')}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real Songs Section */}
      <div className="mb-8">
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px max-w-[100px] flex-grow bg-slate-700"></div>
          <h2 className="flex items-center gap-3 font-bold text-2xl text-white md:text-3xl">
            <span className="rounded bg-red-600 px-2 py-1 font-bold text-white text-xs uppercase tracking-wider">
              New
            </span>
            {t('home.realSongsTitle')}
          </h2>
          <div className="h-px max-w-[100px] flex-grow bg-slate-700"></div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {REAL_SONGS.map((song) => (
            <div
              key={song.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 transition-all hover:border-red-500/50 md:flex-row"
            >
              <div className="relative h-48 bg-black md:h-auto md:w-2/5">
                <img
                  src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                  alt={song.title}
                  className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                    <div className="ml-1 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-5 md:w-3/5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-white text-xl">{song.title}</h3>
                  <span className="rounded border border-slate-600 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                    {song.key}
                  </span>
                </div>
                <p className="mb-4 font-medium text-indigo-400 text-sm">{song.artist}</p>
                <Button
                  onClick={(e) => onSelectRealSong(song, e.detail > 1)}
                  variant="secondary"
                  className="mt-auto border-none hover:bg-red-600 hover:text-white"
                >
                  {t('home.startChallenge')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
