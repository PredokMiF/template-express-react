import { Db, Collection, ObjectId, Filter, MatchKeysAndValues } from 'mongodb'

import { db } from '@/store/mongoDb'
import { SequenceService, sequenceService } from '@/service/sequence'

import { userSensitiveEntitySchema, userSensitiveDtoSchema, UserSensitiveEntity, UserSensitiveDto, userSensitiveConvert } from './userDbTypes'

export class UserService {
    private readonly db: Db
    private readonly collection: Collection<UserSensitiveEntity>
    private readonly sequenceService: SequenceService

    constructor(db: Db, sequenceService: SequenceService) {
        this.db = db
        this.sequenceService = sequenceService
        this.collection = this.db.collection('users')
    }

    private async getNextSequence() {
        return this.sequenceService.getNextSequence(this.collection.collectionName)
    }

    async create(dto: Omit<UserSensitiveDto, 'id'>): Promise<UserSensitiveDto> {
        const id = await this.getNextSequence()
        const candidate = userSensitiveEntitySchema.parse({
            ...dto,
            _id: new ObjectId(),
            id,
        } satisfies UserSensitiveEntity)

        const newEntity = userSensitiveConvert.entityToDto(candidate)

        await this.collection.insertOne(candidate)

        return newEntity
    }

    async find(criteria: Filter<UserSensitiveDto>): Promise<UserSensitiveDto | null> {
        const entity = await this.collection.findOne(criteria)

        return entity ? userSensitiveConvert.entityToDto(entity) : null
    }

    async list(criteria: Filter<UserSensitiveDto>): Promise<UserSensitiveDto[]> {
        const entityList = await this.collection.find(criteria).toArray()

        return entityList.map(entity => userSensitiveConvert.entityToDto(entity))
    }

    async update(criteria: Filter<UserSensitiveDto>, dto: MatchKeysAndValues<Omit<Partial<UserSensitiveDto>, 'id'>>): Promise<UserSensitiveDto | null> {
        const candidate = userSensitiveDtoSchema.omit({ id: true }).partial().parse(dto)

        const value = await this.collection.findOneAndUpdate(
            criteria,
            { $set: candidate },
            { returnDocument: 'after' },
        )

        return value ? userSensitiveConvert.entityToDto(value) : null
    }

    async delete(criteria: Filter<UserSensitiveDto>): Promise<void> {
        await this.collection.deleteOne(criteria)
    }
}

export const userService = new UserService(db, sequenceService)
