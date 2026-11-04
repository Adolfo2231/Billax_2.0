import { apiRequest } from './apiClient'
import type { LoginResponse, RegisterData, User } from '../types/auth'

export const authService = {
    register(data: RegisterData): Promise<User> {
        return apiRequest<User, RegisterData>('/auth/register', {
            method: 'POST',
            body: data,
        })
    },

    login(email: string, password: string): Promise<LoginResponse> {
        return apiRequest<
            LoginResponse,
            { username: string; password: string }
        >('/auth/login', {
            method: 'POST',
            body: { username: email, password },
            bodyFormat: 'form',
        })
    },

    getMe(): Promise<User> {
        return apiRequest<User>('/auth/me', {
            method: 'GET',
        })
    },
}
