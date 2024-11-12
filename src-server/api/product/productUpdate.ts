import { apiProductUpdateRouteParamsSchema, apiProductUpdateRequestBodySchema, apiProductUpdateResponseSchema } from '@base/api'
import { asyncRoute, useBody, useAuth, useRouteParams, HttpError } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.put('/:id', asyncRoute(apiProductUpdateResponseSchema, async () => {
    useAuth('admin')

    const { id } = useRouteParams(apiProductUpdateRouteParamsSchema)
    const candidate = useBody(apiProductUpdateRequestBodySchema)

    const product = await productService.update({ id }, candidate)

    if (!product) {
        throw HttpError.NotFound(`Product with id "${id}" not found`)
    }

    return product
}))
