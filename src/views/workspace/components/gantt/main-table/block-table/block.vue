<script setup lang="ts">
import { Presence } from '@motionone/vue'
import type { UnitIDRange } from '@project-chiral/unit-system'
import { EVENT_HEIGHT, UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'

export interface BlockProps {
  id: number
  range: UnitIDRange
  color: string
  type: 'ATOM' | 'COLLECTION'
}

const { id, range, color = '#93c5fd' } = defineProps<BlockProps>()

const store = useStore()

const target = ref<HTMLDivElement | null>(null)

const width = $computed(() => range.length * UNIT_WIDTH)
const offset = $computed(() => {
  const zero = store.origin?.firstChild
  if (!zero) { return undefined }
  return range.start.diff(zero) * UNIT_WIDTH
})

const order = 1

const hover = $(useElementHover(target))
</script>

<template>
  <div
    ref="target"
    :style="{
      left: offset && `${offset}px`,
      transform: `translateY(${order * EVENT_HEIGHT}px)`,
    }"
    absolute cursor-pointer
    transition-transform duration-100
    z-10
  >
    <div
      v-if="false"
      :style="{ width: `${UNIT_WIDTH}px`, height: `${EVENT_HEIGHT}px` }"
      center
    >
      <div
        :style="{
          width: `${EVENT_HEIGHT * 0.6}px`,
          height: `${EVENT_HEIGHT * 0.6}px`,
          backgroundColor: color,
        }"
        rounded-full
      />
    </div>
    <div
      v-else
      :style="{ width: `${width}px`, height: `${EVENT_HEIGHT}px` }"
      center
    >
      <div
        :style="{ backgroundColor: color }"
        w-full h="80%"
        transition shadow hover:shadow-lg
        rounded
      />
    </div>
    <Presence>
      <EventDetail v-if="hover" :id="id" />
    </Presence>
  </div>
</template>
