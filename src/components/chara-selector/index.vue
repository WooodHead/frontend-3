<script setup lang="ts">
const { eventSearch = true } = defineProps<{
  eventSearch?: boolean
}>()
</script>

<template>
  <ASelect multiple />
</template>
