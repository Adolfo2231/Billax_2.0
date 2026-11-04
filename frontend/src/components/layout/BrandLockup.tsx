import { Link } from 'react-router'

type BrandLockupProps = {
    compact?: boolean
}

export function BrandLockup({ compact = false }: BrandLockupProps) {
    return (
        <Link
            to="/dashboard"
            className={`flex min-h-7 min-w-0 items-center gap-3 rounded-md text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${compact ? '' : 'px-3'}`}
        >
            <span className="grid size-[40px] shrink-0 place-items-center rounded-md bg-brand-600 text-surface">
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
                        fill="var(--color-brand-900)"
                    />
                </svg>
            </span>
            <span className="truncate text-body font-bold">Billax</span>
        </Link>
    )
}
