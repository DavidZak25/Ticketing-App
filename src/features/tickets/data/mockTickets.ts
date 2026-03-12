import type { Ticket } from '@/features/tickets/types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 't1',
    eventId: '1',
    eventName: 'Neon Pulse',
    date: 'Mar 28, 2026',
    location: 'Miami, FL',
    venue: 'Wynwood Warehouse',
    ticketType: 'General Admission',
    status: 'active',
  },
  {
    id: 't2',
    eventId: '3',
    eventName: 'Aurora Live',
    date: 'Apr 12, 2026',
    location: 'Los Angeles, CA',
    venue: 'The Wiltern',
    ticketType: 'VIP',
    status: 'active',
  },
];
