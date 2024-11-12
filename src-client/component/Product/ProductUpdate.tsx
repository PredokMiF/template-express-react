import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const ProductUpdate: FC<SetTextProps> = memo(function ProductUpdate({ setText }) {
    const idRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Изменить продукт</h3>

            <div className="form">
                <label>id</label>
                <input type="number" ref={idRef} placeholder="id"/>

                <label>Новое&nbsp;наименование</label>
                <input type="text" ref={nameRef} placeholder="Наименование продукта"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            const name = nameRef.current ? nameRef.current.value : ''

                            if (!name) {
                                alert('Нужно ввести новое название товара')

                                return
                            }

                            setText('Загрузка...')

                            await api.productUpdate({
                                id: idRef.current ? parseInt(idRef.current.value, 10) : NaN,
                            }, {
                                name,
                            })

                            setText('Продукт изменен')
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Изменить
                </button>
            </div>
        </div>
    )
})
