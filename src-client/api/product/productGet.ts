import { ApiProductGetRouteParams, ApiProductGetResponse } from '@base/api'
import { fetcher } from '@/util'

export async function productGet({ id }: ApiProductGetRouteParams): Promise<ApiProductGetResponse> {
    return fetcher(`/api/product/${id}`, {
        method: 'GET',
    })
}
