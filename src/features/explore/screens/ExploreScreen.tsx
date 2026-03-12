import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EventCard } from '@/features/events/components/EventCard';
import { MOCK_EVENTS } from '@/features/events/data/mockEvents';

export function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_EVENTS;
    const q = searchQuery.toLowerCase().trim();
    return MOCK_EVENTS.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.subtitle.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <ThemedText type="title">Explore</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
                Search events, venues, and categories
              </ThemedText>
            </View>

            {/* Search */}
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search events, venues..."
                placeholderTextColor="#6b6b8d"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
            </View>

            {/* Results */}
            <View style={styles.section}>
              <ThemedText type="subtitle">
                {searchQuery.trim()
                  ? `Results (${filteredEvents.length})`
                  : 'All events'}
              </ThemedText>
              {filteredEvents.length === 0 ? (
                <View style={styles.empty}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {searchQuery.trim()
                      ? `No results for "${searchQuery}"`
                      : 'No events to show'}
                  </ThemedText>
                </View>
              ) : (
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onPress={() => router.push(`/events/${event.id}`)}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  subtitle: {
    marginTop: Spacing.half,
  },
  searchWrapper: {
    marginTop: Spacing.two,
  },
  searchInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: Spacing.four,
    backgroundColor: '#151525',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    color: '#ffffff',
    fontSize: 15,
  },
  section: {
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  empty: {
    paddingVertical: Spacing.six,
    alignItems: 'center',
  },
});
