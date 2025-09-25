import { z } from 'zod'


export const employeeSchema = z.object({
id: z.number().int().positive().optional(),
name: z.string().min(1, 'Nombre requerido'),
lastName: z.string().min(1, 'Apellidos requeridos'),
dni: z.string().min(5, 'DNI requerido'),
email: z.string().email().optional().or(z.literal('')),
phone: z.string().optional().or(z.literal('')),
address: z.string().optional().or(z.literal('')),
jobTitle: z.string().optional().or(z.literal('')),
status: z.enum(['ACTIVE', 'INACTIVE']),
hireDate: z.string().optional().or(z.literal('')),
crewId: z.number().int().positive(),
farmId: z.number().int().positive().nullable().optional(),
})
export type EmployeeFormValues = z.infer<typeof employeeSchema>