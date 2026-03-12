import React from 'react';
import { Slot } from 'expo-router';

/**
 * Web version of AppTabs: renders only the routed content.
 * All visible navigation is handled by the Figma-style BottomNav.
 */
export default function AppTabs() {
  return <Slot />;
}
