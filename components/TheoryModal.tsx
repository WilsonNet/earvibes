import type React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../i18n/I18nContext';
import { Button } from './Button';

interface Props {
  content: string;
  onStart: (isRepeatClick?: boolean) => void;
  onBack?: (isRepeatClick?: boolean) => void;
  isLoading: boolean;
}

export const TheoryModal: React.FC<Props> = ({ content, onStart, onBack, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className="fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="flex items-center justify-between rounded-t-2xl border-slate-700 border-b bg-slate-800/50 p-6">
          <h2 className="font-bold text-2xl text-white">{t('theory.title')}</h2>
          {onBack && (
            <button
              type="button"
              onClick={(e) => onBack(e.detail > 1)}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
              aria-label={t('common.back')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="prose prose-invert prose-indigo max-w-none flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-3/4 rounded bg-slate-700"></div>
              <div className="h-4 w-1/2 rounded bg-slate-700"></div>
              <div className="h-32 w-full rounded bg-slate-700"></div>
              <div className="h-4 w-5/6 rounded bg-slate-700"></div>
            </div>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>

        <div className="flex justify-end gap-3 rounded-b-2xl border-slate-700 border-t bg-slate-800/50 p-6">
          {onBack && (
            <Button onClick={(e) => onBack(e.detail > 1)} variant="ghost">
              {t('common.back')}
            </Button>
          )}
          <Button
            onClick={(e) => onStart(e.detail > 1)}
            disabled={isLoading}
            className="min-w-[150px]"
          >
            {isLoading ? t('theory.generating') : t('theory.startQuiz')}
          </Button>
        </div>
      </div>
    </div>
  );
};
