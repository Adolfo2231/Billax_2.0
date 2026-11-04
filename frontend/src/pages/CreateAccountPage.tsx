import { useNavigate } from 'react-router'
import { AccountForm } from '../components/accounts/AccountForm'
import { Card } from '../components/ui/Card'
import { useAccounts } from '../hooks/useAccounts'
import type { AccountCreate } from '../types/Account'

export function CreateAccountPage() {
    const navigate = useNavigate()
    const {
        createAccount,
        fieldErrors,
        error,
        isSubmitting,
    } = useAccounts()

    async function handleCreateAccount(data: AccountCreate) {
        const account = await createAccount(data)

        if (account) {
            navigate('/accounts')
        }
    }

    function handleCancel() {
        navigate('/accounts')
    }

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <h1 className="text-h1 text-text-primary">Create account</h1>

            <Card>
                <AccountForm
                    onSubmit={handleCreateAccount}
                    onCancel={handleCancel}
                    fieldErrors={fieldErrors}
                    error={error}
                    isSubmitting={isSubmitting}
                />
            </Card>
        </div>
    )
}