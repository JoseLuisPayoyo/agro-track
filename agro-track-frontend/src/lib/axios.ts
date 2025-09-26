import axios from "axios"
import { toast } from "sonner"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
})

// Interceptor de requests (ej: añadir token)
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token")
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor de responses (errores)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || "Error de red"
    toast.error(message)
    return Promise.reject(err)
  }
)

export default api
