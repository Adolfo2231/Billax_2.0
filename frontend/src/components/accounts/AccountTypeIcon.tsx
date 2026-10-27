import type { ReactNode } from 'react'
import type { AccountType } from '../../types/Account'

type AccountTypeIconProps = {
    accountType: AccountType
}

const accountTypeIcon: Record<AccountType, ReactNode> = {
    checking: (
        <>
            <path
                d="M4 10 12 4l8 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M6 10.5V18M10 10.5V18M14 10.5V18M18 10.5V18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M4.5 18h15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </>
    ),
    savings: (
        <>
            <path
                d="M9 8.2c.6-1.6 1.8-2.2 3-2.2 1.3 0 2.2.8 2.6 2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="13.2"
                r="5.8"
                stroke="currentColor"
                strokeWidth="1.75"
            />
            <circle cx="14.3" cy="12.4" r="0.8" fill="currentColor" />
            <path
                d="M12 10.4v2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </>
    ),
    cash: (
        <>
            <path
                d="M10 8c0-1.2.9-2 2-2s2 .8 2 2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M8.2 9h7.6c.8 0 1.4.8 1.2 1.6l-1.4 7.2a2 2 0 0 1-2 1.6H10.4a2 2 0 0 1-2-1.6L7 10.6A1.2 1.2 0 0 1 8.2 9Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M12 12.2v3M10.7 13.7h2.6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </>
    ),
    credit_card: (
        <>
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
            <path
                d="M7 14.5h4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
        </>
    ),
}

export function AccountTypeIcon({ accountType }: AccountTypeIconProps) {
    return (
        <span className="grid size-[40px] shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600">
            <svg
                aria-hidden="true"
                className="size-[20px]"
                viewBox="0 0 24 24"
                fill="none"
            >
                {accountTypeIcon[accountType]}
            </svg>
        </span>
    )
}
