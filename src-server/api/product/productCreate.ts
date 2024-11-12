import { apiProductCreateRequestBodySchema, apiProductCreateResponseSchema } from '@base/api'
import { asyncRoute, useBody, useAuth } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.post('/', asyncRoute(apiProductCreateResponseSchema, async () => {
    useAuth('admin')

    const candidate = useBody(apiProductCreateRequestBodySchema)

    return await productService.create(candidate)
}))
