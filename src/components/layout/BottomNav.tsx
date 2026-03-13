import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

type TabId = 'home' | 'explore' | 'tickets';

type NavItem = {
  label: string;
  path: string;
  tab: TabId;
};

const navItems: NavItem[] = [
  { label: 'Home', path: '/', tab: 'home' },
  { label: 'Explore', path: '/explore', tab: 'explore' },
  { label: 'Tickets', path: '/tickets', tab: 'tickets' },
];

function getActiveTab(pathname: string): TabId | null {
  if (pathname === '/') return 'home';
  if (pathname === '/explore' || pathname.startsWith('/explore/')) return 'explore';
  if (pathname === '/tickets' || pathname.startsWith('/tickets/')) return 'tickets';
  return null;
}

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <View style={styles.container}>
      <View style={styles.glow} />
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const active = activeTab === item.tab;
          return (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.path as any)}
              style={({ pressed }) => [
                styles.item,
                active && styles.itemActive,
                pressed && styles.itemPressed,
              ]}
            >
              <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  glow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: '#0d0d14',
    opacity: 0.9,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#1a1a2e',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a45',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  itemActive: {
    backgroundColor: 'rgba(168, 85, 247, 0.18)',
  },
  itemPressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.6,
    color: '#6b6b8d',
  },
  labelActive: {
    color: '#a855f7',
    fontWeight: '600',
  },
});

