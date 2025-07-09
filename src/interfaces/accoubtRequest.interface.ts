export interface AccountRequestInterface {
    id: string;
    clientName: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedDate: string;
    documents: string[];
}