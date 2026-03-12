import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset } from '@/constants/theme';

type MobileShellProps = {
  children: React.ReactNode;
};

/**
 * Mobile-first app frame inspired by the Figma UI shell.
 * Centers the app in a narrow column with a dark background and
 * adds bottom padding so content doesn't collide with the bottom nav.
 */
export function MobileShell({ children }: MobileShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.inner,
          {
            paddingTop: insets.top,
            paddingBottom: Math.max(insets.bottom, BottomTabInset),
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f',
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#0d0d14',
  },
});

