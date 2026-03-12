import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Event } from '@/features/events/types';

type Props = {
  event: Event;
  onPress?: () => void;
};

export function EventCard({ event, onPress }: Props) {
  const content = (
    <>
      <Image source={{ uri: event.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardTitleContainer}>
            <ThemedText type="smallBold" numberOfLines={1}>
              {event.title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
              {event.subtitle}
            </ThemedText>
          </View>
          <View style={styles.cardCategoryPill}>
            <ThemedText type="small" style={styles.cardCategoryText}>
              {event.category}
            </ThemedText>
          </View>
        </View>
        <View style={styles.cardMetaRow}>
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
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.card}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: Spacing.two,
    borderRadius: Spacing.three,
    backgroundColor: '#151525',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    marginTop: Spacing.two,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: Spacing.two,
    marginRight: Spacing.two,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  cardTitleContainer: {
    flex: 1,
    gap: Spacing.half,
  },
  cardCategoryPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
    backgroundColor: '#1e1e35',
  },
  cardCategoryText: {
    fontSize: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  priceText: {
    color: '#22c55e',
  },
});

