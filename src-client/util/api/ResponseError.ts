export class ResponseError extends Error {
    readonly isResponseError: true

    constructor(baseError: unknown) {
        let superMessage = 'Empty response error'
        let errorFields: Record<string, unknown> = {}

        if (baseError) {
            if (typeof baseError === 'string') {
                superMessage = baseError
            } else if (baseError instanceof Error) {
                superMessage = baseError.stack || baseError.message
            } else if (Object.getPrototypeOf(baseError) === Object.prototype && typeof baseError === 'object' && !Array.isArray(baseError)) {
                const json = baseError as Record<string, unknown>

                errorFields = json
                superMessage = (
                    String(
                        json.message ||
                        json.error ||
                        json.statusError ||
                        json.errorMessage ||
                        json.status ||
                        json.stack
                    ) ||
                    JSON.stringify(json)
                )
            } else {
                superMessage = 'Unknown response error'
            }
        }

        super(superMessage)

        this.isResponseError = true

        Object.assign(this,errorFields)
    }

    static isResponseError(value: unknown): value is ResponseError {
        return Boolean(value && typeof value === 'object' && value instanceof ResponseError && value.isResponseError)
    }
}
