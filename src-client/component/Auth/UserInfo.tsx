import { FC, memo } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const UserInfo: FC<SetTextProps> = memo(function UserInfo({ setText }) {
    return (
        <div>
            <h3>Проверить авторизацию</h3>

            <div>
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const user = await api.userInfo()

                            setText(JSON.stringify(user, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Проверить авторизацию
                </button>
            </div>
        </div>
    )
})
