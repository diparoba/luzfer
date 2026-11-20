import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import {
  CheckSquare,
  Plus,
  Calendar,
  AlertCircle,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

export const TasksModule: React.FC = () => {
  const { tareas, completarTarea, agregarTarea, materias, acreditaciones, examenes } = useAppStore();
  const [filter, setFilter] = useState<'todas' | 'hoy' | 'semana' | 'atrasadas'>('todas');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMateriaId, setNewMateriaId] = useState(1);
  const [newPriority, setNewPriority] = useState<'alta' | 'media' | 'baja'>('media');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const m = materias.find(mat => mat.id === Number(newMateriaId));
    agregarTarea({
      titulo: newTitle,
      materia_id: Number(newMateriaId),
      materia_nombre: m?.nombre_corto || 'General',
      materia_color: m?.color_hex || '#7C3AED',
      prioridad: newPriority,
      fecha_limite: new Date(Date.now() + 86400000 * 2).toISOString(),
    });
    setNewTitle('');
    setShowNewTaskModal(false);
  };

  const getFilteredTareas = () => {
    if (filter === 'hoy') {
      return tareas.filter(t => t.estado !== 'completada').slice(0, 2);
    }
    if (filter === 'semana') {
      return tareas.filter(t => t.estado !== 'completada');
    }
    if (filter === 'atrasadas') {
      return tareas.filter(t => new Date(t.fecha_limite) < new Date() && t.estado !== 'completada');
    }
    return tareas;
  };

  const filteredTareas = getFilteredTareas();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-extrabold text-brand-950 dark:text-white flex items-center gap-2">
            <span>Tareas, Deberes & Acreditaciones</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-darkSurface-muted">
            Administra tus entregas de clase, proyectos Maker Lab y el avance de tus acreditaciones.
          </p>
        </div>

        <button
          onClick={() => setShowNewTaskModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Tarea</span>
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-brand-100 dark:border-darkSurface-border pb-3">
        {[
          { id: 'todas', label: 'Todas las tareas' },
          { id: 'hoy', label: 'Para Hoy' },
          { id: 'semana', label: 'Esta Semana' },
          { id: 'atrasadas', label: 'Atrasadas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === tab.id
                ? 'bg-brand-100 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300'
                : 'text-gray-500 hover:text-brand-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-3">
        {filteredTareas.map((tarea) => {
          const isDone = tarea.estado === 'completada';
          return (
            <div
              key={tarea.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-gray-50/70 dark:bg-darkSurface-card/50 border-gray-200 dark:border-darkSurface-border opacity-70'
                  : 'bg-white dark:bg-darkSurface-card border-brand-100 dark:border-darkSurface-border shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => completarTarea(tarea.id)}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                      isDone
                        ? 'bg-mint-500 border-mint-500 text-white'
                        : 'border-gray-300 dark:border-darkSurface-border hover:border-brand-500'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${tarea.materia_color || '#7C3AED'}15`,
                          color: tarea.materia_color || '#7C3AED',
                        }}
                      >
                        {tarea.materia_nombre}
                      </span>

                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          tarea.prioridad === 'alta'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : tarea.prioridad === 'media'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        }`}
                      >
                        {tarea.prioridad}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold mt-1 ${isDone ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                      {tarea.titulo}
                    </h4>

                    {tarea.descripcion && (
                      <p className="text-xs text-gray-500 dark:text-darkSurface-muted mt-1 leading-relaxed">
                        {tarea.descripcion}
                      </p>
                    )}

                    {/* Subtareas */}
                    {tarea.subtareas && tarea.subtareas.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {tarea.subtareas.map((st) => (
                          <div key={st.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                            <input
                              type="checkbox"
                              checked={st.completada}
                              readOnly
                              className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                            />
                            <span className={st.completada ? 'line-through text-gray-400' : ''}>{st.titulo}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Entrega: {new Date(tarea.fecha_limite).toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nueva Tarea */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A102F] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-200 dark:border-darkSurface-border">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Nueva Tarea de Clase</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Título del deber</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Resumen de Historia Pág. 32"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-card text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Materia</label>
                <select
                  value={newMateriaId}
                  onChange={(e) => setNewMateriaId(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-card text-xs"
                >
                  {materias.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Prioridad</label>
                <div className="flex gap-2 mt-1">
                  {(['alta', 'media', 'baja'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewPriority(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                        newPriority === p ? 'bg-brand-700 text-white' : 'bg-gray-100 dark:bg-darkSurface-card text-gray-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-700 text-white font-bold text-xs"
                >
                  Guardar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
