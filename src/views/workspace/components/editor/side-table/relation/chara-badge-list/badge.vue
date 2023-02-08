<script setup lang="ts">
const { id } = defineProps<{
  id: number
}>()
</script>

<template>
  <div relative overflow-hidden>
    <CharaBadge :id="id" />
  </div>
</template>
