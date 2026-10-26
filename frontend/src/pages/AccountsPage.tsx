import { useAccounts } from "../hooks/useAccounts"
import { Spinner } from "../components/ui/Spinner"
import { Alert } from "../components/ui/Alert"
import { Button } from "../components/ui/Button"
import { AccountsEmptyState } from '../components/dashboard/AccountsEmptyState'
import type { AccountType } from '../types/Account'
import { Link } from 'react-router'

const accountTypeLabels: Record<AccountType, string> = {
    cash: 'Cash',
    checking: 'Checking',
    savings: 'Savings',
    credit_card: 'Credit card',
}

const currencyFormatter = new Intl.NumberFormat('es-PR', {
    style: 'currency',
    currency: 'USD',
})

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
            <ul className="flex flex-col gap-3">
                {activeAccounts.map((account) => (
                    <li
                        key={account.id}
                        className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface p-4"
                    >
                        <div>
                            <h2 className="text-h2 text-text-primary">
                                {account.name}
                            </h2>
                            <p className="text-small text-text-secondary">
                                {accountTypeLabels[account.account_type]}
                            </p>
                        </div>

                        <p className="text-body font-medium text-text-primary">
                            {currencyFormatter.format(Number(account.balance))}
                        </p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-h1 text-text-primary">Accounts</h1>
                <Link
                    to="/accounts/new"
                    className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-3 text-small font-medium text-surface hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                    New account
                </Link>
            </div>

            {renderContent()}
        </div>
    )
}