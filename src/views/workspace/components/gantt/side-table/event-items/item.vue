<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Motion } from '@motionone/vue'
import { EVENT_HEIGHT } from '../../const'
import Info from './parts/info.vue'
import api from '@/api/api'

const { id } = defineProps<{ id: number }>()
const { data } = useQuery({
  enabled: true,
  queryKey: computed(() => ['event', id]),
  queryFn: () => api.event.getEvent(id),
})

// TODO 完成事件列表项
</script>

<template>
  <Motion
    :style="{ height: `${EVENT_HEIGHT}px` }"
    w-full border="b border-2"
  >
    <!-- <div col-span-8 border="r border-2">
      <Info :event="data" />
    </div>
    <div col-span-5 border="r border-2">
      <Time :start="UnitID.fromDayjs('2022-09', 'month')" :end="UnitID.fromDayjs('2022-10', 'month')" />
    </div>
    <div col-span-3>
      <Count />
    </div> -->
    <Info :data="data" />
  </Motion>
</template>
