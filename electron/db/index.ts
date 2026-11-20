import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import {
  MATERIAS_SEED,
  PERIODOS_SEED,
  HORARIO_CLASES_SEED,
  FERIADOS_ECUADOR_SEED,
  BLOQUES_TARDE_SEED,
  ACREDITACIONES_SEED
} from './seedData';

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) return db;

  const userDataPath = app ? app.getPath('userData') : process.cwd();
  const dbPath = path.join(userDataPath, 'luzfer.sqlite');

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  initSchema(db);
  seedIfEmpty(db);

  return db;
}

function initSchema(database: Database.Database) {
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    database.exec(schemaSql);
  }
}

function seedIfEmpty(database: Database.Database) {
  const countMaterias = database.prepare('SELECT COUNT(*) as count FROM materias').get() as { count: number };
  if (countMaterias.count === 0) {
    const insertMateria = database.prepare(
      'INSERT INTO materias (id, nombre, nombre_corto, color_hex, color_bg, icono) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const insertManyMaterias = database.transaction((materias) => {
      for (const m of materias) {
        insertMateria.run(m.id, m.nombre, m.nombre_corto, m.color_hex, m.color_bg, m.icono);
      }
    });
    insertManyMaterias(MATERIAS_SEED);

    // Periodos
    const insertPeriodo = database.prepare(
      'INSERT INTO horario_periodos (numero, hora_inicio, hora_fin, es_recreo) VALUES (?, ?, ?, ?)'
    );
    for (const p of PERIODOS_SEED) {
      insertPeriodo.run(p.numero, p.hora_inicio, p.hora_fin, p.es_recreo);
    }

    // Clases
    const insertClase = database.prepare(
      'INSERT INTO horario_clases (dia_semana, periodo_numero, materia_id) VALUES (?, ?, ?)'
    );
    for (const c of HORARIO_CLASES_SEED) {
      insertClase.run(c.dia, c.periodo, c.materia_id);
    }

    // Feriados
    const insertFeriado = database.prepare(
      'INSERT INTO feriados_ecuador (nombre, fecha_original, fecha_observada, observaciones) VALUES (?, ?, ?, ?)'
    );
    for (const f of FERIADOS_ECUADOR_SEED) {
      insertFeriado.run(f.nombre, f.fecha_original, f.fecha_observada, f.observaciones);
    }

    // Bloques Tarde
    const insertBloque = database.prepare(
      'INSERT INTO bloques_tarde (orden, tipo, titulo, hora_inicio, hora_fin, es_protegido, duracion_minutos) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    for (const b of BLOQUES_TARDE_SEED) {
      insertBloque.run(b.orden, b.tipo, b.titulo, b.hora_inicio, b.hora_fin, b.es_protegido, b.duracion_minutos);
    }

    // Acreditaciones
    const insertAcre = database.prepare(
      'INSERT INTO acreditaciones (titulo, categoria, horas_estimadas, horas_completadas, porcentaje, fecha_limite, estado) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    for (const a of ACREDITACIONES_SEED) {
      insertAcre.run(a.titulo, a.categoria, a.horas_estimadas, a.horas_completadas, a.porcentaje, a.fecha_limite, a.estado);
    }

    // Ajustes por defecto
    const insertAjuste = database.prepare('INSERT OR REPLACE INTO ajustes (clave, valor) VALUES (?, ?)');
    insertAjuste.run('usuario_nombre', 'Luz Fernanda');
    insertAjuste.run('colegio', 'Paulo VI');
    insertAjuste.run('grado', '10mo Grado "B"');
    insertAjuste.run('ano_lectivo', '2026-2027');
    insertAjuste.run('onboarding_completado', '0');
    insertAjuste.run('modo_estricto', '0');
    insertAjuste.run('filtro_explicito_musica', '1');
    insertAjuste.run('sitios_bloqueados', JSON.stringify(['instagram.com', 'tiktok.com', 'roblox.com', 'twitch.tv']));
    insertAjuste.run('procesos_bloqueados', JSON.stringify(['RobloxPlayerBeta.exe', 'Discord.exe', 'Spotify.exe', 'Steam.exe', 'EpicGamesLauncher.exe']));
  }
}
