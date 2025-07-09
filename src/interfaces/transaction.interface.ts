export interface TransactionsInterface {
    id: string;
    collector: {
        name: string;
        avatar: string;
    };
    client: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    zone: string;
    paymentMethod: string;
}