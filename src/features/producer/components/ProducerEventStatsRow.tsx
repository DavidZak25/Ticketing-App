import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { ProducerEventDetail } from '@/features/producer/types';

type Props = {
  event: ProducerEventDetail;
};

export function ProducerEventStatsRow({ event }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.stat}>
        <ThemedText type="small" themeColor="textSecondary">
          Tickets sold
        </ThemedText>
        <ThemedText type="subtitle" style={styles.value}>
          {event.ticketsSold}
        </ThemedText>
      </View>
      <View style={styles.stat}>
        <ThemedText type="small" themeColor="textSecondary">
          Revenue
        </ThemedText>
        <ThemedText type="subtitle" style={styles.revenue}>
          ${event.revenue}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stat: {
    flex: 1,
    backgroundColor: '#151525',
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    padding: Spacing.three,
    gap: Spacing.half,
  },
  value: {
    color: '#a855f7',
  },
  revenue: {
    color: '#22c55e',
  },
});
