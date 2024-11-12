import { FC, memo } from 'react'

import { SetTextProps } from '../type'

import { ProductCreate } from './ProductCreate'
import { ProductDelete } from './ProductDelete'
import { ProductGet } from './ProductGet'
import { ProductGetList } from './ProductGetList'
import { ProductUpdate } from './ProductUpdate'

export const Product: FC<SetTextProps> = memo(function Auth({ setText }) {
    return (
        <div>
            <h2>Продукты</h2>

            <ProductCreate setText={setText}/>
            <ProductGet setText={setText}/>
            <ProductGetList setText={setText}/>
            <ProductUpdate setText={setText}/>
            <ProductDelete setText={setText}/>
        </div>
    )
})
