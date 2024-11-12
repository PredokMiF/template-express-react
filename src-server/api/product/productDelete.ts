import { apiProductDeleteRouteParamsSchema } from '@base/api'
import { asyncRoute, useRouteParams } from '@/utils'
import { productService } from '@/service/product'

import { productRouter } from './router'

productRouter.delete('/:id', asyncRoute(async () => {
    const { id } = useRouteParams(apiProductDeleteRouteParamsSchema)

    await productService.delete({ id })
}))
