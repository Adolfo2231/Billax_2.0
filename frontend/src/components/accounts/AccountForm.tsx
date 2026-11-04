import { useState } from 'react'
import type { AccountCreate, AccountFieldErrors, AccountType } from "../../types/Account";
import { FormField } from '../ui/FormField';
import { Label } from '../ui/Label'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'

type AccountFormProps = {
    onSubmit: (data: AccountCreate) => void
    onCancel: () => void
    fieldErrors?: AccountFieldErrors
    error?: string
    isSubmitting?: boolean
    initialValues?: AccountCreate
    submitLabel?: string
}

const initialFormData: AccountCreate = {
    name: '',
    account_type: 'cash',
    balance: '',
}

export function AccountForm({
    onSubmit,
    onCancel,
    fieldErrors = {},
    error,
    isSubmitting = false,
    initialValues,
    submitLabel = 'Add account',
}: AccountFormProps) {
    const [formData, setFormData] = useState<AccountCreate>(
        initialValues ?? initialFormData,
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit(formData)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const field = event.target.name as 'name' | 'balance'
        const value = event.target.value

        setFormData((currentData) => ({
            ...currentData,
            [field]: value,
        }))
    }

    function handleAccountTypeChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setFormData((currentData) => ({
            ...currentData,
            account_type: event.target.value as AccountType,
        }))
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error ? <Alert variant="error">{error}</Alert> : null}
            <FormField
                id="account-name"
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                error={fieldErrors.name}
                disabled={isSubmitting}
            />
            <div className="flex flex-col gap-2">
                <Label htmlFor="account-type">Account type</Label>

                <select
                    id="account-type"
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleAccountTypeChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.account_type)}
                    aria-describedby={
                        fieldErrors.account_type
                            ? 'account-type-error'
                            : undefined
                    }
                    className={`w-full rounded-md border bg-surface px-4 py-3 text-small text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${fieldErrors.account_type
                        ? 'border-danger'
                        : 'border-border'
                        }`}
                >
                    <option value="cash">Cash</option>
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="credit_card">Credit Card</option>
                </select>

                {fieldErrors.account_type ? (
                    <p
                        id="account-type-error"
                        className="text-caption text-text-primary"
                    >
                        {fieldErrors.account_type}
                    </p>
                ) : null}
            </div>
            <FormField
                id="account-balance"
                label="Balance"
                name="balance"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                inputMode="decimal"
                value={formData.balance}
                onChange={handleInputChange}
                error={fieldErrors.balance}
                disabled={isSubmitting}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <Button type="submit" loading={isSubmitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    )
}