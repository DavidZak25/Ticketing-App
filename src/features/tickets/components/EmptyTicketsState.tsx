import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function EmptyTicketsState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconPlaceholder}>
        <ThemedText type="subtitle" themeColor="textSecondary">
          🎫
        </ThemedText>
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        No tickets yet
      </ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.message}>
        Your purchased tickets will appear here. Browse events and get your first ticket!
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.six,
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: Spacing.three,
    backgroundColor: '#151525',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  title: {
    marginBottom: Spacing.one,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    maxWidth: 280,
  },
});
