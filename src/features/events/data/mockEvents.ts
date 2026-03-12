import type { Event } from '@/features/events/types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    subtitle: 'Electronic Music Festival',
    date: 'Mar 28, 2026',
    location: 'Miami, FL',
    venue: 'Wynwood Warehouse',
    price: 85,
    category: 'Festival',
    image:
      'https://images.unsplash.com/photo-1772665951724-5ddd138fe97d?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Midnight Frequencies',
    subtitle: 'DJ Set & Afterparty',
    date: 'Apr 5, 2026',
    location: 'New York, NY',
    venue: 'Brooklyn Steel',
    price: 65,
    category: 'Nightlife',
    image:
      'https://images.unsplash.com/photo-1768885512476-72db55f55e26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Aurora Live',
    subtitle: 'Immersive Concert Experience',
    date: 'Apr 12, 2026',
    location: 'Los Angeles, CA',
    venue: 'The Wiltern',
    price: 120,
    category: 'Concert',
    image:
      'https://images.unsplash.com/photo-1629276301290-2283894be3d4?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
  },
];

export const CATEGORIES = ['All', 'Festival', 'Concert', 'Nightlife', 'Party'] as const;

