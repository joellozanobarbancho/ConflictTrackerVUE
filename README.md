# ConflictTrackerVUE

Frontend de ConflictTracker con Vue 3 + Vite + Vue Router + Pinia.

## Requisitos

- Node.js 20+
- Backend en ejecución (por defecto en `http://localhost:8080`)

## Configuración

1. Instalar dependencias:

	```bash
	npm install
	```

2. (Opcional) Configurar URL del backend en `.env`:

	```env
	VITE_API_BASE_URL=http://localhost:8080/api/v1
	```


3. Ejecutar en desarrollo:

	```bash
	npm run dev
	```

	El servidor de desarrollo estará disponible en: [http://localhost:5173/](http://localhost:5173/)

	Si tienes problemas con la política de ejecución en PowerShell, ejecuta este comando como administrador:

	```powershell
	Set-ExecutionPolicy RemoteSigned
	```

	O bien ejecuta los comandos con:

	```powershell
	powershell -ExecutionPolicy Bypass -Command "npm install"
	powershell -ExecutionPolicy Bypass -Command "npm run dev"
	```

## Acceso a la aplicación

Abre tu navegador y visita [http://localhost:5173/](http://localhost:5173/) para ver la aplicación en funcionamiento.

## Vistas iniciales

- `/conflicts`: listado de conflictos
- `/events`: listado de eventos
- `/factions`: listado de facciones

## Endpoints esperados

- `GET/POST /api/v1/conflicts`
- `GET/PUT/DELETE /api/v1/conflicts/{id}`
- `GET /api/v1/events?conflictId=`
- `GET /api/v1/factions?conflictId=`
