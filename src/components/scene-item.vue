<script setup lang="ts">
import Item from '@/components/item/index.vue'
const { id, height, button } = defineProps<{
  id: number
  height?: number
  button?: boolean
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
    @click="handleClick"
    @hover="handleHover"
  >
    1
  </Item>
</template>
