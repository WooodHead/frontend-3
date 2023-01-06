<script setup lang="ts">
import { useStore } from '../store'
import Header from './header/index.vue'
import Body from './body.vue'
import EventSelect from './dialog/event-select.vue'
import UnitSelect from './dialog/unit-select.vue'
import useDraggable from '@/utils/useDraggable'

const store = useStore()
let { offset } = $(store)
const { viewPort } = storeToRefs(store)

const tableRef = ref<HTMLElement | null>(null)
const { x, isDragging } = $(useDraggable(tableRef, {
  onEnd: ({ x }) => { offset += x },
}))
watch(() => isDragging, dragging => {
  store.dragging = dragging
})

const handleWheel = (e: WheelEvent) => {
  if (isDragging) { return }
  offset -= Math.sign(e.deltaY) * 100
}
</script>

<template>
  <div grow>
    <div ref="viewPort" relative>
      <div
        ref="tableRef"
        :style="{ transform: `translateX(${offset + x}px)` }"
        :transition="!isDragging && `transform`"
        column absolute h-full
        @wheel="handleWheel"
      >
        <Header />
        <Body />
      </div>
    </div>
  </div>
  <div
    center-y
    fixed m-auto left-0 right-0 bottom-10
    z-100 space-y-4
  >
    <EventSelect />
    <UnitSelect />
  </div>
</template>
