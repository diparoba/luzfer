import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { PreguntaSimulacro } from '../../types';
import {
  FileQuestion,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const ExamSimulatorModule: React.FC = () => {
  const { materias, currentSong, togglePlayMusic } = useAppStore();
  const [selectedMateriaId, setSelectedMateriaId] = useState(1);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [examFinished, setExamFinished] = useState(false);

  // Preguntas simuladas de 10mo Grado
  const samplePreguntas: PreguntaSimulacro[] = [
    {
      id: 1,
      tipo: 'multiple',
      enunciado: '¿Cuáles son las soluciones de la ecuación cuadrática x² - 5x + 6 = 0?',
      opciones: ['x = 2 y x = 3', 'x = -2 y x = -3', 'x = 1 y x = 6', 'x = 0 y x = 5'],
      respuestaCorrecta: 'x = 2 y x = 3',
      explicacion: 'Factorizando el trinomio de la forma x² + bx + c: (x - 2)(x - 3) = 0, por tanto x = 2 y x = 3.'
    },
    {
      id: 2,
      tipo: 'vf',
      enunciado: 'En la fórmula general x = (-b ± √(b² - 4ac)) / (2a), si el discriminante (b² - 4ac) es negativo, la ecuación no tiene soluciones reales.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 'Verdadero',
      explicacion: 'La raíz cuadrada de un número negativo pertenece a los números complejos, no a los reales.'
    },
    {
      id: 3,
      tipo: 'multiple',
      enunciado: 'En el plano cartesiano, el vértice de la parábola y = ax² + bx + c se encuentra en la coordenada x dada por:',
      opciones: ['x = -b / (2a)', 'x = -b / a', 'x = 2a / b', 'x = b² / (4a)'],
      respuestaCorrecta: 'x = -b / (2a)',
      explicacion: 'La coordenada en x del eje de simetría y vértice de una función cuadrática es -b / (2a).'
    }
  ];

  const handleStartExam = () => {
    // Si la música está sonando, pausarla automáticamente para simular el examen
    if (currentSong.isPlaying) {
      togglePlayMusic();
    }
    setIsSimulating(true);
    setExamFinished(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleSelectAnswer = (option: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    setIsSimulating(false);
  };

  const calculateScore = () => {
    let correct = 0;
    samplePreguntas.forEach((q, idx) => {
      if (userAnswers[idx] === q.respuestaCorrecta) correct++;
    });
    return Math.round((correct / samplePreguntas.length) * 10 * 10) / 10;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900 to-indigo-950 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-mint-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
            Simulador de Exámenes con IA
          </span>
          <h2 className="text-xl font-display font-extrabold mt-1">
            Generador de Simulacros desde tus Cuadernos y PDFs
          </h2>
          <p className="text-xs text-brand-100 max-w-xl mt-1">
            Sube fotos de tus notas o documentos. La IA genera exámenes idénticos a los del Paulo VI con preguntas de opción múltiple, verdadero/falso y análisis de temas débiles.
          </p>
        </div>

        {!isSimulating && !examFinished && (
          <button
            onClick={handleStartExam}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mint-400 hover:bg-mint-300 text-brand-950 font-bold text-xs shadow-md transition shrink-0"
          >
            <Sparkles className="w-4 h-4 text-brand-950" />
            <span>Iniciar Simulacro Rápido</span>
          </button>
        )}
      </div>

      {/* Main Flow: Upload & Options vs Live Exam vs Results */}
      {!isSimulating && !examFinished && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Uploader Card */}
          <div className="md:col-span-2 bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-brand-600" />
              <span>Subir Apuntes para el Examen</span>
            </h3>

            <div
              onClick={() => setUploadedFileName('Apuntes_Parcial_Matematica_Ecuaciones.pdf')}
              className="border-2 border-dashed border-brand-200 dark:border-brand-800 rounded-2xl p-8 text-center hover:bg-brand-50/50 dark:hover:bg-brand-950/20 transition cursor-pointer"
            >
              <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-brand-950 dark:text-white">
                {uploadedFileName ? `Archivo cargado: ${uploadedFileName}` : 'Arrastra aquí fotos de tu cuaderno, PDF o Word'}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                OCR activo para reconocer tu letra manuscrita
              </p>
            </div>

            {uploadedFileName && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-mint-50 dark:bg-mint-950/30 border border-mint-200 text-xs text-mint-900 dark:text-mint-200 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-mint-600" />
                  Listo para generar 10 preguntas adaptadas
                </span>
                <button
                  onClick={handleStartExam}
                  className="px-3 py-1 bg-brand-700 text-white rounded-lg font-bold"
                >
                  Generar
                </button>
              </div>
            )}
          </div>

          {/* Config Card */}
          <div className="bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">
              Configuración del Test
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Materia</label>
              <select
                value={selectedMateriaId}
                onChange={(e) => setSelectedMateriaId(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-darkSurface-border bg-gray-50 dark:bg-darkSurface-card text-xs font-medium"
              >
                {materias.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-darkSurface-cardHover text-[11px] text-purple-900 dark:text-purple-200 space-y-1">
              <p className="font-bold">💡 Regla de Concentración:</p>
              <p>Al iniciar el examen, la música se pausará automáticamente para evitar distracciones.</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Exam Mode */}
      {isSimulating && (
        <div className="bg-white dark:bg-darkSurface-card border border-brand-200 dark:border-darkSurface-border rounded-3xl p-8 max-w-3xl mx-auto shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-100 dark:border-darkSurface-border">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                Pregunta {currentQuestionIndex + 1} de {samplePreguntas.length}
              </span>
              <h3 className="text-sm font-bold text-gray-500 mt-1">Simulacro de Matemática — 10mo 'B'</h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-3 py-1.5 rounded-full border border-brand-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Tiempo restante: 18:42</span>
            </div>
          </div>

          {/* Enunciado */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
              {samplePreguntas[currentQuestionIndex].enunciado}
            </h4>

            {/* Opciones */}
            <div className="space-y-2.5">
              {samplePreguntas[currentQuestionIndex].opciones?.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestionIndex] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-600 text-brand-900 dark:text-white ring-2 ring-brand-400'
                        : 'border-gray-200 dark:border-darkSurface-border hover:bg-gray-50 dark:hover:bg-darkSurface-cardHover text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="font-bold mr-2 text-brand-600">{String.fromCharCode(65 + idx)})</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-brand-100 dark:border-darkSurface-border">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="px-4 py-2 text-xs font-bold text-gray-500 disabled:opacity-40"
            >
              Anterior
            </button>

            {currentQuestionIndex < samplePreguntas.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-5 py-2 rounded-xl bg-brand-700 text-white font-bold text-xs shadow-md"
              >
                Siguiente Pregunta
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="px-6 py-2 rounded-xl bg-mint-500 hover:bg-mint-400 text-brand-950 font-bold text-xs shadow-md"
              >
                Finalizar Examen y Calificar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results View */}
      {examFinished && (
        <div className="bg-white dark:bg-darkSurface-card border border-brand-200 dark:border-darkSurface-border rounded-3xl p-8 max-w-3xl mx-auto shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-mint-100 text-mint-600 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
              ¡Simulacro Completado, Luzfer! 💜
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-display font-extrabold text-brand-700 dark:text-brand-300">
                {calculateScore()} / 10
              </span>
              <span className="text-xs font-bold text-mint-600 bg-mint-50 px-2 py-0.5 rounded-full border border-mint-200">
                Aprobado
              </span>
            </div>
          </div>

          {/* Weakness Detection Alert */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Detección de Temas a Reforzar:</span>
            </div>
            <p>
              Revisa con atención el signo en el discriminante de la fórmula general. Se han generado 3 nuevas <strong>Flashcards SM-2</strong> automáticamente para reforzar este punto.
            </p>
          </div>

          {/* Questions review */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">Revisión de Preguntas:</h4>
            {samplePreguntas.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.respuestaCorrecta;
              return (
                <div key={q.id} className="p-3.5 rounded-xl border border-gray-100 dark:border-darkSurface-border bg-gray-50/50 dark:bg-darkSurface-cardHover text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-gray-800 dark:text-white">Pregunta {idx + 1}</span>
                    {isCorrect ? (
                      <span className="text-mint-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correcta</span>
                    ) : (
                      <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Revisar</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{q.enunciado}</p>
                  <p className="text-[11px] text-gray-500 italic mt-1">Explicación: {q.explicacion}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setExamFinished(false)}
              className="px-6 py-2.5 rounded-xl bg-brand-700 text-white font-bold text-xs"
            >
              Nuevo Simulacro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
