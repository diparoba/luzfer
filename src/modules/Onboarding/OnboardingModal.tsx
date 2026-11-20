import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Sparkles, Check, ArrowRight, ShieldCheck, Music, Calendar, BookOpen, X } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, setShowOnboarding } = useAppStore();
  const [step, setStep] = useState(1);

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A102F] border border-brand-200 dark:border-darkSurface-border rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setShowOnboarding(false)}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-darkSurface-cardHover flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-900/60'
                    : step > s
                    ? 'bg-mint-400 text-brand-950'
                    : 'bg-gray-100 dark:bg-darkSurface-card text-gray-400'
                }`}
              >
                {step > s ? <Check className="w-4 h-4 stroke-[3]" /> : s}
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
            Paso {step} de 4
          </span>
        </div>

        {/* Step 1: Horario Escolar */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-brand-950 dark:text-white">
              ¡Bienvenida a tu Asistente, Luz Fernanda! 💜
            </h2>
            <p className="text-sm text-gray-600 dark:text-darkSurface-muted leading-relaxed">
              Hemos precargado tu horario oficial de <strong>Décimo Grado 'B'</strong> de la <strong>Unidad Educativa Paulo VI</strong> con los 8 periodos y el recreo fijo de 10:30 a 11:10.
            </p>
            <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border">
              <p className="text-xs font-bold text-brand-900 dark:text-brand-200 mb-2">Materias Clave del 10mo 'B':</p>
              <div className="flex flex-wrap gap-1.5">
                {['Matemática', 'Lengua y Lit.', 'Inglés', 'Maker Lab (D y B)', 'C. Naturales', 'E. Sociales', 'D. A. Musical', 'A. I. A.'].map((m, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-brand-950/40 text-brand-800 dark:text-brand-300 font-semibold border border-brand-200/60 dark:border-darkSurface-border">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Integraciones */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <Music className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-brand-950 dark:text-white">
              Conexión con Spotify, Teams y Edi Santillana
            </h2>
            <p className="text-sm text-gray-600 dark:text-darkSurface-muted">
              Sincroniza tus deberes y tu música favorita para estudiar con la mejor vibra.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-brand-200 dark:border-darkSurface-border bg-white dark:bg-darkSurface-card">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">Spotify Web API & SDK</p>
                    <p className="text-[11px] text-gray-500">Playlists de Romeo Santos, Aventura, Karol G y Bad Bunny</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-mint-600 dark:text-mint-400 bg-mint-50 dark:bg-mint-950/40 px-2.5 py-1 rounded-full border border-mint-200">
                  Listo
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-brand-200 dark:border-darkSurface-border bg-white dark:bg-darkSurface-card">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">Microsoft Teams (Paulo VI)</p>
                    <p className="text-[11px] text-gray-500">Importación de tareas y fechas de entrega del aula virtual</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-lg">
                  Vincular
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-brand-200 dark:border-darkSurface-border bg-white dark:bg-darkSurface-card">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-white">Edi Santillana</p>
                    <p className="text-[11px] text-gray-500">Lector asistido de correos de notificación de deberes</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-lg">
                  Activar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Rutina de la tarde y Bloqueo */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-brand-950 dark:text-white">
              Organizador de la Tarde y Modo Enfoque
            </h2>
            <p className="text-sm text-gray-600 dark:text-darkSurface-muted">
              Tus clases terminan a las 12:35. LUZFER programa automáticamente:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-darkSurface-card border border-purple-100 dark:border-darkSurface-border">
                <p className="font-bold text-brand-900 dark:text-brand-200">12:35 - 14:00</p>
                <p className="text-gray-500">Almuerzo y descanso relajado</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-darkSurface-card border border-blue-100 dark:border-darkSurface-border">
                <p className="font-bold text-blue-900 dark:text-blue-200">14:00 - 16:30</p>
                <p className="text-gray-500">Tareas y estudio prioritario</p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-50/70 dark:bg-darkSurface-card border border-cyan-100 dark:border-darkSurface-border">
                <p className="font-bold text-cyan-900 dark:text-cyan-200">16:30 - 17:30</p>
                <p className="text-gray-500">Acreditaciones y Maker Lab</p>
              </div>
              <div className="p-3 rounded-xl bg-mint-50/70 dark:bg-darkSurface-card border border-mint-200 dark:border-darkSurface-border">
                <p className="font-bold text-mint-900 dark:text-mint-200">17:30 - 19:30 ✨</p>
                <p className="text-gray-500">Tiempo Libre Protegido (Desbloqueo total)</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 italic">
              * Durante las tareas y el estudio se bloquean Instagram, TikTok y los videojuegos seleccionados.
            </p>
          </div>
        )}

        {/* Step 4: Primeros Apuntes */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-brand-950 dark:text-white">
              Sube tus Primeros Apuntes
            </h2>
            <p className="text-sm text-gray-600 dark:text-darkSurface-muted">
              Sube fotos de tu cuaderno, PDFs o documentos de Word. La IA generará simulacros de examen y flashcards con repetición espaciada SM-2.
            </p>
            <div className="border-2 border-dashed border-brand-300 dark:border-brand-800 rounded-2xl p-6 text-center hover:bg-brand-50/50 dark:hover:bg-brand-950/30 transition cursor-pointer">
              <Sparkles className="w-8 h-8 text-brand-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-brand-900 dark:text-white">Arrastra tus archivos aquí o haz clic para explorar</p>
              <p className="text-[11px] text-gray-400 mt-1">Soporta PDF, DOCX, TXT e imágenes (OCR automático)</p>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-brand-100 dark:border-darkSurface-border">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-brand-700 px-4 py-2"
            >
              Atrás
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowOnboarding(false)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-mint-500 hover:opacity-95 text-white font-bold text-xs shadow-lg transition"
            >
              <span>¡Comenzar a Usar LUZFER! 💜</span>
              <Sparkles className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
