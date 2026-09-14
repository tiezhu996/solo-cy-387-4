import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMetaOptions } from './useMetaOptions';

const sampleMeta = {
  houseStatus: ['待出租', '已预约', '已签约'],
  repairTypes: ['水电', '门锁', '管道', '家电', '其他'],
};

function okResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useMetaOptions', () => {
  it('加载成功时填充枚举选项且无错误提示', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse(sampleMeta));
    vi.stubGlobal('fetch', fetchMock);

    const { houseStatus, repairTypes, loadError, reload } = useMetaOptions();
    await reload();

    expect(fetchMock).toHaveBeenCalledWith('/api/meta/', undefined);
    expect(loadError.value).toBe('');
    expect(houseStatus.value).toEqual(sampleMeta.houseStatus);
    expect(repairTypes.value).toEqual(sampleMeta.repairTypes);
  });

  it('加载失败时给出错误提示，重试成功后恢复', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce(okResponse(sampleMeta));
    vi.stubGlobal('fetch', fetchMock);

    const { repairTypes, loadError, reload } = useMetaOptions();
    await reload();
    expect(loadError.value).toBe('报修类型加载失败，请重试');
    expect(repairTypes.value).toEqual([]);

    await reload();
    expect(loadError.value).toBe('');
    expect(repairTypes.value).toEqual(sampleMeta.repairTypes);
  });
});
