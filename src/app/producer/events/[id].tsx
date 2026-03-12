import { useLocalSearchParams } from 'expo-router';

import { ProducerEventManagementScreen } from '@/features/producer/screens/ProducerEventManagementScreen';

export default function ProducerEventManagementRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProducerEventManagementScreen eventId={id} />;
}
