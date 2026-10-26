export type AccountType = 'cash' | 'checking' | 'savings' | 'credit_card'

export type AccountCreate = {
    name: string
    account_type: AccountType
    balance: string
}

export type Account = {
    id: string
    user_id: string
    name: string
    account_type: AccountType
    balance: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export type AccountFieldErrors = Partial<
    Record<keyof AccountCreate, string>
>
