import type { ProducerEventDetail } from '@/features/producer/types';

export const MOCK_PRODUCER_EVENT_DETAILS: ProducerEventDetail[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    date: 'Mar 28, 2026',
    location: 'Miami, FL',
    venue: 'Wynwood Warehouse',
    status: 'live',
    ticketsSold: 68,
    revenue: 5780,
  },
  {
    id: '2',
    title: 'Midnight Frequencies',
    date: 'Apr 5, 2026',
    location: 'New York, NY',
    venue: 'Brooklyn Steel',
    status: 'live',
    ticketsSold: 44,
    revenue: 2860,
  },
  {
    id: '3',
    title: 'Aurora Live',
    date: 'Apr 12, 2026',
    location: 'Los Angeles, CA',
    venue: 'The Wiltern',
    status: 'live',
    ticketsSold: 30,
    revenue: 3810,
  },
];
