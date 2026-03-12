import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export function ProducerEventActionCard({ title, subtitle, onPress }: Props) {
  const content = (
    <>
      <ThemedText type="default" style={styles.title}>
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151525',
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    padding: Spacing.three,
    gap: Spacing.half,
  },
  cardPressed: {
    opacity: 0.9,
  },
  title: {},
});
