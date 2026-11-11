import { useParams } from 'react-router'
import { AccountSelector } from '../components/envelopes/AccountSelector'
import { EnvelopeBalanceCard } from '../components/envelopes/EnvelopeBalanceCard'
import { EnvelopeList } from '../components/envelopes/EnvelopeList'
import { EnvelopesBottomNav } from '../components/envelopes/EnvelopesBottomNav'
import { EnvelopesDesktopSidebar } from '../components/envelopes/EnvelopesDesktopSidebar'
import { EnvelopesHeader } from '../components/envelopes/EnvelopesHeader'
import {
    mockEnvelopeAccount,
    mockEnvelopes,
} from '../mocks/envelopes'

export function EnvelopesPage() {
    // Route-scoped account id; mock data does not depend on the backend yet.
    const { id: accountId } = useParams<{ id: string }>()

    return (
        <div
            className="min-h-screen bg-dark-canvas text-white lg:flex"
            data-account-id={accountId}
        >
            <EnvelopesDesktopSidebar />

            <div className="min-w-0 flex-1">
                {/* pb uses arbitrary value: theme spacing only defines 0–8, so pb-32 would be ignored. */}
                <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-[140px] pt-3 lg:max-w-5xl lg:px-8 lg:pb-8 lg:pt-8">
                    <EnvelopesHeader
                        accountName={mockEnvelopeAccount.accountName}
                    />

                    <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:gap-5">
                        <div className="lg:hidden">
                            <AccountSelector
                                accountName={mockEnvelopeAccount.accountName}
                            />
                        </div>

                        <EnvelopeBalanceCard summary={mockEnvelopeAccount} />
                        <EnvelopeList envelopes={mockEnvelopes} />
                    </div>
                </div>
            </div>

            <EnvelopesBottomNav />
        </div>
    )
}
