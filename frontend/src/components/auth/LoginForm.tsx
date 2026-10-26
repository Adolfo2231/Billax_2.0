import { useState } from "react"
import type { LoginFieldErrors, LoginFormData } from "../../types/auth"
import { Alert } from "../ui/Alert"
import { Button } from "../ui/Button"
import { FormField } from "../ui/FormField"
import { PasswordInput } from "./PasswordInput"

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
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {generalError ? (
                <Alert variant="error">{generalError}</Alert>
            ) : null}

            <FormField
                id="login-email"
                label={
                    <span className="text-brand-900">Email address</span>
                }
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                className="min-h-[44px]"
                disabled={isSubmitting}
                icon={
                    <svg
                        className="size-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                        <path d="m5 7 7 5 7-5" />
                    </svg>
                }
            />

            <div className="relative">
                <span className="absolute right-[0px] top-[0px] z-10 flex items-center gap-2">
                    <span className="text-caption text-text-secondary">
                        Forgot password?
                    </span>
                    <span className="rounded-full bg-surface-muted px-2 py-1 text-caption text-text-secondary">
                        Soon
                    </span>
                </span>
                <PasswordInput
                    id="login-password"
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={fieldErrors.password}
                    disabled={isSubmitting}
                />
            </div>

            <Button
                className="mt-2 min-h-[44px] w-full shadow-card"
                type="submit"
                loading={isSubmitting}
            >
                Sign in
                <span aria-hidden="true">→</span>
            </Button>
        </form>
    )
}
