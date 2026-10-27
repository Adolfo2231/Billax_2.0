import type { AccountTotals } from '../../utils/accountTotals'
import { formatCurrency } from '../../utils/formatCurrency'

type NetWorthCardProps = {
    totals: AccountTotals
}

export function NetWorthCard({ totals }: NetWorthCardProps) {
    const liabilities =
        totals.liabilities === 0 ? 0 : -totals.liabilities

    return (
        <section
            aria-label="Total net worth"
            className="w-full rounded-lg bg-brand-900 p-5 text-surface shadow-card"
        >
            <div className="flex items-center gap-3">
                <span className="grid size-[40px] shrink-0 place-items-center rounded-md bg-brand-600 text-surface">
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
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
                            fill="var(--color-brand-900)"
                        />
                    </svg>
                </span>
                <div className="min-w-0">
                    <p className="text-caption uppercase text-brand-50">
                        Total net worth
                    </p>
                    <p className="text-h1 text-surface">
                        {formatCurrency(totals.netWorth)}
                    </p>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 border-t border-brand-700 pt-4">
                <div className="min-w-0">
                    <p className="text-caption uppercase text-brand-50">
                        Assets
                    </p>
                    <p className="text-body font-semibold text-brand-300">
                        {formatCurrency(totals.assets)}
                    </p>
                </div>
                <div className="min-w-0 border-l border-brand-700 pl-4">
                    <p className="text-caption uppercase text-brand-50">
                        Liabilities
                    </p>
                    <p className="text-body font-semibold text-danger">
                        {formatCurrency(liabilities)}
                    </p>
                </div>
            </div>
        </section>
    )
}
