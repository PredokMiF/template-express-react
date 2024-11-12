import { ErrorRequestHandler, RequestHandler } from 'express'

import { HttpError } from '@/utils'
import { isDev } from '@/config'

const unexpectedRequest: RequestHandler = (req, res, next) => {
    next(HttpError.NotFound())
}

const addErrorToRequestLog: ErrorRequestHandler = (error, req, res, next) => {
    const wrappedError = HttpError.InternalServerError(error)

    res.locals.httpError = wrappedError

    if (res.writableEnded) {
        return
    }

    next(wrappedError)
}

const defaultErrorRequestHandler: ErrorRequestHandler = (httpError: HttpError, req, res, next) => {
    const { statusCode, message: statusName, baseError, publicDetails, errorDetails } = httpError

    res.status(statusCode)

    // respond with json
    if (req.headers['content-type']?.includes('application/json')) {
        const responseObject: Record<string, unknown> = {
            statusCode,
            statusError: statusName,
        }

        if (publicDetails) {
            Object.assign(responseObject, publicDetails)
        }

        if (isDev) {
            Object.assign(responseObject, errorDetails)
            responseObject.statusError = baseError ? baseError.stack : httpError.stack
        }

        if (typeof responseObject.statusError === 'string' && responseObject.statusError.startsWith('Error: ')) {
            responseObject.statusError = responseObject.statusError.substring('Error: '.length)
        }

        res.json(responseObject)

        return
    }

    // respond with html page
    if (req.accepts('text/html')) {
        const publicDetailsHtml = publicDetails ? `<pre>${JSON.stringify(publicDetails, null, 4)}</pre>` : ''
        const errorDetailsHtml = isDev && errorDetails ? `<pre>${JSON.stringify(errorDetails, null, 4)}</pre>` : ''
        const userStackHtml = isDev ? `<br><pre>${baseError ? baseError.stack : httpError.stack}</pre>` : ''

        res.send(`<!doctype html><html lang="en"><head><title>${statusCode} ${statusName}</title></head><body><h1>${statusCode} ${statusName}</h1>${publicDetailsHtml}${errorDetailsHtml}${userStackHtml}</body></html>`)

        return
    }

    // default to plain-text
    let responseText = `${statusCode} ${statusName}`

    if (publicDetails) {
        responseText += `\n${JSON.stringify(publicDetails, null, 4)}`
    }

    if (isDev) {
        if (errorDetails) {
            responseText += `\n${JSON.stringify(errorDetails, null, 4)}`
        }

        responseText += `\n\n${baseError ? baseError.stack : httpError.stack}`
    }

    res.type('txt').send(responseText)
}

export const errorHandler = () => {
    return [unexpectedRequest, addErrorToRequestLog, defaultErrorRequestHandler]
}
