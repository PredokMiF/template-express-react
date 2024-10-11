import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { getNearestPackage } from './utils'

export const PROJECT_ROOT_PATH = getNearestPackage(dirname(fileURLToPath(import.meta.url)))

if (!PROJECT_ROOT_PATH || PROJECT_ROOT_PATH === '/' || PROJECT_ROOT_PATH === '.') {
    throw new Error('Server package.json not found')
}

export const DIST_STATIC_ROOT_PATH = resolve(PROJECT_ROOT_PATH, 'dist/static')

// export const FILESTORE_DIRNAME = 'data'
// export const FILESTORE_DIRPATH = resolve(PROJECT_ROOT_PATH, FILESTORE_DIRNAME)

export const isProd = process.env.NODE_ENV === 'production'
export const isDev = !isProd

dotenv.config({ path: join(PROJECT_ROOT_PATH, '.env') })

const configValidationResult = z.object({
    SITE_URL: z.string().default('http://localhost:8080'),
    HOST: z.string().default('localhost'),
    PORT: z.coerce.number().int().positive().finite().safe().default(8080),
}).transform((o) => {
    return ({
        siteUrl: o.SITE_URL,
        app: {
            host: o.HOST,
            port: o.PORT,
        },
    })
}).safeParse(process.env)

if (!configValidationResult.success) {
    throw fromZodError(configValidationResult.error, { prefix: 'ENV config is failed' })
}

export const config = configValidationResult.data
