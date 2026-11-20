import { create } from 'zustand';
import {
  TabType,
  Materia,
  Periodo,
  HorarioClase,
  FeriadoEcuador,
  BloqueTarde,
  Tarea,
  Acreditacion,
  Examen,
  Flashcard
} from '../types';

import {
  MATERIAS_SEED,
  PERIODOS_SEED,
  HORARIO_CLASES_SEED,
  FERIADOS_ECUADOR_SEED,
  ACREDITACIONES_SEED
} from '../../electron/db/seedData';

interface AppStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;

  // Datos principales
  materias: Materia[];
  periodos: Periodo[];
  horario: HorarioClase[];
  feriados: FeriadoEcuador[];
  bloquesTarde: BloqueTarde[];
  tareas: Tarea[];
  acreditaciones: Acreditacion[];
  examenes: Examen[];
  flashcards: Flashcard[];

  // Estado de enfoque y música
  isFocusModeActive: boolean;
  focusRemainingSeconds: number;
  toggleFocusMode: () => void;
  currentSong: { title: string; artist: string; isPlaying: boolean; moment: string };
  togglePlayMusic: () => void;
  setSongMoment: (moment: string) => void;

  // Acciones
  reorganizarTarde: () => void;
  completarTarea: (id: number) => void;
  agregarTarea: (tarea: Partial<Tarea>) => void;
  actualizarAcreditacion: (id: number, horasSumar: number) => void;
  responderFlashcard: (cardId: number, rating: number) => void;
  guardarFeriado: (feriado: Partial<FeriadoEcuador>) => void;
}

// Convertir semilla de clases a HorarioClase con materias embebidas
const initialHorario: HorarioClase[] = HORARIO_CLASES_SEED.map((h, i) => {
  const m = MATERIAS_SEED.find(mat => mat.id === h.materia_id) || MATERIAS_SEED[0];
  return {
    id: i + 1,
    dia_semana: h.dia,
    periodo_numero: h.periodo,
    materia_id: m.id,
    nombre: m.nombre,
    nombre_corto: m.nombre_corto,
    color_hex: m.color_hex,
    color_bg: m.color_bg,
    icono: m.icono,
  };
});

const initialFeriados: FeriadoEcuador[] = FERIADOS_ECUADOR_SEED.map((f, i) => ({
  id: i + 1,
  nombre: f.nombre,
  fecha_original: f.fecha_original,
  fecha_observada: f.fecha_observada,
  es_obligatorio: 1,
  observaciones: f.observaciones,
}));

const initialTareas: Tarea[] = [
  {
    id: 1,
    titulo: 'Ejercicios de Ecuaciones Cuadráticas (Pág. 45-47)',
    materia_id: 1,
    materia_nombre: 'Matemática',
    materia_color: '#4F46E5',
    descripcion: 'Resolver los numerales pares del libro de texto para la clase del viernes.',
    fecha_limite: '2026-11-21T07:00:00',
    prioridad: 'alta',
    estado: 'pendiente',
    subtareas: [
      { id: 1, titulo: 'Ejercicios 2, 4 y 6', completada: true },
      { id: 2, titulo: 'Ejercicios 8, 10 y 12', completada: false },
      { id: 3, titulo: 'Pasar a limpio en el cuaderno', completada: false },
    ]
  },
  {
    id: 2,
    titulo: 'Ensayo sobre Crónica de una Muerte Anunciada',
    materia_id: 2,
    materia_nombre: 'Lengua',
    materia_color: '#9333EA',
    descripcion: 'Análisis de la fatalidad y el honor en los personajes principales (mínimo 500 palabras).',
    fecha_limite: '2026-11-23T07:00:00',
    prioridad: 'alta',
    estado: 'en_progreso',
    subtareas: [
      { id: 4, titulo: 'Tesis y esquema de argumentos', completada: true },
      { id: 5, titulo: 'Redacción de párrafos de desarrollo', completada: true },
      { id: 6, titulo: 'Revisión ortográfica y conclusiones', completada: false },
    ]
  },
  {
    id: 3,
    titulo: 'Presentación Maker Lab: Modelado en 3D',
    materia_id: 7,
    materia_nombre: 'Maker Lab - D',
    materia_color: '#0891B2',
    descripcion: 'Subir el archivo .STL y diapositivas de sustentación a Teams.',
    fecha_limite: '2026-11-24T12:00:00',
    prioridad: 'media',
    estado: 'pendiente'
  },
  {
    id: 4,
    titulo: 'Lectura Capítulos 3 y 4 de Ciencias Naturales',
    materia_id: 4,
    materia_nombre: 'C. Naturales',
    materia_color: '#059669',
    descripcion: 'Ecosistemas de la región Interandina de Ecuador.',
    fecha_limite: '2026-11-25T07:00:00',
    prioridad: 'baja',
    estado: 'pendiente'
  }
];

const initialAcreditaciones: Acreditacion[] = ACREDITACIONES_SEED.map((a, i) => ({
  id: i + 1,
  titulo: a.titulo,
  categoria: a.categoria,
  horas_estimadas: a.horas_estimadas,
  horas_completadas: a.horas_completadas,
  porcentaje: a.porcentaje,
  fecha_limite: a.fecha_limite,
  estado: a.estado as any,
}));

const initialExamenes: Examen[] = [
  {
    id: 1,
    materia_id: 1,
    materia_nombre: 'Matemática',
    materia_color: '#4F46E5',
    titulo: 'Examen Parcial de Álgebra y Funciones',
    fecha: '2026-11-27',
    temas: 'Factorización compuesta, fórmula general, vértice de parábolas',
    peso_porcentaje: 30,
  },
  {
    id: 2,
    materia_id: 4,
    materia_nombre: 'C. Naturales',
    materia_color: '#059669',
    titulo: 'Lección Escrita de Genética y ADN',
    fecha: '2026-12-02',
    temas: 'Leyes de Mendel, cuadros de Punnett, cariotipo humano',
    peso_porcentaje: 20,
  }
];

const initialFlashcards: Flashcard[] = [
  {
    id: 1,
    materia_id: 1,
    materia_nombre: 'Matemática',
    anverso: '¿Cuál es la fórmula general para resolver ecuaciones cuadráticas?',
    reverso: 'x = (-b ± √(b² - 4ac)) / (2a)',
    intervalo_dias: 2,
    repeticiones: 2,
    factor_facilidad: 2.5,
    fecha_proximo_repaso: '2026-11-20'
  },
  {
    id: 2,
    materia_id: 2,
    materia_nombre: 'Lengua',
    anverso: '¿Qué es una metáfora?',
    reverso: 'Figura retórica que traslada el sentido de una palabra a otra mediante una comparación implícita.',
    intervalo_dias: 3,
    repeticiones: 1,
    factor_facilidad: 2.6,
    fecha_proximo_repaso: '2026-11-21'
  },
  {
    id: 3,
    materia_id: 4,
    materia_nombre: 'C. Naturales',
    anverso: '¿Cuál es la función principal de las mitocondrias?',
    reverso: 'Generar la mayor parte de la energía química celular mediante la síntesis de ATP (respiración celular).',
    intervalo_dias: 1,
    repeticiones: 0,
    factor_facilidad: 2.5,
    fecha_proximo_repaso: '2026-11-20'
  }
];

const defaultBloquesTarde: BloqueTarde[] = [
  {
    orden: 1,
    tipo: 'almuerzo',
    titulo: 'Almuerzo y Descanso Relajado',
    horaInicio: '12:35',
    horaFin: '14:00',
    duracionMinutos: 85,
    esProtegido: true,
    detalles: ['Almorzar rica comida', 'Escuchar bachata suave de Romeo / Aventura', 'Despejar la mente']
  },
  {
    orden: 2,
    tipo: 'tareas',
    titulo: 'Bloque de Tareas Prioritarias',
    horaInicio: '14:00',
    horaFin: '15:30',
    duracionMinutos: 90,
    esProtegido: false,
    detalles: [
      'Matemática: Ejercicios de Ecuaciones Cuadráticas',
      'Lengua: Revisión de borrador del ensayo'
    ]
  },
  {
    orden: 3,
    tipo: 'estudio',
    titulo: 'Estudio y Repaso para Examen',
    horaInicio: '15:30',
    horaFin: '16:30',
    duracionMinutos: 60,
    esProtegido: false,
    detalles: [
      'Repaso Parcial de Álgebra (Fórmula general)',
      '15 minutos de Flashcards SM-2'
    ]
  },
  {
    orden: 4,
    tipo: 'acreditaciones',
    titulo: 'Acreditaciones y Maker Lab',
    horaInicio: '16:30',
    horaFin: '17:30',
    duracionMinutos: 60,
    esProtegido: false,
    detalles: [
      'Avance de Prototipado 3D (Acreditación al 70%)',
      'Bitácora de taller'
    ]
  },
  {
    orden: 5,
    tipo: 'libre',
    titulo: 'Tiempo Libre Protegido para Luzfer ✨',
    horaInicio: '17:30',
    horaFin: '19:30',
    duracionMinutos: 120,
    esProtegido: true,
    detalles: [
      '¡Bloqueo desactivado automáticamente!',
      'Redes sociales, TikTok, Instagram y videojuegos',
      'Descanso merecido sin preocupaciones 💜'
    ]
  }
];

export const useAppStore = create<AppStore>((set, get) => ({
  activeTab: 'planner',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  showOnboarding: false,
  setShowOnboarding: (show) => set({ showOnboarding: show }),

  materias: MATERIAS_SEED,
  periodos: PERIODOS_SEED,
  horario: initialHorario,
  feriados: initialFeriados,
  bloquesTarde: defaultBloquesTarde,
  tareas: initialTareas,
  acreditaciones: initialAcreditaciones,
  examenes: initialExamenes,
  flashcards: initialFlashcards,

  isFocusModeActive: false,
  focusRemainingSeconds: 45 * 60,
  toggleFocusMode: () => {
    const next = !get().isFocusModeActive;
    set({ isFocusModeActive: next });
    if ((window as any).luzferAPI) {
      (window as any).luzferAPI.setFocusMode(next, 45);
    }
  },

  currentSong: {
    title: 'Propuesta Indecente',
    artist: 'Romeo Santos',
    isPlaying: true,
    moment: 'tareas'
  },
  togglePlayMusic: () => {
    set((state) => ({
      currentSong: {
        ...state.currentSong,
        isPlaying: !state.currentSong.isPlaying
      }
    }));
  },
  setSongMoment: (moment) => {
    const songs: Record<string, { title: string; artist: string }> = {
      estudiar: { title: 'Lo-Fi Rain & Soft Piano', artist: 'Luzfer Study Beats' },
      tareas: { title: 'Propuesta Indecente', artist: 'Romeo Santos' },
      descanso: { title: 'Volví', artist: 'Aventura & Bad Bunny' },
      recreo: { title: 'PROVENZA', artist: 'Karol G' }
    };
    const s = songs[moment] || songs.tareas;
    set((state) => ({
      currentSong: {
        title: s.title,
        artist: s.artist,
        isPlaying: true,
        moment
      }
    }));
  },

  reorganizarTarde: () => {
    // Algoritmo de reorganización de la tarde
    const tareasPendientes = get().tareas.filter(t => t.estado !== 'completada');
    const hayMatematica = tareasPendientes.some(t => t.materia_nombre === 'Matemática');

    const updated = defaultBloquesTarde.map(b => {
      if (b.tipo === 'tareas') {
        return {
          ...b,
          detalles: tareasPendientes.slice(0, 3).map(t => `${t.materia_nombre || 'General'}: ${t.titulo}`)
        };
      }
      if (b.tipo === 'estudio') {
        return {
          ...b,
          detalles: hayMatematica
            ? ['Refuerzo de Matemática y Álgebra (Examen próximo)', 'Flashcards SM-2 de fórmulas']
            : ['Repaso general con simulador de preguntas']
        };
      }
      return b;
    });

    set({ bloquesTarde: updated });
  },

  completarTarea: (id) => {
    set((state) => ({
      tareas: state.tareas.map(t =>
        t.id === id ? { ...t, estado: t.estado === 'completada' ? 'pendiente' : 'completada' } : t
      )
    }));
  },

  agregarTarea: (nueva) => {
    const tarea: Tarea = {
      id: Date.now(),
      titulo: nueva.titulo || 'Nueva tarea',
      materia_id: nueva.materia_id,
      materia_nombre: nueva.materia_nombre || 'General',
      materia_color: nueva.materia_color || '#7C3AED',
      descripcion: nueva.descripcion || '',
      fecha_limite: nueva.fecha_limite || new Date().toISOString(),
      prioridad: nueva.prioridad || 'media',
      estado: 'pendiente',
    };
    set((state) => ({ tareas: [tarea, ...state.tareas] }));
  },

  actualizarAcreditacion: (id, horasSumar) => {
    set((state) => ({
      acreditaciones: state.acreditaciones.map(a => {
        if (a.id === id) {
          const nuevasHoras = Math.min(a.horas_estimadas, a.horas_completadas + horasSumar);
          const nuevoPct = Math.round((nuevasHoras / a.horas_estimadas) * 100);
          return {
            ...a,
            horas_completadas: nuevasHoras,
            porcentaje: nuevoPct,
            estado: nuevoPct >= 100 ? 'completada' : 'en_progreso'
          };
        }
        return a;
      })
    }));
  },

  responderFlashcard: (cardId, rating) => {
    // Implementación SM-2
    set((state) => ({
      flashcards: state.flashcards.map(card => {
        if (card.id !== cardId) return card;

        let { repeticiones, factor_facilidad, intervalo_dias } = card;

        if (rating >= 3) {
          if (repeticiones === 0) {
            intervalo_dias = 1;
          } else if (repeticiones === 1) {
            intervalo_dias = 4;
          } else {
            intervalo_dias = Math.round(intervalo_dias * factor_facilidad);
          }
          repeticiones++;
        } else {
          repeticiones = 0;
          intervalo_dias = 1;
        }

        // Modificar EF: EF' = EF + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
        factor_facilidad = factor_facilidad + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
        if (factor_facilidad < 1.3) factor_facilidad = 1.3;

        return {
          ...card,
          repeticiones,
          factor_facilidad,
          intervalo_dias
        };
      })
    }));
  },

  guardarFeriado: (feriado) => {
    set((state) => ({
      feriados: state.feriados.map(f => f.id === feriado.id ? { ...f, ...feriado } as FeriadoEcuador : f)
    }));
  }
}));
