import type { ReactNode } from 'react'
import { NavLink } from 'react-router'

function navLinkClassName({ isActive }: { isActive: boolean }) {
    return [
        'flex min-h-7 items-center gap-3 rounded-md border-l-2 px-3 text-small',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
        isActive
            ? 'border-brand-600 bg-brand-50 font-semibold text-brand-700'
            : 'border-transparent font-medium text-text-primary hover:bg-surface-muted',
    ].join(' ')
}

function DashboardIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-[20px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function AccountsIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-[20px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
        >
            <rect
                x="3.5"
                y="6"
                width="17"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.75"
            />
            <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.75" />
            <path
                d="M7 14.5h4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </svg>
    )
}

const links: { to: string; label: string; icon: ReactNode }[] = [
    { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/accounts', label: 'Accounts', icon: <AccountsIcon /> },
]

export function NavLinks() {
    return (
        <nav aria-label="Main" className="flex flex-col gap-1">
            {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                    {link.icon}
                    {link.label}
                </NavLink>
            ))}
        </nav>
    )
}
