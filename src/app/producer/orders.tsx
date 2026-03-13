import { useLocalSearchParams } from 'expo-router';

import { ManageOrdersScreen } from '@/features/producer/screens/ManageOrdersScreen';

export default function OrdersRoute() {
  const params = useLocalSearchParams<{ eventId?: string }>();
  const eventId =
    params.eventId == null
      ? undefined
      : Array.isArray(params.eventId)
        ? params.eventId[0]
        : params.eventId;
  return <ManageOrdersScreen eventId={eventId} />;
}
