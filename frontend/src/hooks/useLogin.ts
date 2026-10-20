import { useState } from 'react'
import { getErrorMessage, getFieldError } from '../services/errors'
import { ApiError } from '../types/api'
import type { LoginFieldErrors, LoginFormData } from '../types/auth'
import { useAuth } from './useAuth'

export function useLogin() {
    const { login: loginWithSession } = useAuth()
    const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
    const [generalError, setGeneralError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function login(data: LoginFormData): Promise<boolean> {
        setFieldErrors({})
        setGeneralError(undefined)
        setIsSubmitting(true)

        try {
            await loginWithSession(data.email, data.password)
            return true
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

            return false
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
