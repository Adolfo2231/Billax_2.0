import { BrowserRouter, Route, Routes } from 'react-router'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { AuthProvider } from '../hooks/AuthProvider'
import { AccountsPage } from '../pages/AccountsPage'
import { CreateAccountPage } from '../pages/CreateAccountPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'
import { SessionRedirect } from './SessionRedirect'

export function AppRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<SessionRedirect />} />
                    <Route element={<PublicOnlyRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/accounts" element={<AccountsPage />} />
                            <Route path="/accounts/new" element={<CreateAccountPage />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<SessionRedirect />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
