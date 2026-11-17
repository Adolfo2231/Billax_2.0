import { Outlet } from 'react-router'
import { AppBottomNav } from './AppBottomNav'
import { AppSidebar } from './AppSidebar'

export function AppLayout() {
    return (
        <div className="min-h-screen bg-dark-canvas text-white lg:flex">
            <AppSidebar />

            {/* pb clears the fixed bottom nav on mobile; theme spacing maxes at 8 (64px). */}
            <main className="min-w-0 flex-1 px-4 pb-[88px] pt-4 lg:px-8 lg:pb-8 lg:pt-8">
                <Outlet />
            </main>

            <AppBottomNav />
        </div>
    )
}
