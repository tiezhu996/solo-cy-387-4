import { computed, onMounted, reactive, ref } from 'vue';
import { getProperties } from '../api/property';
import type { PropertyItem } from '../types/domain';
import { DEFAULT_PROPERTY_FILTER, filterProperties, type PropertyFilter } from '../utils/propertyFilter';

/** 房源查询：负责列表数据获取、筛选条件与筛选结果。 */
export function usePropertyQuery() {
  const properties = ref<PropertyItem[]>([]);
  const filter = reactive<PropertyFilter>({ ...DEFAULT_PROPERTY_FILTER });

  onMounted(async () => {
    properties.value = await getProperties();
  });

  const filtered = computed(() => filterProperties(properties.value, filter));

  return { properties, filter, filtered };
}
