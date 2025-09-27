import { api } from '../lib/api'
import { Certificate } from '../types'

export const certificationsService = {
  getAll: async (): Promise<Certificate[]> => {
    const res = await api.get<Certificate[]>('/certifications')
    return res.data
  },
  getById: async (id: string): Promise<Certificate> => {
    const res = await api.get<Certificate>(`/certifications/id/${id}`)
    return res.data
  },
  create: async (data: Partial<Certificate>) => api.post('/certifications', data),
  update: async (id: string, data: Partial<Certificate>) => api.put(`/certifications/${id}`, data),
  remove: async (id: string) => api.delete(`/certifications/${id}`),
}
