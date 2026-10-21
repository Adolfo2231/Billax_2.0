import { Navigate, Outlet } from 'react-router'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'

export function PublicOnlyRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <main className="grid min-h-screen place-items-center bg-canvas text-brand-600">
                <Spinner />
            </main>
        )
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
