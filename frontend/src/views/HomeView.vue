<template>
  <main class="page">
    <section class="toolbar">
      <div>
        <h1>RentFind 租房平台</h1>
        <p>房源搜索、预约看房、合同管理和物业报修集中处理。</p>
      </div>
      <el-segmented v-model="mode" :options="['列表视图', '地图视图']" />
    </section>

    <section class="filters">
      <el-input v-model="filter.region" placeholder="区域" />
      <el-input-number v-model="filter.maxRent" :min="1000" :step="500" />
      <el-select v-model="filter.layout" placeholder="户型">
        <el-option v-for="option in LAYOUT_OPTIONS" :key="option" :label="option" :value="option" />
      </el-select>
    </section>

    <section v-if="mode === '地图视图'" class="map-panel">高德地图区域：按经纬度展示房源点位，当前示例加载 {{ filtered.length }} 套房源。</section>
    <section class="grid">
      <PropertyCard v-for="item in filtered" :key="item.id" :item="item" />
    </section>

    <section class="repair">
      <h2>物业报修</h2>
      <el-select v-model="faultType">
        <el-option v-for="type in repairTypes" :key="type" :label="type" :value="type" />
      </el-select>
      <el-input v-model="description" placeholder="描述故障情况" />
      <el-button type="success" @click="submitRepair">提交工单</el-button>
      <span>{{ notice }}</span>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PropertyCard from '../components/PropertyCard.vue';
import { createRepair } from '../api/repair';
import { useMetaOptions } from '../composables/useMetaOptions';
import { usePropertyQuery } from '../composables/usePropertyQuery';
import { LAYOUT_OPTIONS } from '../utils/propertyFilter';

const { filter, filtered } = usePropertyQuery();
const { repairTypes } = useMetaOptions();

const mode = ref('列表视图');
const faultType = ref('');
const description = ref('');
const notice = ref('等待提交');

// 报修类型默认选中第一项，与原默认值“水电”一致
watch(repairTypes, (types) => {
  if (!faultType.value && types.length > 0) faultType.value = types[0];
}, { immediate: true });

async function submitRepair() {
  const ticket = await createRepair({ faultType: faultType.value, description: description.value });
  notice.value = `工单 ${ticket.id} 已提交：${ticket.status}`;
}
</script>
