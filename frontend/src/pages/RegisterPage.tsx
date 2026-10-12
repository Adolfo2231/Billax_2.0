import { useNavigate } from 'react-router'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthLink } from '../components/auth/AuthLink'
import { RegisterForm } from '../components/auth/RegisterForm'
import { useRegister } from '../hooks/useRegister'
import type { RegisterFormData } from '../types/auth'

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
        <AuthCard title="Create your account">
            <RegisterForm
                onSubmit={handleRegister}
                fieldErrors={fieldErrors}
                generalError={generalError}
                isSubmitting={isSubmitting}
            />
            <AuthLink to="/login">
                Already have an account? Sign in
            </AuthLink>
        </AuthCard>
    )
}
