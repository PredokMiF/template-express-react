import z from 'zod'

export const idSchema = z.preprocess(
    (val) => {
        if (typeof val === 'number') {
            return val
        }
        if (typeof val === 'string') {
            return parseInt(val, 10)
        }

        return val
    },
    z.number()
        .int()
        .positive()
        .finite()
        .safe(),
)
