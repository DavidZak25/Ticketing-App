import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { EmptyTicketsState } from '@/features/tickets/components/EmptyTicketsState';
import { TicketCard } from '@/features/tickets/components/TicketCard';
import { MOCK_TICKETS } from '@/features/tickets/data/mockTickets';

export function MyTicketsScreen() {
  const tickets = MOCK_TICKETS;
  const hasTickets = tickets.length > 0;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Your tickets
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            My Tickets
          </ThemedText>
        </View>
        {hasTickets ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </ScrollView>
        ) : (
          <EmptyTicketsState />
        )}
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
});
