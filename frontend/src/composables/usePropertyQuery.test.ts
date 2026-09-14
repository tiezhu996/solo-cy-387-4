import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePropertyQuery } from './usePropertyQuery';

const sampleProperties = [
  { id: 1, community: '海棠公寓', region: '滨江区', layout: '两室一厅', area: 76, rent: 5200, deposit: 5200, payment: '月付', facilities: ['空调', '洗衣机', '宽带'], status: '待出租', landlordPhone: '13800000001' },
  { id: 2, community: '梧桐里', region: '西湖区', layout: '一室一厅', area: 48, rent: 3900, deposit: 3900, payment: '季付', facilities: ['冰箱', '宽带'], status: '已预约', landlordPhone: '13800000002' },
];

function okResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('usePropertyQuery', () => {
  it('加载成功时填充房源列表且无错误提示', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse(sampleProperties));
    vi.stubGlobal('fetch', fetchMock);

    const { properties, filtered, loadError, reload } = usePropertyQuery();
    await reload();

    expect(fetchMock).toHaveBeenCalledWith('/api/properties/', undefined);
    expect(loadError.value).toBe('');
    expect(properties.value).toHaveLength(2);
    expect(filtered.value).toHaveLength(2);
  });

  it('加载失败时给出错误提示且列表保持为空', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const { properties, filtered, loadError, reload } = usePropertyQuery();
    await reload();

    expect(loadError.value).toBe('房源加载失败，请重试');
    expect(properties.value).toEqual([]);
    expect(filtered.value).toEqual([]);
  });

  it('失败后可通过重试恢复数据', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce(okResponse(sampleProperties));
    vi.stubGlobal('fetch', fetchMock);

    const { properties, loadError, reload } = usePropertyQuery();
    await reload();
    expect(loadError.value).not.toBe('');

    await reload();
    expect(loadError.value).toBe('');
    expect(properties.value).toHaveLength(2);
  });
});
