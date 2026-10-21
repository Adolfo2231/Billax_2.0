import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export function DashboardPage() {
    const { user, logout } = useAuth()

    return (
        <main className="grid min-h-screen place-items-center bg-canvas p-4">
            <div className="flex flex-col items-center gap-4">
                <p className="text-text-primary">{user?.email}</p>
                <Button variant="secondary" onClick={logout}>
                    Log out
                </Button>
            </div>
        </main>
    )
}
