import { useCallback, useRef, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './Header'
import { MobileNavigation } from './MobileNavigation'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    function toggleNavigation() {
        setIsOpen((open) => !open)
    }

    const closeNavigation = useCallback(() => {
        setIsOpen(false)
        const menuButton = menuButtonRef.current

        if (menuButton && menuButton.offsetParent !== null) {
            menuButton.focus()
        }
    }, [])

    return (
        <div className="min-h-screen bg-canvas lg:pl-[260px]">
            <Sidebar />
            <Header
                isOpen={isOpen}
                menuButtonRef={menuButtonRef}
                onToggle={toggleNavigation}
            />
            <MobileNavigation isOpen={isOpen} onClose={closeNavigation} />
            <main className="p-4 lg:p-8">
                <Outlet />
            </main>
        </div>
    )
}
