import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Clock, RotateCcw, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const AfternoonModule: React.FC = () => {
  const { bloquesTarde, reorganizarTarde, toggleFocusMode, isFocusModeActive } = useAppStore();

  const getBadgeStyle = (tipo: string) => {
    switch (tipo) {
      case 'almuerzo':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200';
      case 'tareas':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200';
      case 'estudio':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200';
      case 'acreditaciones':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200';
      case 'libre':
        return 'bg-mint-100 text-mint-800 dark:bg-mint-950/60 dark:text-mint-300 border-mint-200 ring-2 ring-mint-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with smart reorganization button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-900 via-brand-800 to-purple-900 text-white shadow-lg">
        <div>
          <span className="text-[11px] font-bold text-mint-300 bg-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Planificador Inteligente de la Tarde
          </span>
          <h2 className="text-xl font-display font-extrabold mt-1">
            Tu tarde organizada automáticamente desde las 12:35
          </h2>
          <p className="text-xs text-brand-100 max-w-xl mt-1 leading-relaxed">
            Prioriza tareas con fecha límite próxima y materias con exámenes. Además, tu bloque de <strong>Tiempo Libre Protegido</strong> queda 100% garantizado para desconectar.
          </p>
        </div>

        <button
          onClick={reorganizarTarde}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-300 hover:to-mint-400 text-brand-950 font-bold text-xs shadow-md transition transform active:scale-95 shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-brand-950" />
          <span>Reorganizar mi tarde</span>
        </button>
      </div>

      {/* Timeline of blocks */}
      <div className="grid grid-cols-1 gap-4">
        {bloquesTarde.map((bloque) => {
          const isFree = bloque.tipo === 'libre';
          return (
            <div
              key={bloque.orden}
              className={`p-5 rounded-2xl border transition-all ${
                isFree
                  ? 'bg-gradient-to-r from-mint-50/70 to-emerald-50/70 dark:bg-mint-950/20 border-mint-300 dark:border-mint-800 shadow-sm'
                  : 'bg-white dark:bg-darkSurface-card border-brand-100 dark:border-darkSurface-border shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-16 h-14 rounded-xl bg-brand-50 dark:bg-darkSurface-cardHover border border-brand-200 dark:border-darkSurface-border">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Inicio</span>
                    <span className="text-sm font-extrabold text-brand-900 dark:text-white">{bloque.horaInicio}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white">
                        {bloque.titulo}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(bloque.tipo)}`}>
                        {bloque.duracionMinutos} min
                      </span>
                      {bloque.esProtegido && (
                        <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-current text-rose-500" />
                          Protegido
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-darkSurface-muted mt-0.5">
                      Horario: {bloque.horaInicio} a {bloque.horaFin}
                    </p>
                  </div>
                </div>

                {/* Focus mode action for study/tasks blocks */}
                {!isFree && bloque.tipo !== 'almuerzo' && (
                  <button
                    onClick={toggleFocusMode}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isFocusModeActive
                        ? 'bg-mint-500 text-brand-950 ring-2 ring-mint-300'
                        : 'bg-brand-50 dark:bg-darkSurface-cardHover text-brand-700 dark:text-brand-300 hover:bg-brand-100'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isFocusModeActive ? 'Enfoque en curso' : 'Iniciar con Enfoque'}</span>
                  </button>
                )}
              </div>

              {/* Items / Tasks inside this block */}
              <div className="mt-4 pt-3 border-t border-brand-100/60 dark:border-darkSurface-border flex flex-wrap gap-2">
                {bloque.detalles.map((detalle, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-darkSurface-cardHover text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-darkSurface-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint-500" />
                    <span>{detalle}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
