import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { authService } from '../services/authService'
import { setUnauthorizedHandler } from '../services/apiClient'
import { clearToken, getToken, setToken } from '../services/tokenStorage'
import type { User } from '../types/auth'
import { AuthContext } from './useAuth'
import type { AuthContextValue } from './useAuth'

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(() => getToken() !== null)

    const logout = useCallback(() => {
        clearToken()
        setUser(null)
        setIsLoading(false)
        navigate('/login', { replace: true })
    }, [navigate])

    const login = useCallback(async (email: string, password: string) => {
        const { access_token } = await authService.login(email, password)
        setToken(access_token)

        try {
            const currentUser = await authService.getMe()
            setUser(currentUser)
        } catch (error) {
            clearToken()
            setUser(null)
            throw error
        }
    }, [])

    useEffect(() => {
        setUnauthorizedHandler(logout)

        if (!getToken()) {
            return
        }

        let active = true

        authService
            .getMe()
            .then((currentUser) => {
                if (active) {
                    setUser(currentUser)
                }
            })
            .catch(() => {
                if (active) {
                    clearToken()
                    setUser(null)
                }
            })
            .finally(() => {
                if (active) {
                    setIsLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [logout])

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            isLoading,
            login,
            logout,
        }),
        [user, isLoading, login, logout],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
