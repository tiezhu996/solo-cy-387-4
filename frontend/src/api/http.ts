const API_BASE = '/api';

export async function fetchJson<T>(path: string, errorMessage: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, init);
  if (!response.ok) throw new Error(errorMessage);
  return response.json() as Promise<T>;
}
