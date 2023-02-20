<script setup lang="ts">
const ids = ref([114514, 1919810, 1, 1, 1])
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色">
      <CharaBadgeTable v-model="ids" />
    </ACard>
  </div>
</template>
