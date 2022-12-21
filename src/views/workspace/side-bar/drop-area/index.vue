<script setup lang="ts">
import { Motion } from 'motion/vue'
import type { BlockProps } from './block.vue'
import Block from './block.vue'

const blocks: BlockProps[] = [
  { id: 'none', row: 5, col: 1, description: '取消' },
  { id: 'lt', row: 2, col: 4, description: '左上角' },
  { id: 'top', row: 2, col: 1, description: '上半部分' },
  { id: 'rt', row: 2, col: 4, description: '右上角' },
  { id: 'left', row: 1, col: 4, description: '左半部分' },
  { id: 'full', row: 1, col: 1, description: '全屏' },
  { id: 'right', row: 1, col: 4, description: '右半部分' },
  { id: 'lb', row: 2, col: 4, description: '左下角' },
  { id: 'bottom', row: 2, col: 1, description: '下半部分' },
  { id: 'rb', row: 2, col: 4, description: '右下角' },
]
</script>

<template>
  <Motion
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.1 }"
    full
    fixed top-0 left-0
    bg="white/20" backdrop="filter blur-8"
    z-20
  >
    <div full grid="~ cols-10 rows-5" gap-2 p-2>
      <Block v-for="props of blocks" :key="props.id" v-bind="props" />
    </div>
  </Motion>
</template>
