import { api } from '../lib/api'

export type Crew = { id: string; nombre: string }

export const crewsService = {
  getAll: async (): Promise<Crew[]> => {
    const res = await api.get<Crew[]>('/crews')
    return res.data
  },
}
