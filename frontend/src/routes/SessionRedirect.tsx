import { Navigate } from 'react-router'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'

export function SessionRedirect() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <main className="grid min-h-screen place-items-center bg-canvas text-brand-600">
                <Spinner />
            </main>
        )
    }

    return (
        <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
    )
}
