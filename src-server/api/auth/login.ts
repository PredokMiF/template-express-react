import bcrypt from 'bcrypt'

import { apiAuthLoginRequestBodySchema, apiAuthLoginResponseSchema } from '@base/api'
import { userService } from '@/service/user'
import { asyncRoute, useBody, HttpError } from '@/utils'

import { authRouter } from './router'

authRouter.post('/login', asyncRoute(apiAuthLoginResponseSchema, async (req) => {
    const { login, password } = useBody(apiAuthLoginRequestBodySchema)

    const user = await userService.find({
        email: { $regex: `^${login}$`, $options: 'i' },
    })

    if (!user) {
        throw getInvalidCredentialsError()
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passhash)

    if (!isPasswordCorrect) {
        throw getInvalidCredentialsError()
    }

    req.session.user = user

    return user
}))

function getInvalidCredentialsError() {
    return HttpError.Unauthorized(undefined, { messageToUser: 'Ошибка авторизации' })
}
