import { NavLink } from 'react-router'

function navLinkClassName({ isActive }: { isActive: boolean }) {
    return `flex min-h-7 items-center rounded-md px-3 text-small font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${isActive ? 'bg-brand-50 text-brand-700' : 'text-text-primary hover:bg-surface-muted'}`
}

export function NavLinks() {
    return (
        <nav aria-label="Main" className="flex flex-col gap-1">
            <NavLink to="/dashboard" className={navLinkClassName}>
                Dashboard
            </NavLink>
            <NavLink to="/accounts" className={navLinkClassName}>
                Accounts
            </NavLink>
        </nav>
    )
}
