export interface AfternoonTaskInput {
  id: number;
  titulo: string;
  materiaNombre: string;
  prioridad: 'alta' | 'media' | 'baja';
  fechaLimite: string;
  diasRestantes: number;
}

export interface AfternoonExamInput {
  id: number;
  materiaNombre: string;
  fecha: string;
  diasParaExamen: number;
  pesoPorcentaje: number;
  notaPromedioMateria?: number; // Para dar más peso a materias con notas bajas
}

export interface ScheduledBlock {
  orden: number;
  tipo: 'almuerzo' | 'tareas' | 'estudio' | 'acreditaciones' | 'libre';
  titulo: string;
  horaInicio: string;
  horaFin: string;
  duracionMinutos: number;
  esProtegido: boolean;
  detalles: string[];
}

export class AfternoonScheduler {
  public static calculatePlan(
    tareas: AfternoonTaskInput[],
    examenes: AfternoonExamInput[],
    horasAcreditacionesPendientes: number
  ): ScheduledBlock[] {
    const blocks: ScheduledBlock[] = [];

    // 1. Almuerzo y Descanso (Fijo de 12:35 a 14:00)
    blocks.push({
      orden: 1,
      tipo: 'almuerzo',
      titulo: 'Almuerzo y Descanso Relajado',
      horaInicio: '12:35',
      horaFin: '14:00',
      duracionMinutos: 85,
      esProtegido: true,
      detalles: ['Almorzar tranquila', 'Música de descanso', 'Desconectar del colegio']
    });

    // 2. Priorización de Tareas
    // Ordenar por días restantes ascendente y luego por prioridad
    const tareasOrdenadas = [...tareas].sort((a, b) => {
      if (a.diasRestantes !== b.diasRestantes) return a.diasRestantes - b.diasRestantes;
      const prioScore = { alta: 3, media: 2, baja: 1 };
      return prioScore[b.prioridad] - prioScore[a.prioridad];
    });

    const tareasUrgentes = tareasOrdenadas.filter(t => t.diasRestantes <= 2);
    const tareasMinutos = tareasUrgentes.length > 2 ? 90 : 75;

    blocks.push({
      orden: 2,
      tipo: 'tareas',
      titulo: 'Bloque de Tareas y Deberes',
      horaInicio: '14:00',
      horaFin: this.addMinutes('14:00', tareasMinutos),
      duracionMinutos: tareasMinutos,
      esProtegido: false,
      detalles: tareasOrdenadas.slice(0, 3).map(t => `${t.materiaNombre}: ${t.titulo}`)
    });

    const horaFinTareas = this.addMinutes('14:00', tareasMinutos);

    // 3. Estudio y Repasos (Ponderado por exámenes próximos y notas bajas)
    const examenesUrgentes = [...examenes].sort((a, b) => {
      // Priorizar exámenes más cercanos y con notas más bajas
      const scoreA = a.diasParaExamen * 10 + (a.notaPromedioMateria || 10);
      const scoreB = b.diasParaExamen * 10 + (b.notaPromedioMateria || 10);
      return scoreA - scoreB;
    });

    const hayExamenCercano = examenesUrgentes.some(e => e.diasParaExamen <= 4);
    const estudioMinutos = hayExamenCercano ? 60 : 45;
    const horaFinEstudio = this.addMinutes(horaFinTareas, estudioMinutos);

    blocks.push({
      orden: 3,
      tipo: 'estudio',
      titulo: 'Estudio Activo y Simulacros',
      horaInicio: horaFinTareas,
      horaFin: horaFinEstudio,
      duracionMinutos: estudioMinutos,
      esProtegido: false,
      detalles: examenesUrgentes.length > 0
        ? examenesUrgentes.slice(0, 2).map(e => `Repaso ${e.materiaNombre} (Examen en ${e.diasParaExamen} días)`)
        : ['Repaso general de contenidos con Flashcards SM-2']
    });

    // 4. Acreditaciones
    const horaFinAcreditaciones = this.addMinutes(horaFinEstudio, 45);
    blocks.push({
      orden: 4,
      tipo: 'acreditaciones',
      titulo: 'Avance de Acreditaciones y Proyectos',
      horaInicio: horaFinEstudio,
      horaFin: horaFinAcreditaciones,
      duracionMinutos: 45,
      esProtegido: false,
      detalles: [
        `Progreso de horas acumuladas (${horasAcreditacionesPendientes}h pendientes)`,
        'Proyectos Maker Lab y Lectura'
      ]
    });

    // 5. Tiempo Libre Protegido (NUNCA SE INVADE NI SE OCUPA)
    blocks.push({
      orden: 5,
      tipo: 'libre',
      titulo: 'Tiempo Libre Protegido para Luzfer ✨',
      horaInicio: '17:30',
      horaFin: '19:30',
      duracionMinutos: 120,
      esProtegido: true,
      detalles: [
        'Desbloqueo total de redes y juegos',
        'TikTok, Instagram y relax sin culpa',
        '¡Gran trabajo cumpliendo el plan de hoy! 💜'
      ]
    });

    return blocks;
  }

  private static addMinutes(timeStr: string, minutesToAdd: number): string {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutes = h * 60 + m + minutesToAdd;
    const newH = Math.floor(totalMinutes / 60) % 24;
    const newM = totalMinutes % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  }
}
