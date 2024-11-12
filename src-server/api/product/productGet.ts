import { apiProductGetRouteParamsSchema, apiProductGetResponseSchema } from '@base/api'
import { asyncRoute, useRouteParams, HttpError } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.get('/:id', asyncRoute(apiProductGetResponseSchema, async () => {
    const { id } = useRouteParams(apiProductGetRouteParamsSchema)

    const product = await productService.find({ id })

    if (!product) {
        throw HttpError.NotFound()
    }

    return product
}))
