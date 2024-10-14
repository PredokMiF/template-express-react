import type { ErrorRequestHandler, RequestHandler } from 'express'

const unexpectedRequest: RequestHandler = (req, res) => {
    res.sendStatus(404)
}

const addErrorToRequestLog: ErrorRequestHandler = (err, req, res, next) => {
    res.locals.err = err
    next(err)
}

const defaultErrorRequestHandler: ErrorRequestHandler = (err, req, res) => {
    res.sendStatus(500)
}

export const errorHandler = () => {
    return [unexpectedRequest, addErrorToRequestLog, defaultErrorRequestHandler]
}
