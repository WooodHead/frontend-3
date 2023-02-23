<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'

const { node, isConnecting } = defineProps<{
  node: NodeProps
  isConnecting: boolean
}>()

const target = ref<HTMLElement | null>(null)
const hover = useElementHover(target)
</script>

<template>
  <div
    ref="target"
    card circle-120px
    center
    transition-colors
    :bg=" node.selected ? `blue-2` : `gray-1`"
    :border="`~ ${node.selected ? `border-4` : `border-2`}`"
  >
    <AAvatar full trigger-type="mask">
      刘慈欣
      <template #trigger-icon>
        刘慈欣
      </template>
    </AAvatar>
    <Handle scale-200 type="target" :position="Position.Left" />
    <Handle scale-200 type="source" :position="Position.Right" />
  </div>
</template>
