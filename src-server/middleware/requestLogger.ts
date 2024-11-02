import { IncomingMessage, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'

import { CustomAttributeKeys, Options, pinoHttp } from 'pino-http'
import { LevelWithSilent } from 'pino'
import { Request, RequestHandler, Response } from 'express'

import { isDev } from '@/config'

type PinoCustomProps = {
    err: Error
    request: Request
    response: Response
    responseBody: unknown
}

const customProps = (req: Request, res: Response): PinoCustomProps => ({
    request: req,
    response: res,
    err: res.locals.err,
    responseBody: res.locals.responseBody,
})

const genReqId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const existingID = req.id ?? req.headers['x-request-id']

    if (existingID) {
        return existingID
    }

    const id = randomUUID()

    res.setHeader('X-Request-Id', id)

    return id
}

// eslint-disable-next-line complexity
const customLogLevel = (req: IncomingMessage, res: ServerResponse, err?: Error): LevelWithSilent => {
    if (res.statusCode === 401 || res.statusCode === 404) {
        return 'silent'
    }
    if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
    }
    if (res.statusCode >= 500 || err) {
        return 'error'
    }
    if (res.statusCode >= 300 && res.statusCode < 400) {
        return 'silent'
    }
    if (
        req.method === 'GET' &&
        res.statusCode === 200 && (
            req.headers.accept?.includes('text/html') ||
            req.headers.accept?.includes('image/*') ||
            req.url?.startsWith('/assets/') ||
            req.url?.startsWith('/node_modules/') ||
            req.url?.startsWith('/src-client/') ||
            req.url?.startsWith('/@')
        )
    ) {
        return 'silent'
    }
    // if (req.method === 'GET' && res.statusCode === 200) {
    //     console.log(JSON.stringify(req.headers.accept))
    // }

    return 'info'
}

const customAttributeKeys: CustomAttributeKeys = {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
}

const responseBodyMiddleware: RequestHandler = (req, res, next) => {
    if (isDev) {
        const originalSend = res.send

        res.send = (content) => {
            res.locals.responseBody = content
            res.send = originalSend

            return originalSend.call(res, content)
        }
    }
    next()
}

export const requestLogger = (options?: Options): RequestHandler[] => {
    const pinoOptions: Options = {
        customProps: customProps as unknown as Options['customProps'],
        redact: ['request.headers', 'response.headers'],
        genReqId,
        customLogLevel,
        // customReceivedMessage: req => `request received: ${req.method}`,
        // customSuccessMessage: (req, res) => ((res.statusCode === 404) ? 'resource not found' : `${req.method} completed`),
        // customErrorMessage: (req, res) => `request errored with status code: ${res.statusCode}`,
        customAttributeKeys,
        ...options,
    }

    return [responseBodyMiddleware, pinoHttp(pinoOptions)]
}
