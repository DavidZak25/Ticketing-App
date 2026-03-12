import React from 'react';
import { Slot } from 'expo-router';

/**
 * AppTabs is now a thin wrapper that renders the current routed content.
 * Visual navigation is handled exclusively by the Figma-style BottomNav.
 */
export default function AppTabs() {
  return <Slot />;
}
