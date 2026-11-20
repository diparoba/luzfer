# LUZFER 💜
### Asistente Personal de Estudio y Enfoque para Luz Fernanda
*Décimo Grado 'B' — Unidad Educativa Giovanni Battista Montini PAULO VI (Ecuador, Año Lectivo 2026-2027)*

---

## 🚀 Resumen del Proyecto

**LUZFER** es una aplicación de escritorio moderna y ultra-personalizada para Windows 10/11, construida a la medida para las necesidades académicas, rutinas de estudio y momentos de relajación de **Luz Fernanda**.

### 🌟 Características Principales
1. **Horario Oficial Precargado del 10mo 'B'**: 8 periodos matutinos (07:00 a 12:35) con el **Recreo fijo (10:30 a 11:10)** y fusión inteligente de periodos dobles consecutivos.
2. **Feriados Oficiales de Ecuador (2026-2027)**: Integrados con las fechas de traslado por ley para no programar deberes ni clases en días de asueto.
3. **Mochila para Mañana 🎒**: Widget inteligente que te dice exactamente qué cuadernos y libros alistar la noche anterior.
4. **Organizador Inteligente de la Tarde**:
   - `12:35 - 14:00`: Almuerzo y descanso relajado.
   - `14:00 - 15:30`: Deberes y tareas prioritarias.
   - `15:30 - 16:30`: Estudio para exámenes y simulacros.
   - `16:30 - 17:30`: Acreditaciones (Maker Lab, Lectura y Pastoral).
   - `17:30 - 19:30`: **Tiempo Libre Protegido ✨** (la app nunca programa deberes aquí y levanta cualquier bloqueo).
   - Botón *"Reorganizar mi tarde"* para redistribuir el tiempo si algo cambia.
5. **Simulador de Exámenes con IA & OCR**: Sube fotos de tus notas o PDFs para crear exámenes de opción múltiple, V/F y detectar temas débiles.
6. **Flashcards con Repetición Espaciada (SM-2)**: El algoritmo SuperMemo calcula la fecha óptima de repaso antes de cada examen.
7. **Hub Musical & Spotify**:
   - Artistas preferidos: **Romeo Santos, Aventura, Bad Bunny, Rauw Alejandro y Karol G**.
   - Playlists por momento: *Estudiar*, *Hacer Tareas*, *Descanso* y *Recreo*.
   - Pausa automática de la música al iniciar un simulacro de examen y modo Pomodoro (25/5).
   - Filtro de contenido explícito opcional.
8. **Modo Enfoque & Bloqueador Doble (Web + Windows)**:
   - **En Chrome**: Extensión compañera con Manifest V3 que bloquea Instagram y TikTok con una pantalla motivadora y temporizador.
   - **En Windows**: Supervisa y cierra suavemente juegos (Roblox, Minecraft, Steam, etc.) durante las horas de estudio.

---

## 📦 Cómo Ejecutar y Probar la Aplicación

### Requisitos Previos
- **Windows 10 o Windows 11** (x64).
- **Node.js 20+** instalado en tu computador.

### 1. Instalación de Dependencias
Abre una terminal (PowerShell o CMD) en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### 2. Modo Desarrollo (Prueba Local Inmediata)
Para arrancar el frontend y la ventana de Electron en tiempo real:
```bash
npm run dev
```

### 3. Generar el Instalador `.exe` para Windows 10/11
Para empaquetar la aplicación completa como un instalador oficial de Windows:
```bash
# Para generar el instalador clásico de Windows (.exe con NSIS):
npm run dist

# O para generar un ejecutable portable (sin requerir instalación):
npm run dist:portable
```
El instalador `.exe` generado se guardará automáticamente en la carpeta:
```text
luzfer/release/LUZFER-Setup-1.0.0.exe
```

---

## 🧩 Cómo Cargar la Extensión Companion en Google Chrome

1. Abre Google Chrome y escribe en la barra de direcciones:
   ```text
   chrome://extensions
   ```
2. En la esquina superior derecha, activa el interruptor **"Modo de desarrollador"** (*Developer mode*).
3. Haz clic en el botón **"Cargar descomprimida"** (*Load unpacked*).
4. Selecciona la carpeta:
   ```text
   luzfer/companion-extension
   ```
5. ¡Listo! La extensión quedará vinculada con la app LUZFER mediante el puerto local seguro `3883`.

---

## 🛡️ Permisos de Windows (Bloqueo de Juegos de Escritorio)

Para que el monitor de procesos de LUZFER pueda cerrar aplicaciones y juegos de la lista negra de distracciones durante el Modo Enfoque, la app utiliza el comando nativo de Windows:
```powershell
taskkill /F /IM "RobloxPlayerBeta.exe"
```
* **Nota de Administrador:** En la mayoría de casos en Windows 10/11 no se requiere elevar permisos si el juego pertenece a la misma sesión de usuario. Si algún juego fue instalado a nivel de sistema (ej. Steam o Riot Vanguard), se recomienda hacer clic derecho sobre `LUZFER.exe` y seleccionar **"Ejecutar como Administrador"**.

---

## 💾 Ubicación de la Base de Datos SQLite

LUZFER funciona **100% sin internet** mediante SQLite local. El archivo de base de datos se almacena en:
```text
%APPDATA%/luzfer/luzfer.sqlite
```
Incluye respaldo exportable en un clic desde la sección de **Ajustes**.
