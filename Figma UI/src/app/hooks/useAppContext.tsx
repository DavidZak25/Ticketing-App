import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Event, UserTicket, User, TicketStatus } from "../data";
import { EVENTS, USER_TICKETS, MOCK_USER } from "../data";

// --- Types ---

interface CartItem {
  ticketId: string;
  ticketName: string;
  price: number;
  quantity: number;
}

interface CartState {
  eventId: string | null;
  items: CartItem[];
  totalAmount: number;
  totalTickets: number;
}

type AsyncStatus = "idle" | "loading" | "success" | "error";

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  authStatus: AsyncStatus;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;

  // Events
  events: Event[];
  eventsStatus: AsyncStatus;
  eventsError: string | null;
  refreshEvents: () => Promise<void>;

  // User Tickets
  userTickets: UserTicket[];
  ticketsStatus: AsyncStatus;
  ticketsError: string | null;
  refreshTickets: () => Promise<void>;

  // Cart
  cart: CartState;
  addToCart: (eventId: string, ticketId: string, ticketName: string, price: number, quantity: number) => void;
  removeFromCart: (ticketId: string) => void;
  updateCartQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;

  // Checkout
  checkoutStatus: AsyncStatus;
  checkoutError: string | null;
  processCheckout: () => Promise<void>;
}

const emptyCart: CartState = {
  eventId: null,
  items: [],
  totalAmount: 0,
  totalTickets: 0,
};

// --- Context ---

const AppContext = createContext<AppState | null>(null);

// --- Helpers ---

function simulateAsync(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function computeCartTotals(items: CartItem[]): Pick<CartState, "totalAmount" | "totalTickets"> {
  return {
    totalAmount: items.reduce((s, i) => s + i.price * i.quantity, 0),
    totalTickets: items.reduce((s, i) => s + i.quantity, 0),
  };
}

// --- Provider ---

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AsyncStatus>("idle");
  const [authError, setAuthError] = useState<string | null>(null);

  // Events
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsStatus, setEventsStatus] = useState<AsyncStatus>("idle");
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Tickets
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [ticketsStatus, setTicketsStatus] = useState<AsyncStatus>("idle");
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  // Cart
  const [cart, setCart] = useState<CartState>(emptyCart);

  // Checkout
  const [checkoutStatus, setCheckoutStatus] = useState<AsyncStatus>("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // --- Auth actions ---
  const login = useCallback(async (_email: string, _password: string) => {
    setAuthStatus("loading");
    setAuthError(null);
    try {
      await simulateAsync(1000);
      setUser(MOCK_USER);
      setIsAuthenticated(true);
      setAuthStatus("success");
    } catch {
      setAuthError("Invalid email or password");
      setAuthStatus("error");
    }
  }, []);

  const register = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    setAuthStatus("loading");
    setAuthError(null);
    try {
      await simulateAsync(1200);
      setUser({ ...MOCK_USER, firstName: data.firstName, lastName: data.lastName, email: data.email });
      setIsAuthenticated(true);
      setAuthStatus("success");
    } catch {
      setAuthError("Registration failed. Please try again.");
      setAuthStatus("error");
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthStatus("idle");
    setCart(emptyCart);
  }, []);

  // --- Events ---
  const refreshEvents = useCallback(async () => {
    setEventsStatus("loading");
    setEventsError(null);
    try {
      await simulateAsync(600);
      setEvents(EVENTS);
      setEventsStatus("success");
    } catch {
      setEventsError("Failed to load events. Please try again.");
      setEventsStatus("error");
    }
  }, []);

  // --- Tickets ---
  const refreshTickets = useCallback(async () => {
    setTicketsStatus("loading");
    setTicketsError(null);
    try {
      await simulateAsync(500);
      setUserTickets(USER_TICKETS);
      setTicketsStatus("success");
    } catch {
      setTicketsError("Failed to load tickets. Please try again.");
      setTicketsStatus("error");
    }
  }, []);

  // --- Cart ---
  const addToCart = useCallback((eventId: string, ticketId: string, ticketName: string, price: number, quantity: number) => {
    setCart((prev) => {
      const newItems = [...prev.items.filter((i) => i.ticketId !== ticketId)];
      if (quantity > 0) {
        newItems.push({ ticketId, ticketName, price, quantity });
      }
      return { eventId, items: newItems, ...computeCartTotals(newItems) };
    });
  }, []);

  const removeFromCart = useCallback((ticketId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((i) => i.ticketId !== ticketId);
      return { ...prev, items: newItems, ...computeCartTotals(newItems) };
    });
  }, []);

  const updateCartQuantity = useCallback((ticketId: string, quantity: number) => {
    setCart((prev) => {
      const newItems = prev.items.map((i) => (i.ticketId === ticketId ? { ...i, quantity } : i)).filter((i) => i.quantity > 0);
      return { ...prev, items: newItems, ...computeCartTotals(newItems) };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart(emptyCart);
  }, []);

  // --- Checkout ---
  const processCheckout = useCallback(async () => {
    setCheckoutStatus("loading");
    setCheckoutError(null);
    try {
      await simulateAsync(1500);
      setCheckoutStatus("success");
      setCart(emptyCart);
    } catch {
      setCheckoutError("Payment failed. Please try again.");
      setCheckoutStatus("error");
    }
  }, []);

  // Auto-load events when authenticated
  useEffect(() => {
    if (isAuthenticated && eventsStatus === "idle") {
      refreshEvents();
    }
  }, [isAuthenticated, eventsStatus, refreshEvents]);

  useEffect(() => {
    if (isAuthenticated && ticketsStatus === "idle") {
      refreshTickets();
    }
  }, [isAuthenticated, ticketsStatus, refreshTickets]);

  const value: AppState = {
    isAuthenticated,
    user,
    authStatus,
    authError,
    login,
    register,
    logout,
    events,
    eventsStatus,
    eventsError,
    refreshEvents,
    userTickets,
    ticketsStatus,
    ticketsError,
    refreshTickets,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    checkoutStatus,
    checkoutError,
    processCheckout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
