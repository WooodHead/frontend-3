<script setup lang="ts">
import { useDrag } from 'vue3-dnd'
import useWSStore from '../store'

const { id, name } = defineProps<{ id: string; name: string }>()

const WSStore = useWSStore()

const [dragProps, dragSource] = useDrag({
  type: 'component-handler',
  item: { id },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
    dragID: monitor.getItem()?.id,
  }),
})

watch(dragProps, ({ isDragging, dragID }) => {
  if (dragID === undefined) { WSStore.dragging = false }
  if (dragID === id) { WSStore.dragging = isDragging }
})
</script>

<template>
  <div
    :ref="dragSource"
    :class="dragProps.isDragging ? `invisible` : `visible`"
    center
    w-16 h-16
    transition-transform hover:scale-125
    cursor-pointer
  >
    <slot />
    <v-tooltip right activator="parent">
      {{ name }}
    </v-tooltip>
  </div>
</template>
