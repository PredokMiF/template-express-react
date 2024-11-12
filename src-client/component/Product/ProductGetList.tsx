import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const ProductGetList: FC<SetTextProps> = memo(function ProductGetList({ setText }) {
    const searchRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Показать продукты</h3>

            <div className="form">
                <label>Фильтр</label>
                <input type="text" ref={searchRef} placeholder="Фильтр"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const result = await api.productGetList({
                                search: searchRef.current ? searchRef.current.value : '',
                            })

                            setText(JSON.stringify(result, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Показать все продукты
                </button>
            </div>
        </div>
    )
})
