import { Filter } from 'mongodb'

import { apiProductGetListQueryParamsSchema, apiProductGetListResponseSchema } from '@base/api'
import { asyncRoute, useAuth, useQueryParams } from '@/utils'
import { ProductDto, productService } from '@/service/product'

import { productRouter } from './router'

productRouter.get('/list', asyncRoute(apiProductGetListResponseSchema, async () => {
    useAuth()

    const { search } = useQueryParams(apiProductGetListQueryParamsSchema)
    const filter: Filter<ProductDto> = search
        ? {
            name: { $regex: search, $options: 'i' },
        }
        : {}

    return productService.list(filter)
}))
