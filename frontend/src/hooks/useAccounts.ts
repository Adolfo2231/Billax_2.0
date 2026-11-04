import { useState, useEffect } from "react";
import type { AccountFieldErrors, AccountCreate, Account } from "../types/Account";
import { accountService } from '../services/accountService';
import { ApiError } from "../types/api";
import { getFieldError } from '../services/errors';
import { buildAccountPayload, validateAccountData } from '../utils/accountValidation'

export function useAccounts() {
    const [fieldErrors, setFieldErrors] = useState<AccountFieldErrors>({})
    const [error, setError] = useState<string>()
    const [listError, setListError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [accounts, setAccounts] = useState<Account[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [reloadKey, setReloadKey] = useState(0)


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
            return await accountService.createAccount(buildAccountPayload(data))
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

    useEffect(() => {
        async function loadAccounts() {
            try {
                const fetchedAccounts = await accountService.getAccounts()
                setAccounts(fetchedAccounts)
                setListError(undefined)
            } catch {
                setListError('Something went wrong')
            } finally {
                setIsLoading(false)
            }
        }

        void loadAccounts()
    }, [reloadKey])

    function refetch() {
        setIsLoading(true)
        setReloadKey((currentKey) => currentKey + 1)
    }

    return {
        createAccount,
        fieldErrors,
        error,
        listError,
        isSubmitting,
        accounts,
        isLoading,
        refetch

    }
}