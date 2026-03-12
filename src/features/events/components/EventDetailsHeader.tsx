import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Event } from '@/features/events/types';

type Props = {
  event: Event;
};

export function EventDetailsHeader({ event }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.heroImage} />
      <View style={styles.gradient} />
      <View style={styles.content}>
        <View style={styles.categoryPill}>
          <ThemedText type="small" style={styles.categoryText}>
            {event.category}
          </ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>
          {event.title}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          {event.subtitle}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    position: 'absolute',
    left: Spacing.four,
    right: Spacing.four,
    bottom: Spacing.four,
    gap: Spacing.one,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.9)',
  },
  categoryText: {
    fontSize: 12,
  },
  title: {
    marginTop: Spacing.one,
  },
  subtitle: {
    marginTop: Spacing.half,
  },
});
