import type { ProducerEventDetail } from '@/features/producer/types';
import { MOCK_PRODUCER_EVENT_DETAILS } from '@/features/producer/data/mockProducerEventDetails';

/**
 * Look up a producer event by id. Uses mock data for now.
 * Replace with Firestore document fetch when integrating.
 */
export function getProducerEventById(id: string | undefined): ProducerEventDetail | null {
  if (id == null || id === '') return null;
  return MOCK_PRODUCER_EVENT_DETAILS.find((e) => e.id === id) ?? null;
}
