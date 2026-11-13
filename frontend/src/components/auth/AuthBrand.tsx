type AuthBrandProps = {
    className?: string
    /** Centered lockup for mobile auth; left-aligned by default. */
    align?: 'start' | 'center'
}

/**
 * Growth leaf mark inside a dark squircle — matches the approved Billax lockup.
 */
function LeafMark({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 3c4.5 2.2 7.5 6.2 7.5 11.2 0 2.4-.8 4.5-2.1 6.1-1.6-3.4-4.4-5.7-7.9-6.8 1.8 1.6 3.1 3.7 3.6 6.2-.7.3-1.4.5-2.1.5C6.5 20.2 4 16.4 4 12.2 4 7.4 7.5 4.2 12 3Z" />
        </svg>
    )
}

export function AuthBrand({ className, align = 'start' }: AuthBrandProps) {
    return (
        <div
            className={`flex items-center gap-3 text-white ${align === 'center' ? 'justify-center' : ''} ${className ?? ''}`}
        >
            <span className="grid size-[40px] shrink-0 place-items-center rounded-md border border-black bg-black text-dark-accent sm:size-[44px]">
                <LeafMark className="size-5 sm:size-6" />
            </span>
            <span className="text-[22px] font-bold leading-none tracking-[-0.02em] sm:text-[24px]">
                Billax
            </span>
        </div>
    )
}
