import type { Envelope } from '../../types/Envelope'
import { formatCurrency } from '../../utils/formatCurrency'
import { EnvelopeIcon } from './EnvelopeIcon'
import { EnvelopeProgressBar } from './EnvelopeProgressBar'

type EnvelopeRowProps = {
    envelope: Envelope
}

export function EnvelopeRow({ envelope }: EnvelopeRowProps) {
    const percent =
        envelope.budget > 0
            ? Math.min(Math.round((envelope.spent / envelope.budget) * 100), 100)
            : 0
    const nearLimit = percent >= 95 && percent < 100

    return (
        <button
            type="button"
            className="flex h-full w-full items-center gap-3 rounded-xl bg-[#1c1c1e] px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] lg:gap-4 lg:px-4 lg:py-4"
        >
            <EnvelopeIcon icon={envelope.icon} color={envelope.color} />

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className="truncate text-small font-semibold text-white lg:text-body">
                            {envelope.name}
                        </p>
                        <p className="text-caption text-white/55">
                            {formatCurrency(envelope.spent)} /{' '}
                            {formatCurrency(envelope.budget)}
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <span className="hidden text-caption font-medium text-white/70 lg:inline">
                            {percent}%
                        </span>
                        <svg
                            aria-hidden="true"
                            className="mt-[2px] size-4 text-white/35 lg:hidden"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M9 5l7 7-7 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                    <EnvelopeProgressBar
                        value={percent}
                        color={envelope.color}
                        size="sm"
                        label={`${envelope.name} progress`}
                        showNearLimitDot={nearLimit}
                    />
                    <span className="w-[40px] shrink-0 text-right text-caption font-medium text-white/70 lg:hidden">
                        {percent}%
                    </span>
                </div>
            </div>
        </button>
    )
}
