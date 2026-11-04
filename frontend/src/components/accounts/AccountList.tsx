import type { Account } from '../../types/Account'
import { AccountCard } from './AccountCard'

type AccountListProps = {
    accounts: Account[]
}

export function AccountList({ accounts }: AccountListProps) {
    return (
        <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {accounts.map((account) => (
                <li key={account.id} className="min-w-0">
                    <AccountCard account={account} />
                </li>
            ))}
        </ul>
    )
}
