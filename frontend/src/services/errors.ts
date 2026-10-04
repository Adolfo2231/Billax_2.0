import { ApiError } from '../types/api'

const DEFAULT_ERROR_MESSAGE = 'Something went wrong'

export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        if (typeof error.detail === 'string') {
            return error.detail
        }

        return error.detail.map((issue) => issue.msg).join(', ')
    }

    if (error instanceof Error) {
        return error.message
    }

    return DEFAULT_ERROR_MESSAGE
}

export function getFieldError(
    error: unknown,
    field: string,
): string | undefined {
    if (!(error instanceof ApiError) || typeof error.detail === 'string') {
        return undefined
    }

    return error.detail.find((issue) => issue.loc.at(-1) === field)?.msg
}
