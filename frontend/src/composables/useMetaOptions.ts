import { onMounted, ref } from 'vue';
import { getMetaOptions } from '../api/meta';

/** 枚举选项统一以后端 /api/meta/ 为来源，不在页面侧重复维护。 */
export function useMetaOptions() {
  const houseStatus = ref<string[]>([]);
  const repairTypes = ref<string[]>([]);

  onMounted(async () => {
    const meta = await getMetaOptions();
    houseStatus.value = meta.houseStatus;
    repairTypes.value = meta.repairTypes;
  });

  return { houseStatus, repairTypes };
}
