import type { Envelope } from '../../types/Envelope'
import { EnvelopeRow } from './EnvelopeRow'
import { NewEnvelopeButton } from './NewEnvelopeButton'

type EnvelopeListProps = {
    envelopes: Envelope[]
    onEdit?: () => void
    onAdd?: () => void
}

export function EnvelopeList({
    envelopes,
    onEdit,
    onAdd,
}: EnvelopeListProps) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 lg:hidden">
                <h2 className="text-body font-semibold text-white">
                    This month
                </h2>
                <button
                    type="button"
                    onClick={onEdit}
                    className="min-h-[44px] px-2 text-small font-medium text-[#34d399] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]"
                >
                    Edit
                </button>
            </div>

            <ul className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-4">
                {envelopes.map((envelope) => (
                    <li key={envelope.id} className="min-w-0">
                        <EnvelopeRow envelope={envelope} />
                    </li>
                ))}
                <li className="hidden min-w-0 lg:block">
                    <NewEnvelopeButton variant="dashed" onClick={onAdd} />
                </li>
            </ul>

            <div className="lg:hidden">
                <NewEnvelopeButton variant="dashed" onClick={onAdd} />
            </div>
        </section>
    )
}
