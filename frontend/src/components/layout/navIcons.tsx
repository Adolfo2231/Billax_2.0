import type { SVGProps } from 'react'

export type NavIconProps = SVGProps<SVGSVGElement> & {
    isActive?: boolean
}

export function DashboardIcon({
    isActive = false,
    className,
    ...rest
}: NavIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={className ?? 'size-[20px] shrink-0'}
            viewBox="0 0 24 24"
            fill="none"
            {...rest}
        >
            <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
                fill={isActive ? 'currentColor' : 'none'}
            />
        </svg>
    )
}

export function AccountsIcon({ className, ...rest }: NavIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={className ?? 'size-[20px] shrink-0'}
            viewBox="0 0 24 24"
            fill="none"
            {...rest}
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
            <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.75" />
            <path
                d="M7 14.5h4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </svg>
    )
}
