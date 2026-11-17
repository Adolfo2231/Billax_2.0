import { useParams } from 'react-router'
import { AccountSelector } from '../components/envelopes/AccountSelector'
import { EnvelopeBalanceCard } from '../components/envelopes/EnvelopeBalanceCard'
import { EnvelopeList } from '../components/envelopes/EnvelopeList'
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
            className="mx-auto flex w-full max-w-xl flex-col lg:max-w-5xl"
            data-account-id={accountId}
        >
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
    )
}
