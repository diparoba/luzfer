-- Base de datos local SQLite para LUZFER
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS materias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  nombre_corto TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  color_bg TEXT NOT NULL,
  icono TEXT DEFAULT 'book'
);

CREATE TABLE IF NOT EXISTS horario_periodos (
  numero INTEGER PRIMARY KEY,
  hora_inicio TEXT NOT NULL,
  hora_fin TEXT NOT NULL,
  es_recreo INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS horario_clases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dia_semana INTEGER NOT NULL, -- 1: Lunes, 2: Martes, 3: Miércoles, 4: Jueves, 5: Viernes
  periodo_numero INTEGER NOT NULL,
  materia_id INTEGER NOT NULL,
  FOREIGN KEY (periodo_numero) REFERENCES horario_periodos(numero),
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE IF NOT EXISTS feriados_ecuador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  fecha_original TEXT NOT NULL, -- YYYY-MM-DD
  fecha_observada TEXT NOT NULL, -- YYYY-MM-DD (fecha con traslado por ley)
  es_obligatorio INTEGER DEFAULT 1,
  observaciones TEXT
);

CREATE TABLE IF NOT EXISTS bloques_tarde (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orden INTEGER NOT NULL,
  tipo TEXT NOT NULL, -- almuerzo, tareas, estudio, acreditaciones, libre
  titulo TEXT NOT NULL,
  hora_inicio TEXT NOT NULL,
  hora_fin TEXT NOT NULL,
  es_protegido INTEGER DEFAULT 0,
  duracion_minutos INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  materia_id INTEGER,
  descripcion TEXT,
  fecha_limite TEXT NOT NULL, -- ISO string
  prioridad TEXT DEFAULT 'media', -- alta, media, baja
  estado TEXT DEFAULT 'pendiente', -- pendiente, en_progreso, completada
  origen TEXT DEFAULT 'manual', -- manual, teams, santillana
  creada_en TEXT DEFAULT CURRENT_TIMESTAMP,
  completada_en TEXT,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE IF NOT EXISTS subtareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tarea_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  completada INTEGER DEFAULT 0,
  FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS proyectos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  materia_id INTEGER,
  descripcion TEXT,
  porcentaje_avance REAL DEFAULT 0,
  fecha_limite TEXT,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE IF NOT EXISTS hitos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proyecto_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  completado INTEGER DEFAULT 0,
  fecha_limite TEXT,
  FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS acreditaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL, -- Maker Lab, Lectura, Pastoral, Social
  horas_estimadas REAL NOT NULL,
  horas_completadas REAL DEFAULT 0,
  porcentaje REAL DEFAULT 0,
  fecha_limite TEXT NOT NULL,
  estado TEXT DEFAULT 'en_progreso'
);

CREATE TABLE IF NOT EXISTS examenes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  fecha TEXT NOT NULL,
  temas TEXT,
  peso_porcentaje REAL DEFAULT 20,
  nota_obtenida REAL,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE IF NOT EXISTS flashcards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER NOT NULL,
  examen_id INTEGER,
  anverso TEXT NOT NULL,
  reverso TEXT NOT NULL,
  intervalo_dias INTEGER DEFAULT 1,
  repeticiones INTEGER DEFAULT 0,
  factor_facilidad REAL DEFAULT 2.5, -- SM-2 Ease Factor inicial
  fecha_proximo_repaso TEXT NOT NULL,
  FOREIGN KEY (materia_id) REFERENCES materias(id),
  FOREIGN KEY (examen_id) REFERENCES examenes(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS simulacros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  fecha_realizado TEXT DEFAULT CURRENT_TIMESTAMP,
  duracion_minutos INTEGER DEFAULT 30,
  nota_final REAL,
  temas_debiles TEXT,
  FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE IF NOT EXISTS enfoque_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL,
  minutos_enfocados INTEGER DEFAULT 0,
  intentos_bloqueados INTEGER DEFAULT 0,
  cumplio_plan INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS ajustes (
  clave TEXT PRIMARY KEY,
  valor TEXT NOT NULL
);
