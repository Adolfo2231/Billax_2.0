import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { AccountForm } from '../components/accounts/AccountForm'
import { DeactivateAccountDialog } from '../components/accounts/DeactivateAccountDialog'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { useAccount } from '../hooks/useAccount'
import type { AccountCreate } from '../types/Account'

export function EditAccountPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const {
        account,
        isLoading,
        notFound,
        loadError,
        fieldErrors,
        error,
        isSubmitting,
        updateAccount,
        deactivateAccount,
        refetch,
    } = useAccount(id)
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false)

    async function handleUpdateAccount(data: AccountCreate) {
        const updatedAccount = await updateAccount(data)

        if (updatedAccount) {
            navigate('/accounts')
        }
    }

    function handleCancel() {
        navigate('/accounts')
    }

    async function handleConfirmDeactivate() {
        const deactivatedAccount = await deactivateAccount()

        if (deactivatedAccount) {
            navigate('/accounts')
        }
    }

    if (isLoading) {
        return (
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
                <Spinner />
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4">
                <p className="text-body text-text-primary">Account not found</p>
                <Link
                    to="/accounts"
                    className="inline-flex min-h-[44px] items-center text-small font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                    Back to accounts
                </Link>
            </div>
        )
    }

    if (loadError || !account) {
        return (
            <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4">
                <Alert variant="error">{loadError ?? 'Something went wrong'}</Alert>
                <Button onClick={refetch}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <h1 className="text-h1 text-text-primary">Edit account</h1>

            <Card>
                <AccountForm
                    onSubmit={handleUpdateAccount}
                    onCancel={handleCancel}
                    fieldErrors={fieldErrors}
                    error={error}
                    isSubmitting={isSubmitting}
                    initialValues={{
                        name: account.name,
                        account_type: account.account_type,
                        balance: account.balance,
                    }}
                    submitLabel="Save changes"
                />
            </Card>

            <button
                type="button"
                onClick={() => setIsDeactivateOpen(true)}
                disabled={isSubmitting}
                className="inline-flex min-h-[44px] items-center justify-center self-start rounded-md border border-danger px-4 py-3 text-small font-medium text-danger hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Deactivate account
            </button>

            {isDeactivateOpen ? (
                <DeactivateAccountDialog
                    account={account}
                    isSubmitting={isSubmitting}
                    error={error}
                    onCancel={() => setIsDeactivateOpen(false)}
                    onConfirm={handleConfirmDeactivate}
                />
            ) : null}
        </div>
    )
}
