# ConflictTrackerVUE

Frontend de ConflictTracker con Vue 3 + Vite + Vue Router + Pinia.

## Requisitos

- Node.js 20+
- Backend ejecutándose (por defecto en `http://localhost:8080`)

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

## Vistas iniciales

- `/conflicts`: listado, filtro por estado, creación de conflicto
- `/conflicts/:id`: detalle, actualización y borrado
- `/events`: listado y filtro por `conflictId`
- `/factions`: listado y filtro por `conflictId`

## Endpoints esperados

- `GET/POST /api/v1/conflicts`
- `GET/PUT/DELETE /api/v1/conflicts/{id}`
- `GET /api/v1/events?conflictId=`
- `GET /api/v1/factions?conflictId=`
