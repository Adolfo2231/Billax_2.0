import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { BrandLockup } from './BrandLockup'
import { NavLinks } from './NavLinks'
import { UserMenu } from './UserMenu'

type MobileNavigationProps = {
    isOpen: boolean
    onClose: () => void
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const desktop = window.matchMedia('(min-width: 1024px)')

        function closeOnDesktop() {
            if (desktop.matches) {
                onClose()
            }
        }

        closeOnDesktop()
        desktop.addEventListener('change', closeOnDesktop)
        return () => {
            desktop.removeEventListener('change', closeOnDesktop)
        }
    }, [isOpen, onClose])

    function handleNavigate(event: MouseEvent<HTMLDivElement>) {
        if (!(event.target instanceof Element)) {
            return
        }

        if (event.target.closest('a')) {
            onClose()
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed top-[0] right-[0] bottom-[0] left-[0] z-40 lg:hidden">
            <button
                type="button"
                aria-label="Close menu"
                className="absolute top-[0] right-[0] bottom-[0] left-[0] bg-text-primary/40"
                onClick={onClose}
            />
            <div
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="relative flex h-screen w-[280px] flex-col gap-4 border-r border-border bg-surface p-4"
                onClick={handleNavigate}
            >
                <BrandLockup />
                <NavLinks />
                <UserMenu />
            </div>
        </div>
    )
}
