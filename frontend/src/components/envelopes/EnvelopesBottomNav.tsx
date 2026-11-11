import { NavLink } from 'react-router'

function navClassName({ isActive }: { isActive: boolean }) {
    return [
        'flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-md text-caption',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]',
        isActive ? 'text-[#34d399]' : 'text-white/45',
    ].join(' ')
}

export function EnvelopesBottomNav() {
    return (
        <nav
            aria-label="Envelopes navigation"
            className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
        >
            <div className="mx-auto flex max-w-xl items-end justify-between">
                <NavLink to="/dashboard" end className={navClassName}>
                    {({ isActive }) => (
                        <>
                            <svg
                                aria-hidden="true"
                                className="size-[20px]"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinejoin="round"
                                    fill={isActive ? 'currentColor' : 'none'}
                                />
                            </svg>
                            <span>Home</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/accounts" end className={navClassName}>
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
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
                        <path
                            d="M3.5 10h17"
                            stroke="currentColor"
                            strokeWidth="1.75"
                        />
                    </svg>
                    <span>Accounts</span>
                </NavLink>

                <button
                    type="button"
                    aria-label="Quick add"
                    className="-mt-[20px] grid size-[56px] place-items-center rounded-full bg-[#34d399] text-black shadow-[0_8px_20px_rgb(52_211_153/35%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[28px]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <span
                    aria-current="page"
                    className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-md bg-[#34d399]/15 px-2 text-caption text-[#34d399]"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M3.5 7.5 12 3l8.5 4.5v2.2l-8.5 4.5-8.5-4.5V7.5Z" />
                        <path d="M3.5 12.2 12 16.7l8.5-4.5V15l-8.5 4.5L3.5 15v-2.8Z" />
                    </svg>
                    <span>Envelopes</span>
                </span>

                <button
                    type="button"
                    className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-md text-caption text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <circle cx="5" cy="12" r="1.6" />
                        <circle cx="12" cy="12" r="1.6" />
                        <circle cx="19" cy="12" r="1.6" />
                    </svg>
                    <span>More</span>
                </button>
            </div>
        </nav>
    )
}
