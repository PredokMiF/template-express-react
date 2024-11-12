import z from 'zod'

import { productSchema } from '@base/entity'

export const apiProductCreateRequestBodySchema = z.object({
    name: productSchema.shape.name,
})

export type ApiProductCreateRequestBody = z.infer<typeof apiProductCreateRequestBodySchema>

export const apiProductCreateResponseSchema = productSchema

export type ApiProductCreateResponse = z.infer<typeof apiProductCreateResponseSchema>
