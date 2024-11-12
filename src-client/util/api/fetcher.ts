import { getURLSearchParams } from '../url'

import { ResponseError } from './ResponseError'

export interface FetcherBaseOptions<Query extends string | object> {
    query?: Query
}

export interface FetcherGetDeleteOptions<Query extends string | object> extends FetcherBaseOptions<Query> {
    method: 'GET'
}

export interface FetcherPostOptions<Query extends string | object, Body extends object> extends FetcherBaseOptions<Query> {
    method: 'POST' | 'PUT' | 'DELETE'
    body?: Body
}

export async function fetcher<Query extends string | object, ResponseType>(url: string, options: FetcherGetDeleteOptions<Query>): Promise<ResponseType>
export async function fetcher<Query extends string | object, Body extends object, ResponseType>(url: string, options: FetcherPostOptions<Query, Body>): Promise<ResponseType>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher(url: string, options: FetcherGetDeleteOptions<any> | FetcherPostOptions<any, any>) {
    const {
        method,
        query,
    } = options
    const body: string | undefined = ('body' in options && options.body ? JSON.stringify(options.body) : undefined)

    let searchParams = getURLSearchParams(query)

    if (searchParams) {
        searchParams = `?${searchParams}`
    }

    const headers: HeadersInit = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    }

    const response = await fetch(
        `${url}${searchParams}`,
        {
            method,
            credentials: 'include',
            headers,
            body,
        },
    )

    const responseBody = await response.json()

    if (!response.ok) {
        throw new ResponseError(responseBody)
    }

    return responseBody
}

// @ts-expect-error Allow call fetcher from browser console
window.fetcher = window.fetcher ?? fetcher
