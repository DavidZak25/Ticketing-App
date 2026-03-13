import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EmptyOrdersState } from '@/features/producer/components/EmptyOrdersState';
import { OrderRow } from '@/features/producer/components/OrderRow';
import {
  OrdersFilterBar,
  type OrdersFilterValue,
} from '@/features/producer/components/OrdersFilterBar';
import { MOCK_ORDERS } from '@/features/producer/data/mockOrders';
import { getProducerEventById } from '@/features/producer/lib/getProducerEventById';

type Props = {
  eventId?: string;
};

export function ManageOrdersScreen({ eventId }: Props) {
  const [filter, setFilter] = useState<OrdersFilterValue>('all');
  const event = eventId ? getProducerEventById(eventId) : null;

  const filteredOrders = useMemo(() => {
    const byEvent = eventId
      ? MOCK_ORDERS.filter((o) => o.eventId === eventId)
      : MOCK_ORDERS;
    if (filter === 'all') return byEvent;
    return byEvent.filter((o) => o.status === filter);
  }, [eventId, filter]);

  const hasOrders = filteredOrders.length > 0;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Producer / Admin
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            Manage orders
          </ThemedText>
          {event && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.eventContext}>
              For: {event.title}
            </ThemedText>
          )}
        </View>

        <OrdersFilterBar value={filter} onChange={setFilter} />

        {hasOrders ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </ScrollView>
        ) : (
          <EmptyOrdersState />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  title: {
    marginTop: Spacing.one,
  },
  eventContext: {
    marginTop: Spacing.half,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
});
