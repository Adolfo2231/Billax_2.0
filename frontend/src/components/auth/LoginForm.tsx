import { useState } from 'react'
import type { LoginFieldErrors, LoginFormData } from '../../types/auth'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'

type LoginFormProps = {
    onSubmit: (data: LoginFormData) => void
    fieldErrors?: LoginFieldErrors
    generalError?: string | null
    isSubmitting?: boolean
}

const initialFormData: LoginFormData = {
    email: '',
    password: '',
}

/** Shared input chrome: transparent on mobile (parent shell has border), bordered on lg. */
const fieldInputClassName =
    'w-full bg-transparent text-small text-white placeholder:text-dark-text-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 lg:min-h-[52px] lg:rounded-md lg:border lg:bg-dark-input lg:px-4 lg:py-[14px] lg:text-body lg:focus-visible:ring-2 lg:focus-visible:ring-dark-accent lg:focus-visible:ring-offset-2 lg:focus-visible:ring-offset-dark-canvas'

export function LoginForm({
    onSubmit,
    fieldErrors = {},
    generalError,
    isSubmitting = false,
}: LoginFormProps) {
    const [formData, setFormData] = useState(initialFormData)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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

    const emailBorder = fieldErrors.email ? 'border-danger' : 'border-white/15'
    const passwordBorder = fieldErrors.password
        ? 'border-danger'
        : 'border-white/15'
    const emailErrorId = 'login-email-error'
    const passwordErrorId = 'login-password-error'

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {generalError ? (
                <Alert variant="dark-error">{generalError}</Alert>
            ) : null}

            {/* One email field: mobile = icon + label inside shell; lg = label above bordered input. */}
            <div
                className={`flex min-h-[64px] items-center gap-3 rounded-md border bg-dark-input px-4 lg:min-h-0 lg:flex-col lg:items-stretch lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 ${emailBorder}`}
            >
                <EmailIcon className="size-5 shrink-0 text-white lg:hidden" />
                <div className="flex min-w-0 flex-1 flex-col gap-[2px] lg:gap-2">
                    <label
                        htmlFor="login-email"
                        className="text-caption text-dark-text-secondary lg:text-small lg:font-medium lg:text-white"
                    >
                        Email
                    </label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={
                            fieldErrors.email ? emailErrorId : undefined
                        }
                        className={`${fieldInputClassName} ${fieldErrors.email ? 'lg:border-danger' : 'lg:border-white/15'}`}
                    />
                </div>
            </div>
            {fieldErrors.email ? (
                <p id={emailErrorId} className="-mt-2 text-caption text-danger">
                    {fieldErrors.email}
                </p>
            ) : null}

            {/* One password field — same responsive shell pattern. */}
            <div
                className={`flex min-h-[64px] items-center gap-3 rounded-md border bg-dark-input px-4 lg:min-h-0 lg:flex-col lg:items-stretch lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 ${passwordBorder}`}
            >
                <LockIcon className="size-5 shrink-0 text-white lg:hidden" />
                <div className="flex min-w-0 flex-1 flex-col gap-[2px] lg:gap-2">
                    <label
                        htmlFor="login-password"
                        className="text-caption text-dark-text-secondary lg:text-small lg:font-medium lg:text-white"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="login-password"
                            name="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(fieldErrors.password)}
                            aria-describedby={
                                fieldErrors.password
                                    ? passwordErrorId
                                    : undefined
                            }
                            className={`${fieldInputClassName} pr-10 lg:pr-12 ${fieldErrors.password ? 'lg:border-danger' : 'lg:border-white/15'}`}
                        />
                        <button
                            type="button"
                            aria-label={
                                isPasswordVisible
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                            aria-pressed={isPasswordVisible}
                            className="absolute right-0 top-1/2 grid size-[40px] -translate-y-1/2 place-items-center rounded-md text-white hover:text-dark-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent lg:min-h-[44px] lg:min-w-[44px] lg:text-dark-text-secondary lg:hover:text-white"
                            onClick={() =>
                                setIsPasswordVisible((current) => !current)
                            }
                            disabled={isSubmitting}
                        >
                            <PasswordEyeIcon visible={isPasswordVisible} />
                        </button>
                    </div>
                </div>
            </div>
            {fieldErrors.password ? (
                <p
                    id={passwordErrorId}
                    className="-mt-2 text-caption text-danger"
                >
                    {fieldErrors.password}
                </p>
            ) : null}

            <Button
                className="mt-1 min-h-[52px] w-full text-body font-semibold lg:min-h-[56px]"
                type="submit"
                variant="dark"
                loading={isSubmitting}
            >
                Log in
            </Button>
        </form>
    )
}

function EmailIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="m5 7 7 5 7-5" />
        </svg>
    )
}

function LockIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    )
}

function PasswordEyeIcon({ visible }: { visible: boolean }) {
    if (visible) {
        return (
            <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            >
                <path d="m4 4 16 16" />
                <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a16.8 16.8 0 0 1-2.1 3.1M6.6 6.6C4.2 8.2 3 12 3 12s3.5 7 9 7a9.8 9.8 0 0 0 3-.5" />
            </svg>
        )
    }

    return (
        <svg
            aria-hidden="true"
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
            <circle cx="12" cy="12" r="2.5" />
        </svg>
    )
}
