I already generated a mobile ticketing app UI, but I want to upgrade it from a design prototype into a more production-ready app structure.

Project context:
This is an event ticketing app MVP.

Main user flows:
- Login / Register
- Browse events
- View event details
- Select tickets
- Checkout
- Payment success
- My tickets
- Ticket QR
- Profile

Design direction:
- premium
- modern
- dark mode
- minimal
- startup-quality
- polished spacing and hierarchy
- strong event imagery
- wallet-like ticket experience

I want you to improve the current app and fix the missing product-level parts.

Please update the project with these goals:

1. Improve architecture
- separate reusable UI components from screens
- add a clear app structure for:
  - screens
  - reusable components
  - hooks
  - services
  - theme/tokens
- make the app feel like a real product, not just a visual prototype

2. Add missing product states
For all important screens, include:
- loading state
- empty state
- error state

Examples:
- Events list loading / empty / failed
- My tickets empty state
- Checkout failed state
- Ticket QR invalid / used / cancelled state

3. Add better app logic placeholders
Create a clear frontend structure for:
- auth state
- current user state
- selected ticket/cart state
- events data state
- tickets data state

Even if it is still mock-based, structure it as if it will later connect to Firebase/Auth/Cloud Functions.

4. Improve navigation
Make navigation feel like a real mobile app:
- auth flow
- main app flow
- protected screens for logged-in users
- smooth transitions between events, checkout, tickets, and profile

5. Improve screen quality
Upgrade these screens to feel more premium and realistic:
- Login
- Register
- Events List
- Event Details
- Ticket Selection
- Checkout
- Payment Success
- My Tickets
- Ticket QR
- Profile

6. Add missing reusable components
Create and use reusable components such as:
- PrimaryButton
- SecondaryButton
- InputField
- SearchBar
- EventCard
- TicketCard
- StatusBadge
- EmptyState
- ErrorState
- LoadingState
- SectionHeader
- BottomNavigation

7. Ticket-specific improvements
The ticket experience should feel premium and realistic.
Please improve:
- My Tickets cards
- Ticket QR screen
- ticket status visual system
- used / valid / cancelled state badges
- wallet/pass-like design language

8. Keep the output mobile-first
Even if this is generated as web code, the UI must feel like a real mobile app:
- narrow mobile layout
- touch-friendly controls
- proper spacing
- bottom navigation
- fixed CTA buttons where appropriate

Important:
- do not redesign the app from scratch
- improve the existing app
- keep the premium dark visual style
- make it more structured, more realistic, and more ready for real development
- prioritize product quality and component reuse over visual experimentation