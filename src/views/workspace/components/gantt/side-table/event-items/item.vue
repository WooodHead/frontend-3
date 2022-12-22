<script setup lang="ts">
import { UnitID } from '@project-chiral/unit-system'
import { useQuery } from '@tanstack/vue-query'
import { EVENT_HEIGHT } from '../../const'
import Info from './parts/info.vue'
import Time from './parts/time.vue'
import Count from './parts/count.vue'
import api from '@/api/api'

const { id } = defineProps<{ id: number }>()
const { data } = useQuery({
  enabled: false,
  queryKey: ['event', id],
  queryFn: () => api.event.getEvent(id),
})

// TODO 完成事件列表项
</script>

<template>
  <div
    :style="{ height: `${EVENT_HEIGHT}px` }"
    w-full
    uno-border="b border-2"
    grid="~ cols-16"
  >
    <div col-span-8 uno-border="r border-2">
      <Info :event="data" />
    </div>
    <div col-span-5 uno-border="r border-2">
      <Time :start="UnitID.fromDayjs('2022-09', 'month')" :end="UnitID.fromDayjs('2022-10', 'month')" />
    </div>
    <div col-span-3>
      <Count />
    </div>
  </div>
</template>
