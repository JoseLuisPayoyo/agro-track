import { api } from '../lib/api'
import { WorkerEntry } from '../types'

export const workPartEntriesService = {
  getAll: async (): Promise<WorkerEntry[]> => {
    const res = await api.get<WorkerEntry[]>('/work-parts-entries')
    return res.data
  },
  getById: async (id: string): Promise<WorkerEntry> => {
    const res = await api.get<WorkerEntry>(`/work-parts-entries/id/${id}`)
    return res.data
  },
  getByWorkPart: async (workPartId: string): Promise<WorkerEntry[]> => {
    const res = await api.get<WorkerEntry[]>(`/work-parts-entries/work-part/${workPartId}`)
    return res.data
  },
  create: async (data: Partial<WorkerEntry>) => api.post('/work-parts-entries', data),
  update: async (id: string, data: Partial<WorkerEntry>) => api.put(`/work-parts-entries/${id}`, data),
  remove: async (id: string) => api.delete(`/work-parts-entries/${id}`),
}
