import { describe, expect, it } from 'vitest';
import type { PropertyItem } from '../types/domain';
import {
  DEFAULT_PROPERTY_FILTER,
  LAYOUT_ALL,
  LAYOUT_OPTIONS,
  filterProperties,
  type PropertyFilter,
} from './propertyFilter';

const properties: PropertyItem[] = [
  { id: 1, community: '海棠公寓', region: '滨江区', layout: '两室一厅', area: 76, rent: 5200, deposit: 5200, payment: '月付', facilities: ['空调', '洗衣机', '宽带'], status: '待出租', landlordPhone: '13800000001' },
  { id: 2, community: '梧桐里', region: '西湖区', layout: '一室一厅', area: 48, rent: 3900, deposit: 3900, payment: '季付', facilities: ['冰箱', '宽带'], status: '已预约', landlordPhone: '13800000002' },
];

function filterWith(patch: Partial<PropertyFilter>): PropertyFilter {
  return { ...DEFAULT_PROPERTY_FILTER, ...patch };
}

function idsOf(result: PropertyItem[]): number[] {
  return result.map((item) => item.id);
}

describe('filterProperties', () => {
  it('区域为空时不按区域过滤，返回全部房源', () => {
    expect(DEFAULT_PROPERTY_FILTER.region).toBe('');
    expect(idsOf(filterProperties(properties, filterWith({})))).toEqual([1, 2]);
  });

  it('区域支持部分匹配', () => {
    expect(idsOf(filterProperties(properties, filterWith({ region: '滨江' })))).toEqual([1]);
    expect(idsOf(filterProperties(properties, filterWith({ region: '西湖' })))).toEqual([2]);
  });

  it('租金等于上限时保留（边界含等）', () => {
    expect(idsOf(filterProperties(properties, filterWith({ maxRent: 3900 })))).toEqual([2]);
    expect(idsOf(filterProperties(properties, filterWith({ maxRent: 5200 })))).toEqual([1, 2]);
    expect(idsOf(filterProperties(properties, filterWith({ maxRent: 5199 })))).toEqual([2]);
  });

  it('户型为全部时不限户型，指定户型时精确匹配', () => {
    expect(LAYOUT_OPTIONS[0]).toBe(LAYOUT_ALL);
    expect(idsOf(filterProperties(properties, filterWith({ layout: LAYOUT_ALL })))).toEqual([1, 2]);
    expect(idsOf(filterProperties(properties, filterWith({ layout: '两室一厅' })))).toEqual([1]);
    expect(idsOf(filterProperties(properties, filterWith({ layout: '一室一厅' })))).toEqual([2]);
  });

  it('无匹配结果时返回空数组', () => {
    expect(filterProperties(properties, filterWith({ region: '不存在的区' }))).toEqual([]);
    expect(filterProperties(properties, filterWith({ layout: '三室两厅' }))).toEqual([]);
    expect(filterProperties(properties, filterWith({ maxRent: 1000 }))).toEqual([]);
  });
});
