import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const ProductGet: FC<SetTextProps> = memo(function ProductGet({ setText }) {
    const idRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Показать продукт</h3>

            <div className="form">
                <label>id</label>
                <input type="number" ref={idRef} placeholder="id"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const result = await api.productGet({
                                id: idRef.current ? parseInt(idRef.current.value, 10) : NaN,
                            })

                            setText(JSON.stringify(result, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Показать
                </button>
            </div>
        </div>
    )
})
