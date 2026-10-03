import { Link } from 'react-router'

export function RegisterPage() {
    return (
        <main>
            <h1>Register</h1>
            <Link to="/login">Sign in</Link>
        </main>
    )
}