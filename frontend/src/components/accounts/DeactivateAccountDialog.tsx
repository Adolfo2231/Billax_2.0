import { useEffect, useRef } from 'react'
import type { Account } from '../../types/Account'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'
import { AccountBalance } from './AccountBalance'
import { AccountTypeBadge } from './AccountTypeBadge'
import { AccountTypeIcon } from './AccountTypeIcon'

type DeactivateAccountDialogProps = {
    account: Account
    isSubmitting: boolean
    error?: string
    onCancel: () => void
    onConfirm: () => void
}

function PauseIcon() {
    return (
        <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3.5" height="12" rx="1" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
        </svg>
    )
}

export function DeactivateAccountDialog({
    account,
    isSubmitting,
    error,
    onCancel,
    onConfirm,
}: DeactivateAccountDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const onCancelRef = useRef(onCancel)

    useEffect(() => {
        onCancelRef.current = onCancel
    }, [onCancel])

    useEffect(() => {
        dialogRef.current?.focus()

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !isSubmitting) {
                onCancelRef.current()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [isSubmitting])

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col justify-end bg-text-primary/40 sm:items-center sm:justify-center sm:p-4"
            onClick={isSubmitting ? undefined : onCancel}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="deactivate-account-title"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
                className="relative flex max-h-full min-h-0 w-full max-w-[420px] flex-col self-center overflow-hidden rounded-t-xl bg-surface shadow-card outline-none sm:rounded-xl"
            >
                <div className="flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain px-4 pt-4 sm:px-6 sm:pt-6">
                    <div className="flex items-start justify-between gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-surface-muted text-text-secondary">
                            <PauseIcon />
                        </span>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            aria-label="Close"
                            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M4 4l8 8M12 4l-8 8"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 id="deactivate-account-title" className="text-h2 text-text-primary">
                            Deactivate account?
                        </h2>
                        <p className="text-small text-text-secondary">
                            <span className="font-semibold text-text-primary">{account.name}</span>
                            {' '}
                            will be marked inactive and hidden from your dashboard totals. It stays in Billax and no data is deleted.
                        </p>
                    </div>

                    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3">
                        <AccountTypeIcon accountType={account.account_type} />
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="min-w-0">
                                <p className="truncate text-small font-semibold text-text-primary">
                                    {account.name}
                                </p>
                                <AccountTypeBadge
                                    accountType={account.account_type}
                                    isActive={account.is_active}
                                />
                            </div>
                            <AccountBalance
                                accountType={account.account_type}
                                balance={account.balance}
                            />
                        </div>
                    </div>

                    <p className="flex gap-2 text-caption text-brand-600">
                        <svg
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M8 1.8 13 3.6v4.2c0 3.2-2.1 5.4-5 6.4-2.9-1-5-3.2-5-6.4V3.6L8 1.8Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.2 8.1 7.5 9.4 9.9 6.8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>
                            This is not the same as deleting. Your account data stays saved.
                        </span>
                    </p>

                    {error ? <Alert variant="error">{error}</Alert> : null}
                </div>

                <div className="flex shrink-0 flex-col gap-2 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-text-primary px-4 py-3 text-small font-medium text-surface hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? <Spinner /> : <PauseIcon />}
                        Deactivate account
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md text-small font-medium text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
