import { NavLink } from 'react-router'
import { AuthBrand } from '../auth/AuthBrand'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { navItems } from './navItems'

function navClassName({ isActive }: { isActive: boolean }) {
    return [
        'flex w-full min-h-[44px] items-center gap-3 rounded-md px-4 py-3 text-small',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent',
        isActive
            ? 'bg-dark-accent font-semibold text-dark-on-accent'
            : 'font-medium text-white/70 hover:bg-white/5 hover:text-white',
    ].join(' ')
}

export function AppSidebar() {
    const { user, logout } = useAuth()
    const displayName = user?.first_name?.trim() || user?.email || 'You'

    return (
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-dark-canvas px-4 py-5 lg:flex">
            <AuthBrand />

            <nav aria-label="Main" className="mt-6 flex flex-1 flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={navClassName}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon isActive={isActive} />
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    )
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-white/10 px-1 pt-4">
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="grid size-[40px] place-items-center rounded-full bg-white/10 text-caption font-semibold text-white"
                    >
                        {displayName.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-small font-medium text-white">
                            {displayName}
                        </p>
                    </div>
                </div>
                <Button
                    variant="dark"
                    className="min-h-[44px] w-full"
                    onClick={logout}
                >
                    Log out
                </Button>
            </div>
        </aside>
    )
}
