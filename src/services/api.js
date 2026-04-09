const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'

const buildHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  ...headers,
})

const request = async (path, options = {}) => {
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