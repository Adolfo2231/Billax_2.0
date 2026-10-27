import { BrandLockup } from './BrandLockup'
import { NavLinks } from './NavLinks'
import { UserMenu } from './UserMenu'

export function Sidebar() {
    return (
        <aside className="fixed top-[0] left-[0] hidden h-screen w-[260px] flex-col gap-4 border-r border-border bg-surface p-4 lg:flex">
            <BrandLockup />
            <NavLinks />
            <UserMenu />
        </aside>
    )
}
