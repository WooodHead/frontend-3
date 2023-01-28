<script setup lang="ts">
const { id, load, disabled = false, trigger = 'click' } = defineProps<{
  id: number
  load?: boolean
  disabled?: boolean
  trigger?: 'hover' | 'click' | 'focus' | 'contextMenu'
}>()
</script>

<template>
  <ATrigger
    :trigger="trigger"
    click-outside-to-close
    update-at-scroll
    :unmount-on-close="false"
    :disabled="disabled"
  >
    <slot></slot>
    <template #content>
      <EventDetailCard :id="id" :load="load" />
    </template>
  </ATrigger>
</template>
