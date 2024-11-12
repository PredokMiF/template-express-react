import { MongoClient } from 'mongodb'

import { config } from '@/config'
import { logger } from '@/logger'

export const mongoClient = new MongoClient(config.mongodb.uri)

export async function closeMongoClientConnection() {
    await mongoClient.close()
}

// Mongo connect
let dbName: string = 'test'

try {
    const connectResult = await mongoClient.connect()

    dbName = connectResult.options.dbName

    logger.info('[MongoDB] Connected to server successfully')
} catch (e) {
    logger.fatal('[MongoDB] Not connected to the server')

    throw e
}

// Database connect

if (!dbName || dbName === 'test') {
    throw new Error('[MongoDB] Database name must be set in MONGODB_URI')
}

const admin = mongoClient.db().admin()
const dbInfo = await admin.listDatabases()

const dbExist = dbInfo.databases.some(({ name }) => (dbName === name))

if (!dbExist) {
    throw new Error(`[MongoDB] Database "${dbName}" not exists`)
}

export const db = mongoClient.db(dbName)

logger.info(`[MongoDB] Database "${dbName}" connected successfully`)

await db.command({ ping: 1 })
