import { z } from "zod"

export const farmSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
})

export type FarmFormData = z.infer<typeof farmSchema>
