<script setup lang="ts">
import { UnitID } from '@project-chiral/unit-system'
import { EVENT_HEIGHT } from '../../const'
import Info from './parts/info.vue'
import Time from './parts/time.vue'
import Count from './parts/count.vue'

const { id } = defineProps<{ id: string }>()
</script>

<template>
  <div
    :style="{ height: `${EVENT_HEIGHT}px` }"
    w-full
    uno-border="b-2 gray-200"
    grid="~ cols-16"
  >
    <div col-span-8 uno-border="r-2 gray-200">
      <Info />
    </div>
    <div col-span-5 uno-border="r-2 gray-200">
      <Time :start="UnitID.fromDayjs('2022-09', 'month')" :end="UnitID.fromDayjs('2022-10', 'month')" />
    </div>
    <div col-span-3>
      <Count />
    </div>
  </div>
</template>
