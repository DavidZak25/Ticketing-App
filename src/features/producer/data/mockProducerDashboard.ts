import type { ProducerDashboardStats, ProducerEvent } from '@/features/producer/types';

export const MOCK_DASHBOARD_STATS: ProducerDashboardStats = {
  totalEvents: 3,
  totalTicketsSold: 142,
  revenue: 12450,
};

export const MOCK_PRODUCER_EVENTS: ProducerEvent[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    date: 'Mar 28, 2026',
    location: 'Miami, FL',
    ticketsSold: 68,
    revenue: 5780,
  },
  {
    id: '2',
    title: 'Midnight Frequencies',
    date: 'Apr 5, 2026',
    location: 'New York, NY',
    ticketsSold: 44,
    revenue: 2860,
  },
  {
    id: '3',
    title: 'Aurora Live',
    date: 'Apr 12, 2026',
    location: 'Los Angeles, CA',
    ticketsSold: 30,
    revenue: 3810,
  },
];
