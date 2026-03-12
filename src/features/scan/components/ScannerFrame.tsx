import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  title?: string;
  subtitle?: string;
};

export function ScannerFrame({
  title = 'Scan ticket',
  subtitle = 'Position QR code within frame',
}: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
        {subtitle}
      </ThemedText>
      <View style={styles.frame}>
        <View style={[styles.corner, styles.cornerTopLeft]} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.placeholderLabel}>
          Camera placeholder
        </ThemedText>
      </View>
    </View>
  );
}

const cornerSize = 24;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  title: {
    marginBottom: Spacing.half,
  },
  subtitle: {
    marginBottom: Spacing.three,
  },
  frame: {
    width: 240,
    height: 240,
    borderRadius: Spacing.three,
    borderWidth: 2,
    borderColor: '#2a2a45',
    backgroundColor: '#151525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLabel: {
    marginTop: Spacing.two,
  },
  corner: {
    position: 'absolute',
    width: cornerSize,
    height: cornerSize,
    borderColor: '#a855f7',
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: Spacing.two,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: Spacing.two,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: Spacing.two,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: Spacing.two,
  },
});
