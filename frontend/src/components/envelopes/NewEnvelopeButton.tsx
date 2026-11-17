type NewEnvelopeButtonProps = {
    onClick?: () => void
    variant?: 'dashed' | 'solid'
    className?: string
}

export function NewEnvelopeButton({
    onClick,
    variant = 'dashed',
    className = '',
}: NewEnvelopeButtonProps) {
    if (variant === 'solid') {
        return (
            <button
                type="button"
                onClick={onClick}
                className={[
                    'inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-md bg-dark-accent px-5 py-3 text-small font-medium text-dark-on-accent',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    className,
                ].join(' ')}
            >
                <svg
                    aria-hidden="true"
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                    />
                </svg>
                New envelope
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-dark-accent/55 bg-dark-accent/5 px-4 text-small font-medium text-dark-accent',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent',
                'lg:min-h-[112px]',
                className,
            ].join(' ')}
        >
            <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            New envelope
        </button>
    )
}
