import http from 'http';

export interface FocusState {
  isActive: boolean;
  currentTaskTitle: string;
  blockType: string;
  remainingMinutes: number;
  blockedWebsites: string[];
}

export class LocalCompanionServer {
  private server: http.Server | null = null;
  private focusState: FocusState = {
    isActive: false,
    currentTaskTitle: 'Repaso de la tarde',
    blockType: 'tareas',
    remainingMinutes: 45,
    blockedWebsites: ['instagram.com', 'tiktok.com', 'roblox.com', 'twitch.tv']
  };

  private attemptCallback?: (url: string) => void;

  public updateFocusState(newState: Partial<FocusState>) {
    this.focusState = { ...this.focusState, ...newState };
  }

  public setAttemptCallback(cb: (url: string) => void) {
    this.attemptCallback = cb;
  }

  public start(port = 3883) {
    this.server = http.createServer((req, res) => {
      // Cabeceras CORS para permitir llamadas desde la extensión de Chrome
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url || '/', `http://${req.headers.host}`);

      if (url.pathname === '/api/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(this.focusState));
        return;
      }

      if (url.pathname === '/api/report-attempt' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (this.attemptCallback && data.url) {
              this.attemptCallback(data.url);
            }
          } catch {}
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        });
        return;
      }

      res.writeHead(404);
      res.end('Not Found');
    });

    this.server.listen(port, '127.0.0.1', () => {
      console.log(`[LUZFER] Servidor companion escuchando en http://127.0.0.1:${port}`);
    });
  }

  public stop() {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}
