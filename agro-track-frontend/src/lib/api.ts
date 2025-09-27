import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
})

// Helpers
export const qs = (obj: Record<string, any>) =>
  Object.entries(obj)
    .filter(([,v]) => v !== undefined && v !== null && v !== '')
    .map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
