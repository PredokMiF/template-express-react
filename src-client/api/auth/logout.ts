import { fetcher } from '@/util'

export async function logout(): Promise<void> {
    await fetcher('/api/logout', {
        method: 'POST',
    })
}
