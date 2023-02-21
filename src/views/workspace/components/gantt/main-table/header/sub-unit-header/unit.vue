<script setup lang="ts">
import { HEADER_HEIGHT, UNIT_WIDTH } from '../../../const'
import type { UnitID } from '@/utils/unit-id'

const { unit } = defineProps<{ unit: UnitID }>()
</script>

<template>
  <div
    :title="unit.toString()"
    :style="{
      width: `${UNIT_WIDTH}px`,
      height: `${HEADER_HEIGHT / 2}px`,
    }"
    center
    bg-bg-2
    border="r b border-2"
    select-none z-10
  >
    {{ unit.toUnitString() }}
  </div>
</template>
