import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const ProductCreate: FC<SetTextProps> = memo(function ProductCreate({ setText }) {
    const nameRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Создать продукт</h3>

            <div className="form">
                <label>Наименование</label>
                <input type="text" ref={nameRef} placeholder="Наименование продукта"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const result = await api.productCreate({
                                name: nameRef.current ? nameRef.current.value : '',
                            })

                            setText(JSON.stringify(result, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Создать
                </button>
            </div>
        </div>
    )
})
