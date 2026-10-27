import { Link } from 'react-router'
import { AccountList } from '../components/accounts/AccountList'
import { NetWorthCard } from '../components/accounts/NetWorthCard'
import { AccountsEmptyState } from '../components/dashboard/AccountsEmptyState'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useAccounts } from '../hooks/useAccounts'
import { useAuth } from '../hooks/useAuth'
import { computeTotals } from '../utils/accountTotals'

export function DashboardPage() {
    const { user } = useAuth()
    const label = user?.first_name ?? user?.email
    const { accounts, isLoading, listError, refetch } = useAccounts()
    const activeAccounts = accounts.filter((account) => account.is_active)

    function renderAccounts() {
        if (isLoading) {
            return <Spinner />
        }

        if (listError) {
            return (
                <div className="flex flex-col items-start gap-4">
                    <Alert variant="error">{listError}</Alert>
                    <Button onClick={refetch}>Retry</Button>
                </div>
            )
        }

        if (activeAccounts.length === 0) {
            return <AccountsEmptyState />
        }

        return (
            <>
                <NetWorthCard totals={computeTotals(activeAccounts)} />
                <section className="flex w-full min-w-0 flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-h2 text-text-primary">Your accounts</h2>
                        <Link
                            to="/accounts"
                            className="inline-flex min-h-7 shrink-0 items-center text-small font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                        >
                            View all
                        </Link>
                    </div>
                    <AccountList accounts={activeAccounts.slice(0, 4)} />
                </section>
            </>
        )
    }

    return (
        <div className="flex w-full min-w-0 flex-col gap-5">
            <h1 className="text-h1 text-text-primary">Welcome, {label}</h1>
            {renderAccounts()}
        </div>
    )
}
