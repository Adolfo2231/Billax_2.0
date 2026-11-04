import { Link } from 'react-router'

export function AddAccountCard() {
    return (
        <Link
            to="/accounts/new"
            className="flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-surface p-5 text-center text-text-secondary transition-colors hover:border-brand-600 hover:bg-surface-muted hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
            <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-brand-50 text-h2 text-brand-600"
            >
                +
            </span>
            <span className="text-body font-bold text-text-primary">
                Add another account
            </span>
            <span className="text-small">
                Checking, Savings, or Credit Card
            </span>
        </Link>
    )
}
