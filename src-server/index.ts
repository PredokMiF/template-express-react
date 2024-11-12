import process from 'node:process'

import { closeMongoClientConnection } from '@/store/mongoDb'
import { server } from '@/server'
import { logger } from '@/logger'
import { config } from '@/config'

const { siteUrl, app: { host, port } } = config

const app = server.listen(port, host, () => {
    logger.info(`Server started on ${host}:${port} (${siteUrl})`)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.warn(`Unhandled Rejection at: ${promise}, reason: ${reason}`)
})

process.on('uncaughtException', (err, origin) => {
    logger.fatal(`Uncaught exception: ${err}\n Exception origin: ${origin}`)

    const closingDb = closeMongoClientConnection().then(() => {
        logger.info('DB connection closed on uncaughtException')
    })

    const closingWebApp = new Promise((resolve, reject) => {
        app.close((e) => {
            if (e) {
                logger.warn(`Web-app cant close on uncaughtException ${(e as unknown as Error).toString()}`)
                reject()
            } else {
                logger.info('Web-app closed on uncaughtException')
                resolve(null)
            }

        })
    })

    Promise.all([
        closingDb,
        closingWebApp,
    ]).then(() => {
        process.exit()
    })

    setTimeout(() => {
        process.abort()
    }, 5000).unref()
})

const onCloseSignal = () => {
    logger.info('sigint received, shutting down')

    const closingDb = closeMongoClientConnection().then(() => {
        logger.info('DB connection closed on shutting down signal')
    })

    const closingWebApp = new Promise((resolve, reject) => {
        app.close((e) => {
            if (e) {
                logger.warn(`Web-app cant close on uncaughtException ${(e as unknown as Error).toString()}`)
                reject()
            } else {
                logger.info('Web-app closed on shutting down signal')
                resolve(null)
            }

        })
    })

    Promise.all([
        closingDb,
        closingWebApp,
    ]).then(() => {
        process.exit()
    })

    setTimeout(() => process.exit(1), 10000)
        .unref() // Force shutdown after 10s
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
