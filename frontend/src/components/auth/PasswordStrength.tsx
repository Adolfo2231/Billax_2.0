type PasswordStrengthProps = {
    passwordLength: number
}

function getActiveSegments(passwordLength: number) {
    if (passwordLength === 0) {
        return 0
    }

    if (passwordLength < 4) {
        return 1
    }

    if (passwordLength < 8) {
        return 2
    }

    return 3
}

export function PasswordStrength({
    passwordLength,
}: PasswordStrengthProps) {
    const activeSegments = getActiveSegments(passwordLength)

    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className="grid min-w-0 flex-1 grid-cols-3 gap-2"
            >
                {[1, 2, 3].map((segment) => (
                    <span
                        key={segment}
                        className={`h-1 rounded-full ${
                            segment <= activeSegments
                                ? 'bg-brand-600'
                                : 'bg-brand-900/10'
                        }`}
                    />
                ))}
            </div>
            <span className="shrink-0 text-caption text-text-secondary">
                Min. 8 characters
            </span>
        </div>
    )
}
