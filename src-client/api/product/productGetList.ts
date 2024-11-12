import { ApiProductGetListQueryParams, ApiProductGetListResponse } from '@base/api'
import { fetcher } from '@/util'

export async function productGetList(query: ApiProductGetListQueryParams): Promise<ApiProductGetListResponse> {
    return fetcher('/api/product/list', {
        method: 'GET',
        query,
    })
}
