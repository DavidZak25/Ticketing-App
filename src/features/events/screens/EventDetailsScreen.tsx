import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EventDetailsHeader } from '@/features/events/components/EventDetailsHeader';
import { TicketInfoCard } from '@/features/events/components/TicketInfoCard';
import { getEventById } from '@/features/events/lib/getEventById';

type Props = {
  eventId: string | undefined;
};

export function EventDetailsScreen({ eventId }: Props) {
  const router = useRouter();
  const event = getEventById(eventId);

  if (eventId == null || eventId === '' || event == null) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.fallbackSafe} edges={['top']}>
          <View style={styles.fallback}>
            <ThemedText type="subtitle" style={styles.fallbackTitle}>
              Event not found
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.fallbackMessage}>
              {eventId == null || eventId === ''
                ? 'No event was selected.'
                : 'This event may no longer exist or the link is invalid.'}
            </ThemedText>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            >
              <ThemedText type="default">Go back</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EventDetailsHeader event={event} />
        <View style={styles.body}>
          <TicketInfoCard event={event} />
          <View style={styles.ctaSection}>
            <Pressable
              style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
              onPress={() => {}}
            >
              <ThemedText type="subtitle" style={styles.ctaText}>
                Get tickets
              </ThemedText>
            </Pressable>
            <ThemedText type="small" themeColor="textSecondary" style={styles.ctaHint}>
              Ticket purchase will be available soon.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  body: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  ctaSection: {
    marginTop: Spacing.two,
    gap: Spacing.one,
  },
  ctaButton: {
    backgroundColor: '#a855f7',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonPressed: {
    opacity: 0.9,
  },
  ctaText: {
    color: '#ffffff',
  },
  ctaHint: {
    textAlign: 'center',
  },
  fallbackSafe: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
  },
  fallback: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  fallbackTitle: {
    textAlign: 'center',
  },
  fallbackMessage: {
    textAlign: 'center',
    maxWidth: 280,
  },
  backButton: {
    marginTop: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    backgroundColor: '#1e1e35',
  },
  backButtonPressed: {
    opacity: 0.8,
  },
});
