import express from 'express'

import { authRouter } from './api/auth'
import { productRouter } from './api/product'

export const router = express.Router()

router.use(authRouter)
router.use('/product', productRouter)
