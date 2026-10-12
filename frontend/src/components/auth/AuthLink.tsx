import type { ReactNode } from 'react'
import { Link } from 'react-router'

type AuthLinkProps = {
    to: string
    children: ReactNode
}

export function AuthLink({ to, children }: AuthLinkProps) {
    return (
        <Link
            className="self-center text-center text-small font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            to={to}
        >
            {children}
        </Link>
    )
}
