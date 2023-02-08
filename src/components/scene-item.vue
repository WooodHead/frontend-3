<script setup lang="ts">
import Item from '@/components/item/index.vue'
const { id, height, button, animate } = defineProps<{
  id: number
  height?: number
  button?: boolean
  animate?: boolean | Record<string, any>
}>()

const handleClick = () => {
  console.log('click')
}

const handleHover = () => {
  console.log('hover')
}
</script>

<template>
  <Item
    :button="button"
    :height="height"
    :animate="animate"
    @click="handleClick"
    @hover="handleHover"
  >
    1
  </Item>
</template>
