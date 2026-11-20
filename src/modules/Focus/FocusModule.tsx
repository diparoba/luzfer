import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Globe,
  Monitor,
  Flame,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const FocusModule: React.FC = () => {
  const { isFocusModeActive, toggleFocusMode } = useAppStore();
  const [strictMode, setStrictMode] = useState(false);
  const [password, setPassword] = useState('');
  const [blockedWebsites, setBlockedWebsites] = useState([
    'instagram.com',
    'tiktok.com',
    'roblox.com',
    'twitch.tv'
  ]);
  const [blockedApps, setBlockedApps] = useState([
    'RobloxPlayerBeta.exe',
    'Discord.exe',
    'Steam.exe',
    'EpicGamesLauncher.exe'
  ]);
  const [newSite, setNewSite] = useState('');

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSite.trim()) return;
    setBlockedWebsites([...blockedWebsites, newSite.trim().toLowerCase()]);
    setNewSite('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Big Focus Switch */}
      <div className={`p-8 rounded-3xl text-white shadow-xl transition-all ${
        isFocusModeActive
          ? 'bg-gradient-to-r from-emerald-950 via-brand-900 to-purple-950 border-2 border-mint-400'
          : 'bg-gradient-to-r from-brand-950 via-purple-900 to-indigo-950'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                isFocusModeActive ? 'bg-mint-400 text-brand-950' : 'bg-white/10 text-white'
              }`}>
                {isFocusModeActive ? 'Escudo Antidistracciones ACTIVO' : 'Escudo en Reposo'}
              </span>
              <span className="text-xs text-brand-200">Chrome + Windows</span>
            </div>

            <h2 className="text-2xl font-display font-extrabold">
              {isFocusModeActive ? '¡Estás protegida y en Modo Enfoque! 💜' : 'Activa tu Escudo de Estudio'}
            </h2>
            <p className="text-xs text-brand-100 leading-relaxed">
              Durante tu sesión, la extensión de Chrome bloquea Instagram y TikTok con una pantalla motivadora, y el proceso de Windows supervisa que no se abran juegos.
            </p>
          </div>

          <button
            onClick={toggleFocusMode}
            className={`px-8 py-4 rounded-2xl font-display font-extrabold text-sm shadow-xl transition transform active:scale-95 shrink-0 flex items-center gap-3 ${
              isFocusModeActive
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-300 hover:to-mint-400 text-brand-950'
            }`}
          >
            {isFocusModeActive ? (
              <>
                <Unlock className="w-5 h-5" />
                <span>Desactivar Enfoque</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-brand-950" />
                <span>Activar Enfoque (45 min)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold">Horas Enfocadas</span>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white font-display">18.5 horas</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold">Intentos Bloqueados</span>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white font-display">12 intentos</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-mint-100 dark:bg-mint-950/60 text-mint-700 dark:text-mint-300 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold">Racha Cumpliendo Plan</span>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white font-display">5 días seguidos</p>
          </div>
        </div>
      </div>

      {/* Lists of blocked items & Strict Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Web Blocker Card */}
        <div className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-600" />
              <span>Sitios Web Bloqueados en Chrome</span>
            </h3>
            <span className="text-[10px] font-bold text-mint-600 bg-mint-50 px-2 py-0.5 rounded-full border border-mint-200">
              Extensión MV3
            </span>
          </div>

          <form onSubmit={handleAddSite} className="flex gap-2">
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="Ej. twitter.com"
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-card text-xs"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-brand-700 text-white text-xs font-bold"
            >
              Añadir
            </button>
          </form>

          <div className="space-y-1.5">
            {blockedWebsites.map((site, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-darkSurface-border"
              >
                <span>🌐 {site}</span>
                <span className="text-[10px] text-gray-400">Bloqueo activo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Process Blocker Card */}
        <div className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-brand-600" />
              <span>Juegos y Aplicaciones de Escritorio</span>
            </h3>
            <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
              Windows
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            LUZFER monitorea estos procesos en Windows 10/11 y los cierra suavemente mientras estudias:
          </p>

          <div className="space-y-1.5">
            {blockedApps.map((app, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-darkSurface-border"
              >
                <span>🎮 {app}</span>
                <span className="text-[10px] text-gray-400">Supervisado</span>
              </div>
            ))}
          </div>

          {/* Strict Mode Toggle */}
          <div className="pt-2 border-t border-brand-100 dark:border-darkSurface-border flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Modo Estricto con Contraseña</p>
              <p className="text-[11px] text-gray-400">Evita cancelar el enfoque por impulso</p>
            </div>
            <button
              onClick={() => setStrictMode(!strictMode)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                strictMode ? 'bg-brand-600 justify-end' : 'bg-gray-300 dark:bg-darkSurface-border justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
