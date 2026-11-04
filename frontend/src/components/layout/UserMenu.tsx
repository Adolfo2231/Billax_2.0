import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

export function UserMenu() {
    const { user, logout } = useAuth()
    const label = user?.first_name ?? user?.email

    return (
        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
            {label ? (
                <p className="truncate px-3 text-small text-text-primary" title={label}>
                    {label}
                </p>
            ) : null}
            <Button variant="secondary" className="min-h-7 w-full" onClick={logout}>
                Log out
            </Button>
        </div>
    )
}
