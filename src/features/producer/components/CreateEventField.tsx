import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export function CreateEventField({
  label,
  value,
  onChangeText,
  placeholder = '',
  multiline = false,
}: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b6b8d"
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.half,
    marginBottom: Spacing.three,
  },
  label: {
    marginBottom: Spacing.half,
  },
  input: {
    backgroundColor: '#151525',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
    color: '#ffffff',
    minHeight: 44,
  },
});
