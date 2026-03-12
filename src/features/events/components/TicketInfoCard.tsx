import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Event } from '@/features/events/types';

type Props = {
  event: Event;
};

export function TicketInfoCard({ event }: Props) {
  return (
    <View style={styles.card}>
      <Row label="Date" value={event.date} />
      <Row label="Location" value={event.location} />
      <Row label="Venue" value={event.venue} />
      <View style={styles.priceRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Price
        </ThemedText>
        <ThemedText type="subtitle" style={styles.price}>
          ${event.price}
        </ThemedText>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="default">{value}</ThemedText>
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
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.half,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2a2a45',
  },
  price: {
    color: '#22c55e',
  },
});
