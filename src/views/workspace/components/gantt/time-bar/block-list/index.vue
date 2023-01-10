<script setup lang="ts">
import { useStore } from '../store'
import { useStore as useGanttStore } from '../../store'
import { BLOCK_WIDTH } from '../const'
import Block from './block.vue'

const store = useStore()
const ganttStore = useGanttStore()

// 当 origin 变化时，自动更新
watch(
  () => ganttStore.origin,
  origin => {
    if (origin) { store.init(origin) }
  },
)

const handleWheel = (e: WheelEvent) => {
  store.offset += -Math.sign(e.deltaY) * (1 * BLOCK_WIDTH)
}
</script>

<template>
  <div
    ref="viewPortRef"
    :style="{ transform: `translateX(${store.offset}px)` }"
    relative full
    transition-transform
    @wheel.passive="handleWheel"
  >
    <Block
      v-for="(unit, i) in store.blockQueue"
      :id="unit"
      :key="unit.uid"
      :left="i === 0"
      :right="i === store.blockQueue.length - 1"
    />
  </div>
</template>
