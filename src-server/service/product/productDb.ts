import { Db, Collection, ObjectId, Filter, MatchKeysAndValues } from 'mongodb'

import { db } from '@/store/mongoDb'
import { SequenceService, sequenceService } from '@/service/sequence'

import { productEntitySchema, productDtoSchema, ProductEntity, ProductDto, productConvert } from './productDbTypes'

export class ProductService {
    private readonly db: Db
    private readonly collection: Collection<ProductEntity>
    private readonly sequenceService: SequenceService

    constructor(db: Db, sequenceService: SequenceService) {
        this.db = db
        this.sequenceService = sequenceService
        this.collection = this.db.collection('products')
    }

    private async getNextSequence() {
        return this.sequenceService.getNextSequence(this.collection.collectionName)
    }

    async create(dto: Omit<ProductDto, 'id'>): Promise<ProductDto> {
        const id = await this.getNextSequence()
        const candidate = productEntitySchema.parse({
            ...dto,
            _id: new ObjectId(),
            id,
        } satisfies ProductEntity)

        const newEntity = productConvert.entityToDto(candidate)

        await this.collection.insertOne(candidate)

        return newEntity
    }

    async find(criteria: Filter<ProductDto>): Promise<ProductDto | null> {
        const entity = await this.collection.findOne(criteria)

        return entity ? productConvert.entityToDto(entity) : null
    }

    async list(criteria: Filter<ProductDto>): Promise<ProductDto[]> {
        const entityList = await this.collection.find(criteria).toArray()

        return entityList.map(entity => productConvert.entityToDto(entity))
    }

    async update(criteria: Filter<ProductDto>, dto: MatchKeysAndValues<Omit<ProductDto, 'id'>>): Promise<ProductDto | null> {
        const candidate = productDtoSchema.omit({ id: true }).partial().parse(dto)

        const value = await this.collection.findOneAndUpdate(
            criteria,
            { $set: candidate },
            { returnDocument: 'after' },
        )

        return value ? productConvert.entityToDto(value) : null
    }

    async delete(criteria: Filter<ProductDto>): Promise<void> {
        await this.collection.deleteOne(criteria)
    }
}

export const productService = new ProductService(db, sequenceService)
