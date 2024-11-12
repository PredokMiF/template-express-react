import { ApiAuthUserInfoResponse } from '@base/api'
import { fetcher } from '@/util'

export async function userInfo(): Promise<ApiAuthUserInfoResponse> {
    return fetcher('/api/userInfo', {
        method: 'POST',
    })
}
