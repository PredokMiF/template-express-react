import { useState } from 'react'

import { Auth } from './component/Auth'
import { Product } from './component/Product'
import styles from './App.module.scss'

export function App() {
    const [text, setText] = useState('')

    return (
        <div className={styles.app}>
            <div>
                <Auth setText={setText} />

                <hr/>

                <Product setText={setText} />
            </div>
            <code>
                {text}
            </code>
        </div>
    )
}
