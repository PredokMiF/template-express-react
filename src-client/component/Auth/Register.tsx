import { FC, memo, useRef } from 'react'

import { api } from '@/api'
import { SetTextProps } from '../type'

export const Register: FC<SetTextProps> = memo(function Register({ setText }) {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <h3>Зарегистрировать пользователя</h3>

            <div className="form">
                <label>Имя&nbsp;пользователя</label>
                <input type="text" ref={nameRef} placeholder="Имя пользователя" defaultValue="Admin"/>

                <label>email</label>
                <input type="text" ref={emailRef} placeholder="email" defaultValue="admin@domain.ru"/>

                <label>Пароль</label>
                <input type="password" ref={passwordRef} placeholder="Пароль" defaultValue="admin"/>

                <button
                    type="button"
                    onClick={async () => {
                        try {
                            setText('Загрузка...')

                            const user = await api.register({
                                name: nameRef.current ? nameRef.current.value : '',
                                email: emailRef.current ? emailRef.current.value : '',
                                password: passwordRef.current ? passwordRef.current.value : '',
                            })

                            setText(JSON.stringify(user, null, 4))
                        } catch (error) {
                            setText(String(error))
                        }
                    }}
                >
                    Зарегистрировать
                </button>
            </div>
        </div>
    )
})
