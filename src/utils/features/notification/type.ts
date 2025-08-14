export interface NotificationDataResponse {
    notification_id: string,
    title: string,
    message: string,
    is_read: boolean,
    messageEn: string,
    titleEn: string,
    user_id: string,
    created_at: string
    data:NotificationDataResponse
}