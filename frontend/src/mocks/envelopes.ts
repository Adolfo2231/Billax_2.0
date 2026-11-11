import type { Envelope, EnvelopeAccountSummary } from '../types/Envelope'

export const mockEnvelopes: Envelope[] = [
    {
        id: '1',
        name: 'Rent',
        spent: 800,
        budget: 800,
        color: '#3b82f6',
        icon: 'rent',
    },
    {
        id: '2',
        name: 'Groceries',
        spent: 180,
        budget: 300,
        color: '#22c55e',
        icon: 'groceries',
    },
    {
        id: '3',
        name: 'Gas',
        spent: 90,
        budget: 200,
        color: '#a855f7',
        icon: 'gas',
    },
    {
        id: '4',
        name: 'Fun',
        spent: 95,
        budget: 100,
        color: '#f97316',
        icon: 'fun',
    },
    {
        id: '5',
        name: 'Emergency buffer',
        spent: 135,
        budget: 200,
        color: '#14b8a6',
        icon: 'emergency',
    },
]

const totalAssigned = mockEnvelopes.reduce(
    (sum, envelope) => sum + envelope.budget,
    0,
)
const accountBalance = 2450.75

export const mockEnvelopeAccount: EnvelopeAccountSummary = {
    accountName: 'Popular Checking',
    balance: accountBalance,
    assigned: totalAssigned,
    unassigned: accountBalance - totalAssigned,
}
