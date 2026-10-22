import { AccountsCount } from '../components/dashboard/AccountsCount'
import { useAuth } from '../hooks/useAuth'


export function DashboardPage() {
    const { user } = useAuth()
    const label = user?.first_name ?? user?.email

    return (
        <div className="flex flex-col items-start gap-4">
            <h1 className="text-h1 text-text-primary">Welcome, {label}</h1>
            <AccountsCount isLoading={false} error={null} count={null} />
        </div>
    )
}
