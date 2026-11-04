import type { ReactNode } from 'react'

type AuthHeroProps = {
    title: string
    description: string
    children?: ReactNode
    previewLayout?: 'inline' | 'stacked'
}

export function AuthHero({
    title,
    description,
    children,
    previewLayout = 'inline',
}: AuthHeroProps) {
    const isStacked = previewLayout === 'stacked'

    return (
        <section className="relative isolate overflow-hidden bg-brand-900 px-6 py-6 text-surface lg:flex lg:min-h-screen lg:items-center lg:px-8">
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full opacity-10"
            >
                <defs>
                    <pattern
                        id="auth-hero-dots"
                        width="22"
                        height="22"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="1" cy="1" r="1" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#auth-hero-dots)" />
            </svg>

            <div className="mx-auto w-full max-w-[520px]">
                <div className="mb-6 flex items-center gap-3">
                    <span className="grid size-[40px] place-items-center rounded-md bg-brand-600">
                        <svg
                            aria-hidden="true"
                            className="size-[20px]"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M4.5 7.5h15v10.25A2.25 2.25 0 0 1 17.25 20H6.75a2.25 2.25 0 0 1-2.25-2.25V7.5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M7 7.5V6.25A2.25 2.25 0 0 1 9.25 4h7.25"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle
                                cx="16.5"
                                cy="13.5"
                                r="1.5"
                                fill="#1a5a42"
                            />
                        </svg>
                    </span>
                    <span className="text-body font-bold">Billax</span>
                </div>

                <div className="max-w-[450px]">
                    <h1 className="text-display text-balance">{title}</h1>
                    {isStacked ? (
                        <p className="mt-3 text-small text-surface/80 sm:text-body">
                            {description}
                        </p>
                    ) : (
                        <div
                            className={`mt-3 ${
                                children
                                    ? 'grid grid-cols-[minmax(0,1fr)_125px] items-end gap-4 sm:grid-cols-[minmax(0,1fr)_210px] lg:grid-cols-[minmax(0,1fr)_260px]'
                                    : ''
                            }`}
                        >
                            <p className="text-small text-surface/80 sm:text-body">
                                {description}
                            </p>
                            {children}
                        </div>
                    )}
                </div>
                {isStacked && children ? (
                    <div className="mt-5">{children}</div>
                ) : null}
            </div>
        </section>
    )
}
