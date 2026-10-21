import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export function DashboardPage() {
    const { user, logout } = useAuth()

    return (
        <div className="flex flex-col items-start gap-4">
            <p className="text-text-primary">{user?.email}</p>
            <Button variant="secondary" onClick={logout}>
                Log out
            </Button>
        </div>
    )
}
