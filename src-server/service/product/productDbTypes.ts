import { z } from 'zod'

import { productSchema } from '@base/entity'
import { entityMongodbIdSchema } from '@/store/mongoDb'

export const productEntitySchema = z.object({
    _id: entityMongodbIdSchema,
    id: productSchema.shape.id,
    name: productSchema.shape.name,
})

export type ProductEntity = z.infer<typeof productEntitySchema>

export const productDtoSchema = z.object({
    id: productSchema.shape.id,
    name: productSchema.shape.name,
})

export type ProductDto = z.infer<typeof productDtoSchema>

export const productConvert = {
    entityToDto(entity: ProductEntity): ProductDto {
        const { _id, ...values } = entity
        const candidate: ProductDto = {
            ...values,
        }

        return productDtoSchema.parse(candidate satisfies ProductDto)
    },
}

