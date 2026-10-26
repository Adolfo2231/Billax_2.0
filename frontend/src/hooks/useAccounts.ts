import { useState } from "react";
import type { AccountFieldErrors, AccountCreate, Account } from "../types/Account";
import { accountService } from '../services/accountService';
import { ApiError } from "../types/api";
import { getFieldError } from '../services/errors';

function validateAccountData(data: AccountCreate): AccountFieldErrors {
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

function createAccountPayload(data: AccountCreate): AccountCreate {
    return {
        name: data.name.trim(),
        account_type: data.account_type,
        balance: data.balance.trim(),
    }
}

export function useAccounts() {
    const [fieldErrors, setFieldErrors] = useState<AccountFieldErrors>({})
    const [error, setError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function createAccount(
        data: AccountCreate,
    ): Promise<Account | undefined> {
        const validationErrors = validateAccountData(data)

        setFieldErrors(validationErrors)
        setError(undefined)

        if (Object.keys(validationErrors).length > 0) {
            return undefined
        }

        setIsSubmitting(true)

        try {
            return await accountService.createAccount(createAccountPayload(data))
        } catch (caughtError) {
            if (caughtError instanceof ApiError && caughtError.status === 422) {
                const apiFieldErrors: AccountFieldErrors = {}
                const fields: (keyof AccountCreate)[] = [
                    'name',
                    'account_type',
                    'balance',
                ]

                for (const field of fields) {
                    const message = getFieldError(caughtError, field)

                    if (message) {
                        apiFieldErrors[field] = message
                    }
                }

                setFieldErrors(apiFieldErrors)
                setError(
                    Object.keys(apiFieldErrors).length === 0
                        ? 'Something went wrong'
                        : undefined,
                )
            } else {
                setError('Something went wrong')
            }

            return undefined
        } finally {
            setIsSubmitting(false)
        }
    }


    return {
        createAccount,
        fieldErrors,
        error,
        isSubmitting,
    }
}