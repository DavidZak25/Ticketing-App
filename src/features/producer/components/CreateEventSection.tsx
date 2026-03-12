import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function CreateEventSection({ title, children }: Props) {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.four,
  },
  title: {
    marginBottom: Spacing.two,
  },
});
