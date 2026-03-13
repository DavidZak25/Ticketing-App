# Ticketing App

Event ticketing MVP: browse events, view details, manage tickets, and (for producers) manage events and orders. Built with Expo (React Native) and prepared for Firebase and Stripe integration.

## Stack

- **Expo** (React Native) with **Expo Router** (file-based routing)
- **Firebase** (Auth, Firestore, Cloud Functions) — configured but not yet wired for real data
- **Stripe** — backend webhook present; payment flow not yet connected in the app

## Route areas

- **User:** Home (`/`), Explore (`/explore`), Event Details (`/events/[id]`), My Tickets (`/tickets`), QR Scan Entry (`/scan`)
- **Producer:** Dashboard (`/producer`), Create Event (`/producer/create-event`), Manage Orders (`/producer/orders`), Event Management (`/producer/events/[id]`)

Bottom nav: Home, Explore, Tickets. Producer and Scan are reached by direct navigation (e.g. from dashboard or links).

## Run locally

```bash
npm install
npx expo start
```

Then open in a simulator, emulator, or Expo Go.

## What’s mock vs not integrated

- **Mock (local data only):** Events list, event details lookup, tickets list, orders list, producer dashboard stats, producer event details, scan result. All use in-memory or static mock data.
- **Ready for integration:** Same route and screen structure; swap mock data for Firestore/API calls (e.g. `getEventById`, `getProducerEventById`, orders query, tickets query). Auth, payments, and image upload are not implemented in the app yet.
