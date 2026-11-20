import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { SpotifyMiniPlayer } from './SpotifyMiniPlayer';
import { Moon, Sun, Flame, Shield, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isFocusModeActive, toggleFocusMode } = useAppStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días, Luz Fernanda! 💜';
    if (hour < 18) return '¡Buenas tardes, Luzfer! 💜';
    return '¡Buenas noches, Luz Fernanda! 💜';
  };

  const todayStr = new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="h-20 bg-white/80 dark:bg-[#1A102F]/80 backdrop-blur-md border-b border-brand-100 dark:border-darkSurface-border px-8 flex items-center justify-between transition-colors sticky top-0 z-20">
      {/* Left Greeting & Date */}
      <div>
        <h1 className="text-xl font-display font-extrabold text-brand-950 dark:text-white flex items-center gap-2">
          {getGreeting()}
        </h1>
        <p className="text-xs text-gray-500 dark:text-darkSurface-muted capitalize font-medium flex items-center gap-2">
          <span>{todayStr}</span>
          <span className="w-1 h-1 rounded-full bg-brand-300"></span>
          <span className="text-brand-600 dark:text-brand-400 font-semibold">Décimo 'B' • Paulo VI</span>
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Streak badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-xs">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span>Racha: 5 días</span>
        </div>

        {/* Focus Mode Quick Toggle */}
        <button
          onClick={toggleFocusMode}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            isFocusModeActive
              ? 'bg-mint-500 text-brand-950 ring-2 ring-mint-300 hover:bg-mint-400'
              : 'bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-brand-200 hover:bg-brand-200 dark:hover:bg-brand-900 border border-brand-300 dark:border-brand-800'
          }`}
          title="Activa o desactiva el bloqueo de Instagram, TikTok y juegos"
        >
          {isFocusModeActive ? (
            <>
              <ShieldCheck className="w-4 h-4 text-brand-950 animate-bounce" />
              <span>Enfoque Activo (45 min)</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Activar Modo Enfoque</span>
            </>
          )}
        </button>

        {/* Spotify Player */}
        <SpotifyMiniPlayer />

        {/* Dark Mode Switch */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-full bg-brand-50 dark:bg-darkSurface-card hover:bg-brand-100 dark:hover:bg-darkSurface-cardHover text-gray-700 dark:text-gray-300 border border-brand-200 dark:border-darkSurface-border flex items-center justify-center transition shadow-xs"
          title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-brand-700" />}
        </button>
      </div>
    </header>
  );
};
