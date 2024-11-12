import { apiAuthUserInfoResponseSchema } from '@base/api'
import { userSchema, User } from '@base/entity'
import { asyncRoute, useAuthSafe } from '@/utils'

import { authRouter } from './router'

authRouter.post('/userInfo', asyncRoute(apiAuthUserInfoResponseSchema, async () => {
    const sessionUser = useAuthSafe()

    if (!sessionUser) {
        return null
    }

    return userSchema.parse(sessionUser satisfies User)
}))
