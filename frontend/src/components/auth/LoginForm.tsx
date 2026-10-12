import { useState } from "react"
import type { LoginFieldErrors, LoginFormData } from "../../types/auth"
import { Alert } from "../ui/Alert"
import { Button } from "../ui/Button"
import { FormField } from "../ui/FormField"

type LoginFormProps = {
    onSubmit: (data: LoginFormData) => void
    fieldErrors?: LoginFieldErrors
    generalError?: string | null
    isSubmitting?: boolean
}

const initialFormData: LoginFormData = {
    email: "",
    password: "",
}

export function LoginForm({
    onSubmit,
    fieldErrors = {},
    generalError,
    isSubmitting = false,
}: LoginFormProps) {
    const [formData, setFormData] = useState(initialFormData)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const field = event.target.name as keyof LoginFormData
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
                id="login-email"
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
                id="login-password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                disabled={isSubmitting}
            />

            <Button className="mt-2 w-full" type="submit" loading={isSubmitting}>
                Sign in
            </Button>
        </form>
    )
}
