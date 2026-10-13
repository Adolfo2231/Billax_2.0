import { useState } from 'react'
import { authService } from '../services/authService'
import { getErrorMessage } from '../services/errors'
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
            setGeneralError(getErrorMessage(error))
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