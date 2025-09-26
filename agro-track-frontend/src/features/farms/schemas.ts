import { z } from "zod"

export const farmSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().optional(),
})

export type FarmFormData = z.infer<typeof farmSchema>
