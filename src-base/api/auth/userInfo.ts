import z from 'zod'

import { userSchema } from '@base/entity'

export const apiAuthUserInfoResponseSchema = userSchema.or(z.null())

export type ApiAuthUserInfoResponse = z.infer<typeof apiAuthUserInfoResponseSchema>
