import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { CreateEventField } from '@/features/producer/components/CreateEventField';
import { CreateEventImagePlaceholder } from '@/features/producer/components/CreateEventImagePlaceholder';
import { CreateEventSection } from '@/features/producer/components/CreateEventSection';
import { EVENT_CATEGORIES } from '@/features/producer/data/eventCategories';
import type { CreateEventFormData } from '@/features/producer/types';

const initialForm: CreateEventFormData = {
  title: '',
  subtitle: '',
  category: '',
  date: '',
  location: '',
  venue: '',
  price: '',
};

export function CreateEventScreen() {
  const [form, setForm] = useState<CreateEventFormData>(initialForm);

  const update = (field: keyof CreateEventFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCreate = () => {
    // No submission yet — CTA is visual-only / disabled until backend is ready
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Producer / Admin
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            Create event
          </ThemedText>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <CreateEventSection title="Image">
              <CreateEventImagePlaceholder />
            </CreateEventSection>

            <CreateEventSection title="Basic info">
              <CreateEventField
                label="Event title"
                value={form.title}
                onChangeText={update('title')}
                placeholder="e.g. Neon Pulse"
              />
              <CreateEventField
                label="Subtitle / short description"
                value={form.subtitle}
                onChangeText={update('subtitle')}
                placeholder="e.g. Electronic Music Festival"
                multiline
              />
              <ThemedText type="small" themeColor="textSecondary" style={styles.fieldLabel}>
                Category
              </ThemedText>
              <View style={styles.categoryRow}>
                {EVENT_CATEGORIES.map((cat) => {
                  const selected = form.category === cat;
                  return (
                    <Pressable
                      key={cat}
                      onPress={() => update('category')(cat)}
                      style={[styles.categoryChip, selected && styles.categoryChipActive]}
                    >
                      <ThemedText
                        type="small"
                        themeColor={selected ? 'text' : 'textSecondary'}
                      >
                        {cat}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </CreateEventSection>

            <CreateEventSection title="Date & place">
              <CreateEventField
                label="Date"
                value={form.date}
                onChangeText={update('date')}
                placeholder="e.g. Mar 28, 2026"
              />
              <CreateEventField
                label="Location"
                value={form.location}
                onChangeText={update('location')}
                placeholder="e.g. Miami, FL"
              />
              <CreateEventField
                label="Venue"
                value={form.venue}
                onChangeText={update('venue')}
                placeholder="e.g. Wynwood Warehouse"
              />
            </CreateEventSection>

            <CreateEventSection title="Pricing">
              <CreateEventField
                label="Price (USD)"
                value={form.price}
                onChangeText={update('price')}
                placeholder="e.g. 85"
              />
            </CreateEventSection>

            <Pressable
              onPress={handleCreate}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            >
              <ThemedText type="subtitle" style={styles.ctaText}>
                Create event
              </ThemedText>
            </Pressable>
            <ThemedText type="small" themeColor="textSecondary" style={styles.ctaHint}>
              Form submission will be available when backend is connected.
            </ThemedText>
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
  keyboard: {
    flex: 1,
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
  fieldLabel: {
    marginBottom: Spacing.two,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  categoryChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
    backgroundColor: '#151525',
  },
  categoryChipActive: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  cta: {
    backgroundColor: '#a855f7',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaText: {
    color: '#ffffff',
  },
  ctaHint: {
    textAlign: 'center',
    marginTop: Spacing.one,
  },
});
