import { useLocalSearchParams } from 'expo-router';

import { ManageOrdersScreen } from '@/features/producer/screens/ManageOrdersScreen';

export default function OrdersRoute() {
  const { eventId } = useLocalSearchParams<{ eventId?: string }>();
  return <ManageOrdersScreen eventId={eventId} />;
}
