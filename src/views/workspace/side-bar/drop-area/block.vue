<script setup lang="ts">
import { useDrop } from 'vue3-dnd'
import type { IPositionID } from '../../layout'
import useWSStore from '../../store'

export interface BlockProps {
  id: IPositionID | 'none'
  col: number
  row: number
  description: string
}

const { id, col, row, description } = defineProps<BlockProps>()

const store = useWSStore()

const [dropProps, drop] = useDrop({
  accept: 'component-handler',
  drop: ({ id: handlerID }: { id: string }) => {
    if (id === 'none') { return }
    store.insertComponent(handlerID, id)
  },
  collect: monitor => ({
    hover: monitor.isOver(),
  }),
})
</script>

<template>
  <div
    :ref="drop"
    center
    :class="`col-span-${col} row-span-${row}`"
    backdrop="filter blur-8"
    :bg="dropProps.hover ? `blue-400/50` : `blue-200/50`"
    transition-colors
    uno-border="2 border-3 dashed" rounded-lg
    text="center 4xl gray-600 opacity-60" font-bold
  >
    {{ description }}
  </div>
</template>
