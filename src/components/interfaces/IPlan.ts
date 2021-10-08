export interface PlanProps {
    description: string
    id: string
    metadata: {
        campanhas?: any
        leads?: any
        lists?: any
        templates?: any
        type?: any
    }
    name: string
    product: any
    unit_amount: number
    unit_amount_decimal: string
}