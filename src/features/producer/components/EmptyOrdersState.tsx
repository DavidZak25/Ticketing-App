import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function EmptyOrdersState() {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        No orders found
      </ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.message}>
        Orders matching this filter will appear here.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.one,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    maxWidth: 260,
  },
});
