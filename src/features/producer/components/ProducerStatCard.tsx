import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  label: string;
  value: string | number;
};

export function ProducerStatCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="subtitle" style={styles.value}>
        {typeof value === 'number' && label.toLowerCase().includes('revenue') ? `$${value}` : value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
});
