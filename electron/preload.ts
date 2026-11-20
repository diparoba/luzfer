import { contextBridge, ipcRenderer } from 'electron';

export interface LuzferAPI {
  // Base de datos y datos precargados
  getMaterias: () => Promise<any[]>;
  getHorario: () => Promise<any[]>;
  getPeriodos: () => Promise<any[]>;
  getFeriados: () => Promise<any[]>;
  saveFeriado: (feriado: any) => Promise<any>;

  // Tareas y Acreditaciones
  getTareas: () => Promise<any[]>;
  saveTarea: (tarea: any) => Promise<any>;
  deleteTarea: (id: number) => Promise<boolean>;
  getAcreditaciones: () => Promise<any[]>;
  saveAcreditacion: (acre: any) => Promise<any>;
  getExamenes: () => Promise<any[]>;
  saveExamen: (examen: any) => Promise<any>;

  // Organizador de la Tarde
  getBloquesTarde: () => Promise<any[]>;
  reorganizarTarde: () => Promise<any[]>;

  // Modo Enfoque y Bloqueo
  setFocusMode: (active: boolean, durationMinutes?: number) => Promise<boolean>;
  getInstalledApps: () => Promise<string[]>;
  getBlockedSettings: () => Promise<any>;
  saveBlockedSettings: (settings: any) => Promise<boolean>;

  // Flashcards y Simulacros
  getFlashcards: (materiaId?: number) => Promise<any[]>;
  reviewFlashcard: (cardId: number, rating: number) => Promise<any>;
  generateSimulacro: (materiaId: number, numQuestions: number) => Promise<any>;

  // Notificaciones del sistema
  sendNotification: (title: string, body: string) => Promise<void>;
  
  // Plataforma
  platform: string;
}

const api: LuzferAPI = {
  getMaterias: () => ipcRenderer.invoke('db:getMaterias'),
  getHorario: () => ipcRenderer.invoke('db:getHorario'),
  getPeriodos: () => ipcRenderer.invoke('db:getPeriodos'),
  getFeriados: () => ipcRenderer.invoke('db:getFeriados'),
  saveFeriado: (feriado) => ipcRenderer.invoke('db:saveFeriado', feriado),

  getTareas: () => ipcRenderer.invoke('db:getTareas'),
  saveTarea: (tarea) => ipcRenderer.invoke('db:saveTarea', tarea),
  deleteTarea: (id) => ipcRenderer.invoke('db:deleteTarea', id),
  getAcreditaciones: () => ipcRenderer.invoke('db:getAcreditaciones'),
  saveAcreditacion: (acre) => ipcRenderer.invoke('db:saveAcreditacion', acre),
  getExamenes: () => ipcRenderer.invoke('db:getExamenes'),
  saveExamen: (examen) => ipcRenderer.invoke('db:saveExamen', examen),

  getBloquesTarde: () => ipcRenderer.invoke('afternoon:getBloques'),
  reorganizarTarde: () => ipcRenderer.invoke('afternoon:reorganizar'),

  setFocusMode: (active, duration) => ipcRenderer.invoke('focus:toggle', active, duration),
  getInstalledApps: () => ipcRenderer.invoke('focus:getInstalledApps'),
  getBlockedSettings: () => ipcRenderer.invoke('focus:getSettings'),
  saveBlockedSettings: (settings) => ipcRenderer.invoke('focus:saveSettings', settings),

  getFlashcards: (materiaId) => ipcRenderer.invoke('study:getFlashcards', materiaId),
  reviewFlashcard: (cardId, rating) => ipcRenderer.invoke('study:reviewFlashcard', cardId, rating),
  generateSimulacro: (materiaId, numQuestions) => ipcRenderer.invoke('study:generateSimulacro', materiaId, numQuestions),

  sendNotification: (title, body) => ipcRenderer.invoke('system:notify', title, body),
  platform: process.platform,
};

contextBridge.exposeInMainWorld('luzferAPI', api);
