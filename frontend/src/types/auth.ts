export type RegisterData = {
    email: string
    password: string
    first_name?: string
    last_name?: string
}

export type RegisterFormData = Required<RegisterData> & {
    confirmPassword: string
}

export type RegisterFieldErrors = Partial<
    Record<keyof RegisterFormData, string>
>

export type User = {
    id: string
    email: string
    is_active: boolean
    first_name: string | null
    last_name: string | null
    created_at: string
    updated_at: string
}