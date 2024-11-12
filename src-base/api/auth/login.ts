import z from 'zod'

import { userSchema } from '@base/entity'

export const apiAuthLoginRequestBodySchema = z.object({
    login: z.string().min(1).max(256),
    password: z.string().min(1).max(256),
})

export type ApiAuthLoginRequestBody = z.infer<typeof apiAuthLoginRequestBodySchema>

export const apiAuthLoginResponseSchema = userSchema

export type ApiAuthLoginResponse = z.infer<typeof apiAuthLoginResponseSchema>
