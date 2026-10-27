import type { AccountType } from '../../types/Account'

type AccountTypeBadgeProps = {
    accountType: AccountType
    isActive: boolean
}

const accountTypeLabels: Record<AccountType, string> = {
    cash: 'Cash',
    checking: 'Checking',
    savings: 'Savings',
    credit_card: 'Credit card',
}

export function AccountTypeBadge({
    accountType,
    isActive,
}: AccountTypeBadgeProps) {
    return (
        <p
            className={`text-caption uppercase ${
                isActive ? 'text-brand-600' : 'text-text-secondary'
            }`}
        >
            {accountTypeLabels[accountType]}
            <span aria-hidden="true"> ● </span>
            <span className="sr-only">, </span>
            {isActive ? 'Active' : 'Inactive'}
        </p>
    )
}
