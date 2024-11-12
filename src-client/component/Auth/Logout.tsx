import { FC, memo } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const Logout: FC<SetTextProps> = memo(function Logout({ setText }) {
    return (
        <div>
            <h3>Выход</h3>

            <div>
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            await api.logout()

                            setText('Пользователь теперь не авторизован')
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Выйти из системы
                </button>
            </div>
        </div>
    )
})
