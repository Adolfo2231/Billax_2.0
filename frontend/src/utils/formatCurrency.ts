const currencyFormatter = new Intl.NumberFormat('es-PR', {
    style: 'currency',
    currency: 'USD',
})

export function formatCurrency(amount: number): string {
    return currencyFormatter.format(amount)
}
