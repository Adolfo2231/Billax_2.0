import { useState } from "react"
import type {
    RegisterFieldErrors,
    RegisterFormData,
} from "../../types/auth"
import { Alert } from "../ui/Alert"
import { Button } from "../ui/Button"
import { FormField } from "../ui/FormField"
import { PasswordInput } from "./PasswordInput"
import { PasswordStrength } from "./PasswordStrength"

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
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {generalError ? (
                <Alert variant="error">{generalError}</Alert>
            ) : null}

            <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                    <FormField
                        id="register-first-name"
                        label={
                            <>
                                <span className="text-brand-900">First name</span>{' '}
                                <span>(optional)</span>
                            </>
                        }
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Alex"
                        value={formData.first_name}
                        onChange={handleChange}
                        error={fieldErrors.first_name}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="min-w-0">
                    <FormField
                        id="register-last-name"
                        label={
                            <>
                                <span className="text-brand-900">Last name</span>{' '}
                                <span>(optional)</span>
                            </>
                        }
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Morgan"
                        value={formData.last_name}
                        onChange={handleChange}
                        error={fieldErrors.last_name}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <FormField
                id="register-email"
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

            <PasswordInput
                id="register-password"
                label="Password"
                name="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                disabled={isSubmitting}
            />

            <PasswordStrength passwordLength={formData.password.length} />

            <PasswordInput
                id="register-confirm-password"
                label="Confirm password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                disabled={isSubmitting}
            />

            <Button
                className="mt-2 min-h-[44px] w-full shadow-card"
                type="submit"
                loading={isSubmitting}
            >
                Create account
                <span aria-hidden="true">→</span>
            </Button>
        </form>
    )
}
