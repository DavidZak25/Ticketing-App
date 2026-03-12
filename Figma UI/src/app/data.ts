export interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  description: string;
  tickets: TicketType[];
  isFeatured?: boolean;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

export type TicketStatus = "valid" | "used" | "cancelled" | "expired";

export interface UserTicket {
  id: string;
  eventId: string;
  ticketType: string;
  date: string;
  time: string;
  venue: string;
  eventTitle: string;
  eventImage: string;
  qrCode: string;
  status: TicketStatus;
  orderId: string;
  seat?: string;
  gate?: string;
  purchaseDate: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  eventsAttended: number;
  rating: number;
  favorites: number;
}

export const EVENTS: Event[] = [
  {
    id: "1",
    title: "Neon Pulse",
    subtitle: "Electronic Music Festival",
    date: "Mar 28, 2026",
    time: "9:00 PM",
    location: "Miami, FL",
    venue: "Wynwood Warehouse",
    price: 85,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1772665951724-5ddd138fe97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBuaWdodCUyMHB1cnBsZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NzMyODI2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Festival",
    description: "An immersive electronic music experience featuring world-class DJs, mesmerizing visuals, and an electric atmosphere that pulses through the night.",
    isFeatured: true,
    tickets: [
      { id: "t1", name: "General Admission", price: 85, description: "Access to main stage", available: 200 },
      { id: "t2", name: "VIP", price: 150, description: "VIP lounge + priority entry", available: 50 },
      { id: "t3", name: "Backstage Pass", price: 350, description: "All access + meet & greet", available: 10 },
    ],
  },
  {
    id: "2",
    title: "Midnight Frequencies",
    subtitle: "DJ Set & Afterparty",
    date: "Apr 5, 2026",
    time: "11:00 PM",
    location: "New York, NY",
    venue: "Brooklyn Steel",
    price: 65,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1768885512476-72db55f55e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG5pZ2h0Y2x1YiUyMGRhcmslMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3MzI4MjYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Nightlife",
    description: "Lose yourself in deep bass and hypnotic beats as top underground DJs take over Brooklyn Steel for an unforgettable late-night session.",
    tickets: [
      { id: "t4", name: "Early Bird", price: 45, description: "Limited early pricing", available: 30 },
      { id: "t5", name: "General Admission", price: 65, description: "Standard entry", available: 150 },
      { id: "t6", name: "Table Service", price: 250, description: "Reserved table for 4", available: 15 },
    ],
  },
  {
    id: "3",
    title: "Aurora Live",
    subtitle: "Immersive Concert Experience",
    date: "Apr 12, 2026",
    time: "8:00 PM",
    location: "Los Angeles, CA",
    venue: "The Wiltern",
    price: 120,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1629276301290-2283894be3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwc3RhZ2UlMjBuZW9ufGVufDF8fHx8MTc3MzI4MjYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Concert",
    isFeatured: true,
    description: "A multi-sensory live concert blending stunning visuals with breathtaking performances. Experience music like never before.",
    tickets: [
      { id: "t7", name: "Balcony", price: 90, description: "Upper level seating", available: 100 },
      { id: "t8", name: "Floor", price: 120, description: "Standing, close to stage", available: 80 },
      { id: "t9", name: "Premium Front Row", price: 250, description: "First 3 rows + merch", available: 20 },
    ],
  },
  {
    id: "4",
    title: "Skyline Sessions",
    subtitle: "Rooftop Party",
    date: "Apr 19, 2026",
    time: "7:00 PM",
    location: "Chicago, IL",
    venue: "LondonHouse Rooftop",
    price: 55,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1762237874410-17ddf6c782a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcGFydHklMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzczMjgyNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Party",
    description: "Elevated vibes above the city skyline. Craft cocktails, sunset views, and curated beats from the best local selectors.",
    tickets: [
      { id: "t10", name: "General", price: 55, description: "Rooftop access", available: 120 },
      { id: "t11", name: "Premium", price: 95, description: "Premium bar + seating", available: 40 },
    ],
  },
  {
    id: "5",
    title: "Velvet Underground",
    subtitle: "Live Band Night",
    date: "May 3, 2026",
    time: "9:30 PM",
    location: "Austin, TX",
    venue: "Mohawk Austin",
    price: 40,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwYmFuZCUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzczMjgyNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Concert",
    description: "Raw energy and pure talent. Five breakthrough bands take the stage for an unforgettable night of live music.",
    tickets: [
      { id: "t12", name: "Standing", price: 40, description: "General standing area", available: 200 },
      { id: "t13", name: "Mezzanine", price: 70, description: "Elevated viewing area", available: 60 },
    ],
  },
  {
    id: "6",
    title: "Prism",
    subtitle: "Laser & Sound Show",
    date: "May 15, 2026",
    time: "10:00 PM",
    location: "Las Vegas, NV",
    venue: "Zouk Nightclub",
    price: 95,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1577648674937-f3851cfbfad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBldmVudCUyMGxhc2VyfGVufDF8fHx8MTc3MzI4MjYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Nightlife",
    description: "A groundbreaking fusion of cutting-edge laser technology and deep, pulsating sound. The future of nightlife is here.",
    isFeatured: true,
    tickets: [
      { id: "t14", name: "General Admission", price: 95, description: "Dance floor access", available: 300 },
      { id: "t15", name: "VIP Booth", price: 500, description: "Private booth for 6", available: 8 },
    ],
  },
];

export const USER_TICKETS: UserTicket[] = [
  {
    id: "ut1",
    eventId: "1",
    ticketType: "VIP",
    date: "Mar 28, 2026",
    time: "9:00 PM",
    venue: "Wynwood Warehouse",
    eventTitle: "Neon Pulse",
    eventImage: "https://images.unsplash.com/photo-1772665951724-5ddd138fe97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBuaWdodCUyMHB1cnBsZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NzMyODI2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    qrCode: "NEONPULSE-VIP-2026-A7X9",
    status: "valid",
    orderId: "ORD-A7X9",
    seat: "VIP Section",
    gate: "Gate B",
    purchaseDate: "Mar 10, 2026",
  },
  {
    id: "ut2",
    eventId: "3",
    ticketType: "Floor",
    date: "Apr 12, 2026",
    time: "8:00 PM",
    venue: "The Wiltern",
    eventTitle: "Aurora Live",
    eventImage: "https://images.unsplash.com/photo-1629276301290-2283894be3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwc3RhZ2UlMjBuZW9ufGVufDF8fHx8MTc3MzI4MjYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    qrCode: "AURORA-FLR-2026-K3M2",
    status: "valid",
    orderId: "ORD-K3M2",
    gate: "Gate A",
    purchaseDate: "Mar 15, 2026",
  },
  {
    id: "ut3",
    eventId: "4",
    ticketType: "General",
    date: "Dec 15, 2025",
    time: "7:00 PM",
    venue: "LondonHouse Rooftop",
    eventTitle: "Skyline Sessions",
    eventImage: "https://images.unsplash.com/photo-1762237874410-17ddf6c782a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcGFydHklMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzczMjgyNjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    qrCode: "SKYLINE-GEN-2025-P4Q1",
    status: "used",
    orderId: "ORD-P4Q1",
    gate: "Main Entrance",
    purchaseDate: "Nov 20, 2025",
  },
  {
    id: "ut4",
    eventId: "2",
    ticketType: "Early Bird",
    date: "Jan 20, 2026",
    time: "11:00 PM",
    venue: "Brooklyn Steel",
    eventTitle: "Midnight Frequencies",
    eventImage: "https://images.unsplash.com/photo-1768885512476-72db55f55e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG5pZ2h0Y2x1YiUyMGRhcmslMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3MzI4MjYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    qrCode: "MIDNIGHT-EB-2026-R8S5",
    status: "cancelled",
    orderId: "ORD-R8S5",
    purchaseDate: "Dec 28, 2025",
  },
];

export const CATEGORIES = ["All", "Festival", "Concert", "Nightlife", "Party"];

export const MOCK_USER: User = {
  id: "u1",
  firstName: "Alex",
  lastName: "Rivera",
  email: "alex.rivera@email.com",
  phone: "+1 (555) 482-9100",
  avatar: "https://images.unsplash.com/photo-1771973379390-8f26f96d6a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMGRhcmslMjBzdHlsaXNofGVufDF8fHx8MTc3MzI4MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  memberSince: "Sep 2024",
  eventsAttended: 12,
  rating: 4.9,
  favorites: 3,
};

export const PROFILE_IMAGE = MOCK_USER.avatar;
