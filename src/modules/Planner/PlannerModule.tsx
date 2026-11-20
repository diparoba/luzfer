import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { HorarioClase } from '../../types';
import {
  Calendar as CalendarIcon,
  Backpack,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flag,
  Info
} from 'lucide-react';

export const PlannerModule: React.FC = () => {
  const { horario, periodos, feriados, materias } = useAppStore();
  const [viewMode, setViewMode] = useState<'semanal' | 'diaria' | 'feriados'>('semanal');
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay() || 1); // 1 = Lunes

  const diasSemana = [
    { id: 1, nombre: 'Lunes' },
    { id: 2, nombre: 'Martes' },
    { id: 3, nombre: 'Miércoles' },
    { id: 4, nombre: 'Jueves' },
    { id: 5, nombre: 'Viernes' },
  ];

  // Identificar materias para mañana (si hoy es viernes, mañana es lunes)
  const mananaDiaId = selectedDay >= 5 ? 1 : selectedDay + 1;
  const clasesManana = horario.filter(h => h.dia_semana === mananaDiaId);
  const materiasMananaUnicas = Array.from(new Set(clasesManana.map(c => c.nombre_corto)));

  // Algoritmo de agrupación de clases consecutivas de la misma materia
  const getMergedDayClasses = (diaId: number) => {
    const clasesDelDia = horario
      .filter(h => h.dia_semana === diaId)
      .sort((a, b) => a.periodo_numero - b.periodo_numero);

    const merged: {
      materia_id: number;
      nombre: string;
      nombre_corto: string;
      color_hex: string;
      color_bg: string;
      periodoInicio: number;
      periodoFin: number;
      horaInicio: string;
      horaFin: string;
      icono: string;
    }[] = [];

    for (let i = 0; i < clasesDelDia.length; i++) {
      const current = clasesDelDia[i];
      const next = clasesDelDia[i + 1];

      const pInicio = periodos.find(p => p.numero === current.periodo_numero);
      
      // Si la siguiente clase es de la misma materia y es consecutiva (sin salto de recreo o siendo el siguiente periodo)
      if (next && next.materia_id === current.materia_id && (next.periodo_numero === current.periodo_numero + 1)) {
        const pFin = periodos.find(p => p.numero === next.periodo_numero);
        merged.push({
          materia_id: current.materia_id,
          nombre: current.nombre,
          nombre_corto: current.nombre_corto,
          color_hex: current.color_hex,
          color_bg: current.color_bg,
          periodoInicio: current.periodo_numero,
          periodoFin: next.periodo_numero,
          horaInicio: pInicio?.hora_inicio || '07:00',
          horaFin: pFin?.hora_fin || '08:30',
          icono: current.icono,
        });
        i++; // Saltar la siguiente porque ya está agrupada
      } else {
        merged.push({
          materia_id: current.materia_id,
          nombre: current.nombre,
          nombre_corto: current.nombre_corto,
          color_hex: current.color_hex,
          color_bg: current.color_bg,
          periodoInicio: current.periodo_numero,
          periodoFin: current.periodo_numero,
          horaInicio: pInicio?.hora_inicio || '',
          horaFin: pInicio?.hora_fin || '',
          icono: current.icono,
        });
      }
    }
    return merged;
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Mochila preview */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-extrabold text-brand-950 dark:text-white flex items-center gap-2">
            <span>Horario & Planner Escolar</span>
            <span className="text-xs bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full font-bold">
              10mo 'B' Paulo VI
            </span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-darkSurface-muted">
            Jornada matutina: 07:00 a 12:35 con Recreo fijo (10:30 - 11:10)
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-darkSurface-card p-1 rounded-xl border border-brand-200/80 dark:border-darkSurface-border">
          <button
            onClick={() => setViewMode('semanal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'semanal'
                ? 'bg-brand-700 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-brand-700'
            }`}
          >
            Vista Semanal
          </button>
          <button
            onClick={() => setViewMode('diaria')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'diaria'
                ? 'bg-brand-700 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-brand-700'
            }`}
          >
            Vista Diaria
          </button>
          <button
            onClick={() => setViewMode('feriados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'feriados'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-amber-600'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Feriados Ecuador</span>
          </button>
        </div>
      </div>

      {/* Mochila para Mañana Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-brand-800 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-mint-300">
            <Backpack className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wide uppercase text-mint-300">
              ¿Qué materias tengo mañana? (Mochila Lista 🎒)
            </h4>
            <p className="text-xs text-brand-100 mt-0.5">
              Prepara los cuadernos y tareas de: <span className="font-semibold text-white">{materiasMananaUnicas.join(', ')}</span>.
            </p>
          </div>
        </div>
        <span className="text-[11px] bg-white/20 px-3 py-1 rounded-full font-bold self-end md:self-auto">
          {diasSemana.find(d => d.id === mananaDiaId)?.nombre}
        </span>
      </div>

      {/* Content based on view */}
      {viewMode === 'semanal' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {diasSemana.map((dia) => {
            const mergedClasses = getMergedDayClasses(dia.id);
            return (
              <div
                key={dia.id}
                className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-3 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-brand-100 dark:border-darkSurface-border">
                  <span className="font-display font-extrabold text-sm text-brand-900 dark:text-white">
                    {dia.nombre}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {mergedClasses.length} bloques
                  </span>
                </div>

                <div className="space-y-2">
                  {mergedClasses.map((item, idx) => {
                    const isDouble = item.periodoFin > item.periodoInicio;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border transition-all hover:shadow-xs"
                        style={{
                          backgroundColor: item.color_bg,
                          borderColor: `${item.color_hex}40`,
                          borderLeftWidth: '4px',
                          borderLeftColor: item.color_hex,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold text-xs truncate"
                            style={{ color: item.color_hex }}
                          >
                            {item.nombre_corto}
                          </span>
                          {isDouble && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/20 text-gray-700 dark:text-gray-200">
                              Bloque Doble
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{item.horaInicio} - {item.horaFin}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Bloque de recreo informativo */}
                  <div className="p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 text-amber-800 dark:text-amber-300 text-[10px] font-semibold text-center flex items-center justify-center gap-1">
                    <span>🍎 Recreo: 10:30 - 11:10</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'diaria' && (
        <div className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {diasSemana.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDay(d.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedDay === d.id
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'bg-brand-50 dark:bg-darkSurface-cardHover text-gray-600 dark:text-gray-300'
                }`}
              >
                {d.nombre}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {getMergedDayClasses(selectedDay).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border"
                style={{
                  backgroundColor: item.color_bg,
                  borderColor: `${item.color_hex}40`,
                  borderLeftWidth: '5px',
                  borderLeftColor: item.color_hex,
                }}
              >
                <div>
                  <h4 className="font-bold text-sm" style={{ color: item.color_hex }}>
                    {item.nombre}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    Periodo {item.periodoInicio}{item.periodoFin > item.periodoInicio ? ` y ${item.periodoFin}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    {item.horaInicio} a {item.horaFin}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'feriados' && (
        <div className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-brand-950 dark:text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-amber-500" />
              <span>Feriados Nacionales y Días Festivos (Ecuador 2026-2027)</span>
            </h3>
            <span className="text-xs text-gray-500">
              No se programan clases ni deberes en estos días
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {feriados.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/30 bg-amber-50/40 dark:bg-darkSurface-card space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-900 dark:text-amber-200 truncate">
                    {f.nombre}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                    {f.fecha_observada}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-darkSurface-muted">
                  {f.observaciones || 'Feriado nacional'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
