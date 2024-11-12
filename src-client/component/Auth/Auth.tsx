import { FC, memo } from 'react'

import { SetTextProps } from '../type'

import { Login } from './Login'
import { Logout } from './Logout'
import { Register } from './Register'
import { UserInfo } from './UserInfo'

export const Auth: FC<SetTextProps> = memo(function Auth({ setText }) {
    return (
        <div>
            <h2>Авторизация</h2>

            <Login setText={setText}/>
            <Logout setText={setText}/>
            <Register setText={setText}/>
            <UserInfo setText={setText}/>
        </div>
    )
})
