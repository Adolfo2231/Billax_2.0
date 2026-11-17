import { BrowserRouter, Route, Routes } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { AuthProvider } from '../hooks/AuthProvider'
import { AccountsPage } from '../pages/AccountsPage'
import { CreateAccountPage } from '../pages/CreateAccountPage'
import { DashboardPage } from '../pages/DashboardPage'
import { EditAccountPage } from '../pages/EditAccountPage'
import { EnvelopesPage } from '../pages/EnvelopesPage'
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
                        <Route element={<AppLayout />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/accounts" element={<AccountsPage />} />
                            <Route path="/accounts/new" element={<CreateAccountPage />} />
                            <Route path="/accounts/:id/edit" element={<EditAccountPage />} />
                            <Route
                                path="/accounts/:id/envelopes"
                                element={<EnvelopesPage />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<SessionRedirect />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
