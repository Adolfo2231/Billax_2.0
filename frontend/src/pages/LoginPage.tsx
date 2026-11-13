import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthBrand } from '../components/auth/AuthBrand'
import { LoginForm } from '../components/auth/LoginForm'
import { LoginNetWorthPreview } from '../components/auth/LoginNetWorthPreview'
import { Alert } from '../components/ui/Alert'
import { useLogin } from '../hooks/useLogin'
import type { LoginFormData } from '../types/auth'

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
        <main className="relative min-h-screen overflow-x-hidden bg-dark-canvas text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(135deg, #fff 1px, transparent 1px), linear-gradient(45deg, #fff 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }}
            />

            {/* Gaps/padding above theme step 8 use arbitrary values — spacing scale only defines 0–8. */}
            <div className="relative mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-[56px] lg:py-8">
                {/* Desktop branding */}
                <section className="hidden lg:flex lg:flex-col lg:gap-[40px]">
                    <AuthBrand />
                    <div className="max-w-xl">
                        <h1 className="text-balance text-[44px] font-bold leading-[52px]">
                            Take control of your money
                        </h1>
                        <p className="mt-4 text-body text-dark-text-secondary">
                            Accounts, envelopes and goals in one place
                        </p>
                    </div>
                    <LoginNetWorthPreview />
                </section>

                {/* Form */}
                <section className="flex items-center justify-center px-5 py-[40px] sm:px-8 lg:px-0 lg:py-0">
                    <div className="w-full max-w-[440px] lg:max-w-[540px]">
                        {/* Mobile brand sits outside the card chrome */}
                        <div className="mb-8 lg:hidden">
                            <AuthBrand align="center" />
                        </div>

                        <div className="lg:rounded-xl lg:border lg:border-white/10 lg:bg-black lg:px-[40px] lg:py-[36px] lg:shadow-accent-glow">
                            <header className="mb-6 flex flex-col gap-2 lg:mb-7">
                                <h2 className="text-center text-h1 lg:text-left lg:text-[32px] lg:leading-10">
                                    Welcome back
                                </h2>
                                <p className="text-center text-small text-dark-text-secondary lg:text-left lg:text-body">
                                    Log in to manage your money
                                </p>
                            </header>

                            {showRegistrationSuccess ? (
                                <Alert className="mb-5" variant="dark-success">
                                    Account created. Sign in to continue.
                                </Alert>
                            ) : null}

                            <LoginForm
                                onSubmit={handleLogin}
                                fieldErrors={fieldErrors}
                                generalError={generalError}
                                isSubmitting={isSubmitting}
                            />

                            <p className="mt-6 text-center text-small text-dark-text-secondary lg:text-body">
                                Don&apos;t have an account?{' '}
                                <Link
                                    className="font-medium text-dark-accent hover:brightness-110 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent"
                                    to="/register"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
