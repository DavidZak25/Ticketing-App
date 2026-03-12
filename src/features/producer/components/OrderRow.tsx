import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { OrderStatusBadge } from '@/features/producer/components/OrderStatusBadge';
import type { Order } from '@/features/producer/types';

type Props = {
  order: Order;
};

export function OrderRow({ order }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <View style={styles.headerRow}>
          <ThemedText type="smallBold" numberOfLines={1}>
            {order.shortRef}
          </ThemedText>
          <OrderStatusBadge status={order.status} />
        </View>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {order.buyerName} • {order.eventName}
        </ThemedText>
        <View style={styles.meta}>
          <ThemedText type="small" themeColor="textSecondary">
            {order.quantity} ticket{order.quantity !== 1 ? 's' : ''}
          </ThemedText>
          <ThemedText type="smallBold" style={styles.total}>
            ${order.totalAmount}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    backgroundColor: '#151525',
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    marginTop: Spacing.two,
  },
  main: {
    flex: 1,
    gap: Spacing.half,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.half,
  },
  total: {
    color: '#22c55e',
  },
});
