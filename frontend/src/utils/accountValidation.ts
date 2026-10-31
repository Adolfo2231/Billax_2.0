import type { AccountCreate, AccountFieldErrors } from '../types/Account'

export function validateAccountData(data: AccountCreate): AccountFieldErrors {
    const errors: AccountFieldErrors = {}

    if (!data.name.trim()) {
        errors.name = 'Name is required'
    }

    if (!/^\d+(?:\.\d{1,2})?$/.test(data.balance.trim())) {
        errors.balance =
            'Balance must be 0 or greater with at most 2 decimal places'
    }

    return errors
}

export function buildAccountPayload(data: AccountCreate): AccountCreate {
    return {
        name: data.name.trim(),
        account_type: data.account_type,
        balance: data.balance.trim(),
    }
}
