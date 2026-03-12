import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MobileShell } from '@/components/layout/MobileShell';
import { BottomNav } from '@/components/layout/BottomNav';

type AppLayoutProps = {
  children: React.ReactNode;
};

/**
 * AppLayout composes the mobile shell and bottom navigation,
 * providing a Figma-inspired frame around the existing routes.
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <MobileShell>
      <View style={styles.content}>{children}</View>
      <BottomNav />
    </MobileShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

