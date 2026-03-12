export const EVENT_CATEGORIES = ['Festival', 'Concert', 'Nightlife', 'Party'] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
