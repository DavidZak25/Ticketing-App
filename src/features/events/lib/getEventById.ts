import type { Event } from '@/features/events/types';
import { MOCK_EVENTS } from '@/features/events/data/mockEvents';

/**
 * Look up an event by id. Uses mock data for now.
 * Replace with Firestore query when integrating real data.
 */
export function getEventById(id: string | undefined): Event | null {
  if (id == null || id === '') return null;
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}
