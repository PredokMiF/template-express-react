import { apiProductDeleteRouteParamsSchema } from '@base/api'
import { asyncRoute, useRouteParams, useAuth } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.delete('/:id', asyncRoute(async () => {
    useAuth('admin')

    const { id } = useRouteParams(apiProductDeleteRouteParamsSchema)

    await productService.delete({ id })
}))
