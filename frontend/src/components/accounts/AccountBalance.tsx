import type { AccountType } from '../../types/Account'
import { formatCurrency } from '../../utils/formatCurrency'

type AccountBalanceProps = {
    accountType: AccountType
    balance: string
}

function formatBalance(accountType: AccountType, balance: string) {
    const amount = Number(balance)
    const isCreditCard = accountType === 'credit_card'
    const displayAmount = isCreditCard && amount !== 0 ? -amount : amount

    return formatCurrency(displayAmount)
}

export function AccountBalance({ accountType, balance }: AccountBalanceProps) {
    const isCreditCard = accountType === 'credit_card'

    return (
        <div className="flex flex-col gap-1">
            <p className="text-small text-text-secondary">
                {isCreditCard ? 'Current Balance' : 'Available Balance'}
            </p>
            <p className="text-h2 text-text-primary">
                {formatBalance(accountType, balance)}
            </p>
        </div>
    )
}
