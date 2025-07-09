import { TransactionsInterface } from "../interfaces/transaction.interface";

export const Transactions:TransactionsInterface[] =[
    {
      id: '1',
      collector: {
        name: 'Jean Dupont',
        avatar: 'url_to_avatar',
      },
      client: 'Boulangerie Express',
      amount: 75000,
      status: 'completed',
      date: '2024-03-15T10:15:00',
      zone: 'Akwa Nord',
      paymentMethod: 'cash'
    },
    {
      id: '2',
      collector: {
        name: 'Marie Claire',
        avatar: 'url_to_avatar',
      },
      client: 'Pharmacie Centrale',
      amount: 120000,
      status: 'pending',
      date: '2024-03-15T10:10:00',
      zone: 'Bonanjo',
      paymentMethod: 'cash'
    },
    {
      id: '3',
      collector: {
        name: 'Paul Michel',
        avatar: 'url_to_avatar',
      },
      client: 'Restaurant Le Safoutier',
      amount: 45000,
      status: 'failed',
      date: '2024-03-15T09:45:00',
      zone: 'Deido',
      paymentMethod: 'cash'
    }
  ]