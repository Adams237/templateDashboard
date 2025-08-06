export interface AuthResponse {
    access_token: string;
    user_id: number;
    user: {
        user_id: number;
        email: string;
        password_hash: string;
        status: string;
        is_blocked: boolean;
    }
}

export interface LoginRequest {
    email: string;
    password_hash: string;
}

export interface RegisterResponse {
    message: string;
    user: {
        user_id: number;
        email: string;
        password_hash: string;
        status: string;
        is_blocked: boolean;
    }
}