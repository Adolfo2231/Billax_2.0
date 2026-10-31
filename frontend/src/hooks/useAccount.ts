import { useEffect, useState } from "react";
import type { Account, AccountCreate, AccountFieldErrors } from "../types/Account";
import { accountService } from "../services/accountService";
import { ApiError } from "../types/api";
import { getFieldError } from "../services/errors";
import { buildAccountPayload, validateAccountData } from '../utils/accountValidation'

export function useAccount(accountId: string | undefined) {
    const [account, setAccount] = useState<Account>()
    const [isLoading, setIsLoading] = useState(accountId !== undefined)
    const [notFound, setNotFound] = useState(false)
    const [loadError, setLoadError] = useState<string>()
    const [fieldErrors, setFieldErrors] = useState<AccountFieldErrors>({})
    const [error, setError] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        if (!accountId) {
            return
        }

        const id = accountId

        async function loadAccount() {
            try {
                const fetchedAccount = await accountService.getAccount(id)
                setAccount(fetchedAccount)
                setNotFound(false)
                setLoadError(undefined)
            } catch (caughtError) {
                setAccount(undefined)

                if (caughtError instanceof ApiError && caughtError.status === 404) {
                    setNotFound(true)
                    setLoadError(undefined)
                } else {
                    setNotFound(false)
                    setLoadError("Something went wrong")
                }
            } finally {
                setIsLoading(false)
            }
        }

        void loadAccount()
    }, [accountId, reloadKey])

    async function updateAccount(
        data: AccountCreate,
    ): Promise<Account | undefined> {
        const validationErrors = validateAccountData(data)

        setFieldErrors(validationErrors)
        setError(undefined)

        if (Object.keys(validationErrors).length > 0 || !accountId) {
            return undefined
        }

        setIsSubmitting(true)

        try {
            return await accountService.updateAccount(accountId, buildAccountPayload(data))
        } catch (caughtError) {
            if (caughtError instanceof ApiError && caughtError.status === 422) {
                const apiFieldErrors: AccountFieldErrors = {}
                const fields: (keyof AccountCreate)[] = [
                    "name",
                    "account_type",
                    "balance",
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
                        ? "Something went wrong"
                        : undefined,
                )
            } else {
                setError("Something went wrong")
            }

            return undefined
        } finally {
            setIsSubmitting(false)
        }
    }

    async function deactivateAccount(): Promise<Account | undefined> {
        if (!accountId) {
            return undefined
        }

        setError(undefined)
        setIsSubmitting(true)

        try {
            return await accountService.deactivateAccount(accountId)
        } catch {
            setError("Something went wrong")
            return undefined
        } finally {
            setIsSubmitting(false)
        }
    }

    function refetch() {
        setIsLoading(true)
        setReloadKey((currentKey) => currentKey + 1)
    }

    return {
        account,
        isLoading,
        notFound: !accountId || notFound,
        loadError,
        fieldErrors,
        error,
        isSubmitting,
        updateAccount,
        deactivateAccount,
        refetch,
    }
}
