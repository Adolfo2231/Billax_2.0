import { Link } from 'react-router'
import type { Account } from '../../types/Account'
import { Card } from '../ui/Card'
import { AccountBalance } from './AccountBalance'
import { AccountTypeBadge } from './AccountTypeBadge'
import { AccountTypeIcon } from './AccountTypeIcon'

type AccountCardProps = {
    account: Account
}

export function AccountCard({ account }: AccountCardProps) {
    return (
        <Card className="flex h-full flex-col gap-4">
            <div className="flex items-center gap-3">
                <AccountTypeIcon accountType={account.account_type} />
                <div className="min-w-0">
                    <h3 className="truncate text-body font-bold text-text-primary">
                        {account.name}
                    </h3>
                    <AccountTypeBadge
                        accountType={account.account_type}
                        isActive={account.is_active}
                    />
                </div>
            </div>
            <AccountBalance
                accountType={account.account_type}
                balance={account.balance}
            />
            <Link
                to={`/accounts/${account.id}/edit`}
                aria-label={`Edit ${account.name}`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center self-start text-small font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
                Edit
            </Link>
        </Card>
    )
}
