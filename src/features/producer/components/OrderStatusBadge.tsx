import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { OrderStatus } from '@/features/producer/types';

type Props = {
  status: OrderStatus;
};

const config: Record<OrderStatus, { label: string; color: string }> = {
  paid: { label: 'Paid', color: '#22c55e' },
  pending: { label: 'Pending', color: '#f59e0b' },
  cancelled: { label: 'Cancelled', color: '#ef4444' },
};

export function OrderStatusBadge({ status }: Props) {
  const { label, color } = config[status];
  return (
    <View style={[styles.badge, { backgroundColor: color + '22' }]}>
      <ThemedText type="small" style={[styles.text, { color }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 11,
  },
});
