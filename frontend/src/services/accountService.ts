import type { Account, AccountCreate, AccountUpdate } from '../types/Account'
import { apiRequest } from './apiClient'


export const accountService = {
    createAccount(data: AccountCreate): Promise<Account> {
        return apiRequest<Account, AccountCreate>('/accounts/', {
            method: 'POST',
            body: data,
        })
    },

    getAccounts(): Promise<Account[]> {
        return apiRequest<Account[]>('/accounts/', {
            method: 'GET',
        })
    },

    getAccount(id: string): Promise<Account> {
        return apiRequest<Account>(`/accounts/${id}`, {
            method: 'GET',
        })
    },

    updateAccount(id: string, data: AccountUpdate): Promise<Account> {
        return apiRequest<Account, AccountUpdate>(`/accounts/${id}`, {
            method: 'PATCH',
            body: data,
        })
    },

    deactivateAccount(id: string): Promise<Account> {
        return apiRequest<Account>(`/accounts/${id}/deactivate`, {
            method: 'PATCH',
        })
    },
}
