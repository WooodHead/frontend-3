<script setup lang="ts">
const { id, show = true, enabled = true, trigger = 'click' } = defineProps<{
  id: number
  show?: boolean
  enabled?: boolean
  trigger?: 'hover' | 'click' | 'focus' | 'contextMenu'
}>()
</script>

<template>
  <ATrigger :trigger="trigger" click-outside-to-close>
    <slot></slot>
    <template #content>
      <EventDetailCard :id="id" :show="show" :enabled="enabled" />
    </template>
  </ATrigger>
</template>
