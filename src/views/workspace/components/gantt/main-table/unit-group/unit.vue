<script setup lang="ts">
import type { UnitID } from '@project-chiral/unit-id'
import { UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'

const { id } = defineProps<{
  id: UnitID
}> ()

const store = useStore()
const { selectedRange } = $(storeToRefs(store))

let active = $ref(false)
const { pause, resume } = watchPausable(
  () => selectedRange,
  range => {
    if (range.some(_id => _id.isSame(id))) { return }
    active = false
  },
  { deep: true },
)
// 当单元格处于非激活状态时，没必要监听selectedRange
whenever(() => !active, () => pause(), { immediate: true })
watch(
  () => active,
  active => {
    if (active) {
      resume()

      if (selectedRange.length === 0) {
        selectedRange.push(id)
      }
      else if (selectedRange.length === 1) {
        const [start] = selectedRange
        if (id.isBefore(start)) { selectedRange.unshift(id) }
        else if (id.isAfter(start)) { selectedRange.push(id) }
      }
      else {
        // 当新id在已选范围内时，优先变动右边界
        const [start] = selectedRange
        if (id.isBefore(start)) { selectedRange[0] = id }
        else { selectedRange[1] = id }
      }
    }
    else {
      const index = selectedRange.findIndex(_id => _id.isSame(id))
      if (index !== -1) { selectedRange.splice(index, 1) }
    }
  },
)

// 在鼠标点击到抬起的过程中，是否发生过拖拽
// 当没有发生过时，认为是点击事件，从而改变激活状态
let isDragging = $ref(false)
let isClicking = $ref(false)
const handlePointerDown = ({ button }: PointerEvent) => {
  if (button !== 0) { return }
  isClicking = true
  const stop = watch(
    () => store.dragging,
    dragging => {
      if (!dragging) { return }
      isDragging = true
      stop()
    },
    { immediate: true },
  )
}

const handlePointerUp = ({ button }: PointerEvent) => {
  if (button !== 0) { return }
  if (!isDragging && isClicking) { active = !active }
  isDragging = false
  isClicking = false
}
</script>

<template>
  <div
    :style="{ width: `${UNIT_WIDTH}px`, height: `${99999}px` }"
    relative column cursor-pointer
    transition-colors duration-100
    border-border-2 outline="blue-4"
    :class="`${active
      ? `border-r-0 bg-blue-2 hover:bg-blue-3 outline z-10`
      : `border-r bg-gray-2 hover:bg-gray-3 outline-none`}`"

    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
  />
</template>
