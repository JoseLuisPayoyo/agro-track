import { api } from '../lib/api'

export interface Crew {
  id: string
  name: string
  foremanId: string
  foremanName: string
}

export const crewsService = {
  getAll: async (): Promise<Crew[]> => {
    const res = await api.get<Crew[]>('/crews')
    return res.data
  },
  getById: async (id: string): Promise<Crew> => {
    const res = await api.get<Crew>(`/crews/id/${id}`)
    return res.data
  },
  create: async (data: Partial<Crew>) => api.post('/crews', data),
  update: async (id: string, data: Partial<Crew>) => api.put(`/crews/${id}`, data),
  remove: async (id: string) => api.delete(`/crews/${id}`),
}
