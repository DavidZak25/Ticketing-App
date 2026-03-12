import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function CreateEventImagePlaceholder() {
  return (
    <View style={styles.placeholder}>
      <ThemedText type="small" themeColor="textSecondary">
        Event image / banner
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
        Upload coming soon
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 160,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2a2a45',
    backgroundColor: '#151525',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
  },
  hint: {
    fontSize: 11,
  },
});
