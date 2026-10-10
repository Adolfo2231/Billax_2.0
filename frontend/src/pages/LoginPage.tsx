import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
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

    return (
        <main>
            <h1>Login</h1>
            {showRegistrationSuccess ? (
                <Alert variant="success">
                    Account created. Sign in to continue.
                </Alert>
            ) : null}
            <Link to="/register">Create an account</Link>
        </main>
    )
}