import z from 'zod'

import { productSchema } from '@base/entity'

export const apiProductDeleteRouteParamsSchema = z.object({
    id: productSchema.shape.id,
})

export type ApiProductDeleteRouteParams = z.infer<typeof apiProductDeleteRouteParamsSchema>
