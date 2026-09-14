import type { PropertyItem } from '../types/domain';

export const LAYOUT_ALL = '全部';
export const LAYOUT_OPTIONS = [LAYOUT_ALL, '一室一厅', '两室一厅', '三室两厅'];

export interface PropertyFilter {
  region: string;
  maxRent: number;
  layout: string;
}

export const DEFAULT_PROPERTY_FILTER: PropertyFilter = {
  region: '',
  maxRent: 7000,
  layout: LAYOUT_ALL,
};

export function matchProperty(item: PropertyItem, filter: PropertyFilter): boolean {
  const hitRegion = !filter.region || item.region.includes(filter.region);
  const hitRent = item.rent <= filter.maxRent;
  const hitLayout = filter.layout === LAYOUT_ALL || item.layout === filter.layout;
  return hitRegion && hitRent && hitLayout;
}

export function filterProperties(properties: PropertyItem[], filter: PropertyFilter): PropertyItem[] {
  return properties.filter((item) => matchProperty(item, filter));
}
