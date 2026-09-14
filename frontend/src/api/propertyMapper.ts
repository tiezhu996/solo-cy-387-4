import type { PropertyItem } from '../types/domain';

/** 房源接口的线路格式，与页面模型解耦。 */
export interface PropertyItemDto {
  id: number;
  community: string;
  region: string;
  layout: string;
  area: number;
  rent: number;
  deposit: number;
  payment: string;
  facilities: string[];
  status: string;
  landlordPhone: string;
}

/** 字段映射：接口结构 → 页面房源模型，接口字段调整时只需改动这里。 */
export function toPropertyItem(dto: PropertyItemDto): PropertyItem {
  return { ...dto };
}
