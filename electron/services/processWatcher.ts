import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class ProcessWatcherService {
  private isFocusActive: boolean = false;
  private intervalTimer: NodeJS.Timeout | null = null;
  private blockedProcesses: string[] = [
    'RobloxPlayerBeta.exe',
    'Discord.exe',
    'Steam.exe',
    'EpicGamesLauncher.exe',
    'Minecraft.exe',
    'Tiktok.exe',
    'Instagram.exe'
  ];

  public setBlockedList(processes: string[]) {
    this.blockedProcesses = processes;
  }

  public getBlockedList(): string[] {
    return this.blockedProcesses;
  }

  public startFocus(onBlockedProcessTerminated?: (procName: string) => void) {
    this.isFocusActive = true;
    if (this.intervalTimer) clearInterval(this.intervalTimer);

    // Revisa cada 5 segundos
    this.intervalTimer = setInterval(async () => {
      if (!this.isFocusActive) return;
      await this.checkAndKillBlockedProcesses(onBlockedProcessTerminated);
    }, 5000);
  }

  public stopFocus() {
    this.isFocusActive = false;
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }

  private async checkAndKillBlockedProcesses(callback?: (procName: string) => void) {
    if (process.platform !== 'win32') {
      // En entorno no-Windows (desarrollo o testing), simular verificación
      return;
    }

    try {
      const { stdout } = await execAsync('tasklist /fo csv /nh');
      const runningProcesses = stdout
        .split('\n')
        .map(line => {
          const parts = line.split(',');
          return parts[0] ? parts[0].replace(/"/g, '').trim().toLowerCase() : '';
        })
        .filter(Boolean);

      for (const blocked of this.blockedProcesses) {
        const lowerBlocked = blocked.toLowerCase();
        if (runningProcesses.includes(lowerBlocked)) {
          // Intentar cerrar el proceso bloqueado para mantener la concentración
          try {
            await execAsync(`taskkill /F /IM "${blocked}"`);
            if (callback) callback(blocked);
          } catch (e) {
            console.error(`Error al cerrar proceso ${blocked}:`, e);
          }
        }
      }
    } catch (err) {
      console.error('Error al listar procesos de Windows:', err);
    }
  }

  public async getInstalledGamesAndApps(): Promise<string[]> {
    if (process.platform !== 'win32') {
      return ['RobloxPlayerBeta.exe', 'Discord.exe', 'Steam.exe', 'Minecraft.exe'];
    }

    try {
      const { stdout } = await execAsync('tasklist /fo csv /nh');
      const unique = new Set<string>();
      stdout.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[0]) {
          const name = parts[0].replace(/"/g, '').trim();
          if (name.endsWith('.exe') && !name.toLowerCase().includes('windows') && !name.toLowerCase().includes('svchost')) {
            unique.add(name);
          }
        }
      });
      return Array.from(unique);
    } catch {
      return ['RobloxPlayerBeta.exe', 'Discord.exe', 'Steam.exe'];
    }
  }
}
