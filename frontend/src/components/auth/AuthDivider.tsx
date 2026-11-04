import type { ReactNode } from 'react'

type AuthDividerProps = {
    children: ReactNode
}

export function AuthDivider({ children }: AuthDividerProps) {
    return (
        <div className="my-5 flex items-center gap-4 text-caption text-text-secondary">
            <span className="h-px flex-1 bg-border" />
            <span>{children}</span>
            <span className="h-px flex-1 bg-border" />
        </div>
    )
}
