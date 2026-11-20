import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Layers, RotateCcw, Check, Sparkles, Brain, Plus } from 'lucide-react';

export const FlashcardsModule: React.FC = () => {
  const { flashcards, responderFlashcard, materias } = useAppStore();
  const [selectedMateriaId, setSelectedMateriaId] = useState<number | 'todas'>('todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = selectedMateriaId === 'todas'
    ? flashcards
    : flashcards.filter(f => f.materia_id === selectedMateriaId);

  const currentCard = filteredCards[currentIndex];

  const handleRating = (rating: number) => {
    if (!currentCard) return;
    responderFlashcard(currentCard.id, rating);
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reiniciar ciclo
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-brand-800 to-indigo-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-mint-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
            Repetición Espaciada SM-2
          </span>
          <h2 className="text-xl font-display font-extrabold mt-1">
            Flashcards Inteligentes de Estudio
          </h2>
          <p className="text-xs text-brand-100 max-w-xl mt-1">
            El algoritmo <strong>SuperMemo-2</strong> calcula cuándo debes repasar cada tarjeta para que nunca se te olvide antes de tus exámenes del Paulo VI.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl font-extrabold text-mint-300 font-display">
            {filteredCards.length}
          </span>
          <p className="text-[11px] text-brand-200">Tarjetas en este mazo</p>
        </div>
      </div>

      {/* Decks Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => { setSelectedMateriaId('todas'); setCurrentIndex(0); setIsFlipped(false); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
            selectedMateriaId === 'todas'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white dark:bg-darkSurface-card text-gray-600 dark:text-gray-300 border border-brand-100 dark:border-darkSurface-border'
          }`}
        >
          Todos los Mazos
        </button>

        {materias.map((m) => (
          <button
            key={m.id}
            onClick={() => { setSelectedMateriaId(m.id); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedMateriaId === m.id
                ? 'bg-brand-700 text-white shadow-sm'
                : 'bg-white dark:bg-darkSurface-card text-gray-600 dark:text-gray-300 border border-brand-100 dark:border-darkSurface-border'
            }`}
          >
            {m.nombre_corto}
          </button>
        ))}
      </div>

      {/* Interactive Flashcard Card */}
      {currentCard ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[280px] p-8 rounded-3xl bg-white dark:bg-darkSurface-card border-2 border-brand-200 dark:border-brand-900 shadow-xl flex flex-col justify-between cursor-pointer hover:border-brand-400 transition-all select-none relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-bold text-gray-400">
              <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
                {currentCard.materia_nombre || 'General'}
              </span>
              <span>Tarjeta {currentIndex + 1} de {filteredCards.length}</span>
            </div>

            {/* Card Content (Anverso / Reverso) */}
            <div className="my-auto text-center py-6">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                    Pregunta (Haz clic para ver la respuesta)
                  </span>
                  <h3 className="text-xl font-display font-extrabold text-gray-900 dark:text-white leading-relaxed">
                    {currentCard.anverso}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold uppercase text-mint-600 tracking-wider">
                    Respuesta
                  </span>
                  <p className="text-lg font-semibold text-brand-900 dark:text-brand-100 leading-relaxed">
                    {currentCard.reverso}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center text-[11px] text-gray-400">
              {isFlipped ? '¿Qué tan bien la sabías?' : 'Haz clic sobre la tarjeta para voltear 🔄'}
            </div>
          </div>

          {/* SM-2 Rating Buttons (Shown only when card is flipped) */}
          {isFlipped ? (
            <div className="p-4 rounded-2xl bg-white dark:bg-darkSurface-card border border-brand-100 dark:border-darkSurface-border space-y-2">
              <p className="text-xs font-bold text-gray-600 dark:text-gray-300 text-center">
                Califica tu recuerdo (Algoritmo SM-2):
              </p>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleRating(1)}
                  className="py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition"
                >
                  Olvidé (1)
                </button>
                <button
                  onClick={() => handleRating(3)}
                  className="py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200 transition"
                >
                  Difícil (3)
                </button>
                <button
                  onClick={() => handleRating(4)}
                  className="py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition"
                >
                  Bien (4)
                </button>
                <button
                  onClick={() => handleRating(5)}
                  className="py-2.5 rounded-xl bg-mint-50 hover:bg-mint-100 text-mint-700 text-xs font-bold border border-mint-200 transition"
                >
                  Fácil (5) ✨
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2.5 rounded-xl bg-brand-700 text-white font-bold text-xs shadow-md"
              >
                Voltear Tarjeta
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-darkSurface-card rounded-2xl border border-gray-100 dark:border-darkSurface-border">
          <Layers className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-700 dark:text-white">No hay flashcards para esta materia</p>
        </div>
      )}
    </div>
  );
};
