export type EmployeeStatus = 'ACTIVE' | 'INACTIVE'


export interface EmployeeDTO {
id: number
name: string
lastName: string
dni: string
email?: string
phone?: string
address?: string
jobTitle?: string
status: EmployeeStatus
hireDate?: string
crewId: number
farmId?: number | null
}