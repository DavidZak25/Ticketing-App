import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { ProducerEventDetail } from '@/features/producer/types';

type Props = {
  event: ProducerEventDetail;
};

const statusConfig: Record<ProducerEventDetail['status'], { label: string; color: string }> = {
  draft: { label: 'Draft', color: '#6b6b8d' },
  live: { label: 'Live', color: '#22c55e' },
  ended: { label: 'Ended', color: '#f59e0b' },
};

export function ProducerEventSummaryCard({ event }: Props) {
  const { label: statusLabel, color: statusColor } = statusConfig[event.status];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <ThemedText type="subtitle" numberOfLines={1} style={styles.title}>
          {event.title}
        </ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <ThemedText type="small" style={{ color: statusColor }}>
            {statusLabel}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {event.date}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {event.location} • {event.venue}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151525',
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    padding: Spacing.four,
    gap: Spacing.one,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
  },
});
