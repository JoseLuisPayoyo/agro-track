import api from '@/lib/axios'
import type { EmployeeDTO } from './types'


export interface EmployeesQueryParams { page?: number; size?: number; status?: string; crewId?: number; q?: string }


export async function getEmployees(params: EmployeesQueryParams = {}) {
const { data } = await api.get('/api/employees', { params })
return data as { content: EmployeeDTO[]; totalElements: number; totalPages: number; number: number; size: number }
}


export async function getEmployee(id: number) {
const { data } = await api.get(`/api/employees/id/${id}`)
return data as EmployeeDTO
}


export async function createEmployee(payload: Omit<EmployeeDTO, 'id'>) {
const { data } = await api.post('/api/employees', payload)
return data as EmployeeDTO
}


export async function updateEmployee(id: number, payload: Partial<EmployeeDTO>) {
const { data } = await api.put(`/api/employees/${id}`, payload)
return data as EmployeeDTO
}


export async function deleteEmployee(id: number) {
await api.delete(`/api/employees/${id}`)
return true
}