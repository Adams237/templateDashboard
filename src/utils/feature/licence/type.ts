export interface LicenceResponse {
    plan_id: number;
    name: string;
    description: string;
    description_en: string;
    monthly_price: number;
    color: string;
    popular: false;
    features: string[];
    features_en: string[];
    limitations: string[];
    limitations_en: string[];
    max_users: number;
    max_transactions: number;
    number_of_months: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}
export interface LicenceRequest {
    name: string;
    description: string;
    description_en: string;
    monthly_price: number;
    color: string;
    popular: false;
    features: string[];
    features_en: string[];
    limitations: string[];
    limitations_en: string[];
    max_users: number;
    max_transactions: number;
    number_of_months: number;
    is_deleted: boolean;
}