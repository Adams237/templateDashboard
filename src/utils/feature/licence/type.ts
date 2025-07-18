export interface LicenceResponse {
    plan_id: string,
    name: string,
    max_users: number,
    max_transactions: number,
    monthly_price: number,
    created_at: string,
    updated_at: string
}
export interface LicenceRequest {
    name: string,
    max_users: number,
    max_transactions: number,
    monthly_price: number,
}