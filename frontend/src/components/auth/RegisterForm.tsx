import { useState } from "react"
import type {
    RegisterFieldErrors,
    RegisterFormData,
} from "../../types/auth"
import { Alert } from "../ui/Alert"
import { Button } from "../ui/Button"
import { FormField } from "../ui/FormField"

type RegisterFormProps = {
    onSubmit: (data: RegisterFormData) => void
    fieldErrors?: RegisterFieldErrors
    generalError?: string
    isSubmitting?: boolean
}

const initialFormData: RegisterFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
}

export function RegisterForm({
    onSubmit,
    fieldErrors = {},
    generalError,
    isSubmitting = false,
}: RegisterFormProps) {
    const [formData, setFormData] = useState(initialFormData)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const field = event.target.name as keyof RegisterFormData
        const value = event.target.value

        setFormData((currentData) => ({
            ...currentData,
            [field]: value,
        }))
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit(formData)
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {generalError ? (
                <Alert variant="error">{generalError}</Alert>
            ) : null}

            <FormField
                id="register-email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                disabled={isSubmitting}
            />

            <FormField
                id="register-password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                disabled={isSubmitting}
            />

            <FormField
                id="register-confirm-password"
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                disabled={isSubmitting}
            />

            <FormField
                id="register-first-name"
                label="First name"
                name="first_name"
                hint="Optional"
                type="text"
                autoComplete="given-name"
                value={formData.first_name}
                onChange={handleChange}
                error={fieldErrors.first_name}
                disabled={isSubmitting}
            />

            <FormField
                id="register-last-name"
                label="Last name"
                name="last_name"
                hint="Optional"
                type="text"
                autoComplete="family-name"
                value={formData.last_name}
                onChange={handleChange}
                error={fieldErrors.last_name}
                disabled={isSubmitting}
            />

            <Button className="mt-2 w-full" type="submit" loading={isSubmitting}>
                Create account
            </Button>
        </form>
    )
}
