import { User } from '@base/entity'

declare module 'express-session' {
    interface SessionData {
        user?: User
    }
}
