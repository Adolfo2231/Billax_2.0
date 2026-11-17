import { NavLink } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { navItems } from './navItems'

function navClassName({ isActive }: { isActive: boolean }) {
    return [
        'flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-md px-2 text-caption',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent',
        isActive ? 'text-dark-accent' : 'text-white/45',
    ].join(' ')
}

export function AppBottomNav() {
    const { logout } = useAuth()

    return (
        <nav
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
        >
            <div className="mx-auto flex max-w-xl items-end justify-around gap-1">
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
                                    <span>{item.shortLabel ?? item.label}</span>
                                </>
                            )}
                        </NavLink>
                    )
                })}

                <button
                    type="button"
                    aria-label="Log out"
                    onClick={logout}
                    className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-md px-2 text-caption text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                        />
                        <path
                            d="M15 8l4 4-4 4M19 12H10"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Log out</span>
                </button>
            </div>
        </nav>
    )
}
