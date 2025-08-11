export interface DocumenetResponse {
    document_id: string,
    user_id: string
    document_number: string,
    document_type: string,
    created_at: string,
    updated_at: string,
    file_url:string
}

export interface DocumenetRequest {
    document_number: string,
    document_type: string,
    file_url:string
}