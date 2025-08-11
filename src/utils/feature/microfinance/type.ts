import { DocumenetRequest, DocumenetResponse } from '../document/type'

export interface Licence_Tenant {

    auth_token: string
    created_at: string
    license_expires: string
    license_plan_id: string
    license_status: string
    tenant_license_id: number
    transaction_id: string
    updated_at: string
    user_id: number
}

export interface MicrofinanceResponse {
    user_id: string
    name: string
    email: string,
    phone_number: string,
    profile_picture: string,
    password_hash: string,
    apiUrl: string,
    status: string,
    created_at: string,
    updated_at: string,
    country: string,
    city: string,
    address: string,
    latitude: number,
    longitude: number,
    last_login:string,
    confirm_password: string,
    Documents: Array<DocumenetResponse>,
    TenantLicenses: Array<Licence_Tenant>

}

export interface MicrofinanceResquest {
    name: string
    email: string,
    phone_number: string,
    profile_picture: string,
    password_hash: string,
    apiUrl: string,
    country: string,
    city: string,
    address: string,
    latitude: number,
    longitude: number,
    confirm_password: string,
    documents: Array<DocumenetRequest>,
}

export interface MetrickResponse {
    user_id: number,
    current_users: number,
    total_transactions_monthly: number,
    created_at: string,
    updated_at: string
}