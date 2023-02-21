<script setup lang="ts">
import Basic from './index.vue'
const { name, closable = false } = defineProps<{
  name: string
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', name: string): void
  (e: 'resolve', name: string, id: number): void
}>()
</script>

<template>
  <Basic :closable="closable" @close="$emit('close', name)">
    <template #avatar>
      <div i-radix-icons-question-mark-circled text-xl></div>
    </template>
    {{ name }}
    <template #popover>
      <slot name="popover"></slot>
    </template>
  </basic>
</template>
