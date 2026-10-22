import { Link } from 'react-router'
import { AccountsEmptyState } from './AccountsEmptyState'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'

type AccountsCountProps = {
    isLoading: boolean
    error: string | null
    count: number | null
}

export function AccountsCount({ isLoading, error, count }: AccountsCountProps) {
    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Alert variant='error'>{error}</Alert>
    }

    if (count === null) {
        return null
    }

    if (count === 0) {
        return <AccountsEmptyState />
    }

    return (
        <p className='text-body text-text-primary'>
            You have {count} {count === 1 ? 'account' : 'accounts'}{' '}
            <Link
                to="/accounts"
                className="font-medium text-brand-600 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                    View accounts
                </Link>
        </p>
    )
}