import type { Account } from '../types/Account'

export type AccountTotals = {
    assets: number
    liabilities: number
    netWorth: number
}

export function computeTotals(accounts: Account[]): AccountTotals {
    let assets = 0
    let liabilities = 0

    for (const account of accounts) {
        if (!account.is_active) {
            continue
        }

        const balance = Number(account.balance)

        if (!Number.isFinite(balance)) {
            continue
        }

        if (account.account_type === 'credit_card') {
            liabilities += balance
            continue
        }

        if (
            account.account_type === 'cash' ||
            account.account_type === 'checking' ||
            account.account_type === 'savings'
        ) {
            assets += balance
        }
    }

    return {
        assets,
        liabilities,
        netWorth: assets - liabilities,
    }
}
