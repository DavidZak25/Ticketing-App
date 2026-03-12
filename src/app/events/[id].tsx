import { useLocalSearchParams } from 'expo-router';

import { EventDetailsScreen } from '@/features/events/screens/EventDetailsScreen';

export default function EventDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <EventDetailsScreen eventId={id} />;
}
