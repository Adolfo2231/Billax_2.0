import { Link } from 'react-router'
import { NavLinks } from './NavLinks'
import { UserMenu } from './UserMenu'

export function Sidebar() {
    return (
        <aside className="fixed top-[0] left-[0] hidden h-screen w-[260px] flex-col gap-4 border-r border-border bg-surface p-4 lg:flex">
            <Link
                to="/dashboard"
                className="flex min-h-7 items-center rounded-md px-3 text-h2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
                Billax
            </Link>
            <NavLinks />
            <UserMenu />
        </aside>
    )
}
