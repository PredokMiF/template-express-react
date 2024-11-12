import { ApiProductCreateRequestBody, ApiProductCreateResponse } from '@base/api'
import { fetcher } from '@/util'

export async function productCreate(params: ApiProductCreateRequestBody): Promise<ApiProductCreateResponse> {
    return fetcher('/api/product', {
        method: 'POST',
        body: params,
    })
}
