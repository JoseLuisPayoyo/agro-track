import { api } from '../lib/api'
import { WorkPart } from '../types'

export const workPartsService = {
  getAll: async (): Promise<WorkPart[]> => {
    const res = await api.get<WorkPart[]>('/work-parts')
    return res.data
  },
  getById: async (id: string): Promise<WorkPart> => {
    const res = await api.get<WorkPart>(`/work-parts/id/${id}`)
    return res.data
  },
  create: async (data: Partial<WorkPart>) => api.post('/work-parts', data),
  update: async (id: string, data: Partial<WorkPart>) => api.put(`/work-parts/${id}`, data),
  remove: async (id: string) => api.delete(`/work-parts/${id}`),
}
