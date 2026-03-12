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

export function ManageOrdersScreen() {
  const [filter, setFilter] = useState<OrdersFilterValue>('all');

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return MOCK_ORDERS;
    return MOCK_ORDERS.filter((o) => o.status === filter);
  }, [filter]);

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
  scrollContent: {
    paddingBottom: Spacing.six,
  },
});
