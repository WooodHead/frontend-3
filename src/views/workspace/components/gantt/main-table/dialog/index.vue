<script setup lang="ts">
import useDraggable from '@/utils/useDraggable'

const target = ref<HTMLElement | null>(null)

const position = $ref({ x: 0, y: 0 })
const { x, y } = useDraggable(target, {
  onEnd: ({ x, y }) => {
    position.x += x
    position.y += y
  },
})

// TODO 添加时间提示和选择事件提示
</script>

<template>
  <div
    v-if="false"
    ref="target"
    :style="{ transform: `translate(${position.x + x}px, ${position.y + y}px)` }"
    column
    absolute m-auto left-0 right-0 bottom-10
    w-400px h-200px
    z-40 bg-white shadow-lg rounded-lg
  >
    <div grow w-full>
    </div>
    <div row w-full>
      <v-btn block variant="text" color="primary">
        取消
      </v-btn>
      <v-btn block variant="text" color="primary">
        完成
      </v-btn>
    </div>
  </div>
</template>
