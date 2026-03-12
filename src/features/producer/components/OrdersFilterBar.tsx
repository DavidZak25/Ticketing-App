import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type OrdersFilterValue = 'all' | 'paid' | 'pending' | 'cancelled';

const FILTER_OPTIONS: { value: OrdersFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
];

type Props = {
  value: OrdersFilterValue;
  onChange: (value: OrdersFilterValue) => void;
};

export function OrdersFilterBar({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTER_OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <ThemedText
              type="small"
              themeColor={active ? 'text' : 'textSecondary'}
            >
              {opt.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    backgroundColor: '#151525',
  },
  chipActive: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
});
