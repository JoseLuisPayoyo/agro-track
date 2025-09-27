import { api } from '../lib/api'
import { Campaign } from '../types'

export const campaignsService = {
  getAll: async (): Promise<Campaign[]> => {
    const res = await api.get<Campaign[]>('/campaigns')
    return res.data
  },
  getById: async (id: string): Promise<Campaign> => {
    const res = await api.get<Campaign>(`/campaigns/id/${id}`)
    return res.data
  },
  create: async (data: Partial<Campaign>) => api.post('/campaigns', data),
  update: async (id: string, data: Partial<Campaign>) => api.put(`/campaigns/${id}`, data),
  remove: async (id: string) => api.delete(`/campaigns/${id}`),
}
