<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import { HEADER_HEIGHT, UNIT_WIDTH } from '../../../const'

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
    uno-border="r b border-2"
    select-none z-10
  >
    {{ unit.toUnitString() }}
  </div>
</template>
