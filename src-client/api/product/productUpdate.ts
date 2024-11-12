import { ApiProductUpdateRouteParams, ApiProductUpdateRequestBody, ApiProductUpdateResponse } from '@base/api'
import { fetcher } from '@/util'

export async function productUpdate(
    { id }: ApiProductUpdateRouteParams,
    candidate: ApiProductUpdateRequestBody,
): Promise<ApiProductUpdateResponse> {
    return fetcher(`/api/product/${id}`, {
        method: 'PUT',
        body: candidate,
    })
}
