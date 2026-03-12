import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EventCard } from '@/features/events/components/EventCard';
import { FeaturedEventCard } from '@/features/events/components/FeaturedEventCard';
import { CATEGORIES, MOCK_EVENTS } from '@/features/events/data/mockEvents';

export function EventsListScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const filteredEvents = useMemo(
    () =>
      MOCK_EVENTS.filter(
        (event) => activeCategory === 'All' || event.category === activeCategory,
      ),
    [activeCategory],
  );

  const featuredEvents = filteredEvents.filter((e) => e.isFeatured);
  const otherEvents = filteredEvents.filter((e) => !e.isFeatured);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                Welcome back
              </ThemedText>
              <ThemedText type="title" style={styles.title}>
                Discover
              </ThemedText>
            </View>
            <View style={styles.avatar}>
              <ThemedText type="smallBold">AR</ThemedText>
            </View>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <View
                  key={cat}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                >
                  <ThemedText
                    type="small"
                    themeColor={active ? 'text' : 'textSecondary'}
                    onPress={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </ThemedText>
                </View>
              );
            })}
          </ScrollView>

          {/* Featured events */}
          {featuredEvents.length > 0 && (
            <View style={styles.section}>
              <ThemedText type="subtitle">Featured Events</ThemedText>
              {featuredEvents.map((event) => (
                <FeaturedEventCard
                  key={event.id}
                  event={event}
                  onPress={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </View>
          )}

          {/* Other events */}
          {otherEvents.length > 0 && (
            <View style={styles.section}>
              <ThemedText type="subtitle">
                {activeCategory === 'All' ? 'All Events' : activeCategory}
              </ThemedText>
              {otherEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: Spacing.one,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a855f7',
  },
  categoriesRow: {
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  categoryChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    backgroundColor: '#151525',
  },
  categoryChipActive: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  section: {
    gap: Spacing.two,
  },
});

