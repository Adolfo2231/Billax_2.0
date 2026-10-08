import { useState } from 'react'
import { authService } from '../services/authService'
import { getErrorMessage, getFieldError } from '../services/errors'
import { ApiError } from '../types/api'
import type {
    RegisterData,
    RegisterFieldErrors,
    RegisterFormData,
    User,
} from '../types/auth'

function validateRegisterData(data: RegisterFormData): RegisterFieldErrors {
    const errors: RegisterFieldErrors = {}

    if (!data.email.trim()) {
        errors.email = 'Email is required'
    }

    if (data.password.length < 8 || data.password.length > 72) {
        errors.password = 'Password must be between 8 and 72 characters'
    }

    if (data.confirmPassword !== data.password) {
        errors.confirmPassword = 'Passwords do not match'
    }

    if (data.first_name.trim().length > 50) {
        errors.first_name = 'First name must be 50 characters or fewer'
    }

    if (data.last_name.trim().length > 50) {
        errors.last_name = 'Last name must be 50 characters or fewer'
    }

    return errors
}

function createRegisterPayload(data: RegisterFormData): RegisterData {
    const firstName = data.first_name.trim()
    const lastName = data.last_name.trim()

    return {
        email: data.email.trim(),
        password: data.password,
        ...(firstName ? { first_name: firstName } : {}),
        ...(lastName ? { last_name: lastName } : {}),
    }
}

export function useRegister() {
    const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({})
    const [generalError, setGeneralError] = useState<string>()

    async function register(data: RegisterFormData): Promise<User | undefined> {
        const validationErrors = validateRegisterData(data)

        setFieldErrors(validationErrors)
        setGeneralError(undefined)

        if (Object.keys(validationErrors).length > 0) {
            return undefined
        }

        try {
            return await authService.register(createRegisterPayload(data))
        } catch (error) {
            const apiFieldErrors: RegisterFieldErrors = {}

            if (error instanceof ApiError) {
                const fields: (keyof RegisterData)[] = [
                    'email',
                    'password',
                    'first_name',
                    'last_name',
                ]

                for (const field of fields) {
                    const message = getFieldError(error, field)

                    if (message) {
                        apiFieldErrors[field] = message
                    }
                }
            }

            setFieldErrors(apiFieldErrors)
            setGeneralError(
                Object.keys(apiFieldErrors).length === 0
                    ? getErrorMessage(error)
                    : undefined,
            )

            return undefined
        }
    }

    return {
        register,
        fieldErrors,
        generalError,
    }
}
