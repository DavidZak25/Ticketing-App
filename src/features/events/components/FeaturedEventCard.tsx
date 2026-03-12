import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Event } from '@/features/events/types';

type Props = {
  event: Event;
  onPress?: () => void;
};

export function FeaturedEventCard({ event, onPress }: Props) {
  const content = (
    <>
      <Image source={{ uri: event.image }} style={styles.featuredImage} />
      <View style={styles.featuredGradient} />
      <View style={styles.featuredContent}>
        <View style={styles.featuredBadgeRow}>
          <ThemedText type="small" style={styles.featuredBadgeText}>
            {event.category}
          </ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.featuredTitle}>
          {event.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {event.subtitle}
        </ThemedText>
        <View style={styles.featuredMetaRow}>
          <ThemedText type="small" themeColor="textSecondary">
            {event.date} • {event.location}
          </ThemedText>
          <ThemedText type="smallBold" style={styles.priceText}>
            ${event.price}
          </ThemedText>
        </View>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.featuredCard, pressed && styles.featuredCardPressed]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.featuredCard}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    borderRadius: Spacing.four,
    overflow: 'hidden',
    height: 220,
    marginTop: Spacing.two,
  },
  featuredCardPressed: {
    opacity: 0.9,
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  featuredContent: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    bottom: Spacing.three,
    gap: Spacing.one,
  },
  featuredBadgeRow: {
    flexDirection: 'row',
  },
  featuredBadgeText: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    backgroundColor: 'rgba(168,85,247,0.9)',
  },
  featuredTitle: {
    marginTop: Spacing.one,
  },
  featuredMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  priceText: {
    color: '#22c55e',
  },
});

