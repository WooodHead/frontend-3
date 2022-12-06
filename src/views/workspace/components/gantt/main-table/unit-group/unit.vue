<script setup lang="ts">
import type { WatchStopHandle } from 'vue'
import { UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'

const store = useStore()
let activate = $ref(false)

// 在鼠标点击到抬起的过程中，是否发生过拖拽
// 当没有发生过时，认为是点击事件，从而改变激活状态
let isDragging = $ref(false)
let isClicking = $ref(false)
let unwatch = $ref<WatchStopHandle | null>(null)

const handlePointerDown = ({ button }: PointerEvent) => {
  if (button !== 0) { return }
  isClicking = true
  unwatch = watch(() => store.dragging, dragging => {
    if (dragging) { isDragging = true }
  })
}

const handlePointerUp = ({ button }: PointerEvent) => {
  if (button !== 0) { return }
  if (!isDragging && isClicking) { activate = !activate }
  isDragging = false
  isClicking = false
  if (unwatch) { unwatch() }
}

const handlePointerOver = () => {

}
</script>

<template>
  <div
    :style="{ width: `${UNIT_WIDTH}px`, height: `${99999}px` }"
    relative column cursor-pointer
    transition-colors duration-100
    border-gray-200 outline="2 blue-400"
    :class="`${activate
      ? `border-r-0 bg-blue-100 hover:bg-blue-200 outline z-10`
      : `border-r-2 bg-gray-100 hover:bg-gray-200 outline-none`}`"

    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
  />
</template>
