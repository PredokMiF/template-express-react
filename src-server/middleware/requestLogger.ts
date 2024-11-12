import { IncomingMessage, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'

import { CustomAttributeKeys, Options, pinoHttp } from 'pino-http'
import { LevelWithSilent } from 'pino'
import { RequestHandler } from 'express'

import { HttpError } from '@/utils'

const genReqId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const existingID = req.id ?? req.headers['x-request-id']

    if (existingID) {
        return existingID
    }

    const id = randomUUID()

    res.setHeader('X-Request-Id', id)

    return id
}

const customLogLevel = (req: IncomingMessage, res: ServerResponse, err?: Error): LevelWithSilent => {
    if (err) {
        return 'error'
    }
    if (res.statusCode < 400) {
        return 'silent'
    }

    if (
        res.statusCode === 400 ||
        res.statusCode === 401 ||
        res.statusCode === 403 ||
        res.statusCode === 404
    ) {
        return 'warn'
    }

    if (res.statusCode >= 400) {
        return 'error'
    }

    return 'info'
}

const customAttributeKeys: CustomAttributeKeys = {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
}

export const requestLogger = (options?: Options): RequestHandler[] => {
    const pinoOptions: Options = {
        customProps: (req, res) => {
            const { httpError } = ('locals' in res ? res.locals : {}) as { httpError?: HttpError }
            const errorDetails = httpError?.errorDetails ?? {}
            const publicDetails = httpError?.publicDetails ?? {}

            return {
                request: req,
                response: res,
                ...errorDetails,
                publicDetails,
            }
        },
        redact: ['request.headers', 'response.headers'],
        genReqId,
        customLogLevel,
        customSuccessObject: (req, res) => {
            const { httpError } = ('locals' in res ? res.locals : {}) as { httpError?: HttpError }

            if (httpError?.baseError) {
                return { error: httpError.baseError }
            }

            return {}
        },
        customErrorObject: (req, res, error) => {
            const { httpError } = ('locals' in res ? res.locals : {}) as { httpError?: HttpError }

            if (!httpError) {
                return error
            }

            if (httpError.baseError) {
                return httpError.baseError
            }

            return httpError
        },
        customAttributeKeys,
        ...options,
    }

    return [pinoHttp(pinoOptions)]
}
