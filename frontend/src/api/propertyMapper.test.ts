import { describe, expect, it } from 'vitest';
import { toPropertyItem, type PropertyItemDto } from './propertyMapper';

const dto: PropertyItemDto = {
  id: 1,
  community: '海棠公寓',
  region: '滨江区',
  layout: '两室一厅',
  area: 76,
  rent: 5200,
  deposit: 5200,
  payment: '月付',
  facilities: ['空调', '洗衣机', '宽带'],
  status: '待出租',
  landlordPhone: '13800000001',
};

describe('toPropertyItem', () => {
  it('保留接口返回的全部字段（含 landlordPhone 驼峰字段）', () => {
    const item = toPropertyItem(dto);
    expect(item).toEqual({
      id: 1,
      community: '海棠公寓',
      region: '滨江区',
      layout: '两室一厅',
      area: 76,
      rent: 5200,
      deposit: 5200,
      payment: '月付',
      facilities: ['空调', '洗衣机', '宽带'],
      status: '待出租',
      landlordPhone: '13800000001',
    });
    expect(Object.keys(item)).toHaveLength(11);
  });

  it('返回新对象，不与接口数据共享引用', () => {
    const item = toPropertyItem(dto);
    expect(item).not.toBe(dto);
  });

  it('逐条映射列表时保持接口返回顺序', () => {
    const second: PropertyItemDto = { ...dto, id: 2, community: '梧桐里' };
    expect([dto, second].map(toPropertyItem).map((item) => item.id)).toEqual([1, 2]);
  });
});
