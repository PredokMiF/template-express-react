import { ApiAuthLoginRequestBody, ApiAuthLoginResponse } from '@base/api'
import { fetcher } from '@/util'

export async function login(params: ApiAuthLoginRequestBody): Promise<ApiAuthLoginResponse> {
    return fetcher('/api/login', {
        method: 'POST',
        body: params,
    })
}
