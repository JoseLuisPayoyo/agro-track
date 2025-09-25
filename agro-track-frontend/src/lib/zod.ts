import { z } from 'zod'


export const idSchema = z.number().int().positive()
export const maybeIdSchema = z.number().int().positive().nullable().optional()


export const pagedSchema = <T extends z.ZodTypeAny>(item: T) =>
z.object({
content: z.array(item),
totalElements: z.number(),
totalPages: z.number(),
size: z.number(),
number: z.number(),
})