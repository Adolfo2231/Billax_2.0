import { Link } from 'react-router'
import { Card } from '../ui/Card'

export function AccountsEmptyState() {
    return (
        <Card className='flex flex-col items-start gap-4'>
            <h2 className='text-h2'>No accounts yet</h2>
            <Link
                to="/accounts/new"
                className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-3 text-small font-medium text-surface hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
                Create account
            </Link>
        </Card>
    )
}