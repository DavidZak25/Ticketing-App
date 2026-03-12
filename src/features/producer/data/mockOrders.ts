import type { Order } from '@/features/producer/types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    shortRef: '#1001',
    buyerName: 'Alex Rivera',
    eventName: 'Neon Pulse',
    quantity: 2,
    totalAmount: 170,
    status: 'paid',
  },
  {
    id: 'ord_2',
    shortRef: '#1002',
    buyerName: 'Jordan Lee',
    eventName: 'Aurora Live',
    quantity: 1,
    totalAmount: 120,
    status: 'paid',
  },
  {
    id: 'ord_3',
    shortRef: '#1003',
    buyerName: 'Sam Chen',
    eventName: 'Midnight Frequencies',
    quantity: 4,
    totalAmount: 260,
    status: 'pending',
  },
  {
    id: 'ord_4',
    shortRef: '#1004',
    buyerName: 'Taylor Kim',
    eventName: 'Neon Pulse',
    quantity: 1,
    totalAmount: 85,
    status: 'cancelled',
  },
];
