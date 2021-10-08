export const formatUnitAmount = (amount: number) => {
    const formatCurrency = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
        minimumFractionDigits: 2,
    });

    return formatCurrency.format(amount / 100)
}