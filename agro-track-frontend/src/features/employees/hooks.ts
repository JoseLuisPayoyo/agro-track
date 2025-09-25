import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee, type EmployeesQueryParams } from './api'


export function useEmployeesQuery(params: EmployeesQueryParams) {
return useQuery({ queryKey: ['employees', params], queryFn: () => getEmployees(params) })
}


export function useEmployeeQuery(id?: number) {
return useQuery({ queryKey: ['employee', id], queryFn: () => getEmployee(id!), enabled: !!id })
}


export function useCreateEmployee() {
const qc = useQueryClient()
return useMutation({
mutationFn: createEmployee,
onSuccess: () => {
toast.success('Empleado creado')
qc.invalidateQueries({ queryKey: ['employees'] })
},
})
}


export function useUpdateEmployee(id: number) {
const qc = useQueryClient()
return useMutation({
mutationFn: (payload: any) => updateEmployee(id, payload),
onSuccess: () => {
toast.success('Empleado actualizado')
qc.invalidateQueries({ queryKey: ['employees'] })
qc.invalidateQueries({ queryKey: ['employee', id] })
},
})
}


export function useDeleteEmployee() {
const qc = useQueryClient()
return useMutation({
mutationFn: deleteEmployee,
onSuccess: () => {
toast.success('Empleado eliminado')
qc.invalidateQueries({ queryKey: ['employees'] })
},
})
}