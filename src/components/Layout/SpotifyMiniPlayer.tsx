import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Play, Pause, SkipForward, Disc3, Volume2 } from 'lucide-react';

export const SpotifyMiniPlayer: React.FC = () => {
  const { currentSong, togglePlayMusic, setSongMoment } = useAppStore();

  const moments = [
    { id: 'estudiar', label: 'Estudiar', emoji: '🧠' },
    { id: 'tareas', label: 'Tareas', emoji: '✨' },
    { id: 'descanso', label: 'Descanso', emoji: '☕' },
    { id: 'recreo', label: 'Recreo', emoji: '🎉' },
  ];

  return (
    <div className="flex items-center gap-3 bg-brand-50/80 dark:bg-darkSurface-card/90 border border-brand-200/80 dark:border-darkSurface-border px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
      {/* Vinyl Art */}
      <div className="relative flex items-center justify-center">
        <Disc3 className={`w-6 h-6 text-brand-600 dark:text-brand-400 ${currentSong.isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span className="absolute w-2 h-2 rounded-full bg-mint-400"></span>
      </div>

      {/* Song details */}
      <div className="flex flex-col min-w-[120px] max-w-[180px]">
        <span className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">
          {currentSong.title}
        </span>
        <span className="text-[10px] text-brand-700 dark:text-brand-300 truncate font-medium">
          {currentSong.artist}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={togglePlayMusic}
          className="w-7 h-7 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition shadow-sm"
          title={currentSong.isPlaying ? 'Pausar música' : 'Reproducir'}
        >
          {currentSong.isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        <button
          onClick={() => {
            const nextMap: Record<string, string> = { estudiar: 'tareas', tareas: 'descanso', descanso: 'recreo', recreo: 'estudiar' };
            setSongMoment(nextMap[currentSong.moment] || 'tareas');
          }}
          className="w-7 h-7 rounded-full text-gray-500 hover:text-brand-700 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition"
          title="Siguiente playlist por momento"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Moment chips */}
      <div className="hidden lg:flex items-center gap-1 border-l border-brand-200 dark:border-darkSurface-border pl-2">
        {moments.map((m) => {
          const isSelected = currentSong.moment === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSongMoment(m.id)}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-brand-100 dark:hover:bg-darkSurface-cardHover'
              }`}
            >
              <span>{m.emoji}</span> {m.label}
            </button>
          );
        })}
      </div>

      <Volume2 className="w-4 h-4 text-brand-400 dark:text-darkSurface-muted hidden xl:block" />
    </div>
  );
};
