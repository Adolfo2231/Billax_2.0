import { NavLink } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

function navClassName({ isActive }: { isActive: boolean }) {
    return [
        'flex w-full min-h-[44px] items-center gap-3 rounded-md px-4 py-3 text-small',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]',
        isActive
            ? 'bg-[#34d399] font-semibold text-black'
            : 'font-medium text-white/70 hover:bg-white/5 hover:text-white',
    ].join(' ')
}

function LeafIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-[20px]"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 3c4.5 2.2 7.5 6.2 7.5 11.2 0 2.4-.8 4.5-2.1 6.1-1.6-3.4-4.4-5.7-7.9-6.8 1.8 1.6 3.1 3.7 3.6 6.2-.7.3-1.4.5-2.1.5C6.5 20.2 4 16.4 4 12.2 4 7.4 7.5 4.2 12 3Z" />
        </svg>
    )
}

const placeholderItems = [
    'Transactions',
    'Goals',
    'Insights',
    'AI Assistant',
] as const

export function EnvelopesDesktopSidebar() {
    const { user } = useAuth()
    const displayName = user?.first_name?.trim() || user?.email || 'You'

    return (
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#0a0a0a] px-4 py-5 lg:flex">
            <div className="flex items-center gap-3 px-1 text-white">
                <span className="grid size-[40px] place-items-center rounded-md bg-white/10 text-[#34d399]">
                    <LeafIcon />
                </span>
                <span className="text-body font-bold">Billax</span>
            </div>

            <nav aria-label="Desktop" className="mt-6 flex flex-1 flex-col gap-1">
                <NavLink to="/dashboard" end className={navClassName}>
                    Dashboard
                </NavLink>
                <NavLink to="/accounts" end className={navClassName}>
                    Accounts
                </NavLink>
                <span
                    aria-current="page"
                    className="flex w-full min-h-[44px] items-center gap-3 rounded-md bg-[#34d399] px-4 py-3 text-small font-semibold text-black"
                >
                    Envelopes
                </span>
                {placeholderItems.map((label) => (
                    <span
                        key={label}
                        className="flex w-full min-h-[44px] cursor-default items-center gap-3 rounded-md px-4 py-3 text-small font-medium text-white/35"
                    >
                        {label}
                    </span>
                ))}
            </nav>

            <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-1 pt-4">
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
                    <p className="text-caption text-white/45">Settings</p>
                </div>
            </div>
        </aside>
    )
}
