import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import {
  CalendarDays,
  Clock,
  CheckSquare,
  Award,
  FileQuestion,
  Layers,
  Music,
  ShieldAlert,
  Settings,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setShowOnboarding } = useAppStore();

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'planner', label: 'Planner & Horario', icon: <CalendarDays className="w-5 h-5" /> },
    { id: 'afternoon', label: 'Tarde Inteligente', icon: <Clock className="w-5 h-5" />, badge: 'Auto' },
    { id: 'tasks', label: 'Tareas & Deberes', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'acreditaciones', label: 'Acreditaciones', icon: <Award className="w-5 h-5" /> },
    { id: 'exams', label: 'Simulador IA', icon: <FileQuestion className="w-5 h-5" /> },
    { id: 'flashcards', label: 'Flashcards SM-2', icon: <Layers className="w-5 h-5" /> },
    { id: 'music', label: 'Mi Música & Spotify', icon: <Music className="w-5 h-5" /> },
    { id: 'focus', label: 'Modo Enfoque', icon: <ShieldAlert className="w-5 h-5" />, badge: 'Escudo' },
    { id: 'settings', label: 'Ajustes & Cuentas', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#1A102F] border-r border-brand-100 dark:border-darkSurface-border flex flex-col justify-between p-4 transition-colors select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-brand-100 dark:border-darkSurface-border">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-800 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-mint-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-brand-900 dark:text-white">LUZFER</span>
              <span className="text-[10px] bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 px-1.5 py-0.5 rounded font-bold">10° B</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-darkSurface-muted font-medium">Paulo VI • 2026-2027</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-700 to-brand-600 text-white shadow-sm shadow-brand-600/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-darkSurface-cardHover hover:text-brand-800 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-mint-300' : 'text-gray-400 dark:text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-mint-100 dark:bg-mint-950/60 text-mint-700 dark:text-mint-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Help card */}
      <div className="pt-4 border-t border-brand-100 dark:border-darkSurface-border space-y-2">
        <button
          onClick={() => setShowOnboarding(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-xl transition"
        >
          <HelpCircle className="w-4 h-4 text-brand-500" />
          <span>Guía de inicio (Onboarding)</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-50/60 dark:bg-darkSurface-card border border-purple-100 dark:border-darkSurface-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            LF
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-800 dark:text-white truncate">Luz Fernanda</p>
            <p className="text-[10px] text-mint-600 dark:text-mint-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse"></span>
              Modo Conectado
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
