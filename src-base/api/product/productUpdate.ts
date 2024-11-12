import z from 'zod'

import { productSchema } from '@base/entity'

export const apiProductUpdateRouteParamsSchema = z.object({
    id: productSchema.shape.id,
})

export type ApiProductUpdateRouteParams = z.infer<typeof apiProductUpdateRouteParamsSchema>

export const apiProductUpdateRequestBodySchema = z.object({
    name: productSchema.shape.name.optional(),
})

export type ApiProductUpdateRequestBody = z.infer<typeof apiProductUpdateRequestBodySchema>

export const apiProductUpdateResponseSchema = productSchema

export type ApiProductUpdateResponse = z.infer<typeof apiProductUpdateResponseSchema>
