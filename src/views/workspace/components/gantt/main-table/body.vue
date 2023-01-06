<script setup lang="ts">
import { useStore } from '../store'
import { HEADER_HEIGHT } from '../const'
import DashedTable from './dashed-table.vue'
import UnitGroup from './unit-group/index.vue'
import BlockTable from './block-table/index.vue'

const store = useStore()
</script>

<template>
  <div
    :style="{ transform: `translateY(${store.eventScrollTop + HEADER_HEIGHT}px)` }"
    row h-full
  >
    <UnitGroup v-for="unit in store.units" :id="unit" :key="unit.uid" />
    <DashedTable />
    <BlockTable />
  </div>
</template>
