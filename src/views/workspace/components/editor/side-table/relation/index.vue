<script setup lang="ts">
import CharaBadgeList from './chara-badge-list/index.vue'

const ids = $ref<number[]>([])
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色">
      <CharaBadgeList v-model="ids" />
    </ACard>
  </div>
</template>
