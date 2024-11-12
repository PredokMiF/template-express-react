import statuses from 'statuses'

export interface HttpErrorParams {
    errorDetails?: Record<string, unknown>
    publicDetails?: Record<string, unknown>
    messageToUser?: string
}

export class HttpError extends Error {
    readonly isHttpError = true
    readonly statusCode: number
    readonly baseError?: Error | undefined
    readonly errorDetails?: Record<string, unknown> | undefined
    publicDetails: Record<string, unknown> | undefined

    constructor(
        statusCode: number,
        baseError: string | Error | HttpError | undefined,
        { errorDetails, publicDetails, messageToUser }: HttpErrorParams = {},
    ) {
        if (isHttpError(baseError)) {
            return baseError
        }

        const message = statuses.message[statusCode] || 'Error'

        super(message)

        this.statusCode = statusCode
        this.baseError = typeof baseError === 'string' ? new Error(baseError) : baseError
        this.errorDetails = errorDetails ?? {}
        this.publicDetails = publicDetails ?? {}

        if (messageToUser) {
            this.publicDetails.message = messageToUser
        }
    }

    static BadRequest(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(400, baseError, params)
    }

    static Unauthorized(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(401, baseError, params)
    }

    static Forbidden(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(403, baseError, params)
    }

    static NotFound(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(404, baseError, params)
    }

    static InternalServerError(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(500, baseError, params)
    }

    static NotImplemented(baseError?: string | Error | HttpError | undefined, params?: HttpErrorParams) {
        return new HttpError(501, baseError, params)
    }
}

export function isHttpError(error: unknown): error is HttpError {
    return (error instanceof HttpError) && error.isHttpError
}
