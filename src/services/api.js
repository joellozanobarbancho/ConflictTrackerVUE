const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

// Datos de ejemplo para modo demo
const demoData = {
  conflicts: [
    {
      id: 1,
      name: 'Guerra Civil Española',
      startDate: '1936-07-17',
      status: 'ACTIVE',
      description: 'Conflicto histórico entre republicanos y nacionalistas en España.',
      countryCodes: ['ESP', 'FRA'],
    },
    {
      id: 2,
      name: 'Caída del Muro de Berlín',
      startDate: '1989-11-09',
      status: 'FROZEN',
      description: 'Evento clave en la reunificación alemana y el fin de la Guerra Fría.',
      countryCodes: ['DEU'],
    },
    {
      id: 3,
      name: 'Conflicto Ucrania-Estados Unidos',
      startDate: '2022-02-24',
      status: 'ENDED',
      description: 'Tensiones y apoyo internacional en el conflicto de Ucrania.',
      countryCodes: ['USA', 'UKR'],
    },
  ],
  events: [
    {
      id: 1,
      conflictId: 1,
      conflictName: 'Conflicto Demo 1',
      location: 'Madrid',
      eventDate: '2023-02-01',
      description: 'Evento de ejemplo en Madrid.'
    },
    {
      id: 2,
      conflictId: 2,
      conflictName: 'Conflicto Demo 2',
      location: 'Berlín',
      eventDate: '2022-06-01',
      description: 'Evento de ejemplo en Berlín.'
    }
  ],
  factions: [
    {
      id: 1,
      conflictId: 1,
      conflictName: 'Guerra Civil Española',
      name: 'Bando Republicano',
      supporterCountryCodes: ['ESP', 'FRA']
    },
    {
      id: 2,
      conflictId: 1,
      conflictName: 'Guerra Civil Española',
      name: 'Bando Nacionalista',
      supporterCountryCodes: ['ESP']
    },
    {
      id: 3,
      conflictId: 2,
      conflictName: 'Caída del Muro de Berlín',
      name: 'Bloque Oriental',
      supporterCountryCodes: ['DEU']
    },
    {
      id: 4,
      conflictId: 2,
      conflictName: 'Caída del Muro de Berlín',
      name: 'Bloque Occidental',
      supporterCountryCodes: ['DEU']
    },
    {
      id: 5,
      conflictId: 3,
      conflictName: 'Conflicto Ucrania-Estados Unidos',
      name: 'Ucrania',
      supporterCountryCodes: ['UKR']
    },
    {
      id: 6,
      conflictId: 3,
      conflictName: 'Conflicto Ucrania-Estados Unidos',
      name: 'Estados Unidos',
      supporterCountryCodes: ['USA']
    }
  ]
}

const buildHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  ...headers,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const request = async (path, options = {}) => {
  if (DEMO_MODE) {
    // Simula retardo de red
    await delay(300)
    // GET
    if (!options.method || options.method === 'GET') {
      if (path.startsWith('/conflicts')) {
        // Filtro por estado en modo demo
        const statusMatch = path.match(/\?status=([^&]+)/)
        let result = demoData.conflicts
        if (statusMatch && statusMatch[1]) {
          const status = decodeURIComponent(statusMatch[1])
          if (status) {
            result = result.filter(c => c.status === status)
          }
        }
        if (/^\/conflicts\/?/.test(path)) return result
        const match = path.match(/^\/conflicts\/(\d+)/)
        if (match) {
          const found = demoData.conflicts.find(c => c.id === Number(match[1]))
          if (!found) throw new Error('No encontrado')
          // Añade relaciones como haría el backend real
          return {
            ...found,
            countries: (found.countryCodes || []).map(code => ({ code })),
            factions: demoData.factions.filter(f => f.conflictId === found.id),
            events: demoData.events.filter(e => e.conflictId === found.id),
          }
        }
      }
      if (path.startsWith('/events')) {
        return demoData.events
      }
      if (path.startsWith('/factions')) {
        return demoData.factions
      }
    }
    // POST
    if (options.method === 'POST' && path === '/conflicts') {
      const body = JSON.parse(options.body)
      const newId = demoData.conflicts.length + 1
      const newConflict = { ...body, id: newId }
      demoData.conflicts.push(newConflict)
      return newConflict
    }
    // PUT
    if (options.method === 'PUT' && path.startsWith('/conflicts/')) {
      const match = path.match(/^\/conflicts\/(\d+)/)
      if (match) {
        const idx = demoData.conflicts.findIndex(c => c.id === Number(match[1]))
        if (idx === -1) throw new Error('No encontrado')
        const body = JSON.parse(options.body)
        demoData.conflicts[idx] = { ...demoData.conflicts[idx], ...body }
        return demoData.conflicts[idx]
      }
    }
    // DELETE
    if (options.method === 'DELETE' && path.startsWith('/conflicts/')) {
      const match = path.match(/^\/conflicts\/(\d+)/)
      if (match) {
        const idx = demoData.conflicts.findIndex(c => c.id === Number(match[1]))
        if (idx === -1) throw new Error('No encontrado')
        demoData.conflicts.splice(idx, 1)
        return null
      }
    }
    throw new Error('No implementado en modo demo')
  }

  // Modo normal (API real)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message ?? `HTTP ${response.status}`
    throw new Error(message)
  }

  return data
}

export const api = {
  baseUrl: API_BASE_URL,
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(path, {
      method: 'DELETE',
    }),
}