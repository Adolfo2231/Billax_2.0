import { ApiError } from '../types/api'
import type { ApiErrorDetail } from '../types/api'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
type BodyFormat = 'json' | 'form'

interface ApiRequestOptions<TBody = unknown> {
    method: HttpMethod
    body?: TBody
    bodyFormat?: BodyFormat
    token?: string
    includeApiPrefix?: boolean
}

const API_PREFIX = '/api/v1'

export async function apiRequest<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody>,
): Promise<TResponse> {

    const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim()

    if (!configuredBaseUrl) {
        throw new Error('VITE_API_URL is not set')
    }

    const baseUrl = configuredBaseUrl.replace(/\/+$/, '')
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const apiPrefix = options.includeApiPrefix === false ? '' : API_PREFIX
    const url = `${baseUrl}${apiPrefix}${normalizedEndpoint}`
    const bodyFormat =
        options.bodyFormat ?? (options.body !== undefined ? 'json' : undefined)

    const headers = new Headers()

    if (options.token) {
        headers.set('Authorization', `Bearer ${options.token}`)
    }

    if (bodyFormat === 'json') {
        headers.set('Content-Type', 'application/json')
    } else if (bodyFormat === 'form') {
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
    }

    let serializedBody: BodyInit | undefined

    if (options.body !== undefined) {
        if (bodyFormat === 'json') {
            serializedBody = JSON.stringify(options.body)
        } else if (bodyFormat === 'form') {
            const formValues = options.body as Record<string, string>
            serializedBody = new URLSearchParams(formValues).toString()
        }
    }

    let response: Response

    try {
        response = await fetch(url, {
            method: options.method,
            headers,
            body: serializedBody,
        })
    } catch {
        throw new ApiError(0, 'Network error')
    }

    if (!response.ok) {
        let detail: ApiErrorDetail =
            `Request failed with status ${response.status}`

        try {
            const errorBody = (await response.json()) as {
                detail?: unknown
            }

            if (
                typeof errorBody.detail === 'string' ||
                Array.isArray(errorBody.detail)
            ) {
                detail = errorBody.detail as ApiErrorDetail
            }
        } catch {
            // Conservamos el mensaje fallback si la respuesta no contiene JSON.
        }

        throw new ApiError(response.status, detail)
    }

    if (response.status === 204) {
        return undefined as TResponse
    }

    return (await response.json()) as TResponse
}