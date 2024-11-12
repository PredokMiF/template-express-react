import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const ProductDelete: FC<SetTextProps> = memo(function ProductDelete({ setText }) {
    const idRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Удалить продукт</h3>

            <div className="form">
                <label>id</label>
                <input type="number" ref={idRef} placeholder="id"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            await api.productDelete({
                                id: idRef.current ? parseInt(idRef.current.value, 10) : NaN,
                            })

                            setText('Продукт удален')
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
})
