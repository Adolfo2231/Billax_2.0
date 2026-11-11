type AccountSelectorProps = {
    accountName: string
    variant?: 'block' | 'compact'
}

export function AccountSelector({
    accountName,
    variant = 'block',
}: AccountSelectorProps) {
    const isCompact = variant === 'compact'

    return (
        <button
            type="button"
            className={[
                'flex items-center justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]',
                isCompact
                    ? 'min-h-[44px] rounded-md border border-white/25 bg-transparent px-4 py-3'
                    : 'w-full rounded-xl bg-[#1c1c1e] px-4 py-3',
            ].join(' ')}
        >
            <span
                className={[
                    'truncate font-semibold text-white',
                    isCompact ? 'text-small' : 'text-body',
                ].join(' ')}
            >
                {accountName}
            </span>
            <svg
                aria-hidden="true"
                className="size-4 shrink-0 text-white/70"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}
