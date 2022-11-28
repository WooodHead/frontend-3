<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-system'
import { EVENT_HEIGHT, UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'

export interface BlockProps {
  id: string
  start: UnitID
  end: UnitID
  children?: string[]
  short?: boolean
  color?: string
}

const { id, start, end, children, short, color = '#93c5fd' } = defineProps<BlockProps>()

const store = useStore()

const width = (end.diff(start) + 1) * UNIT_WIDTH
const offset = store.origin && start.diff(store.origin?.start as UnitID) * UNIT_WIDTH
const order = 1
</script>

<template>
  <div
    :style="{
      left: `${offset}px`,
      transform: `translateY(${order * EVENT_HEIGHT}px)`,
    }"
    absolute cursor-pointer
    transition-transform duration-100
  >
    <div
      v-if="short"
      :style="{ width: `${UNIT_WIDTH}px`, height: `${EVENT_HEIGHT}px` }"
      center
    >
      <div
        :style="{
          width: `${EVENT_HEIGHT * 0.6}px`,
          height: `${EVENT_HEIGHT * 0.6}px`,
          backgroundColor: `${color}`,
        }"
      />
    </div>
    <div
      v-else
      :style="{ width: `${width}px`, height: `${EVENT_HEIGHT}px` }"
      center-y
    >
      <div
        :style="{ backgroundColor: `${color}` }"
        w-full h="80%"
      />
    </div>
  </div>
</template>
