import type { MetaOptions } from '../types/domain';
import { fetchJson } from './http';

export async function getMetaOptions(): Promise<MetaOptions> {
  return fetchJson<MetaOptions>('/meta/', '枚举选项加载失败');
}
