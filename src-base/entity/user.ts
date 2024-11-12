import z from 'zod'

import { idSchema } from './fields'

export const userRoleSchema = z.enum(['admin'])

export type UserRole = z.infer<typeof userRoleSchema>

export const userSensitiveSchema = z.object({
    id: idSchema,
    name: z.string().min(1).max(256),
    email: z.string().min(1).max(256),
    passhash: z.string().min(1).max(256),
    roles: z.array(userRoleSchema).max(10),
})

export type UserSensitive = z.infer<typeof userSensitiveSchema>

export const userSchema = z.object({
    id: userSensitiveSchema.shape.id,
    name: userSensitiveSchema.shape.name,
    email: userSensitiveSchema.shape.email,
    roles: userSensitiveSchema.shape.roles,
})

export type User = z.infer<typeof userSchema>
