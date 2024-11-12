import { login } from './auth/login'
import { logout } from './auth/logout'
import { register } from './auth/register'
import { userInfo } from './auth/userInfo'
import { productCreate } from './product/productCreate'
import { productDelete } from './product/productDelete'
import { productGet } from './product/productGet'
import { productGetList } from './product/productGetList'
import { productUpdate } from './product/productUpdate'

export const api = {
    login,
    logout,
    register,
    userInfo,
    productCreate,
    productDelete,
    productGet,
    productGetList,
    productUpdate,
}
