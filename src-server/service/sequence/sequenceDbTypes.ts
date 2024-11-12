import { z } from 'zod'

import { entityMongodbIdSchema } from '@/store/mongoDb'

export const sequenceEntitySchema = z.object({
    _id: entityMongodbIdSchema,
    name: z.string(),
    value: z.number(),
})

export type SequenceEntity = z.infer<typeof sequenceEntitySchema>

export const sequenceDtoSchema = z.object({
    name: sequenceEntitySchema.shape.name,
    value: sequenceEntitySchema.shape.value,
})

export type SequenceDto = z.infer<typeof sequenceDtoSchema>

export const sequenceConvert = {
    entityToDto(entity: SequenceEntity): SequenceDto {
        const { _id, ...values } = entity
        const candidate: SequenceDto = {
            ...values,
        }

        return sequenceDtoSchema.parse(candidate satisfies SequenceDto)
    },
}

