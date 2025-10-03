export interface LicenceResponse {
    plan_id: number;
    name: string;
    description: string;
    description_en: string;
    monthly_price: number;
    color: string;
    popular: boolean | string;
    features: string[];
    features_en: string[];
    limitations: string[];
    discount_rules: { from_months: number, percent: number }[]
    limitations_en: string[];
    max_users: number;
    max_transactions: number;
    number_of_months: number;
    min_months:number,
    is_public:boolean,
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
    popular: boolean | string;
    features: string[];
    features_en: string[];
    limitations: string[];
    discount_rules: { from_months: number, percent: number }[]
    limitations_en: string[];
    max_users: number;
    max_transactions: number;
    number_of_months: number;
    is_deleted: boolean;
}

export interface DiscountTier { minMonths: number; percent: number } // ex: { minMonths: 6, percent: 0.1 } => -10% à partir de 6 mois

export interface PricingConfiguratorProps {
    plan: LicenceResponse,
    monthlyPrice: number
    currency?: string // ex: 'XAF', 'EUR', 'USD' (défaut: 'XAF')
    locale?: string // ex: 'fr-FR' | 'en-US' (défaut: 'fr-FR')
    minMonths?: number // défaut: 1
    loading:boolean,
    maxMonths?: number // défaut: 36
    defaultMonths?: number // défaut: 12
    tiers?: DiscountTier[] // défaut: voir ci-dessous
    title?: string
    onSubscribe?: (payload: {
        months: number
        baseMonthly: number
        discountPercent: number
        subtotal: number
        discountAmount: number
        total: number
        effectiveMonthly: number,
        plan:LicenceResponse
    }) => void
}