type EnvelopeProgressBarProps = {
    value: number
    color: string
    size: 'sm' | 'lg'
    label: string
    showNearLimitDot?: boolean
}

/* Arbitrary heights: theme spacing only defines 0–8 (no 3.5), so h-3.5 would collapse. */
const sizeClassName: Record<EnvelopeProgressBarProps['size'], string> = {
    sm: 'h-[8px]',
    lg: 'h-[14px]',
}

export function EnvelopeProgressBar({
    value,
    color,
    size,
    label,
    showNearLimitDot = false,
}: EnvelopeProgressBarProps) {
    const clamped = Math.min(Math.max(value, 0), 100)

    return (
        <div
            className={`relative w-full overflow-hidden rounded-full bg-dark-track ${sizeClassName[size]}`}
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
        >
            <div
                className="h-full rounded-full transition-[width]"
                style={{
                    width: `${clamped}%`,
                    backgroundColor: color,
                }}
            />
            {showNearLimitDot ? (
                <span
                    aria-hidden="true"
                    className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-danger"
                    style={{ left: `calc(${clamped}% - 4px)` }}
                />
            ) : null}
        </div>
    )
}
