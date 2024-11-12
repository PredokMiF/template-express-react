import bcrypt from 'bcrypt'

import { apiAuthRegisterRequestBodySchema } from '@base/api'
import { userService } from '@/service/user'
import { asyncRoute, HttpError, useBody } from '@/utils'

import { authRouter } from './router'

authRouter.post('/register', asyncRoute(async () => {
    const { email, name, password } = useBody(apiAuthRegisterRequestBodySchema)

    const currentUser = await userService.find({
        email: { $regex: `^${email}$`, $options: 'i' },
    })

    if (currentUser) {
        throw HttpError.InternalServerError(undefined, { messageToUser: 'Пользователь с таким email уже зарегистрирован' })
    }

    const passhash = await bcrypt.hash(password, 10)

    await userService.create({
        email,
        name,
        passhash,
        roles: [],
    })
}))
