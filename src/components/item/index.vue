<script setup lang="ts">
import { Button } from '@arco-design/web-vue'

const { height = 40, button = false } = defineProps<{
  id: number
  height?: number
  button?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'hover'): void
}>()

const target = ref<HTMLDivElement | null>(null)
const hover = useElementHover(target)
watch(hover, hover => {
  if (hover) { emit('hover') }
})
</script>

<template>
  <component
    :is="button ? Button : 'div'"
    ref="target"
    :style="{ height: `${height}px` }"
    type="text"
    row justify-center
    w-full p-0 m-0 rounded-0
    @click="$emit('click')"
  >
    <slot></slot>
  </component>
</template>
