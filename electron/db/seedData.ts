export interface MateriaSeed {
  id: number;
  nombre: string;
  nombre_corto: string;
  color_hex: string;
  color_bg: string;
  icono: string;
}

export const MATERIAS_SEED: MateriaSeed[] = [
  { id: 1, nombre: 'Matemática', nombre_corto: 'Matemática', color_hex: '#4F46E5', color_bg: '#EEF2FF', icono: 'calculator' },
  { id: 2, nombre: 'Lengua y Literatura', nombre_corto: 'Lengua', color_hex: '#9333EA', color_bg: '#FAF5FF', icono: 'book-open' },
  { id: 3, nombre: 'Lengua Extranjera (Inglés)', nombre_corto: 'Inglés', color_hex: '#7C3AED', color_bg: '#F3E8FF', icono: 'globe' },
  { id: 4, nombre: 'Ciencias Naturales', nombre_corto: 'C. Naturales', color_hex: '#059669', color_bg: '#ECFDF5', icono: 'flask-conical' },
  { id: 5, nombre: 'Estudios Sociales', nombre_corto: 'E. Sociales', color_hex: '#D97706', color_bg: '#FFFBEB', icono: 'landmark' },
  { id: 6, nombre: 'Educación Física', nombre_corto: 'Ed. Física', color_hex: '#EA580C', color_bg: '#FFF7ED', icono: 'activity' },
  { id: 7, nombre: 'Maker Lab - D', nombre_corto: 'Maker Lab - D', color_hex: '#0891B2', color_bg: '#ECFEFF', icono: 'cpu' },
  { id: 8, nombre: 'Maker Lab - B', nombre_corto: 'Maker Lab - B', color_hex: '#0284C7', color_bg: '#F0F9FF', icono: 'wrench' },
  { id: 9, nombre: 'Desarrollo Artístico Musical', nombre_corto: 'D. A. Musical', color_hex: '#A21CAF', color_bg: '#FDF4FF', icono: 'music' },
  { id: 10, nombre: 'Educación Sostenible', nombre_corto: 'Ed. Sostenible', color_hex: '#16A34A', color_bg: '#F0FDF4', icono: 'sprout' },
  { id: 11, nombre: 'Cívica, Ética e Integridad', nombre_corto: 'Cívica Et. Int.', color_hex: '#475569', color_bg: '#F1F5F9', icono: 'shield-check' },
  { id: 12, nombre: 'Análisis de Lectura', nombre_corto: 'An. Lectura', color_hex: '#86198F', color_bg: '#FDF2F8', icono: 'glasses' },
  { id: 13, nombre: 'Orientación Vocacional', nombre_corto: 'Or. Vocacional', color_hex: '#6D28D9', color_bg: '#EDE9FE', icono: 'compass' },
  { id: 14, nombre: 'Acompañamiento Integral en el Aula', nombre_corto: 'A. I. A.', color_hex: '#0D9488', color_bg: '#F0FDFA', icono: 'users' },
];

export const PERIODOS_SEED = [
  { numero: 1, hora_inicio: '07:00', hora_fin: '07:50', es_recreo: 0 },
  { numero: 2, hora_inicio: '07:50', hora_fin: '08:30', es_recreo: 0 },
  { numero: 3, hora_inicio: '08:30', hora_fin: '09:10', es_recreo: 0 },
  { numero: 4, hora_inicio: '09:10', hora_fin: '09:50', es_recreo: 0 },
  { numero: 5, hora_inicio: '09:50', hora_fin: '10:30', es_recreo: 0 },
  { numero: 6, hora_inicio: '10:30', hora_fin: '11:10', es_recreo: 1 }, // RECREO FIJO
  { numero: 7, hora_inicio: '11:10', hora_fin: '11:50', es_recreo: 0 },
  { numero: 8, hora_inicio: '11:50', hora_fin: '12:35', es_recreo: 0 },
];

// Horario precargado de 10mo "B" Paulo VI
// 1: Lunes, 2: Martes, 3: Miércoles, 4: Jueves, 5: Viernes
// Nota: El periodo 6 es Recreo (10:30 - 11:10), por lo que las clases van en periodos 1, 2, 3, 4, 5, 7 y 8.
export const HORARIO_CLASES_SEED = [
  // LUNES: Inglés (1) | Lengua (2) | Lengua (3) | Ed. Física (4) | E. Sociales (5) | [Recreo] | Matemática (7) | Matemática (8)
  { dia: 1, periodo: 1, materia_id: 3 }, // Inglés
  { dia: 1, periodo: 2, materia_id: 2 }, // Lengua
  { dia: 1, periodo: 3, materia_id: 2 }, // Lengua
  { dia: 1, periodo: 4, materia_id: 6 }, // Ed. Física
  { dia: 1, periodo: 5, materia_id: 5 }, // E. Sociales
  { dia: 1, periodo: 7, materia_id: 1 }, // Matemática
  { dia: 1, periodo: 8, materia_id: 1 }, // Matemática

  // MARTES: D. A. Musical (1) | Maker Lab - D (2) | Inglés (3) | E. Sociales (4) | C. Naturales (5) | [Recreo] | Matemática (7) | Lengua (8)
  { dia: 2, periodo: 1, materia_id: 9 }, // D. A. Musical
  { dia: 2, periodo: 2, materia_id: 7 }, // Maker Lab - D
  { dia: 2, periodo: 3, materia_id: 3 }, // Inglés
  { dia: 2, periodo: 4, materia_id: 5 }, // E. Sociales
  { dia: 2, periodo: 5, materia_id: 4 }, // C. Naturales
  { dia: 2, periodo: 7, materia_id: 1 }, // Matemática
  { dia: 2, periodo: 8, materia_id: 2 }, // Lengua

  // MIÉRCOLES: Ed. Física (1) | Inglés (2) | Inglés (3) | Ed. Sostenible (4) | Maker Lab - B (5) | [Recreo] | Matemática (7) | Maker Lab - D (8)
  { dia: 3, periodo: 1, materia_id: 6 }, // Ed. Física
  { dia: 3, periodo: 2, materia_id: 3 }, // Inglés
  { dia: 3, periodo: 3, materia_id: 3 }, // Inglés
  { dia: 3, periodo: 4, materia_id: 10 }, // Ed. Sostenible
  { dia: 3, periodo: 5, materia_id: 8 }, // Maker Lab - B
  { dia: 3, periodo: 7, materia_id: 1 }, // Matemática
  { dia: 3, periodo: 8, materia_id: 7 }, // Maker Lab - D

  // JUEVES: Matemática (1) | An. Lectura (2) | E. Sociales (3) | Lengua (4) | Cívica Et. Int. (5) | [Recreo] | C. Naturales (7) | C. Naturales (8)
  { dia: 4, periodo: 1, materia_id: 1 }, // Matemática
  { dia: 4, periodo: 2, materia_id: 12 }, // An. Lectura
  { dia: 4, periodo: 3, materia_id: 5 }, // E. Sociales
  { dia: 4, periodo: 4, materia_id: 2 }, // Lengua
  { dia: 4, periodo: 5, materia_id: 11 }, // Cívica Et. Int.
  { dia: 4, periodo: 7, materia_id: 4 }, // C. Naturales
  { dia: 4, periodo: 8, materia_id: 4 }, // C. Naturales

  // VIERNES: Inglés (1) | Lengua (2) | Lengua (3) | Or. Vocacional (4) | A. I. A. (5) | [Recreo] | Matemática (7) | Matemática (8)
  { dia: 5, periodo: 1, materia_id: 3 }, // Inglés
  { dia: 5, periodo: 2, materia_id: 2 }, // Lengua
  { dia: 5, periodo: 3, materia_id: 2 }, // Lengua
  { dia: 5, periodo: 4, materia_id: 13 }, // Or. Vocacional
  { dia: 5, periodo: 5, materia_id: 14 }, // A. I. A.
  { dia: 5, periodo: 7, materia_id: 1 }, // Matemática
  { dia: 5, periodo: 8, materia_id: 1 }, // Matemática
];

export const FERIADOS_ECUADOR_SEED = [
  { nombre: 'Año Nuevo', fecha_original: '2026-01-01', fecha_observada: '2026-01-01', observaciones: 'Feriado nacional no recuperable' },
  { nombre: 'Carnaval (Lunes)', fecha_original: '2026-02-16', fecha_observada: '2026-02-16', observaciones: 'Puente nacional' },
  { nombre: 'Carnaval (Martes)', fecha_original: '2026-02-17', fecha_observada: '2026-02-17', observaciones: 'Puente nacional' },
  { nombre: 'Viernes Santo', fecha_original: '2026-04-03', fecha_observada: '2026-04-03', observaciones: 'Semana Santa' },
  { nombre: 'Día del Trabajo', fecha_original: '2026-05-01', fecha_observada: '2026-05-01', observaciones: 'Viernes de asueto' },
  { nombre: 'Batalla de Pichincha', fecha_original: '2026-05-24', fecha_observada: '2026-05-25', observaciones: 'Domingo pasa al lunes 25' },
  { nombre: 'Primer Grito de Independencia', fecha_original: '2026-08-10', fecha_observada: '2026-08-10', observaciones: 'Lunes festivo' },
  { nombre: 'Independencia de Guayaquil', fecha_original: '2026-10-09', fecha_observada: '2026-10-09', observaciones: 'Viernes festivo' },
  { nombre: 'Día de los Difuntos', fecha_original: '2026-11-02', fecha_observada: '2026-11-02', observaciones: 'Lunes de asueto' },
  { nombre: 'Independencia de Cuenca', fecha_original: '2026-11-03', fecha_observada: '2026-11-03', observaciones: 'Martes de asueto' },
  { nombre: 'Fundación de Quito', fecha_original: '2026-12-06', fecha_observada: '2026-12-07', observaciones: 'Fiesta local Quito (Domingo pasa a lunes)' },
  { nombre: 'Navidad', fecha_original: '2026-12-25', fecha_observada: '2026-12-25', observaciones: 'Feriado nacional' },
  { nombre: 'Año Nuevo 2027', fecha_original: '2027-01-01', fecha_observada: '2027-01-01', observaciones: 'Inicio de año' },
  { nombre: 'Carnaval 2027 (Lunes)', fecha_original: '2027-02-08', fecha_observada: '2027-02-08', observaciones: 'Puente nacional' },
  { nombre: 'Carnaval 2027 (Martes)', fecha_original: '2027-02-09', fecha_observada: '2027-02-09', observaciones: 'Puente nacional' },
  { nombre: 'Viernes Santo 2027', fecha_original: '2027-03-26', fecha_observada: '2027-03-26', observaciones: 'Semana Santa 2027' },
  { nombre: 'Día del Trabajo 2027', fecha_original: '2027-05-01', fecha_observada: '2027-04-30', observaciones: 'Sábado pasa a viernes 30' },
  { nombre: 'Batalla de Pichincha 2027', fecha_original: '2027-05-24', fecha_observada: '2027-05-24', observaciones: 'Lunes nacional' },
];

export const BLOQUES_TARDE_SEED = [
  { orden: 1, tipo: 'almuerzo', titulo: 'Almuerzo y Descanso', hora_inicio: '12:35', hora_fin: '14:00', es_protegido: 1, duracion_minutos: 85 },
  { orden: 2, tipo: 'tareas', titulo: 'Bloque de Tareas Prioritarias', hora_inicio: '14:00', hora_fin: '15:30', es_protegido: 0, duracion_minutos: 90 },
  { orden: 3, tipo: 'estudio', titulo: 'Estudio y Repaso de Exámenes', hora_inicio: '15:30', hora_fin: '16:30', es_protegido: 0, duracion_minutos: 60 },
  { orden: 4, tipo: 'acreditaciones', titulo: 'Acreditaciones y Maker Lab', hora_inicio: '16:30', hora_fin: '17:30', es_protegido: 0, duracion_minutos: 60 },
  { orden: 5, tipo: 'libre', titulo: 'Tiempo Libre Protegido ✨', hora_inicio: '17:30', hora_fin: '19:00', es_protegido: 1, duracion_minutos: 90 },
];

export const ACREDITACIONES_SEED = [
  { titulo: 'Acreditación Maker Lab: Prototipado 3D', categoria: 'Maker Lab', horas_estimadas: 20, horas_completadas: 14, porcentaje: 70, fecha_limite: '2027-01-30', estado: 'en_progreso' },
  { titulo: 'Acreditación Lectura Comprensiva Crítica', categoria: 'Lectura', horas_estimadas: 15, horas_completadas: 12, porcentaje: 80, fecha_limite: '2026-12-15', estado: 'en_progreso' },
  { titulo: 'Acreditación de Ciudadanía y Ética Montiniana', categoria: 'Pastoral y Ética', horas_estimadas: 10, horas_completadas: 5, porcentaje: 50, fecha_limite: '2027-03-20', estado: 'en_progreso' },
  { titulo: 'Acreditación Ecológica y Sostenibilidad', categoria: 'Social', horas_estimadas: 12, horas_completadas: 12, porcentaje: 100, fecha_limite: '2026-11-15', estado: 'completada' },
];

export const ARTISTAS_FAVORITOS = [
  { nombre: 'Romeo Santos', genero: 'Bachata / Romántica', cover: '👑', color: '#9333EA' },
  { nombre: 'Aventura', genero: 'Bachata Clásica', cover: '🌹', color: '#5B21B6' },
  { nombre: 'Bad Bunny', genero: 'Reggaetón / Urbano', cover: '🐰', color: '#EA580C' },
  { nombre: 'Rauw Alejandro', genero: 'Urbano / R&B Latino', cover: '🦊', color: '#0284C7' },
  { nombre: 'Karol G', genero: 'Bichota Pop / Urbano', cover: '🌸', color: '#EC4899' },
];

export const MOMENTOS_MUSICA = [
  { id: 'estudiar', titulo: 'Estudiar y Concentración', descripcion: 'Sonidos binaurales y Lo-Fi instrumental suave', icono: 'brain', color: '#7C3AED' },
  { id: 'tareas', titulo: 'Hacer Tareas Motivada', descripcion: 'Hits favoritos de Romeo, Karol G y Rauw', icono: 'sparkles', color: '#EC4899' },
  { id: 'descanso', titulo: 'Descanso de la Tarde', descripcion: 'Vibes acústicas para desconectar', icono: 'coffee', color: '#10B981' },
  { id: 'recreo', titulo: 'Recreo y Alegría', descripcion: '¡Energía al máximo entre clases!', icono: 'party-popper', color: '#F59E0B' },
];
