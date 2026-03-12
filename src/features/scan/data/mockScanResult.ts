import type { ScanResult } from '@/features/scan/types';

/**
 * Mock scan result for UI placeholder. Replace with real decode + backend response.
 */
export const MOCK_SCAN_IDLE: ScanResult = {
  status: 'idle',
  message: 'Ready for entry check',
};

export const MOCK_SCAN_SUCCESS: ScanResult = {
  status: 'success',
  eventName: 'Neon Pulse',
  ticketId: 't1',
  message: 'Ticket valid — entry granted',
};

export const MOCK_SCAN_INVALID: ScanResult = {
  status: 'invalid',
  message: 'Ticket not recognized',
};

export const MOCK_SCAN_ALREADY_USED: ScanResult = {
  status: 'already_used',
  message: 'Ticket already used',
};
