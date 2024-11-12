// import cors from 'cors'
import express, { Express } from 'express'
// import helmet from 'helmet'

import { config } from '@/config'

import { requestLogger } from './middleware/requestLogger'
import { initFrontend } from './middleware/frontend'
import { errorHandler } from './middleware/errorHandler'
// import { getCorsOrigin } from '@common/utils/envConfig'
// import { healthCheckRouter } from '@modules/healthCheck/healthCheckRoutes'
import { router } from './router'

const server: Express = express()

server.disable('x-powered-by')
if (config.app.trustProxyCount > 0) {
    server.set('trust proxy', config.app.trustProxyCount)
}

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// const corsOrigin = getCorsOrigin()

// Middlewares
// app.use(cors({
//     origin: [corsOrigin],
//     credentials: true,
// }))
// app.use(helmet())
// Compress response
// Add header (in Helmet) Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; form-action 'none'; block-all-mixed-content; sandbox allow-scripts

// Request logging
server.use(requestLogger())

await initFrontend(server)

// Routes
// app.use('/health-check', healthCheckRouter)
server.use('/api', router)

// Error handlers
server.use(errorHandler())

export { server }
