import type { RepairTicket } from '../types/domain';
import { fetchJson } from './http';

export async function createRepair(ticket: Pick<RepairTicket, 'faultType' | 'description'>): Promise<RepairTicket> {
  return fetchJson<RepairTicket>('/repairs/', '报修提交失败', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  });
}
