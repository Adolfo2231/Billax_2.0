import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthLink } from '../components/auth/AuthLink'
import { LoginForm } from '../components/auth/LoginForm'
import { Alert } from '../components/ui/Alert'

export function LoginPage() {
    const location = useLocation()
    const navigate = useNavigate()
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

    function handleLogin() {}

    return (
        <AuthCard title="Sign in">
            {showRegistrationSuccess ? (
                <Alert variant="success">
                    Account created. Sign in to continue.
                </Alert>
            ) : null}
            <LoginForm onSubmit={handleLogin} />
            <AuthLink to="/register">
                Don't have an account? Create one
            </AuthLink>
        </AuthCard>
    )
}
