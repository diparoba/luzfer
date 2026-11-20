import { Notification } from 'electron';
import path from 'path';

export class NotificationService {
  private hasSupport: boolean = false;

  constructor() {
    this.hasSupport = Notification.isSupported();
  }

  public notify(title: string, body: string, silent = false) {
    if (!this.hasSupport) {
      console.log(`[Notification Fallback] ${title}: ${body}`);
      return;
    }

    try {
      const notif = new Notification({
        title,
        body,
        silent,
        icon: path.join(__dirname, '../../build/icon.ico')
      });
      notif.show();
    } catch (e) {
      console.error('Error enviando notificación nativa:', e);
    }
  }

  public scheduleMorningSummary(materiasDeHoy: string[]) {
    const list = materiasDeHoy.slice(0, 4).join(', ');
    this.notify(
      '¡Buenos días, Luz Fernanda! 💜',
      `Hoy en el Paulo VI tienes: ${list}... ¡Que tengas un excelente día!`
    );
  }

  public scheduleNightSummary(materiasDeManana: string[]) {
    this.notify(
      'Mochila lista para mañana 🎒',
      `Recuerda alistar tus cuadernos de: ${materiasDeManana.join(', ')} y revisar tus tareas pendientes.`
    );
  }

  public notifyBlockChange(nuevoBloque: string) {
    this.notify(
      'Nuevo Bloque de la Tarde ✨',
      `Es hora de: ${nuevoBloque}. ¡Mantén el enfoque y recuerda tus metas!`
    );
  }
}
