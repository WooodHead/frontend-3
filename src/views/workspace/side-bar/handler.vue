<script setup lang="ts">
import { useDrag } from 'vue3-dnd'
import useWSStore from '../store'
import { useGlobalStore } from '@/store'

const {
  id,
  name,
  icon,
  darkIcon,
  size = 40,
} = defineProps<{
  id: string
  name: string
  icon: string
  darkIcon: string
  size?: number
}>()

const WSStore = useWSStore()
const globalStore = useGlobalStore()
const { darkMode } = storeToRefs(globalStore)

const [dragProps, dragSource] = useDrag({
  type: 'component-handler',
  item: { id },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    dragID: monitor.getItem()?.id,
  }),
})

watch(dragProps, ({ isDragging, dragID }) => {
  if (dragID === undefined) {
    WSStore.dragging = false
  }
  if (dragID === id) {
    WSStore.dragging = isDragging
  }
})
</script>

<template>
  <ATooltip position="right" :content="name">
    <div
      :ref="dragSource"
      :class="dragProps.isDragging ? `invisible` : `visible`"
      center
      w-16
      h-16
      transition-transform
      hover:scale-125
      cursor-pointer
    >
      <img
        :style="{
          width: `${size}px`,
          height: `${size}px`,
        }"
        :src="darkMode ? darkIcon : icon"
      >
    </div>
  </ATooltip>
</template>
