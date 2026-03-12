export type TicketStatus = 'active' | 'used' | 'cancelled';

export type Ticket = {
  id: string;
  eventId: string;
  eventName: string;
  date: string;
  location: string;
  venue?: string;
  ticketType: string;
  status: TicketStatus;
};
