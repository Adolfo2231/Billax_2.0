import { Link, useNavigate } from 'react-router'
import { AuthDivider } from '../components/auth/AuthDivider'
import { AuthHero } from '../components/auth/AuthHero'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useRegister } from '../hooks/useRegister'
import type { RegisterFormData } from '../types/auth'

function CheckingAccountPreview() {
    return (
        <div className="ml-auto w-[125px] rotate-[-2deg] rounded-md bg-surface p-3 text-brand-900 shadow-card sm:w-[210px] lg:w-[260px] lg:p-4">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="whitespace-nowrap text-[8px] text-text-secondary sm:text-caption">
                        Checking •••• 4821
                    </p>
                    <p className="mt-1 text-small font-bold sm:text-body">
                        $16,078.52
                    </p>
                </div>
                <svg
                    aria-hidden="true"
                    className="mt-1 size-3 text-brand-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path
                        d="M3 9h18"
                        stroke="#ffffff"
                        strokeWidth="2"
                    />
                </svg>
            </div>
            <svg
                aria-hidden="true"
                className="mt-2 h-7 w-full text-brand-600 sm:h-9"
                viewBox="0 0 210 42"
                fill="none"
                preserveAspectRatio="none"
            >
                <path
                    d="M2 31 24 24l23 7 25-18 27 6 25-3 24 9 27-9 33-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export function RegisterPage() {
    const navigate = useNavigate()
    const { register, fieldErrors, generalError, isSubmitting } = useRegister()

    async function handleRegister(data: RegisterFormData) {
        const user = await register(data)

        if (user) {
            navigate('/login', {
                state: { registered: true },
            })
        }
    }

    return (
        <main className="min-h-screen overflow-x-hidden bg-canvas lg:grid lg:grid-cols-2">
            <AuthHero
                title="One place for every account and expense."
                description="Create your free workspace in under a minute. No spreadsheets, no clutter — just a clear view of where your money goes."
            >
                <CheckingAccountPreview />
            </AuthHero>

            <section className="px-6 py-6 sm:px-8 lg:flex lg:items-center lg:px-10 lg:py-12">
                <div className="mx-auto w-full max-w-[520px]">
                    <header className="mb-6">
                        <h2 className="text-h1 text-brand-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-small text-text-secondary sm:text-body">
                            Set up Billax in a few seconds — it&apos;s free to
                            start.
                        </p>
                    </header>

                    <RegisterForm
                        onSubmit={handleRegister}
                        fieldErrors={fieldErrors}
                        generalError={generalError}
                        isSubmitting={isSubmitting}
                    />

                    <AuthDivider>Already a member</AuthDivider>

                    <Link
                        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-small font-medium text-brand-900 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                        to="/login"
                    >
                        Sign in to your account
                        <span aria-hidden="true">↗</span>
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
