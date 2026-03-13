export type ProducerDashboardStats = {
  totalEvents: number;
  totalTicketsSold: number;
  revenue: number;
};

export type ProducerEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  ticketsSold: number;
  revenue: number;
};

export type ProducerEventStatus = 'draft' | 'live' | 'ended';

export type ProducerEventDetail = {
  id: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  status: ProducerEventStatus;
  ticketsSold: number;
  revenue: number;
};

export type CreateEventFormData = {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  location: string;
  venue: string;
  price: string;
};

export type OrderStatus = 'paid' | 'pending' | 'cancelled';

export type Order = {
  id: string;
  shortRef: string;
  eventId: string;
  buyerName: string;
  eventName: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
};
