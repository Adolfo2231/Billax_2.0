import type { RefObject } from 'react'

type HeaderProps = {
    isOpen: boolean
    menuButtonRef: RefObject<HTMLButtonElement | null>
    onToggle: () => void
}

export function Header({ isOpen, menuButtonRef, onToggle }: HeaderProps) {
    return (
        <header className="flex h-8 items-center border-b border-border bg-surface px-4 lg:hidden">
            <button
                ref={menuButtonRef}
                type="button"
                className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-md text-h2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                aria-controls="mobile-navigation"
                aria-label={isOpen ? 'Close menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                onClick={onToggle}
            >
                <span aria-hidden="true">☰</span>
            </button>
        </header>
    )
}
