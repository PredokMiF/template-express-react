import process from 'node:process'

import { logger } from './logger'
import { config } from './config'
import { server } from './server'

const { siteUrl, app: { host, port } } = config

const app = server.listen(port, host, () => {
    logger.info(`Server started on ${host}:${port} (${siteUrl})`)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.warn(`Unhandled Rejection at: ${promise}, reason: ${reason}`)
})

process.on('uncaughtException', (err, origin) => {
    logger.fatal(`Uncaught exception: ${err}\n Exception origin: ${origin}`)

    app.close(() => {
        logger.info('server closed on uncaughtException')
        process.exit()
    })

    setTimeout(() => {
        process.abort()
    }, 5000).unref()
})

const onCloseSignal = () => {
    logger.info('sigint received, shutting down')

    app.close(() => {
        logger.info('server closed on onCloseSignal')
        process.exit()
    })

    setTimeout(() => process.exit(1), 10000)
        .unref() // Force shutdown after 10s
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
