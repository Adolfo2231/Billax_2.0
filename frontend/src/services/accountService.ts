import type { Account, AccountCreate } from '../types/Account'
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
}