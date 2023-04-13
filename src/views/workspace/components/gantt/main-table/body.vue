<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { useStore } from '../store'
import DashedTable from './dashed-table.vue'
import UnitGroup from './unit-group/index.vue'
import BlockTable from './block-table/index.vue'
import emitter from '@/utils/emitter'
import api from '@/api/api'
import { UnitID } from '@/utils/unit-id'

const store = useStore()
const client = useQueryClient()

// 当 event-select 时，定位到相应事件所在的时间范围开头
emitter.on('event-select', async ({ id }) => {
  const event = await client.ensureQueryData({
    queryKey: ['event', id],
    queryFn: () => api.event.get(id),
  })
  const range = UnitID.fromDayjs(event.unit, event.start)
  store.navigateTo(range.parent)
})
</script>

<template>
  <div
    :style="{ transform: `translateY(${store.eventScrollTop}px)` }"
    row h-full
  >
    <UnitGroup
      v-for="unit in store.units"
      :id="unit"
      :key="unit.uid"
    />
    <DashedTable />
    <BlockTable />
  </div>
</template>
