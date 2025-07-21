export interface UserLicenceResponse {
    tenant_license_id: string,
    license_status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED',
    license_expires: string,
    auth_token: string,
    created_at: string,
    updated_at: string,
    user:{
        user_id:string,
        name:string
    },
    plan:{
        name:string,
        license_plan_id:string
    }

}