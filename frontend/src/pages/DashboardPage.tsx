import { AccountsCount } from '../components/dashboard/AccountsCount'
import { useAuth } from '../hooks/useAuth'
import { useAccounts } from '../hooks/useAccounts'


export function DashboardPage() {
    const { user } = useAuth()
    const label = user?.first_name ?? user?.email
    const { accounts, isLoading, listError } = useAccounts()
    const activeAccounts = accounts.filter((account) => account.is_active)

    return (
        <div className="flex flex-col items-start gap-4">
            <h1 className="text-h1 text-text-primary">Welcome, {label}</h1>
            <AccountsCount
                isLoading={isLoading}
                error={listError ?? null}
                count={activeAccounts.length}
            />
        </div>
    )
}
