import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "./components/AppLayout";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { EventsListScreen } from "./screens/EventsListScreen";
import { EventDetailScreen } from "./screens/EventDetailScreen";
import { TicketSelectionScreen } from "./screens/TicketSelectionScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { PaymentSuccessScreen } from "./screens/PaymentSuccessScreen";
import { MyTicketsScreen } from "./screens/MyTicketsScreen";
import { TicketQRScreen } from "./screens/TicketQRScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

export const router = createBrowserRouter([
  // Auth flow
  {
    Component: AuthLayout,
    children: [
      { path: "/", Component: LoginScreen },
      { path: "/login", Component: LoginScreen },
      { path: "/register", Component: RegisterScreen },
    ],
  },
  // Main app (protected)
  {
    Component: ProtectedLayout,
    children: [
      { path: "/events", Component: EventsListScreen },
      { path: "/event/:id", Component: EventDetailScreen },
      { path: "/event/:id/tickets", Component: TicketSelectionScreen },
      { path: "/checkout", Component: CheckoutScreen },
      { path: "/payment-success", Component: PaymentSuccessScreen },
      { path: "/my-tickets", Component: MyTicketsScreen },
      { path: "/ticket/:id", Component: TicketQRScreen },
      { path: "/profile", Component: ProfileScreen },
    ],
  },
]);
