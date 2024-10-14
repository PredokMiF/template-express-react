// import cors from 'cors'
import type { Express } from 'express'
import express from 'express'
// import helmet from 'helmet'

import { requestLogger } from './middleware/requestLogger'
import { errorHandler } from './middleware/errorHandler'
import { initFrontend } from './middleware/frontend'
// import { getCorsOrigin } from '@common/utils/envConfig'
// import { healthCheckRouter } from '@modules/healthCheck/healthCheckRoutes'
// import { apiRouter } from './router'

const server: Express = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// const corsOrigin = getCorsOrigin()

// Middlewares
// app.use(cors({
//     origin: [corsOrigin],
//     credentials: true,
// }))
// app.use(helmet())

// Request logging
server.use(requestLogger())

await initFrontend(server)

// Routes
// app.use('/health-check', healthCheckRouter)
// server.use('/api', router)

// Error handlers
server.use(errorHandler())

export { server }
