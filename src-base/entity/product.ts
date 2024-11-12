import z from 'zod'

import { idSchema } from './fields'

export const productSchema = z.object({
    id: idSchema,
    name: z.string().min(1).max(256),
})

export type Product = z.infer<typeof productSchema>
