export type ScanStatus = 'idle' | 'success' | 'invalid' | 'already_used';

export type ScanResult = {
  status: ScanStatus;
  eventName?: string;
  ticketId?: string;
  message?: string;
};
