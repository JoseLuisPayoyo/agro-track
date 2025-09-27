import { api } from '../lib/api'
import { Farm } from '../types'

export const farmsService = {
  getAll: async (): Promise<Farm[]> => {
    const res = await api.get<Farm[]>('/farms')
    return res.data
  },
  getById: async (id: string): Promise<Farm> => {
    const res = await api.get<Farm>(`/farms/id/${id}`)
    return res.data
  },
  create: async (data: Partial<Farm>) => api.post('/farms', data),
  update: async (id: string, data: Partial<Farm>) => api.put(`/farms/${id}`, data),
  remove: async (id: string) => api.delete(`/farms/${id}`),
}
