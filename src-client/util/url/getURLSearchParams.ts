export function getURLSearchParams(value: object | string | null | undefined) {
    const params: Record<string, string> = {}

    if (!value) {
        return ''
    }

    if (typeof value === 'string') {
        return value.toString()
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value)
            .forEach(([key, value]) => {
                if (!key || value === null || value === undefined || value === '') {
                    return
                }

                if (typeof value === 'number') {
                    params[key] = `${value}`
                } else if (typeof value === 'string') {
                    params[key] = value
                } else if (value instanceof Date) {
                    params[key] = value.toISOString()
                } else if (Array.isArray(value)) {
                    params[key] = value.toString()
                } else if (typeof value === 'boolean') {
                    params[key] = value.toString()
                } else {
                    throw new Error(`Невозможно сконвертировать "${key}"=${JSON.stringify(value)} в search параметр`)
                }
            })
    }

    return new URLSearchParams(params).toString()
}
