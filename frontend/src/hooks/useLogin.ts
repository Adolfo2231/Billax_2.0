import { useState } from 'react'
import { authService } from '../services/authService'
import { getErrorMessage, getFieldError } from '../services/errors'
import { ApiError } from '../types/api'
import type {
    LoginFieldErrors,
    LoginFormData,
    LoginResponse,
} from '../types/auth'

export function useLogin() {
    const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
    const [generalError, setGeneralError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function login(data: LoginFormData): Promise<LoginResponse | null> {
        setFieldErrors({})
        setGeneralError(undefined)
        setIsSubmitting(true)

        try {
            return await authService.login(data.email, data.password)
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                setGeneralError('Invalid email or password')
            } else if (
                error instanceof ApiError &&
                error.status === 422 &&
                typeof error.detail !== 'string'
            ) {
                const apiFieldErrors: LoginFieldErrors = {}
                const emailError = getFieldError(error, 'username')
                const passwordError = getFieldError(error, 'password')

                if (emailError) {
                    apiFieldErrors.email = emailError
                }

                if (passwordError) {
                    apiFieldErrors.password = passwordError
                }

                setFieldErrors(apiFieldErrors)
            } else {
                setGeneralError(getErrorMessage(error))
            }

            return null
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        login,
        fieldErrors,
        generalError,
        isSubmitting,
    }
}