import z from 'zod'
import { ObjectId } from 'mongodb'

export const dtoMongodbIdSchema = z
    .string()
    .superRefine((val, ctx) => {
        if (!ObjectId.isValid(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Value ${JSON.stringify(val)} invalid for mongodb's ObjectId`,
            })
        }
    })

export const entityMongodbIdSchema = z.instanceof(ObjectId)
