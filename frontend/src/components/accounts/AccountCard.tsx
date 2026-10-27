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
        </Card>
    )
}
