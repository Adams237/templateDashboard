import { AccountRequestInterface } from "../interfaces/accoubtRequest.interface";

export const AccountRequest:AccountRequestInterface[] = [
      {
      id: '1',
      clientName: 'Entreprise ABC',
      type: 'Professionnel',
      status: 'pending',
      submittedDate: '2024-03-15T08:30:00',
      documents: ['ID', 'Business Registration', 'Tax Certificate']
    },
    {
      id: '2',
      clientName: 'John Smith',
      type: 'Particulier',
      status: 'approved',
      submittedDate: '2024-03-15T09:00:00',
      documents: ['ID', 'Proof of Address']
    },
    {
      id: '3',
      clientName: 'Boutique XYZ',
      type: 'Professionnel',
      status: 'rejected',
      submittedDate: '2024-03-15T07:45:00',
      documents: ['ID', 'Business Registration']
    }
]