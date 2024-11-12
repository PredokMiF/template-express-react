import { Request, Response, NextFunction, RequestHandler } from 'express'
import z from 'zod'
import { fromZodError } from 'zod-validation-error'

import { UserRole, User } from '@base/entity'

import { HttpError } from './HttpError'

const encapsulated = (() => {
    let syncRequest: Request | null = null
    let syncResponse: Response | null = null

    function asyncRoute(
        route: (req: Request, res: Response) => Promise<void>,
    ): RequestHandler
    function asyncRoute<ResType extends z.Schema>(
        responseSchema: ResType,
        route: (req: Request, res: Response) => Promise<z.infer<ResType>>,
    ): RequestHandler
    function asyncRoute<ResType extends z.Schema>(
        first: ResType | ((req: Request, res: Response) => Promise<void>),
        second?: (req: Request, res: Response) => Promise<z.infer<ResType>>,
    ): RequestHandler {
        const responseSchema = first instanceof z.Schema ? first : undefined
        const route = second || first

        if (route instanceof z.Schema) {
            throw HttpError.InternalServerError('TS overlapping unexpected situation')
        }

        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                syncRequest = req
                syncResponse = res

                const promise = route(req, res)

                syncRequest = null
                syncResponse = null

                const routeResult = await promise

                if (responseSchema) {
                    const validationResult = responseSchema.safeParse(routeResult)

                    if (res.writableEnded) {
                        throw HttpError.InternalServerError('Response has already been sent')
                    }

                    if (validationResult.success) {
                        res.json(validationResult.data)

                        return
                    }

                    const error = fromZodError(validationResult.error, { prefix: 'Response is not valid' })

                    throw HttpError.InternalServerError(error)
                } else {
                    res.json(null)
                }
            } catch (e) {
                next(e)
            }
        }
    }

    function isUseSync(fooName: string) {
        if (!syncRequest || !syncResponse) {
            throw new Error(`"${fooName}" can be used inside "asyncRoute" before first "await"`)
        }

        return [syncRequest, syncResponse] as const
    }

    return { asyncRoute, isUseSync }
})()

export const asyncRoute = encapsulated.asyncRoute
export const isUseSync = encapsulated.isUseSync

export function useRouteParams<T extends z.AnyZodObject>(schema: T): z.infer<T> {
    const [req] = isUseSync('useRouteParams')

    const validationResult = schema.safeParse(req.params)

    if (validationResult.success) {
        return validationResult.data
    }

    const error = fromZodError(validationResult.error, { prefix: 'Route param(s) is not valid' })

    throw HttpError.BadRequest(error)
}

export function useQueryParams<T extends z.AnyZodObject>(schema: T): z.infer<T> {
    const [req] = isUseSync('useQueryParams')

    const validationResult = schema.safeParse(req.query)

    if (validationResult.success) {
        return validationResult.data
    }

    const error = fromZodError(validationResult.error, { prefix: 'Query param(s) is not valid' })

    throw HttpError.BadRequest(error)
}

export function useBody<T extends z.AnyZodObject>(schema: T): z.infer<T> {
    const [req] = isUseSync('useQueryParams')

    const validationResult = schema.safeParse(req.body)

    if (validationResult.success) {
        return validationResult.data
    }

    const error = fromZodError(validationResult.error, { prefix: 'Query param(s) is not valid' })

    throw HttpError.BadRequest(error)
}

export function useAuthSafe(): User | null {
    const [req] = isUseSync('useQueryParams')

    return req.session.user || null
}

export function useAuth(role?: UserRole | UserRole[]): User {
    const user = useAuthSafe()

    if (!user) {
        throw HttpError.Unauthorized()
    }

    if (!role) {
        return user
    }

    const hasRole = typeof role === 'string'
        ? user.roles.includes(role)
        : user.roles.some(userRole => role.includes(userRole))

    if (!hasRole) {
        throw HttpError.Forbidden(`Need role: ${JSON.stringify(role)}, but user have ${JSON.stringify(user.roles)}`)
    }

    return user
}
