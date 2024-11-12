import { Db, Collection, ObjectId } from 'mongodb'

import { db } from '@/store/mongoDb'

import { sequenceEntitySchema, SequenceEntity } from './sequenceDbTypes'

export class SequenceService {
    private readonly db: Db
    private readonly collection: Collection<SequenceEntity>
    private isSequenceExist: Record<string, true> = {}

    constructor(db: Db) {
        this.db = db
        this.collection = this.db.collection('sequence')
    }

    private async createSequence(sequenceName: string) {
        const candidate = sequenceEntitySchema.parse({
            _id: new ObjectId(),
            name: sequenceName,
            value: 0,
        } satisfies SequenceEntity)

        await this.collection.insertOne(candidate)
    }

    private async checkSequenceExist(sequenceName: string) {
        if (this.isSequenceExist[sequenceName]) {
            return
        }

        const sequence = await this.collection.findOne({ name: sequenceName })

        if (!sequence) {
            await this.createSequence(sequenceName)
        }

        this.isSequenceExist[sequenceName] = true
    }

    async getNextSequence(sequenceName: string): Promise<number> {
        await this.checkSequenceExist(sequenceName)

        const sequence = await this.collection.findOneAndUpdate(
            { name: sequenceName },
            {
                $inc: { value: 1 },
            },
            {
                returnDocument: 'after',
            }
        )

        if (!sequence) {
            throw new Error(`Sequence ${sequenceName} not found`)
        }

        return sequence.value
    }
}

export const sequenceService = new SequenceService(db)
