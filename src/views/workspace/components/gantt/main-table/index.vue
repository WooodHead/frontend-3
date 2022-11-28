<script setup lang="ts">
import { useStore } from '../store'
import Header from './header/index.vue'
import Body from './body.vue'
import useDraggable from '@/utils/useDraggable'

const store = useStore()
let offset = $(store.offset)

const tableRef = $ref<HTMLElement | null>(null)
const { x, isDragging } = $(useDraggable($$(tableRef), {
  onEnd: ({ x }) => { offset += x },
}))

const handleWheel = (e: WheelEvent) => {
  if (isDragging) { return }
  offset -= Math.sign(e.deltaY) * 100
}
</script>

<template>
  <div grow>
    <div relative h-99999px>
      <div
        ref="tableRef"
        :style="{ transform: `translateX(${offset + x}px)` }"
        :class="`${!isDragging && `transition-transform`}`"
        column absolute h-full
        @wheel="handleWheel"
      >
        <Header />
        <Body />
      </div>
    </div>
  </div>
</template>
