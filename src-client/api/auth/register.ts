import { ApiAuthRegisterRequestBody } from '@base/api'
import { fetcher } from '@/util'

export async function register(params: ApiAuthRegisterRequestBody): Promise<void> {
    await fetcher('/api/register', {
        method: 'POST',
        body: params,
    })
}
