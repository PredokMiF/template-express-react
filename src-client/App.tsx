import { useState } from 'react'

import { Product } from './component/Product'
import styles from './App.module.scss'

export function App() {
    const [text, setText] = useState('')

    return (
        <div className={styles.app}>
            <div>
                <Product setText={setText} />
            </div>
            <code>
                {text}
            </code>
        </div>
    )
}
