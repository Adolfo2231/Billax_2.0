export type EnvelopeIcon =
    | 'rent'
    | 'groceries'
    | 'gas'
    | 'fun'
    | 'emergency'

export type Envelope = {
    id: string
    name: string
    spent: number
    budget: number
    color: string
    icon: EnvelopeIcon
}

export type EnvelopeAccountSummary = {
    accountName: string
    balance: number
    assigned: number
    unassigned: number
}
