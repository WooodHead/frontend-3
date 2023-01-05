<script setup lang="ts">
import { Presence } from '@motionone/vue'
import type { NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'
import Menu from './menu/index.vue'

const { node, isConnecting } = defineProps<{
  node: NodeProps
  isConnecting: boolean
}>()
</script>

<template>
  <div
    card
    relative center
    w-120px h-120px
    p-2 text-center
    transition-colors
    :bg=" node.selected ? `blue-2` : `gray-1`"
    :border="`~ ${node.selected ? `border-4` : `border-2`}`"
  >
    <Presence>
      <Menu
        v-if="isConnecting"
        :is-connecting="isConnecting"
        :inner-radius="90"
        :outer-radius="130"
        :names="[
          '顺承',
          '导致',
          '间接导致',
          '反常',
        ]"
      />
    </Presence>
    <Handle scale-200 type="target" :position="Position.Left" />
    {{ '这是一个比较长的事件名称，用于调节节点的大小' }}
    <Handle scale-200 type="source" :position="Position.Right" />
  </div>
</template>
