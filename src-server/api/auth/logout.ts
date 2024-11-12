import { asyncRoute, useAuth } from '@/utils'

import { authRouter } from './router'

authRouter.post('/logout', asyncRoute(async (req) => {
    useAuth()

    await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}))
