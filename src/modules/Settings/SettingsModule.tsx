import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import {
  Settings,
  Bell,
  User,
  Shield,
  Download,
  Database,
  ExternalLink,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [morningSummaryTime, setMorningSummaryTime] = useState('06:30');
  const [nightSummaryTime, setNightSummaryTime] = useState('20:00');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-display font-extrabold text-brand-950 dark:text-white flex items-center gap-2">
          <span>Ajustes & Integraciones</span>
        </h2>
        <p className="text-xs text-gray-500 dark:text-darkSurface-muted">
          Personaliza tu perfil, horarios de recordatorios y vincula tus plataformas educativas.
        </p>
      </div>

      {/* Perfil */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border space-y-4 shadow-xs">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-brand-600" />
          <span>Perfil de Estudiante</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-500">Nombre Completo</label>
            <input
              type="text"
              readOnly
              value="Luz Fernanda"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-200 dark:border-darkSurface-border font-semibold text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-gray-500">Institución Educativa</label>
            <input
              type="text"
              readOnly
              value="Unidad Educativa Giovanni Battista Montini PAULO VI (Ecuador)"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-200 dark:border-darkSurface-border font-semibold text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-gray-500">Curso & Grado</label>
            <input
              type="text"
              readOnly
              value="Décimo Grado 'B'"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-200 dark:border-darkSurface-border font-semibold text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-gray-500">Año Lectivo</label>
            <input
              type="text"
              readOnly
              value="2026 - 2027"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-200 dark:border-darkSurface-border font-semibold text-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Recordatorios y Notificaciones Nativas */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border space-y-4 shadow-xs">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <span>Horarios de Recordatorios y Resúmenes</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-100 dark:border-darkSurface-border">
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Resumen Matutino (Antes de clases)</p>
              <p className="text-gray-500">Te avisa qué materias tienes hoy y tareas para la primera hora</p>
            </div>
            <input
              type="time"
              value={morningSummaryTime}
              onChange={(e) => setMorningSummaryTime(e.target.value)}
              className="px-2 py-1 rounded-lg border border-gray-200 bg-white dark:bg-darkSurface-card text-xs font-bold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-100 dark:border-darkSurface-border">
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Resumen Nocturno (Mochila para mañana)</p>
              <p className="text-gray-500">Te recuerda alistar libros, cuadernos y repasar para mañana</p>
            </div>
            <input
              type="time"
              value={nightSummaryTime}
              onChange={(e) => setNightSummaryTime(e.target.value)}
              className="px-2 py-1 rounded-lg border border-gray-200 bg-white dark:bg-darkSurface-card text-xs font-bold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-darkSurface-cardHover border border-gray-100 dark:border-darkSurface-border">
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Avisos de Bloques de la Tarde</p>
              <p className="text-gray-500">Notificación al cambiar entre almuerzo, tareas, estudio y tiempo libre</p>
            </div>
            <span className="text-mint-600 font-bold">Activado</span>
          </div>
        </div>
      </div>

      {/* Integraciones Educativas */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border space-y-4 shadow-xs">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>Plataformas Escolares & Avisos al Móvil</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-100 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-cardHover">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Microsoft Teams (Microsoft Graph API)</p>
              <p className="text-gray-500">Sincroniza asignaciones de tareas y eventos del calendario de Paulo VI</p>
            </div>
            <span className="text-xs font-bold text-mint-600 bg-mint-50 px-2.5 py-1 rounded-full border border-mint-200">
              Conectado
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-100 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-cardHover">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Edi Santillana</p>
              <p className="text-gray-500">
                Lector de correos de notificación e importador asistido (sin API pública)
              </p>
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              Asistente Activo
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-100 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-cardHover">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Avisos a Telegram / Celular</p>
              <p className="text-gray-500">Recibe recordatorios de tareas y exámenes en tu teléfono</p>
            </div>
            <button
              onClick={() => setTelegramConnected(!telegramConnected)}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                telegramConnected ? 'bg-mint-500 text-brand-950' : 'bg-brand-700 text-white'
              }`}
            >
              {telegramConnected ? 'Vinculado ✓' : 'Vincular Bot'}
            </button>
          </div>
        </div>
      </div>

      {/* Respaldo SQLite */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border space-y-3 shadow-xs">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-600" />
          <span>Base de Datos Local SQLite</span>
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Toda tu información está guardada en tu computador en <code className="bg-gray-100 dark:bg-brand-950/60 px-1.5 py-0.5 rounded font-mono text-brand-700">luzfer.sqlite</code>. Funciona 100% sin internet.
        </p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-darkSurface-cardHover hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold text-xs transition">
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Respaldo de mis Datos</span>
        </button>
      </div>
    </div>
  );
};
