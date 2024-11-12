import { apiProductCreateRequestBodySchema, apiProductCreateResponseSchema } from '@base/api'
import { asyncRoute, useBody } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.post('/', asyncRoute(apiProductCreateResponseSchema, async () => {
    const candidate = useBody(apiProductCreateRequestBodySchema)

    return await productService.create(candidate)
}))
