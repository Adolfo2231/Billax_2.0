import { apiRequest } from './apiClient'
import type { RegisterData, User } from '../types/auth'

export const authService = {
    register(data: RegisterData): Promise<User> {
        return apiRequest<User, RegisterData>('/auth/register', {
            method: 'POST',
            body: data,
        })
    },
}
