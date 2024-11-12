import express from 'express'

import { productRouter } from './api/product'

export const router = express.Router()

router.use('/product', productRouter)
