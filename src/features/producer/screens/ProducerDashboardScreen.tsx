import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { ProducerEventRow } from '@/features/producer/components/ProducerEventRow';
import { ProducerQuickActionCard } from '@/features/producer/components/ProducerQuickActionCard';
import { ProducerStatCard } from '@/features/producer/components/ProducerStatCard';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_PRODUCER_EVENTS,
} from '@/features/producer/data/mockProducerDashboard';

export function ProducerDashboardScreen() {
  const router = useRouter();
  const stats = MOCK_DASHBOARD_STATS;
  const events = MOCK_PRODUCER_EVENTS;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Producer / Admin
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            Dashboard
          </ThemedText>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsRow}>
            <ProducerStatCard label="Events" value={stats.totalEvents} />
            <View style={styles.statGap} />
            <ProducerStatCard label="Tickets sold" value={stats.totalTicketsSold} />
            <View style={styles.statGap} />
            <ProducerStatCard label="Revenue" value={stats.revenue} />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Your events
            </ThemedText>
            {events.map((event) => (
              <ProducerEventRow
                key={event.id}
                event={event}
                onPress={() => router.push(`/producer/events/${event.id}`)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Quick actions
            </ThemedText>
            <View style={styles.quickActions}>
              <ProducerQuickActionCard
                title="Create event"
                subtitle="Add a new event"
                onPress={() => router.push('/producer/create-event')}
              />
              <ProducerQuickActionCard
                title="Manage orders"
                subtitle="View and filter orders"
                onPress={() => router.push('/producer/orders')}
              />
              <ProducerQuickActionCard
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
  statsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.four,
  },
  statGap: {
    width: Spacing.two,
  },
  section: {
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    marginBottom: Spacing.two,
  },
  quickActions: {
    gap: Spacing.two,
  },
});
