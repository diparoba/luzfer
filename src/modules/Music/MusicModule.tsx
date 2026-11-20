import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ARTISTAS_FAVORITOS, MOMENTOS_MUSICA } from '../../../electron/db/seedData';
import {
  Music,
  Play,
  Pause,
  Disc3,
  Flame,
  Volume2,
  ShieldCheck,
  ExternalLink,
  Timer
} from 'lucide-react';

export const MusicModule: React.FC = () => {
  const { currentSong, togglePlayMusic, setSongMoment } = useAppStore();
  const [explicitFilterActive, setExplicitFilterActive] = useState(true);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);

  return (
    <div className="space-y-6">
      {/* Top Banner with Artists Spotlight */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-mint-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
              Spotify & Hub Musical de Luzfer
            </span>
            <h2 className="text-xl font-display font-extrabold mt-1">
              Tu música favorita para cada momento del día 🎧
            </h2>
            <p className="text-xs text-brand-100 max-w-xl mt-1">
              Conexión directa con Spotify Web Playback SDK. Si no hay conexión Premium, se abre en la aplicación de Spotify sin interrumpir tu estudio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setExplicitFilterActive(!explicitFilterActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                explicitFilterActive
                  ? 'bg-mint-500 text-brand-950 ring-2 ring-mint-300'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Filtro Explícito: {explicitFilterActive ? 'Activo' : 'Inactivo'}</span>
            </button>
          </div>
        </div>

        {/* Pomodoro Timer Bar */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-mint-400" />
            <span className="font-bold">Modo Pomodoro (25 min enfoque / 5 min descanso):</span>
            <span className="font-mono text-mint-300 font-extrabold text-sm">
              {Math.floor(pomodoroSeconds / 60)}:00
            </span>
          </div>

          <button
            onClick={() => {
              setPomodoroActive(!pomodoroActive);
              if (!currentSong.isPlaying) togglePlayMusic();
            }}
            className="px-3.5 py-1 rounded-lg bg-mint-400 text-brand-950 font-bold hover:bg-mint-300 transition"
          >
            {pomodoroActive ? 'Pausar Pomodoro' : 'Iniciar Pomodoro'}
          </button>
        </div>
      </div>

      {/* Playlists por Momento */}
      <div>
        <h3 className="font-display font-bold text-base text-brand-950 dark:text-white mb-3">
          Playlists por Momento del Día
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOMENTOS_MUSICA.map((m) => {
            const isCurrent = currentSong.moment === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSongMoment(m.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isCurrent
                    ? 'bg-white dark:bg-darkSurface-card border-brand-500 ring-2 ring-brand-400/50 shadow-md'
                    : 'bg-white dark:bg-darkSurface-card border-brand-100 dark:border-darkSurface-border hover:shadow-xs'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm transition group-hover:scale-105"
                  style={{ backgroundColor: m.color }}
                >
                  <Music className="w-5 h-5" />
                </div>

                <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
                  {m.titulo}
                </h4>
                <p className="text-xs text-gray-500 dark:text-darkSurface-muted mt-1 leading-relaxed">
                  {m.descripcion}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-50 dark:border-darkSurface-border">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">
                    {isCurrent ? 'Reproduciendo ahora' : 'Tocar playlist'}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full bg-brand-50 dark:bg-darkSurface-cardHover flex items-center justify-center text-brand-700 dark:text-white"
                  >
                    {isCurrent && currentSong.isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artistas Favoritos de Luz Fernanda */}
      <div>
        <h3 className="font-display font-bold text-base text-brand-950 dark:text-white mb-3 flex items-center gap-2">
          <span>Mis Artistas Favoritos</span>
          <span className="text-xs text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full font-bold">
            Selección Luzfer 💜
          </span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ARTISTAS_FAVORITOS.map((art, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border text-center space-y-2 hover:shadow-md transition"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl shadow-inner border border-white/20"
                style={{ backgroundColor: `${art.color}20` }}
              >
                <span>{art.cover}</span>
              </div>
              <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white truncate">
                {art.nombre}
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-darkSurface-muted">
                {art.genero}
              </p>
              <button
                onClick={() => setSongMoment('tareas')}
                className="w-full py-1 text-[11px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-darkSurface-cardHover rounded-lg hover:bg-brand-100 transition"
              >
                Escuchar éxitos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
