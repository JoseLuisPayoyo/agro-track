import { api } from '../lib/api'
import { Employee } from '../types'

export const employeesService = {
  getAll: async (): Promise<Employee[]> => {
    const res = await api.get<Employee[]>('/employees')
    return res.data
  },
  getById: async (id: string): Promise<Employee> => {
    const res = await api.get<Employee>(`/employees/id/${id}`)
    return res.data
  },
  create: async (data: Partial<Employee>) => api.post('/employees', data),
  update: async (id: string, data: Partial<Employee>) => api.put(`/employees/${id}`, data),
  remove: async (id: string) => api.delete(`/employees/${id}`),
}
