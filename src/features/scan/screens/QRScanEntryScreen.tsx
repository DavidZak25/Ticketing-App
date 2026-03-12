import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { ScanResultCard } from '@/features/scan/components/ScanResultCard';
import { ScannerFrame } from '@/features/scan/components/ScannerFrame';
import { MOCK_SCAN_IDLE } from '@/features/scan/data/mockScanResult';

export function QRScanEntryScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Event entry
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            QR Scan Entry
          </ThemedText>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ScannerFrame
            title="Scan ticket"
            subtitle="Ready for entry check — position QR code within frame"
          />

          <View style={styles.separator} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.resultLabel}>
            Result
          </ThemedText>
          <ScanResultCard result={MOCK_SCAN_IDLE} />
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
  separator: {
    height: 1,
    backgroundColor: '#2a2a45',
    marginVertical: Spacing.three,
  },
  resultLabel: {
    marginBottom: Spacing.two,
  },
});
