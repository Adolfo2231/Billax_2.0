import { Link } from 'react-router'
import { AccountList } from '../components/accounts/AccountList'
import { AddAccountCard } from '../components/accounts/AddAccountCard'
import { NetWorthCard } from '../components/accounts/NetWorthCard'
import { AccountsEmptyState } from '../components/dashboard/AccountsEmptyState'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useAccounts } from '../hooks/useAccounts'
import { computeTotals } from '../utils/accountTotals'

export function AccountsPage() {
    const { accounts, isLoading, listError, refetch } = useAccounts()
    const activeAccounts = accounts.filter((account) => account.is_active)

    function renderContent() {
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
                    <h2 className="text-h2 text-text-primary">
                        Your accounts
                    </h2>
                    <AccountList accounts={activeAccounts} />
                    <AddAccountCard />
                </section>
            </>
        )
    }

    return (
        <div className="flex w-full min-w-0 flex-col gap-5">
            <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-h1 text-text-primary">My Accounts</h1>
                    <p className="mt-1 text-small text-text-secondary">
                        Manage your financial accounts and balances.
                    </p>
                </div>
                <Link
                    to="/accounts/new"
                    className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-brand-600 px-4 py-3 text-small font-medium text-surface hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                    <span aria-hidden="true">+</span> New account
                </Link>
            </header>

            {renderContent()}
        </div>
    )
}