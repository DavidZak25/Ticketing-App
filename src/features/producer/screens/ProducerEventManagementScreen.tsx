import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { ProducerEventActionCard } from '@/features/producer/components/ProducerEventActionCard';
import { ProducerEventStatsRow } from '@/features/producer/components/ProducerEventStatsRow';
import { ProducerEventSummaryCard } from '@/features/producer/components/ProducerEventSummaryCard';
import { getProducerEventById } from '@/features/producer/lib/getProducerEventById';

type Props = {
  eventId: string | undefined;
};

export function ProducerEventManagementScreen({ eventId }: Props) {
  const router = useRouter();
  const event = getProducerEventById(eventId);

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
                : 'This event may not exist or you don’t have access.'}
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
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Producer / Admin
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            Event management
          </ThemedText>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProducerEventSummaryCard event={event} />
          <View style={styles.statsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Stats
            </ThemedText>
            <ProducerEventStatsRow event={event} />
          </View>
          <View style={styles.actionsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Actions
            </ThemedText>
            <View style={styles.actions}>
              <ProducerEventActionCard
                title="Edit event"
                subtitle="Coming soon"
              />
              <ProducerEventActionCard
                title="Manage orders"
                subtitle="View orders for this event"
                onPress={() => router.push('/producer/orders')}
              />
              <ProducerEventActionCard
                title="Scan entry"
                subtitle="Validate tickets at the door"
                onPress={() => router.push('/scan')}
              />
            </View>
          </View>
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
  header: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  title: {
    marginTop: Spacing.one,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  statsSection: {
    marginTop: Spacing.four,
  },
  actionsSection: {
    marginTop: Spacing.four,
  },
  sectionTitle: {
    marginBottom: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
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
    backgroundColor: '#151525',
  },
  backButtonPressed: {
    opacity: 0.8,
  },
});
