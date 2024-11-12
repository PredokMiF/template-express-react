import z from 'zod'

import { productSchema } from '@base/entity'

export const apiProductGetListQueryParamsSchema = z.object({
    search: z.string().default(''),
})

export type ApiProductGetListQueryParams = z.infer<typeof apiProductGetListQueryParamsSchema>

export const apiProductGetListResponseSchema = z.array(productSchema)

export type ApiProductGetListResponse = z.infer<typeof apiProductGetListResponseSchema>
