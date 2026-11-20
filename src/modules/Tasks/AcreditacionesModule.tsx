import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Award, CheckCircle2, Clock, Plus, Target, Sparkles } from 'lucide-react';

export const AcreditacionesModule: React.FC = () => {
  const { acreditaciones, actualizarAcreditacion, examenes } = useAppStore();

  const totalHorasEstimadas = acreditaciones.reduce((acc, a) => acc + a.horas_estimadas, 0);
  const totalHorasCompletadas = acreditaciones.reduce((acc, a) => acc + a.horas_completadas, 0);
  const porcentajeGlobal = Math.round((totalHorasCompletadas / (totalHorasEstimadas || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner with Total Progress Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900 via-brand-800 to-purple-900 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-mint-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-mint-300 uppercase tracking-wider">
                Progreso General de Acreditaciones 10mo 'B'
              </span>
              <h2 className="text-xl font-display font-extrabold">
                {totalHorasCompletadas} de {totalHorasEstimadas} horas completadas
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-mint-300 font-display">{porcentajeGlobal}%</span>
            <p className="text-[10px] text-brand-200">Meta del Año Lectivo 2026-2027</p>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-black/30 rounded-full h-3.5 p-0.5 border border-white/10">
          <div
            className="bg-gradient-to-r from-mint-400 to-emerald-300 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${porcentajeGlobal}%` }}
          ></div>
        </div>
      </div>

      {/* Accreditations List */}
      <div>
        <h3 className="font-display font-bold text-base text-brand-950 dark:text-white mb-3">
          Acreditaciones Requeridas (Maker Lab, Lectura y Pastoral)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {acreditaciones.map((acre) => {
            const isCompleted = acre.porcentaje >= 100;
            return (
              <div
                key={acre.id}
                className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
                      {acre.categoria}
                    </span>
                    <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-1">
                      {acre.titulo}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-darkSurface-muted mt-0.5">
                      Fecha límite: {new Date(acre.fecha_limite).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-brand-700 dark:text-brand-300 font-display">
                      {acre.porcentaje}%
                    </span>
                  </div>
                </div>

                {/* Individual Bar */}
                <div className="w-full bg-gray-100 dark:bg-darkSurface-cardHover rounded-full h-2">
                  <div
                    className="bg-brand-600 dark:bg-brand-400 h-full rounded-full transition-all"
                    style={{ width: `${acre.porcentaje}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-brand-50 dark:border-darkSurface-border text-xs">
                  <span className="text-gray-500 font-medium">
                    {acre.horas_completadas} / {acre.horas_estimadas} horas registradas
                  </span>

                  {!isCompleted && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => actualizarAcreditacion(acre.id, 1)}
                        className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-bold transition flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>1 hora</span>
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <span className="text-mint-600 dark:text-mint-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Completada
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registro de Exámenes */}
      <div className="pt-4 border-t border-brand-100 dark:border-darkSurface-border">
        <h3 className="font-display font-bold text-base text-brand-950 dark:text-white mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-600" />
          <span>Exámenes y Evaluaciones Próximas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examenes.map((ex) => (
            <div
              key={ex.id}
              className="p-4 rounded-xl border border-brand-100 dark:border-darkSurface-border bg-white dark:bg-darkSurface-card flex items-start justify-between"
            >
              <div>
                <span
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${ex.materia_color || '#7C3AED'}15`,
                    color: ex.materia_color || '#7C3AED',
                  }}
                >
                  {ex.materia_nombre}
                </span>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-1">{ex.titulo}</h4>
                <p className="text-xs text-gray-500 dark:text-darkSurface-muted mt-0.5">
                  Temas: {ex.temas}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-lg border border-rose-200">
                  {ex.peso_porcentaje}% de la nota
                </span>
                <p className="text-[11px] text-gray-500 mt-1">{ex.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
