<script setup lang="ts">
import { useStore } from '../store'
import { useStore as useGanttStore } from '../../store'
import { BLOCK_WIDTH } from '../const'
import Block from './block.vue'

const store = useStore()
const ganttStore = useGanttStore()

const viewPortRef = toRef(store, 'viewPort')

// 当 origin 变化时，自动更新
// ganttStore.$subscribe((_mutation, state) => {
//   if (state.origin) { store.init(state.origin) }
// })
// ganttStore.$subscribe((_mutation, state) => {
//   if (state.visibleUnit && state.origin) {
//     const offset = ganttStore.unitOffset(state.visibleUnit) * BLOCK_WIDTH
//     store.offset = -offset
//   }
// })

const handleWheel = (e: WheelEvent) => {
  store.offset += -Math.sign(e.deltaY) * (2 * BLOCK_WIDTH)
}
</script>

<template>
  <div
    ref="viewPortRef"
    :style="{ transform: `translateX(${store.offset}px)` }"
    relative full
    transition-transform
    @wheel="handleWheel"
  >
    <Block
      v-for="(unit, i) in store.blockQueue" :id="unit"
      :key="unit.uid"
      :left="i === 0"
      :right="i === store.blockQueue.length - 1"
    />
  </div>
</template>
