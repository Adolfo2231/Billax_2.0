import { Outlet } from 'react-router'

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-canvas lg:pl-[260px]">
            <aside className="fixed top-[0] left-[0] hidden h-screen w-[260px] border-r border-border bg-surface lg:block" />
            <header className="h-8 border-b border-border bg-surface lg:hidden" />
            <main className="p-4 lg:p-8">
                <Outlet />
            </main>
        </div>
    )
}
