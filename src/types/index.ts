export type TabType = 
  | 'planner' 
  | 'afternoon' 
  | 'tasks' 
  | 'acreditaciones' 
  | 'exams' 
  | 'flashcards' 
  | 'music' 
  | 'focus' 
  | 'settings';

export interface Materia {
  id: number;
  nombre: string;
  nombre_corto: string;
  color_hex: string;
  color_bg: string;
  icono: string;
}

export interface Periodo {
  numero: number;
  hora_inicio: string;
  hora_fin: string;
  es_recreo: number;
}

export interface HorarioClase {
  id: number;
  dia_semana: number; // 1 = Lunes, 5 = Viernes
  periodo_numero: number;
  materia_id: number;
  nombre: string;
  nombre_corto: string;
  color_hex: string;
  color_bg: string;
  icono: string;
}

export interface FeriadoEcuador {
  id: number;
  nombre: string;
  fecha_original: string;
  fecha_observada: string;
  es_obligatorio: number;
  observaciones: string;
}

export interface BloqueTarde {
  orden: number;
  tipo: 'almuerzo' | 'tareas' | 'estudio' | 'acreditaciones' | 'libre';
  titulo: string;
  horaInicio: string;
  horaFin: string;
  duracionMinutos: number;
  esProtegido: boolean;
  detalles: string[];
}

export interface Tarea {
  id: number;
  titulo: string;
  materia_id?: number;
  materia_nombre?: string;
  materia_color?: string;
  descripcion?: string;
  fecha_limite: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en_progreso' | 'completada';
  subtareas?: { id: number; titulo: string; completada: boolean }[];
}

export interface Acreditacion {
  id: number;
  titulo: string;
  categoria: string;
  horas_estimadas: number;
  horas_completadas: number;
  porcentaje: number;
  fecha_limite: string;
  estado: 'en_progreso' | 'completada';
}

export interface Examen {
  id: number;
  materia_id: number;
  materia_nombre?: string;
  materia_color?: string;
  titulo: string;
  fecha: string;
  temas?: string;
  peso_porcentaje: number;
  nota_obtenida?: number;
}

export interface Flashcard {
  id: number;
  materia_id: number;
  materia_nombre?: string;
  anverso: string;
  reverso: string;
  intervalo_dias: number;
  repeticiones: number;
  factor_facilidad: number;
  fecha_proximo_repaso: string;
}

export interface PreguntaSimulacro {
  id: number;
  tipo: 'multiple' | 'vf' | 'completar';
  enunciado: string;
  opciones?: string[];
  respuestaCorrecta: string;
  explicacion: string;
}
