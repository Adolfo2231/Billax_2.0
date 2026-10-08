import { Link } from 'react-router'
import { Card } from '../components/ui/Card'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useRegister } from '../hooks/useRegister'

export function RegisterPage() {
    const { register, fieldErrors, generalError } = useRegister()

    return (
        <main className="grid min-h-screen place-items-center bg-canvas p-4 sm:p-6">
            <Card className="flex w-full max-w-[420px] flex-col gap-6 sm:p-6">
                <h1 className="text-center text-h1 text-text-primary">
                    Create your account
                </h1>
                <RegisterForm
                    onSubmit={register}
                    fieldErrors={fieldErrors}
                    generalError={generalError}
                />
                <Link
                    className="self-center text-center text-small font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                    to="/login"
                >
                    Already have an account? Sign in
                </Link>
            </Card>
        </main>
    )
}
