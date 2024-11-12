import z from 'zod'

import { userSchema } from '@base/entity'

export const apiAuthRegisterRequestBodySchema = z.object({
    name: userSchema.shape.name,
    email: userSchema.shape.email,
    password: z.string().min(1).max(256),
})

export type ApiAuthRegisterRequestBody = z.infer<typeof apiAuthRegisterRequestBodySchema>
