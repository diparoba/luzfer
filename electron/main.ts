import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { getDatabase } from './db';
import { ProcessWatcherService } from './services/processWatcher';
import { LocalCompanionServer } from './services/localServer';
import { NotificationService } from './services/notificationService';
import { AfternoonScheduler } from './services/afternoonScheduler';

let mainWindow: BrowserWindow | null = null;
const processWatcher = new ProcessWatcherService();
const localServer = new LocalCompanionServer();
let notifier: NotificationService;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: 'LUZFER — Asistente de Estudio y Enfoque',
    backgroundColor: '#FAF8FF',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../build/icon.ico'),
    autoHideMenuBar: true,
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  const db = getDatabase();
  notifier = new NotificationService();

  // Iniciar servidor local companion para la extensión de Chrome
  localServer.start(3883);
  localServer.setAttemptCallback((url) => {
    if (mainWindow) {
      mainWindow.webContents.send('focus:distractionAttempt', { url, timestamp: new Date().toISOString() });
    }
  });

  setupIpcHandlers(db);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  processWatcher.stopFocus();
  localServer.stop();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function setupIpcHandlers(db: any) {
  // Materias y Horario
  ipcMain.handle('db:getMaterias', () => {
    return db.prepare('SELECT * FROM materias ORDER BY id ASC').all();
  });

  ipcMain.handle('db:getPeriodos', () => {
    return db.prepare('SELECT * FROM horario_periodos ORDER BY numero ASC').all();
  });

  ipcMain.handle('db:getHorario', () => {
    return db.prepare(`
      SELECT hc.id, hc.dia_semana, hc.periodo_numero, m.id as materia_id, m.nombre, m.nombre_corto, m.color_hex, m.color_bg, m.icono
      FROM horario_clases hc
      JOIN materias m ON hc.materia_id = m.id
      ORDER BY hc.dia_semana, hc.periodo_numero
    `).all();
  });

  ipcMain.handle('db:getFeriados', () => {
    return db.prepare('SELECT * FROM feriados_ecuador ORDER BY fecha_observada ASC').all();
  });

  ipcMain.handle('db:saveFeriado', (_, feriado) => {
    if (feriado.id) {
      db.prepare('UPDATE feriados_ecuador SET fecha_observada = ?, observaciones = ? WHERE id = ?')
        .run(feriado.fecha_observada, feriado.observaciones, feriado.id);
    } else {
      db.prepare('INSERT INTO feriados_ecuador (nombre, fecha_original, fecha_observada, observaciones) VALUES (?, ?, ?, ?)')
        .run(feriado.nombre, feriado.fecha_original, feriado.fecha_observada, feriado.observaciones);
    }
    return db.prepare('SELECT * FROM feriados_ecuador ORDER BY fecha_observada ASC').all();
  });

  // Tareas y Acreditaciones
  ipcMain.handle('db:getTareas', () => {
    return db.prepare(`
      SELECT t.*, m.nombre_corto as materia_nombre, m.color_hex as materia_color
      FROM tareas t
      LEFT JOIN materias m ON t.materia_id = m.id
      ORDER BY t.fecha_limite ASC
    `).all();
  });

  ipcMain.handle('db:saveTarea', (_, tarea) => {
    if (tarea.id) {
      db.prepare(`
        UPDATE tareas
        SET titulo = ?, materia_id = ?, descripcion = ?, fecha_limite = ?, prioridad = ?, estado = ?
        WHERE id = ?
      `).run(tarea.titulo, tarea.materia_id, tarea.descripcion, tarea.fecha_limite, tarea.prioridad, tarea.estado, tarea.id);
    } else {
      db.prepare(`
        INSERT INTO tareas (titulo, materia_id, descripcion, fecha_limite, prioridad, estado)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(tarea.titulo, tarea.materia_id, tarea.descripcion, tarea.fecha_limite, tarea.prioridad || 'media', tarea.estado || 'pendiente');
    }
    return true;
  });

  ipcMain.handle('db:deleteTarea', (_, id) => {
    db.prepare('DELETE FROM tareas WHERE id = ?').run(id);
    return true;
  });

  ipcMain.handle('db:getAcreditaciones', () => {
    return db.prepare('SELECT * FROM acreditaciones ORDER BY porcentaje DESC').all();
  });

  ipcMain.handle('db:saveAcreditacion', (_, acre) => {
    if (acre.id) {
      db.prepare(`
        UPDATE acreditaciones
        SET titulo = ?, categoria = ?, horas_estimadas = ?, horas_completadas = ?, porcentaje = ?, fecha_limite = ?, estado = ?
        WHERE id = ?
      `).run(acre.titulo, acre.categoria, acre.horas_estimadas, acre.horas_completadas, acre.porcentaje, acre.fecha_limite, acre.estado, acre.id);
    }
    return db.prepare('SELECT * FROM acreditaciones ORDER BY porcentaje DESC').all();
  });

  ipcMain.handle('db:getExamenes', () => {
    return db.prepare(`
      SELECT e.*, m.nombre_corto as materia_nombre, m.color_hex as materia_color
      FROM examenes e
      JOIN materias m ON e.materia_id = m.id
      ORDER BY e.fecha ASC
    `).all();
  });

  ipcMain.handle('db:saveExamen', (_, ex) => {
    db.prepare(`
      INSERT INTO examenes (materia_id, titulo, fecha, temas, peso_porcentaje)
      VALUES (?, ?, ?, ?, ?)
    `).run(ex.materia_id, ex.titulo, ex.fecha, ex.temas, ex.peso_porcentaje);
    return true;
  });

  // Organizador de la Tarde
  ipcMain.handle('afternoon:getBloques', () => {
    return db.prepare('SELECT * FROM bloques_tarde ORDER BY orden ASC').all();
  });

  ipcMain.handle('afternoon:reorganizar', () => {
    const tareasPendientes = db.prepare(`
      SELECT t.id, t.titulo, t.prioridad, t.fecha_limite, m.nombre_corto as materiaNombre,
      CAST((julianday(t.fecha_limite) - julianday('now')) AS INTEGER) as diasRestantes
      FROM tareas t
      LEFT JOIN materias m ON t.materia_id = m.id
      WHERE t.estado != 'completada'
    `).all();

    const examenesProximos = db.prepare(`
      SELECT e.id, e.titulo, e.fecha, m.nombre_corto as materiaNombre,
      CAST((julianday(e.fecha) - julianday('now')) AS INTEGER) as diasParaExamen,
      e.peso_porcentaje as pesoPorcentaje
      FROM examenes e
      JOIN materias m ON e.materia_id = m.id
    `).all();

    const acresTotal = db.prepare('SELECT SUM(horas_estimadas - horas_completadas) as pend FROM acreditaciones WHERE estado != "completada"').get() as { pend: number };
    const plan = AfternoonScheduler.calculatePlan(tareasPendientes, examenesProximos, Math.round(acresTotal?.pend || 10));
    return plan;
  });

  // Modo Enfoque
  ipcMain.handle('focus:toggle', (_, active, duration = 45) => {
    if (active) {
      processWatcher.startFocus((proc) => {
        notifier.notify('Distracción cerrada 🛑', `LUZFER cerró ${proc} para mantenerte enfocada.`);
      });
      localServer.updateFocusState({ isActive: true, remainingMinutes: duration });
    } else {
      processWatcher.stopFocus();
      localServer.updateFocusState({ isActive: false, remainingMinutes: 0 });
    }
    return active;
  });

  ipcMain.handle('focus:getInstalledApps', async () => {
    return processWatcher.getInstalledGamesAndApps();
  });

  ipcMain.handle('focus:getSettings', () => {
    const sitesRow = db.prepare('SELECT valor FROM ajustes WHERE clave = "sitios_bloqueados"').get();
    const procsRow = db.prepare('SELECT valor FROM ajustes WHERE clave = "procesos_bloqueados"').get();
    return {
      sites: sitesRow ? JSON.parse(sitesRow.valor) : [],
      procs: procsRow ? JSON.parse(procsRow.valor) : []
    };
  });

  ipcMain.handle('focus:saveSettings', (_, settings) => {
    db.prepare('INSERT OR REPLACE INTO ajustes (clave, valor) VALUES ("sitios_bloqueados", ?)').run(JSON.stringify(settings.sites));
    db.prepare('INSERT OR REPLACE INTO ajustes (clave, valor) VALUES ("procesos_bloqueados", ?)').run(JSON.stringify(settings.procs));
    processWatcher.setBlockedList(settings.procs);
    localServer.updateFocusState({ blockedWebsites: settings.sites });
    return true;
  });

  // Notificaciones
  ipcMain.handle('system:notify', (_, title, body) => {
    notifier.notify(title, body);
  });
}
