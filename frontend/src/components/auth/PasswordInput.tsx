import { useState } from 'react'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

type PasswordInputProps = Omit<
    React.ComponentProps<typeof Input>,
    'type' | 'invalid'
> & {
    id: string
    label: string
    error?: string
}

export function PasswordInput({
    id,
    label,
    error,
    className,
    ...inputProps
}: PasswordInputProps) {
    const [isVisible, setIsVisible] = useState(false)
    const errorId = `${id}-error`
    const describedBy =
        [inputProps['aria-describedby'], error ? errorId : undefined]
            .filter(Boolean)
            .join(' ') || undefined

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-brand-900" htmlFor={id}>
                {label}
            </Label>
            <div className="relative">
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-[50%] size-[20px] -translate-y-[50%] text-text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <Input
                    {...inputProps}
                    id={id}
                    type={isVisible ? 'text' : 'password'}
                    invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    className={`min-h-[44px] px-[44px] ${className ?? ''}`}
                />
                <button
                    type="button"
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isVisible}
                    className="absolute right-[0px] top-[50%] grid min-h-[44px] min-w-[44px] -translate-y-[50%] place-items-center rounded-md text-text-secondary hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-inset"
                    onClick={() => setIsVisible((current) => !current)}
                    disabled={inputProps.disabled}
                >
                    {isVisible ? (
                        <svg
                            aria-hidden="true"
                            className="size-[20px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        >
                            <path d="m4 4 16 16" />
                            <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                            <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a16.8 16.8 0 0 1-2.1 3.1M6.6 6.6C4.2 8.2 3 12 3 12s3.5 7 9 7a9.8 9.8 0 0 0 3-.5" />
                        </svg>
                    ) : (
                        <svg
                            aria-hidden="true"
                            className="size-[20px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
                            <circle cx="12" cy="12" r="2.5" />
                        </svg>
                    )}
                </button>
            </div>
            {error ? (
                <p id={errorId} className="text-caption text-text-primary">
                    {error}
                </p>
            ) : null}
        </div>
    )
}
