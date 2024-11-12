import { z } from 'zod'

import { userSensitiveSchema } from '@base/entity'
import { entityMongodbIdSchema } from '@/store/mongoDb'

export const userSensitiveEntitySchema = z.object({
    _id: entityMongodbIdSchema,
    id: userSensitiveSchema.shape.id,
    name: userSensitiveSchema.shape.name,
    email: userSensitiveSchema.shape.email,
    passhash: userSensitiveSchema.shape.passhash,
    roles: userSensitiveSchema.shape.roles,
})

export type UserSensitiveEntity = z.infer<typeof userSensitiveEntitySchema>

export const userSensitiveDtoSchema = z.object({
    id: userSensitiveSchema.shape.id,
    name: userSensitiveSchema.shape.name,
    email: userSensitiveSchema.shape.email,
    passhash: userSensitiveSchema.shape.passhash,
    roles: userSensitiveSchema.shape.roles,
})

export type UserSensitiveDto = z.infer<typeof userSensitiveDtoSchema>

export const userSensitiveConvert = {
    entityToDto(entity: UserSensitiveEntity): UserSensitiveDto {
        const { _id, ...values } = entity
        const candidate: UserSensitiveDto = {
            ...values,
        }

        return userSensitiveDtoSchema.parse(candidate satisfies UserSensitiveDto)
    },
}

