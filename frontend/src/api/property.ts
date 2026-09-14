import type { PropertyItem } from '../types/domain';
import { fetchJson } from './http';
import { toPropertyItem, type PropertyItemDto } from './propertyMapper';

export async function getProperties(): Promise<PropertyItem[]> {
  const data = await fetchJson<PropertyItemDto[]>('/properties/', '房源加载失败');
  return data.map(toPropertyItem);
}
