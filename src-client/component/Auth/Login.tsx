import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const Login: FC<SetTextProps> = memo(function Login({ setText }) {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Авторизоваться</h3>

            <div className="form">
                <label>email</label>
                <input type="text" ref={emailRef} placeholder="email" defaultValue="admin@domain.ru"/>

                <label>Пароль</label>
                <input type="password" ref={passwordRef} placeholder="Пароль" defaultValue="admin"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const user = await api.login({
                                login: emailRef.current ? emailRef.current.value : '',
                                password: passwordRef.current ? passwordRef.current.value : '',
                            })

                            setText(JSON.stringify(user, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Войти
                </button>
            </div>
        </div>
    )
})
