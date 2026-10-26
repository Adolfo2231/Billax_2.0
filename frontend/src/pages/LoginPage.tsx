import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthDivider } from '../components/auth/AuthDivider'
import { AuthHero } from '../components/auth/AuthHero'
import { LoginForm } from '../components/auth/LoginForm'
import { Alert } from '../components/ui/Alert'
import { useLogin } from '../hooks/useLogin'
import type { LoginFormData } from '../types/auth'

function BalancePreview() {
    return (
        <div
            aria-hidden="true"
            className="rounded-lg bg-surface p-4 text-brand-900 shadow-card sm:p-5"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-caption text-text-secondary">
                        Total balance
                    </p>
                    <p className="mt-1 text-h2">$24,318.52</p>
                </div>
                <span className="grid size-6 place-items-center rounded-md bg-brand-50 text-brand-600">
                    <svg
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 16.5 9.5 11l3.5 3.5L20 7.5" />
                        <path d="M14 7.5h6v6" />
                    </svg>
                </span>
            </div>

            <svg
                className="mt-4 h-16 w-full text-brand-500"
                viewBox="0 0 280 72"
                fill="none"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 50C20 48 40 52 55 42 72 30 90 38 110 32 132 25 150 28 175 22 200 16 230 18 280 14V72H0Z"
                    fill="currentColor"
                    opacity="0.12"
                />
                <path
                    d="M0 50C20 48 40 52 55 42 72 30 90 38 110 32 132 25 150 28 175 22 200 16 230 18 280 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <div className="mt-3 flex items-center gap-2 text-caption text-text-secondary">
                <span className="grid size-5 place-items-center rounded-sm bg-surface-muted text-brand-600">
                    <svg
                        className="size-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <rect x="3" y="6" width="18" height="13" rx="2" />
                        <path d="M3 9h18" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                </span>
                <span className="grid size-5 place-items-center rounded-sm bg-brand-50 text-brand-600">
                    <svg
                        className="size-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M4 10.5 12 5l8 5.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z" />
                    </svg>
                </span>
                <span>3 accounts connected</span>
            </div>
        </div>
    )
}

export function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { login, fieldErrors, generalError, isSubmitting } = useLogin()
    const navigationState: unknown = location.state
    const registered =
        typeof navigationState === 'object' &&
        navigationState !== null &&
        'registered' in navigationState &&
        navigationState.registered === true
    const [showRegistrationSuccess] = useState(registered)

    useEffect(() => {
        if (registered) {
            navigate('/login', {
                replace: true,
                state: null,
            })
        }
    }, [navigate, registered])

    async function handleLogin(data: LoginFormData) {
        const loggedIn = await login(data)

        if (loggedIn) {
            navigate('/dashboard', { replace: true })
        }
    }

    return (
        <main className="min-h-screen overflow-x-hidden bg-canvas lg:grid lg:grid-cols-2">
            <AuthHero
                title="Your finances, clear and in control."
                description="Track balances, transactions and reports in one calm, focused workspace — built to make everyday money management effortless."
                previewLayout="stacked"
            >
                <BalancePreview />
            </AuthHero>

            <section className="px-6 py-6 sm:px-8 lg:flex lg:items-center lg:px-10 lg:py-12">
                <div className="mx-auto w-full max-w-[520px]">
                    <header className="mb-6">
                        <h2 className="text-h1 text-brand-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-small text-text-secondary sm:text-body">
                            Sign in to continue to your Billax dashboard.
                        </p>
                    </header>

                    {showRegistrationSuccess ? (
                        <Alert className="mb-5" variant="success">
                            Account created. Sign in to continue.
                        </Alert>
                    ) : null}

                    <LoginForm
                        onSubmit={handleLogin}
                        fieldErrors={fieldErrors}
                        generalError={generalError}
                        isSubmitting={isSubmitting}
                    />

                    <AuthDivider>New to Billax</AuthDivider>

                    <Link
                        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-small font-medium text-brand-900 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                        to="/register"
                    >
                        Create an account
                        <svg
                            aria-hidden="true"
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        >
                            <circle cx="12" cy="8" r="3.25" />
                            <path d="M6 19c.6-3 3-4.75 6-4.75S17.4 16 18 19" />
                        </svg>
                    </Link>

                    <p className="mt-5 flex items-center justify-center gap-2 text-caption text-text-secondary">
                        <svg
                            aria-hidden="true"
                            className="size-4 shrink-0 text-brand-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2.5 4.5 5.8v5.1c0 4.8 3.2 9.2 7.5 10.6 4.3-1.4 7.5-5.8 7.5-10.6V5.8L12 2.5Zm0 4v11.6c-2.6-1.2-4.5-4.1-4.5-7.2v-3.2L12 5.8v.7Z" />
                        </svg>
                        Secure access to your financial workspace.
                    </p>
                </div>
            </section>
        </main>
    )
}
