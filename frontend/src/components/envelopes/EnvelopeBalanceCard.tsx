import { useState } from 'react'
import type { EnvelopeAccountSummary } from '../../types/Envelope'
import { formatCurrency } from '../../utils/formatCurrency'
import { EnvelopeProgressBar } from './EnvelopeProgressBar'

type EnvelopeBalanceCardProps = {
    summary: EnvelopeAccountSummary
}

export function EnvelopeBalanceCard({ summary }: EnvelopeBalanceCardProps) {
    const [isVisible, setIsVisible] = useState(true)
    const assignedRatio =
        summary.balance > 0 ? summary.assigned / summary.balance : 0
    const assignedPercent = Math.min(Math.round(assignedRatio * 100), 100)

    return (
        <section
            aria-label="Account balance"
            className="rounded-xl bg-dark-surface-balance p-5 text-white shadow-balance-glow lg:p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-small text-white/70">
                        <span>Account balance</span>
                        <button
                            type="button"
                            aria-label={
                                isVisible ? 'Hide balance' : 'Show balance'
                            }
                            onClick={() =>
                                setIsVisible((visible) => !visible)
                            }
                            className="grid size-[32px] place-items-center rounded-md text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-accent"
                        >
                            <svg
                                aria-hidden="true"
                                className="size-4"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                {isVisible ? (
                                    <>
                                        <path
                                            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <path
                                            d="M3 3l18 18"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2M6.1 6.4C3.9 8 2 12 2 12s3.5 7 10 7c2.1 0 3.9-.6 5.4-1.5M14.1 9.2C16.4 10.1 18.4 11.7 20.2 13.3 21.3 12.6 22 12 22 12s-3.5-7-10-7c-.7 0-1.4.1-2 .2"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                        />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>

                    <p className="mt-1 text-[32px] font-bold leading-10 tracking-tight lg:text-[40px] lg:leading-[48px]">
                        {isVisible
                            ? formatCurrency(summary.balance)
                            : '••••••'}
                    </p>
                </div>

                <span
                    aria-hidden="true"
                    className="grid size-[56px] shrink-0 place-items-center rounded-xl bg-white/10 text-dark-accent lg:size-[64px]"
                >
                    <svg
                        className="size-[28px] lg:size-[32px]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M4.5 7.5h15v10.25A2.25 2.25 0 0 1 17.25 20H6.75a2.25 2.25 0 0 1-2.25-2.25V7.5Z"
                            fill="currentColor"
                        />
                        <path
                            d="M7 7.5V6.25A2.25 2.25 0 0 1 9.25 4h7.25"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="16.5"
                            cy="13.5"
                            r="1.5"
                            fill="var(--color-dark-surface-balance)"
                        />
                    </svg>
                </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 lg:mt-6 lg:max-w-md">
                <div className="min-w-0">
                    <p className="text-caption text-white/60">Assigned</p>
                    <p className="text-body font-semibold text-white">
                        {isVisible
                            ? formatCurrency(summary.assigned)
                            : '••••'}
                    </p>
                </div>
                <div className="min-w-0 border-l border-white/20 pl-4">
                    <p className="text-caption text-white/60">Unassigned</p>
                    <p className="text-body font-semibold text-dark-accent">
                        {isVisible
                            ? formatCurrency(summary.unassigned)
                            : '••••'}
                    </p>
                </div>
            </div>

            <div className="mt-5 lg:mt-6">
                <EnvelopeProgressBar
                    value={assignedPercent}
                    color="var(--color-dark-accent)"
                    size="lg"
                    label="Assigned budget"
                />
            </div>
        </section>
    )
}
