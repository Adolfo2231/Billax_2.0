import { Link } from 'react-router'
import { AccountSelector } from './AccountSelector'
import { NewEnvelopeButton } from './NewEnvelopeButton'

type EnvelopesHeaderProps = {
    accountName: string
    onAdd?: () => void
}

export function EnvelopesHeader({ accountName, onAdd }: EnvelopesHeaderProps) {
    return (
        <>
            {/* Mobile header */}
            <header className="flex items-center justify-between gap-3 lg:hidden">
                <Link
                    to="/accounts"
                    aria-label="Back to accounts"
                    className="grid size-[44px] place-items-center rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[20px]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M15 5 8 12l7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>

                <h1 className="text-h2 text-white">Envelopes</h1>

                <button
                    type="button"
                    aria-label="Add envelope"
                    onClick={onAdd}
                    className="grid size-[44px] place-items-center rounded-md text-[#34d399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]"
                >
                    <svg
                        aria-hidden="true"
                        className="size-[24px]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </header>

            {/* Desktop header */}
            <header className="hidden items-center justify-between gap-4 lg:flex">
                <h1 className="text-h1 text-white">Envelopes</h1>
                <div className="flex items-center gap-3">
                    <AccountSelector
                        accountName={accountName}
                        variant="compact"
                    />
                    <NewEnvelopeButton variant="solid" onClick={onAdd} />
                </div>
            </header>
        </>
    )
}
