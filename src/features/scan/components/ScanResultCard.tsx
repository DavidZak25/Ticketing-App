import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { ScanResult } from '@/features/scan/types';

type Props = {
  result: ScanResult;
};

const statusConfig: Record<
  ScanResult['status'],
  { label: string; color: string; icon: string }
> = {
  idle: {
    label: 'Ready',
    color: '#6b6b8d',
    icon: '—',
  },
  success: {
    label: 'Valid',
    color: '#22c55e',
    icon: '✓',
  },
  invalid: {
    label: 'Invalid',
    color: '#ef4444',
    icon: '✕',
  },
  already_used: {
    label: 'Already used',
    color: '#f59e0b',
    icon: '↻',
  },
};

export function ScanResultCard({ result }: Props) {
  const config = statusConfig[result.status];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: config.color + '22' }]}>
          <ThemedText type="smallBold" style={[styles.badgeText, { color: config.color }]}>
            {config.icon} {config.label}
          </ThemedText>
        </View>
      </View>
      <ThemedText type="default" style={styles.message}>
        {result.message ?? 'Ready for entry check'}
      </ThemedText>
      {result.eventName && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.detail}>
          {result.eventName}
          {result.ticketId ? ` • ${result.ticketId}` : ''}
        </ThemedText>
      )}
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
  header: {
    flexDirection: 'row',
    marginBottom: Spacing.half,
  },
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
  },
  message: {
    marginTop: Spacing.half,
  },
  detail: {
    marginTop: Spacing.half,
  },
});
