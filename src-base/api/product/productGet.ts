import z from 'zod'

import { productSchema } from '@base/entity'

export const apiProductGetRouteParamsSchema = z.object({
    id: productSchema.shape.id,
})

export type ApiProductGetRouteParams = z.infer<typeof apiProductGetRouteParamsSchema>

export const apiProductGetResponseSchema = productSchema

export type ApiProductGetResponse = z.infer<typeof apiProductGetResponseSchema>
