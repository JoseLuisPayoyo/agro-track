import { api } from '../lib/api'
import { Parcel } from '../types'

export const parcelsService = {
  getAll: async (): Promise<Parcel[]> => {
    const res = await api.get<Parcel[]>('/parcels')
    return res.data
  },
  getById: async (id: string): Promise<Parcel> => {
    const res = await api.get<Parcel>(`/parcels/id/${id}`)
    return res.data
  },
  getByFarm: async (farmId: string): Promise<Parcel[]> => {
    const res = await api.get<Parcel[]>(`/parcels/farm/${farmId}`)
    return res.data
  },
  create: async (data: Partial<Parcel>) => api.post('/parcels', data),
  update: async (id: string, data: Partial<Parcel>) => api.put(`/parcels/${id}`, data),
  remove: async (id: string) => api.delete(`/parcels/${id}`),
}
