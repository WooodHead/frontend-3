<script setup lang="ts">
import { EVENT_HEIGHT } from '../const'
</script>

<template>
  <div
    v-for="(_, i) of Array(100).fill(0)"
    :key="i"
    :style="{
      width: `${999999}px`,
      height: `${EVENT_HEIGHT}px`,
      left: `${-99999}px`,
      top: `${i * EVENT_HEIGHT}px`,
    }"
    absolute border="b-2 border-2 dashed" pointer-events-none z-10
  />
</template>
