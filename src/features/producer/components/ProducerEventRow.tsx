import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { ProducerEvent } from '@/features/producer/types';

type Props = {
  event: ProducerEvent;
  onPress?: () => void;
};

export function ProducerEventRow({ event, onPress }: Props) {
  const content = (
    <>
      <View style={styles.main}>
        <ThemedText type="default" numberOfLines={1} style={styles.title}>
          {event.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {event.date} • {event.location}
        </ThemedText>
      </View>
      <View style={styles.meta}>
        <ThemedText type="small" themeColor="textSecondary">
          {event.ticketsSold} sold
        </ThemedText>
        <ThemedText type="smallBold" style={styles.revenue}>
          ${event.revenue}
        </ThemedText>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    backgroundColor: '#151525',
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    marginTop: Spacing.two,
  },
  rowPressed: {
    opacity: 0.9,
  },
  main: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {},
  meta: {
    alignItems: 'flex-end',
    gap: Spacing.half,
  },
  revenue: {
    color: '#22c55e',
  },
});
