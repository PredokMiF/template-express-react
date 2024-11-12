import { ApiProductDeleteRouteParams } from '@base/api'
import { fetcher } from '@/util'

export async function productDelete({ id }: ApiProductDeleteRouteParams): Promise<void> {
    return fetcher(`/api/product/${id}`, {
        method: 'DELETE',
    })
}
