import { Link } from 'react-router'

export function LoginPage() {
    return (
        <main>
            <h1>Login</h1>
            <Link to="/register">Create an account</Link>
        </main>
    )
}