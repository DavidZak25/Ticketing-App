import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Ticket } from '@/features/tickets/types';

type Props = {
  ticket: Ticket;
};

const statusLabel: Record<Ticket['status'], string> = {
  active: 'Active',
  used: 'Used',
  cancelled: 'Cancelled',
};

const statusColor: Record<Ticket['status'], string> = {
  active: '#22c55e',
  used: '#6b6b8d',
  cancelled: '#ef4444',
};

export function TicketCard({ ticket }: Props) {
  const statusStyle = { color: statusColor[ticket.status] };

  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.headerRow}>
          <ThemedText type="smallBold" numberOfLines={1} style={styles.eventName}>
            {ticket.eventName}
          </ThemedText>
          <ThemedText type="small" style={[styles.status, statusStyle]}>
            {statusLabel[ticket.status]}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {ticket.date} • {ticket.location}
        </ThemedText>
        <View style={styles.metaRow}>
          <ThemedText type="small" themeColor="textSecondary">
            {ticket.ticketType}
          </ThemedText>
        </View>
      </View>
      <View style={styles.qrArea}>
        <View style={styles.qrPlaceholder}>
          <ThemedText type="small" themeColor="textSecondary">
            QR code
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151525',
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    padding: Spacing.three,
    marginTop: Spacing.two,
    gap: Spacing.three,
  },
  main: {
    gap: Spacing.half,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  eventName: {
    flex: 1,
  },
  status: {
    fontWeight: '600',
  },
  metaRow: {
    marginTop: Spacing.half,
  },
  qrArea: {
    alignItems: 'center',
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2a2a45',
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2a2a45',
    backgroundColor: '#1e1e35',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
